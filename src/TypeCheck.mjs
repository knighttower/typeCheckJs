import { typeOf, isEmpty } from '@knighttower/js-utility-functions/index.mjs';
import testBuilder from './TestBuilder.mjs';

// Error collectot
const typeErrorLogs = [];
// Setting cache
const cachedSettings = new Map();

const runBasicTest = (inputVal, tests) => {
    return tests.some((test) => {
        const testResult = test(inputVal);
        if (!testResult) {
            typeErrorLogs.push({ value: inputVal, tests: tests });
        }
        return testResult;
    });
};

const runArrayTest = (inputVal, tests) => {
    // If the input is not an array, return false
    if (!typeOf(inputVal, 'array')) {
        return false;
    }
    // Else, test each value in the array
    return tests.every((test, index) => {
        // console.log('is array: ', inputVal[index], test);
        return runRouteTest(inputVal[index], test);
    });
};

class HandleObjects {
    constructor(inputVal, unitTest) {
        // Extract all properties at once
        const { testOnly, testFew, testAllAny, optionalKeys, tests } = [...unitTest.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {},
        );
        // Use destructured variables
        this.testUnitKeys = [...tests.keys()];
        this.testOnly = testOnly;
        this.testFew = testFew;
        this.testAllAny = testAllAny;
        this.optionalKeys = optionalKeys;
        this.testCollection = tests;
        // the input object to test
        this.inputObject = inputVal;
    }

    handleUnitTest() {
        switch (true) {
            case this.testAllAny:
                // '{any: type}' // any key
                return this.testObjAllAny();
            case !isEmpty(this.testFew):
                // '{key1: type, any: type}'; // specific key, and all other "any"
                // test the testFew fist so that we can remove them from the inputObject
                /* eslint-disable-next-line */
                const testFewResults = this.testObjFew();
                // remove the testFew from the inputObject
                this.filterOutFew();
                return testFewResults && this.testObjAllAny();
            case !isEmpty(this.optionalKeys):
                // '{key1?: type, key2?: type}'; // optional keys
                // test the optionalKeys fist so that we can remove them from the inputObject
                /* eslint-disable-next-line */
                const optionalKeysResults = this.testObjOptionalKeys();
                // remove the optionalKeys from the inputObject
                this.filterOutOptionalKeys();
                return optionalKeysResults && this.defaultTest();
            case !this.testOnly:
                // '{key1: type, key2: type}'; // all keys
                for (const k in this.inputObject) {
                    if (!this.testCollection.has(k)) {
                        return false;
                    }
                }
                // when testOnly it will bypass this and check only those found in the test collection
                // even if the test value has more keys
                break;
        }

        return this.defaultTest();
    }

    filterOutOptionalKeys() {
        this.testUnitKeys = this.testUnitKeys.filter((item) => !this.optionalKeys.includes(item));
    }

    filterOutFew() {
        this.inputObject = Object.fromEntries(
            Object.entries(this.inputObject).filter(([key]) => !this.testFew.includes(key)),
        );
    }

    testObjOptionalKeys() {
        return this.optionalKeys.every((key) => {
            const test = this.testCollection.get(key);
            const testValue = this.inputObject[key];
            return !testValue ? true : runRouteTest(testValue, test);
        });
    }

    testObjFew() {
        return this.testFew.every((key) => {
            const test = this.testCollection.get(key);
            const testValue = this.inputObject[key];

            return runRouteTest(testValue, test);
        });
    }

    testObjAllAny() {
        return Object.values(this.inputObject).every((value) => {
            return runRouteTest(value, this.testCollection.get('any'));
        });
    }

    defaultTest() {
        return this.testUnitKeys.every((key) => {
            const test = this.testCollection.get(key);
            const testValue = this.inputObject[key];
            return runRouteTest(testValue, test);
        });
    }
}

const runObjectTest = (inputVal, unitTest) => {
    if (!typeOf(inputVal, 'object')) {
        return false;
    }
    return new HandleObjects(inputVal, unitTest).handleUnitTest();
};

function runRouteTest(inputVal, unitTest) {
    const testMethod = unitTest.get('testMethod');
    const tests = unitTest.get('tests');

    switch (testMethod) {
        case 'basic':
            return runBasicTest(inputVal, tests);
        case 'array':
            return runArrayTest(inputVal, tests);
        case 'object':
            return runObjectTest(inputVal, unitTest); // No change here as the entire Map is passed
        default:
            return false;
    }
}

/**
 * Get settings either from an object or a string keyword.
 * @param {Object | string} input - The settings object or keyword for predefined settings.
 * @return {object | null} - The settings object.
 */
function getSettings(input) {
    if (input) {
        if (cachedSettings.has(input)) {
            return cachedSettings.get(input);
        }
        // Check if input is an object
        const type = typeof input;
        let _val = null;
        switch (type) {
            case 'function':
                _val = { callback: input };
                break;
            case 'object':
                _val = input;
                break;
            case 'string':
                switch (input) {
                    case 'log':
                        _val = { log: true };
                        break;
                    case 'fail':
                        _val = { fail: true };
                        break;
                    case 'return':
                        _val = { return: true };
                        break;
                    case 'validOutput':
                        _val = { validOutput: input };
                        break;
                }
                break;
        }
        cachedSettings.set(input, _val);
        return _val;
    }

    return {
        log: false,
        fail: false,
        return: false,
        validOutput: false,
        callback: null,
    };
}

/**
 * Throw an error with the last typeErrorLogs
 */
function typeError() {
    const errorLog = typeErrorLogs[typeErrorLogs.length - 1];
    console.log(typeErrorLogs);
    //clean the array of error logs
    typeErrorLogs.length = 0;
    throw new Error(`Type Error: "${errorLog.value}" is not valid, see log console for details`);
}

