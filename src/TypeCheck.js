import { typeOf, isEmpty } from '@knighttower/js-utility-functions';
import { testBuilder } from './TestBuilder';

const runBasicTest = (inputVal, tests) => {
    // console.log('basic: ', value, tests);
    return tests.some((test) => test(inputVal));
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
                return this.testObjAllAny();
            case !isEmpty(this.testFew):
                // test the testFew fist so that we can remove them from the inputObject
                const testFewResults = this.testObjFew();
                // remove the testFew from the inputObject
                this.filterOutFew();
                return testFewResults && this.testObjAllAny();
            case !isEmpty(this.optionalKeys):
                // test the optionalKeys fist so that we can remove them from the inputObject
                const optionalKeysResults = this.testObjOptionalKeys();
                // remove the optionalKeys from the inputObject
                this.filterOutOptionalKeys();
                return optionalKeysResults && this.defaultTest();
            case !this.testOnly:
                for (const k in this.inputObject) {
                    if (this.testCollection.has(k)) {
                        return false;
                    }
                }

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

const typeCheck = (typeExp, inputVal) => {
    const unitTest = testBuilder(typeExp);
    // console.log('init', inputVal, unitTest);
    return runRouteTest(inputVal, unitTest);
};

export { typeCheck, typeCheck as default };
