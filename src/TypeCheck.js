import { typeOf, isEmpty, getDynamicId } from '@knighttower/js-utility-functions';
import { testBuilder } from './TestBuilder';

const typeErrorLogs = [];

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
        this.testUnitKeys = [...unitTest.get('tests').keys()];
        this.testOnly = unitTest.get('testOnly');
        this.testFew = unitTest.get('testFew');
        this.testAllAny = unitTest.get('testAllAny');
        this.optionalKeys = unitTest.get('optionalKeys');
        this.testCollection = unitTest.get('tests');
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
                const testFewResults = this.testObjFew();
                // remove the testFew from the inputObject
                this.filterOutFew();
                return testFewResults && this.testObjAllAny();
            case !isEmpty(this.optionalKeys):
                // '{key1?: type, key2?: type}'; // optional keys
                // test the optionalKeys fist so that we can remove them from the inputObject
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
    switch (unitTest.get('testMethod')) {
        case 'basic':
            return runBasicTest(inputVal, unitTest.get('tests'));
        case 'array':
            return runArrayTest(inputVal, unitTest.get('tests'));
        case 'object':
            return runObjectTest(inputVal, unitTest);
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
        // Check if input is an object
        const type = typeof input;

        switch (type) {
            case 'function':
                return { callback: input };
            case 'object':
                return input;
            case 'string':
                switch (input) {
                    case 'log':
                        return { log: true };
                    case 'fail':
                        return { fail: true };
                }
            default:
                return null;
        }
    }

    return {
        log: false,
        fail: false,
        callback: null,
    };
}

/**
* TypeCheck
* @param {string} typeExp
* @param {any} inputVal
* @param {object | string} params Parameters for the typeCheck function. 
* @return {object} TypeChecker
* @example typeCheck('number', 1) // true
* @example typeCheck('[number]', [1]) // true
* @example typeCheck('{any: number}', {x: 1, y: 2}) // true
* @example typeCheck('{y: number, x: string}', { x: 'string', y: 10 }, ($this) => {
        console.log('__testLogHere__', $this);
    }) // using call back function
* @see testUnit for more examples and test cases   
*/
const typeCheck = (typeExp, inputVal, params) => {
    const unitTest = testBuilder(typeExp);
    const testResult = runRouteTest(inputVal, unitTest);
    const settings = getSettings(params);
    const callback = settings.callback ?? null;
    const testData = {
        typeExp: typeExp,
        inputVal: inputVal,
        callback: callback,
        unitTest: unitTest,
        testResult: testResult,
    };

    if (settings.log) {
        console.table(testData);
    }

    if (settings.fail && !testResult) {
        return typeError();
    }

    if (callback) {
        callback(testData);
    }

    return testResult;
};

function typeError() {
    const errorLog = typeErrorLogs[typeErrorLogs.length - 1];
    throw new Error(`Type Error: "${errorLog.value}" is not valid, see log console for details`);
}

const _tc = (typeExp, __function, params) => {
    return (...args) => {
        const ckeck = typeCheck(typeExp, args, params);
        return __function(...args);
    };
};

const _tcx = (typeExp, __function) => {
    // const ckeck = typeCheck(typeExp, args, params);
    return (...args) => {
        return new (class {
            constructor() {
                this.args = args;
                this.testResults = typeCheck(typeExp, args);
                return this.default();
            }
            default() {
                return __function(...args);
            }
            log() {
                console.log(this.args);
                // return this.hello;
            }
            fail() {
                console.log(this.args);
                // return this.hello;
            }
        })();
    };
};
export { typeCheck, _tc, _tcx, typeCheck as default };