/**
* TypeCheck
* @param {string} typeExp
* @param {any} inputVal
* @param {object | string} params Parameters for the typeCheck function. 
* @return {bool | any} TypeChecker By default it returns boolean, but if '.return()' is used it will return the inputVal
* @example typeCheck('number', 1) // true
* @example typeCheck('[number]', [1]) // true
* @example typeCheck('{any: number}', {x: 1, y: 2}) // true
* @example typeCheck('{y: number, x: string}', { x: 'string', y: 10 }, ($this) => {
        console.log('__testLogHere__', $this);
    }) // using call back function
* @usage (stringTypeExpression, anyInputValue, params: object | string)
* @usage params: object = { log: boolean, fail: boolean, callback: function }
* @usage params: string = 'log' | 'fail' | callback: function
* @usage chain Methods: log(), fail(), return() // returns the input value, test() returns the boolean
* @notes This function cannot validate the return value of a function when the validOutput is provided, use _tcx instead
* Params: log = true ; // logs the testData
* Params: fail = true ; // throws an error when the test fails
* Params: return = true ; // returns the inputVal
* Params: callback = function ; // callback function
* @see testUnit for more examples and test cases   
*/
const typeCheck = (typeExp, inputVal, params) => {
    return new (class {
        constructor() {
            this.unitTest = testBuilder(typeExp);
            this.testResult = runRouteTest(inputVal, this.unitTest);
            this.bool = this.testResult;
            this.settings = getSettings(params);
            this.callback = this.settings.callback ?? null;
            this.testData = {
                typeExp,
                inputVal,
                callback: this.callback,
                unitTest: this.unitTest,
                testResult: this.testResult,
            };
            if (this.settings.log) {
                this.log();
            }

            if (this.settings.fail) {
                this.fail();
            }

            if (this.callback) {
                this.callback(this.testData);
            }
        }
        test() {
            return this.testResult;
        }
        log() {
            console.table(this.testData);
            return this;
        }
        fail() {
            if (!this.testResult) {
                return typeError();
            }
            return this;
        }
        return() {
            return inputVal;
        }
    })();
};

/**
* _tc is a helper function to wrap a function with typeCheck
* It is basic but faster the _tcx (neglible but if micro-optimization is needed)
* @param {string} typeExp Expression to test
* @param {function} __function Function to wrap
* @param {object | string} params Parameters for the typeCheck function.
* @return {function} Wrapped function
* @example _tc('[number]', function (myVar) {
        //code
        console.log(myVar);
    });
* @usage (stringTypeExpression, Function(), params: object | string)
* @usage params: object = { log: boolean, fail: boolean, return: boolean, validOutput: string }
* @usage params: string = 'log' | 'fail' | 'return' 
* @notes this function does not accept callback arguments and when using shorthand arguments (string) it does not accept validOutput
* Params: log = true ; // logs the testData
* Params: fail = true ; // throws an error when the test fails
* Params: return = true ; // returns the inputVal
* Params: callback = function ; // callback function
* @see directory test for more information and examples
*/
const _tc = (typeExp, __function, params) => {
    return (...args) => {
        typeCheck(typeExp, args, params);
        return __function(...args);
    };
};

/**
* _tcx is a helper function to wrap a function with typeCheck
* It is as performant as the _tc but it has a lot more features to offer
* @param {string} typeExp Expression to test
* @param {function} __function Function to wrap
* @param {object | string} params Parameters for the typeCheck function. 
* @return {function} Wrapped function
* @example _tcx('[number]', function (myVar) {
        //code
        console.log(myVar);
    });
* @usage (stringTypeExpression, Function(), params: object | string)
* @usage params: object = { log: boolean, fail: boolean, return: boolean, validOutput: stringTypeExpression }
* @usage params: string = 'log' | 'fail' | 'return'
* @notes This function can validate the return value of a function when the validOutput is provided
* @feature Return value validation
* @feature all instances accept individual fail, log, and return
* @feature all instances accept chaining parameters: myCoolFunction(44.5, 'yes!').log().fail().return()
* Params: log = true ; // logs the testData
* Params: fail = true ; // throws an error when the test fails
* Params: return = true ; // returns the inputVal
* Params: callback = function ; // callback function
* Params: validOutput = stringTypeExpression ; // validate the return value of the function
* @see directory test for more information and examples
*/
const _tcx = (typeExp, __function, params) => {
    const $settings = getSettings(params);

    return (...args) => {
        return new (class {
            constructor() {
                this.args = args;
                this.testResults = typeCheck(typeExp, args, $settings);
                return this.default();
            }
            default() {
                this.returns = __function(...args);

                const validOutput = $settings.validOutput ?? false;
                if (validOutput) {
                    typeCheck(validOutput, this.returns, 'fail');
                }
                return this;
            }
            log() {
                this.testResults.log();
                return this;
            }
            fail() {
                this.testResults.fail();
                return this;
            }
            return() {
                return this.returns;
            }
        })();
    };
};

/**
 * validType is a helper function to quick validate a value with a type expression, is a wrapper for typeCheck with less optional arguments
 * @param {string} typeExp Expression to test
 * @param {any} inputVal Value to test
 * @return {bool} isValidType
 * @example validType('[number]', 1) // true
 * @example validType('[number]', 'str') // false - throws exception
 * @usage (stringTypeExpression, anyInputValue)
 * @usage returns boolean
 * @see directory test for more information and examples
 */
const validType = (typeExp, inputVal) => {
    return typeCheck(typeExp, inputVal).fail().test();
};

export { _tc, _tcx, validType, typeCheck as default, typeCheck };
