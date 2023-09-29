import { typeOf, isEmpty } from '@knighttower/js-utility-functions';
import { testBuilder } from './TestBuilder';

const runBasicTest = (inputVal, tests) => {
    // console.log('basic: ', value, tests);
    return tests.some((test) => test(inputVal));
};

const runArrayTest = (inputVal, tests) => {
    if (!typeOf(inputVal, 'array')) {
        return false;
    }

    return tests.every((test, index) => {
        // console.log('is array: ', values[index], test);
        return runRouteTest(inputVal[index], test);
    });
};

const runObjectTest = (inputVal, unitTest) => {
    if (!typeOf(inputVal, 'object')) {
        return false;
    }
    // collect the keys from the unitTest
    const testUnitKeys = Object.keys(unitTest.tests);
    // collection of tests for each key
    let testCollection = unitTest.tests;
    // the input object to test
    let inputObject = inputVal;
    // console.table(testCollection);
    // First check if it should test only
    if (!unitTest.testOnly && !isEmpty(unitTest.testFew && !unitTest.testAllAny)) {
        for (const k of testUnitKeys) {
            if (!inputObject[k]) {
                return false;
            }
        }
    } else {
        inputObject = Object.fromEntries(Object.entries(inputObject).filter(([key]) => testUnitKeys.includes(key)));
    }

    return testUnitKeys.every((key) => {
        const test = testCollection[key];
        const testValue = inputObject[key];

        return runRouteTest(testValue, test);
    });
};

function runRouteTest(inputVal, unitTest) {
    switch (unitTest.testMethod) {
        case 'basic':
            return runBasicTest(inputVal, unitTest.tests);
        case 'array':
            return runArrayTest(inputVal, unitTest.tests);
        case 'object':
            return runObjectTest(inputVal, unitTest);
        default:
            return false;
    }
}

const typeCheck = (typeExp, inputVal) => {
    const unitTest = testBuilder(typeExp);
    // console.log('init', value);
    return runRouteTest(inputVal, unitTest);
};

export { typeCheck, typeCheck as default };
