import { testBuilder } from './TestBuilder';
const runSingleTests = (value, tests) => {
    return tests.some((test) => test(value));
};

const runArrayTests = (value, tests) => {
    if (!Array.isArray(value)) {
        return false;
    }

    for (let i = 0; i < value.length; i++) {
        const element = value[i];
        const testsForIndex = tests[i.toString()] || tests['any'];

        if (!testsForIndex.some((test) => test(element))) {
            return false;
        }
    }

    return true;
};

const runObjectTests = (value, tests, optionalKeys, allowExtraKeys) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const keys = Object.keys(value);

    for (const key of keys) {
        if (!tests.hasOwnProperty(key)) {
            if (allowExtraKeys) {
                continue;
            }
            return false;
        }

        const testsForKey = tests[key];
        if (!testsForKey.some((test) => test(value[key]))) {
            return false;
        }
    }

    for (const key in tests) {
        if (!optionalKeys.includes(key) && !keys.includes(key)) {
            return false;
        }
    }

    return true;
};

const typeCheck = (typeStr, value) => {
    const { testMethod, tests, optionalKeys, allowExtraKeys } = testBuilder(typeStr);

    switch (testMethod) {
        case 'single':
            return runSingleTests(value, tests);
        case 'array':
            return runArrayTests(value, tests);
        case 'object':
            return runObjectTests(value, tests, optionalKeys, allowExtraKeys);
        default:
            return false;
    }
};

export { typeCheck, typeCheck as default };
