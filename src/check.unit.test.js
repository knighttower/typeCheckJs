/**
 * @vitest-environment jsdom
 */
import { test } from 'vitest';
import { types } from './types';
import { testBuilder, getTypeTests } from './TestBuilder';
import { typeCheck } from './TypeCheck';
import assert from 'assert';

// // Test testBuilder function
// test('testBuilder with basic type', (t) => {
//     const basicTypeTest = testBuilder('number');
//     assert(basicTypeTest.testMethod === 'basic');
// });

// // Test for basic types
// test('basic Type: number', () => {
//     const { testMethod, tests } = testBuilder('number');

//     assert(testMethod === 'basic');
//     assert.equal(tests.length, 1);
//     assert(tests[0] === getTypeTests('number'));
// });

// test('basic Type: string', () => {
//     const { testMethod, tests } = testBuilder('string');
//     assert(testMethod === 'basic');
//     assert(tests.length === 1);
//     assert(tests[0]('str') === true);
//     assert(tests[0](1) === false);
// });

// // Test for union types
// test('Union Type: number | string', () => {
//     const { testMethod, tests } = testBuilder('number | string');
//     assert(testMethod === 'basic');
//     assert(tests.length === 2);
//     assert(tests.some((test) => test(1)));
//     assert(tests.some((test) => test('str')));
//     assert(!tests.every((test) => test(null)));
// });

// // Test for optional types
// test('Optional Type: number?', () => {
//     const { testMethod, tests } = testBuilder('number?');
//     assert(testMethod === 'basic');
//     assert(tests.length === 3); // number, null, undefined
//     assert(tests.some((test) => test(null)));
//     assert(tests.some((test) => test(undefined)));
//     assert(!tests.every((test) => test('str')));
// });

// // =========================================
// // --> ARRAY TESTS
// // --------------------------

// // Test for array types
// test('Array Type: [number]', () => {
//     const { testMethod, tests } = testBuilder('[number]');
//     assert(testMethod === 'array');
//     assert(tests[0][0](1) === true);
//     assert(tests[0][0]('str') === false);
// });

// test('Array Type: [number?]', () => {
//     const { testMethod, tests } = testBuilder('[number?]');
//     assert(testMethod === 'array');
//     assert(tests[0][0](1) === true);
//     assert(tests[0][0]('str') === false);
//     assert(tests[0][1](null) === true);
// });

// test('Array Type: [number | string]', () => {
//     const { testMethod, tests } = testBuilder('[number | string]');
//     assert(testMethod === 'array');
//     assert(tests[0].some((test) => test(1)));
//     assert(tests[0].some((test) => test('str')));
//     assert(!tests[0].every((test) => test(null)));
// });

// test('Array Type: [number | string, null]', () => {
//     const { testMethod, tests } = testBuilder('[number | string, null]');
//     assert(testMethod === 'array');
//     assert(tests[0].some((test) => test(1)));
//     assert(tests[0].some((test) => test('str')));
//     assert(!tests[0].every((test) => test(null)));
//     assert(tests[1].every((test) => test(null)));
// });

// test('Nester Array Type: [[number], [null]]', () => {
//     const { testMethod, tests } = testBuilder('[[number], [null | string]]');
//     assert(testMethod === 'array');
//     console.log(tests[0].tests);
//     assert(tests[0].tests.some((test) => test(1)));
//     assert(tests[1].tests.some((test) => test('str')));
//     assert(!tests[1].tests.every((test) => test(1)));
//     assert(!tests[0].tests.every((test) => test(null)));
// });

// // =========================================
// // --> OBJECTS
// // --------------------------

// test('Object Type: {any: number}', () => {
//     const { testMethod, tests } = testBuilder('{any: number}');
//     console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('any' in tests);
//     assert(tests.any[0](1) === true);
//     assert(tests.any[0]('str') === false);
// });

// test('Object Type: {x: number}', () => {
//     const { testMethod, tests } = testBuilder('{x: number}');
//     console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.x[0](1) === true);
//     assert(tests.x[0]('str') === false);
// });

// test('Object Type: {x: number?}', () => {
//     const { testMethod, tests } = testBuilder('{x: number?}');
//     console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.x[0](1) === true);
//     assert(tests.x[0]('str') === false);
// });

// test('Object Type: {x?: number?}', () => {
//     const { testMethod, tests } = testBuilder('{x?: number?}');
//     console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.x[0](1) === true);
//     assert(tests.x[0]('str') === false);
// });

