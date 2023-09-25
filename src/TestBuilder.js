import types from './types';
import { emptyOrValue } from '@knighttower/js-utility-functions';
const cache = (window.__typeCheckCache = window.__typeCheckCache || {});

// =========================================
// --> Utility functions
// --------------------------

/**
 * If the type is a union type, split it and return the tests for each type
 * @param {string} str
 * @return {array} tests
 */
const getPipedTypes = (str) => {
    const pipedTypes = str.split('|').map((t) => t.trim());
    const testsForKey = [];
    pipedTypes.forEach((type) => {
        let itCanbeNull = false;
        if (type.endsWith('?')) {
            // remote the '?' from the end
            type = type.slice(0, -1);
            itCanbeNull = true;
        }
        const test = getTypeTests(type);
        if (test) testsForKey.push(test);
        if (itCanbeNull) {
            testsForKey.push(getTypeTests('null'));
            testsForKey.push(getTypeTests('undefined'));
        }
    });
    return testsForKey;
};

/**
 * Get the tests for a type
 * @param {string} type
 * @return {function[]} tests
 * @throws {Error} if type is not supported
 */
const getTypeTests = (type) => {
    const typeObj = types.find((t) => t.type === type);

    if (typeObj) {
        return typeObj.validate;
    }

    throw new Error(`Type "${type}" is not supported`);
};

const getChunks = (str) => {
    let chunks = str.split(',').map((t) => t.trim());
    return chunks.length === 1 && chunks[0] === '' ? [str] : chunks;
};

const determineMethod = (strExp) => {
    const cleanExp = strExp.trim();
    if (startAndEndWith(cleanExp)) {
        return 'array';
    }
    if (startAndEndWith(cleanExp, '{', '}')) {
        return 'object';
    }
    return 'basic';
};

const hasBracket = (strExp, bracket = '[') => {
    return strExp.includes(bracket);
};

const startAndEndWith = (strExp, start = '[', end = ']') => {
    return strExp.startsWith(start) && strExp.endsWith(end);
};

function getRandomInt() {
    return Math.floor(Math.random() * (1000 - 1)) + 1;
}

function findNested(str, startChar = '[', endChar = ']') {
    // Find the last index of '['
    const lastIndex = str.lastIndexOf(startChar);
    // If '[' is not found, return null or some default value
    if (lastIndex === -1) {
        return null;
    }
    // Extract the substring starting from the last '[' to the end
    const substring = str.substring(lastIndex);
    // Find the index of the first ']' in the substring
    const endIndex = substring.indexOf(endChar);
    // If ']' is not found, return null or some default value
    if (endIndex === -1) {
        return null;
    }
    // Extract and return the content between the last '[' and the next ']', including them
    return substring.substring(0, endIndex + 1);
}

/**
 * Get Nested Arrays or Objects
 * @param {string} strExp
 * @param {boolean} isObject
 * @return {array} tests
 */
const getNested = (strExp, isObject = false) => {
    const testsCollected = [];
    const nestedElements = {};

    const loopNested = (objects = false) => {
        let keepLoop = true;
        while (keepLoop) {
            //find any nested arrays or objects
            let matched = objects ? findNested(strExp, '{', '}') : findNested(strExp);

            if (!matched) {
                keepLoop = false;
                break;
            }
            //replace the nested array or object with a marker so that we can safely split the string
            let marker = `__${getRandomInt()}__`;
            nestedElements[marker] = matched;
            strExp = strExp.replace(matched, marker);
        }
    };

    loopNested();
    loopNested(true);

    getChunks(strExp).forEach((chunk, index) => {
        if (isObject) {
            let nestedObjects = {};
            nestedObjects.chunk = chunk;

            for (const key in nestedElements) {
                if (chunk.includes(key)) {
                    let chunkKey = chunk.replace(key, '').trim();
                    nestedObjects.key = emptyOrValue(chunkKey, index);
                    console.table(emptyOrValue('', index));
                    nestedObjects.marker = key;
                    nestedObjects.nested = nestedElements[key];
                    nestedObjects.test = testBuilder(nestedElements[key]);
                    break;
                }
            }

            testsCollected.push(nestedObjects);
        } else {
            testsCollected.push(testBuilder(nestedElements[chunk]));
        }
    });

    return testsCollected;
};

