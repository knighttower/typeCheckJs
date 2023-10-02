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
 * TypeChecker
 * @private
 * @param {string} typeExp
 * @param {any} inputVal
 * @param {function} callback
 * @return {object} TypeChecker
 */
class TypeChecker {
    constructor(typeExp, inputVal, callback) {
        this.typeExp = typeExp;
        this.inputVal = inputVal;
        this.callback = callback || null;
        this.unitTest = null;
        this.testResult = null;
    }

    runTest() {
        this.unitTest = testBuilder(this.typeExp);
        this.testResult = runRouteTest(this.inputVal, this.unitTest);
        let result = this.testResult;

        // Convert result to a Boolean object if it's a primitive boolean
        if (typeof result === 'boolean') {
            result = new Boolean(result);
        }

        result.log = this.log.bind(this); // Attach the log method
        result.fail = this.fail.bind(this); // Attach the fail method
        if (this.callback) {
            this.callback(this);
        }
        return result;
    }

    log() {
        console.table(this);
    }

    fail() {
        if (this.testResult === false) {
            this.log();
            const errorLog = typeErrorLogs[typeErrorLogs.length - 1];
            throw new Error(`Type Error: "${errorLog.value}" is not valid, see log console for details`);
        }
    }
}

/**
* TypeCheck
* @param {string} typeExp
* @param {any} inputVal
* @param {function} callback 
* @return {object} TypeChecker
* @example typeCheck('number', 1) // true
* @example typeCheck('[number]', [1]) // true
* @example typeCheck('{any: number}', {x: 1, y: 2}) // true
* @example typeCheck('{y: number, x: string}', { x: 'string', y: 10 }, ($this) => {
        console.log('__testLogHere__', $this);
    }).log()
* @see testUnit for more examples and test cases   
*/
const typeCheck = (typeExp, inputVal, callback) => {
    return new TypeChecker(typeExp, inputVal, callback).runTest();
};

export { typeCheck, typeCheck as default };