// test('Object Type: {x: number}', () => {
//     const { testMethod, tests } = testBuilder('{x: number, y: string}');
//     console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert('y' in tests);
//     assert(tests.x[0](1) === true);
//     assert(tests.x[0]('str') === false);
//     assert(tests.y[0]('str') === true);
//     assert(tests.y[0](1) === false);
// });

// test('Object Type: {x: number}', () => {
//     const { testMethod, tests } = testBuilder('{x: number, y: string | number}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert('y' in tests);
//     assert(tests.x[0](1) === true);
//     assert(tests.x[0]('str') === false);

//     assert(tests.y.some((test) => test(1)));
//     assert(tests.y.some((test) => test('str')));
// });

// // // Test for nested array in object
// test('Nested Array in Object: {z: [number], x: string}', () => {
//     const { testMethod, tests } = testBuilder('{z: [number], x: string}');

//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.z.testMethod === 'array');
//     assert(tests.x[0]('str') === true);
// });

// // Test for nested object in array
// test('Nested Object in Array: [{x: number}]', () => {
//     const { testMethod, tests } = testBuilder('[{x: number}]');
//     assert(testMethod === 'array');

//     assert(tests[0].testMethod === 'object');
//     assert('x' in tests[0].tests);
//     assert(tests[0].tests.x[0](1) === true);
//     assert(tests[0].tests.x[0]('str') === false);
// });

// // Test for nested object in array
// test('Nested Object in Array: [{x: number}, {y: number}]', () => {
//     const { testMethod, tests } = testBuilder('[{x: number}, {y: number}]');
//     assert(testMethod === 'array');

//     assert(tests[1].testMethod === 'object');
//     assert('y' in tests[1].tests);
//     assert(tests[1].tests.y[0](1) === true);
//     assert(tests[1].tests.y[0]('str') === false);
// });

test('Nested Object in object: {{x: number}, {y: number}}', () => {
    const { testMethod, tests } = testBuilder('{{x: number}, {y: number}}');
    assert(testMethod === 'object');
    console.table(tests);
    assert(tests[1].testMethod === 'object');
    assert('y' in tests[1].tests);
    assert(tests[1].tests.y[0](1) === true);
    assert(tests[1].tests.y[0]('str') === false);
});

// Add more tests to cover more edge cases and complex structures

// // basic Types
// test('number', () => {
//     assert(typeCheck('number', 1) === true);
// });

// test('not number', () => {
//     assert(typeCheck('number', 'str') === false);
// });

// test('number or null', () => {
//     assert(typeCheck('number?', null) === true);
// });

// test('number or string', () => {
//     assert(typeCheck('number | string', 2) === true);
// });

// // Array Types
// test('array of numbers', () => {
//     assert(typeCheck('[number]', [1, 2, 3]) === true);
// });

// test('not array of numbers', () => {
//     assert(typeCheck('[number]', [1, 'str', 3]) === false);
// });

// test('array of numbers or strings', () => {
//     assert(typeCheck('[number | string]', [1, 'str', 3]) === true);
// });

// test('array of number and string', () => {
//     assert(typeCheck('[number, string]', [1, 'str']) === true);
// });

// // Array of Objects
// test('array of objects', () => {
//     assert(typeCheck('[{x: number}]', [{ x: 1 }, { x: 2 }]) === true);
// });

// test('array of objects with number or string', () => {
//     assert(typeCheck('[{x: number | string}]', [{ x: 1 }, { x: 'str' }]) === true);
// });

// // Object Types
// test('object', () => {
//     assert(typeCheck('{x: number}', { x: 1 }) === true);
// });

// test('object with multiple keys', () => {
//     assert(typeCheck('{x: number, y: string}', { x: 1, y: 'str' }) === true);
// });

// test('object with optional key', () => {
//     assert(typeCheck('{x: number, y:? string}', { x: 1 }) === true);
// });

// test('object with extra keys', () => {
//     assert(typeCheck('{x: number, ...}', { x: 1, y: 'str' }) === true);
// });

// // Object with Array
// test('object with array', () => {
//     assert(typeCheck('{x: [number]}', { x: [1, 2, 3] }) === true);
// });

// test('object with array of number or string', () => {
//     assert(typeCheck('{x: [number | string]}', { x: [1, 'str', 3] }) === true);
// });