const removeBrackets = (strExp) => {
    const regex = /^(\[|\{)(.*?)(\]|\})$/; // Match brackets at start and end
    const match = strExp.match(regex);

    if (match) {
        return match[2].trim(); // Extract and trim the content between brackets
    }

    return strExp; // Return the original string if no brackets found at start and end
};

// =========================================
// --> Handlers for different types
// --------------------------

/**
 * Basic single types
 * @param {string} typeStr
 * @return {object} tests
 */
const basicTypes = (typeStr) => {
    return getPipedTypes(typeStr);
};

/**
 * Handle object types
 * @param {string} strExp
 * @return {object} tests
 */
const objectTypes = (strExp) => {
    return new (class handleObjects {
        constructor(strExp) {
            this.strExp = removeBrackets(strExp);
            this.testUnit = {
                tests: {},
                optionalKeys: [],
                allowExtraKeys: false,
                testFewAllowOthersAny: false,
                testAllEqual: false,
            };
            if (hasBracket(this.strExp) || hasBracket(this.strExp, '{')) {
                return this.nestedObjects();
            } else {
                return this.basicObject();
            }
        }
        splitKeyAndType(str) {
            return str.split(':').map((t) => t.trim());
        }
        checkOptionalKey(key) {
            if (key.endsWith('?')) {
                key = key.slice(0, -1);
                this.testUnit.optionalKeys.push(key);
            }
            return key;
        }
        basicObject() {
            //Handle basic object
            let chuncks = getChunks(this.strExp);

            // Loop through chunks
            for (let pair of chuncks) {
                const [key, type] = this.splitKeyAndType(pair);

                if (key === 'any') {
                    this.testUnit.testAllEqual = true;
                    this.testUnit.tests.any = getPipedTypes(type);
                    continue;
                }

                let cleanKey = this.checkOptionalKey(key);

                this.testUnit.tests[cleanKey] = getPipedTypes(type);
            }
            return this.testUnit;
        }
        nestedObjects() {
            const nested = getNested(this.strExp, true);
            for (const obj of nested) {
                if (obj.key) {
                    const [key] = this.splitKeyAndType(obj.key);
                    let cleanKey = this.checkOptionalKey(key);
                    this.testUnit.tests[cleanKey] = obj.test;
                } else {
                    let basicObj = objectTypes(obj.chunk);
                    let basicObjKey = Object.keys(basicObj.tests)[0];
                    let basicObjTest = basicObj.tests[basicObjKey];

                    if (basicObj.optionalKeys[0]) {
                        this.testUnit.optionalKeys.push(basicObjKey);
                    }

                    this.testUnit.tests[basicObjKey] = basicObjTest;
                }
            }
            return this.testUnit;
        }
    })(strExp);
};

/**
 * Handle array types
 * @param {string} strExp
 * @return {array} tests
 */
const arrayTypes = (strExp) => {
    let testUnit = [];
    strExp = removeBrackets(strExp);

    if (hasBracket(strExp) || hasBracket(strExp, '{')) {
        testUnit = getNested(strExp);
    } else {
        //Handle basic type
        // Split the types by comma
        // Loop through each type and get the testUnit
        getChunks(strExp).forEach((type) => {
            //case for single type
            testUnit = getPipedTypes(type);
        });
    }

    return testUnit;
};

function testBuilder(strExp) {
    if (cache[strExp]) {
        return cache[strExp];
    }

    let testUnit = {
        testMethod: null,
        tests: null,
    };

    testUnit.testMethod = determineMethod(strExp);

    if (testUnit.testMethod === 'basic') {
        testUnit.tests = basicTypes(strExp);
    } else if (testUnit.testMethod === 'array') {
        testUnit.tests = arrayTypes(strExp);
    } else if (testUnit.testMethod === 'object') {
        testUnit = Object.assign({}, testUnit, objectTypes(strExp));
    } else {
        throw new Error(`Type E "${strExp}" is not supported`);
    }

    cache[strExp] = testUnit;

    return testUnit;
}

export { testBuilder, testBuilder as default, getTypeTests };
