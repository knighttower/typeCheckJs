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
                // =========================================
                // --> TODO
                // --------------------------

                // @TODO here
                return this.testObjFew();
                break;
            case !this.testOnly:
                console.log('testOnly');
                for (const k in this.inputObject) {
                    if (this.testCollection.has(k)) {
                        return false;
                    }
                }

                break;
        }

        return this.defaultTest();
    }

    filterInputObject() {
        this.inputObject = Object.fromEntries(
            Object.entries(this.testCollection).filter(([key]) => this.testFew.includes(key)),
        );
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
    // console.log('init', inputVal);
    return runRouteTest(inputVal, unitTest);
};

export { typeCheck, typeCheck as default };
