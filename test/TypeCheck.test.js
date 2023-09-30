// @vitest-environment jsdom
import { test } from 'vitest';
import { typeCheck } from '../src/TypeCheck';
import assert from 'assert';

// console.log('______TEST______', typeCheck('number', 'string'));
// console.log('______TEST______', typeCheck('[number, number, string]', [1, 3, null]));

// console.log(
//     '______TEST______',
//     typeCheck('[number, {any: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]),
// );

// console.log('______TEST______', typeCheck('[number, {any: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]));

// console.log(
//     '______TEST______',
//     typeCheck('[number, {y: number, x: string, any: number}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]),
// );
// typeCheck('[number, {y: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]);
// console.log(
//     '______TEST______',
//     typeCheck('[number, {any: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]),
// );
// console.log('______TEST______', typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10 }));
// Test for basic types
test('basic Type: number', () => {
    // const { testMethod, tests } = testBuilder('number');
    // assert(testMethod === 'basic');
    // assert.equal(tests.length, 1);
    // assert(tests[0] === getTypeTests('number'));
});

// test('basic Type: null', () => {
//     const { testMethod, tests } = testBuilder('null');

//     assert(testMethod === 'basic');
//     assert.equal(tests.length, 1);
//     assert(tests[0] === getTypeTests('null'));
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
//     // console.log(tests);
//     assert(tests[0].tests[0](1) === true);
//     assert(tests[0].tests[0]('str') === false);
// });

// test('Array Type: [number?]', () => {
//     const { testMethod, tests } = testBuilder('[number?]');
//     assert(testMethod === 'array');
//     assert(tests[0].tests[0](1) === true);
//     assert(tests[0].tests[0]('str') === false);
//     assert(tests[0].tests[1](null) === true);
// });

// test('Array Type: [number | string]', () => {
//     const { testMethod, tests } = testBuilder('[number | string]');
//     assert(testMethod === 'array');
//     assert(tests[0].tests.some((test) => test(1)));
//     assert(tests[0].tests.some((test) => test('str')));
//     assert(!tests[0].tests.every((test) => test(null)));
// });

// test('Array Type: [number | string, null]', () => {
//     const { testMethod, tests } = testBuilder('[number | string, null]');
//     assert(testMethod === 'array');
//     assert(tests[0].tests.some((test) => test(1)));
//     assert(tests[0].tests.some((test) => test('str')));
//     assert(!tests[0].tests.every((test) => test(null)));
//     assert(tests[1].tests.every((test) => test(null)));
// });

// test('Nester Array Type: [[number], [null]]', () => {
//     const { testMethod, tests } = testBuilder('[[number], [null | string]]');
//     assert(testMethod === 'array');
//     // console.log(tests[0].tests);
//     assert(tests[0].tests[0].tests.some((test) => test(1)));
//     assert(tests[1].tests[0].tests.some((test) => test('str')));
//     assert(!tests[1].tests[0].tests.every((test) => test(1)));
//     assert(!tests[0].tests[0].tests.every((test) => test(null)));
// });

// // =========================================
// // --> OBJECTS
// // --------------------------

// test('Object Type: {any: number}', () => {
//     const { testMethod, tests } = testBuilder('{any: number}');
//     // console.log('__testLogHere__', tests.any);
//     assert(testMethod === 'object');
//     assert('any' in tests);
//     assert(tests.any.tests[0](1) === true);
//     assert(tests.any.tests[0]('str') === false);
// });

// test('Object Type: {x: number}', () => {
//     const { testMethod, tests } = testBuilder('{x: number}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.x.tests[0](1) === true);
//     assert(tests.x.tests[0]('str') === false);
// });
// // create test for {x: number?}
// test('Object Type: {x: number?}', () => {
//     const { testMethod, tests } = testBuilder('{x: number?}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.x.tests[0](1) === true);
//     assert(tests.x.tests[0]('str') === false);
//     assert(tests.x.tests[1](null) === true);
// });

// // create test for {x?: number?}
// test('Object Type: {x?: number?}', () => {
//     const { testMethod, tests } = testBuilder('{x?: number?}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.x.tests[0](1) === true);
//     assert(tests.x.tests[0]('str') === false);
//     assert(tests.x.tests[1](null) === true);
// });

// // create test for {x: number, y: string}
// test('Object Type: {x: number, y: string}', () => {
//     const { testMethod, tests } = testBuilder('{x: number, y: string}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert('y' in tests);
//     assert(tests.x.tests[0](1) === true);
//     assert(tests.x.tests[0]('str') === false);
//     assert(tests.y.tests[0]('str') === true);
//     assert(tests.y.tests[0](1) === false);
// });

// // create test for {x: number, y: string | number}
// test('Object Type: {x: number, y: string | number}', () => {
//     const { testMethod, tests } = testBuilder('{x: number, y: string | number}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert('y' in tests);
//     assert(tests.x.tests[0](1) === true);
//     assert(tests.x.tests[0]('str') === false);
//     assert(tests.y.tests.some((test) => test('str')));
//     assert(tests.y.tests.some((test) => test(1)));
// });

// // create test for {x: number, y: string | number, z: null}
// test('Object Type: {x: number, y: string | number, z: null}', () => {
//     const { testMethod, tests } = testBuilder('{x: number, y: string | number, z: null}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert('y' in tests);
//     assert('z' in tests);
//     assert(tests.x.tests[0](1) === true);
//     assert(tests.x.tests[0]('str') === false);
//     assert(tests.y.tests.some((test) => test('str')));
//     assert(tests.y.tests.some((test) => test(1)));
//     assert(tests.z.tests.some((test) => test(null)));
// });

// test('Nested Object in object: {{x: number}, {y: number}}', () => {
//     const { testMethod, tests } = testBuilder('{{x: number}, {y: number}}');
//     assert(testMethod === 'object');
//     // console.table(tests);
//     assert(tests[1].testMethod === 'object');
//     assert('y' in tests[1].tests);
//     assert(tests[1].tests.y.tests[0](1) === true);
//     assert(tests[1].tests.y.tests[0]('str') === false);
// });

// // create test for {z: [number], x: string}
// test('Object Type: {z: [number], x: string}', () => {
//     const { testMethod, tests } = testBuilder('{z: [number], x: string}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');
//     assert('x' in tests);
//     assert(tests.z.testMethod === 'array');
//     assert(tests.x.tests[0]('str') === true);
// });

// // create test for [{x: number}]
// test('Array with objects Type: [{x: number}]', () => {
//     const { testMethod, tests } = testBuilder('[{x: number}]');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'array');
//     assert(tests[0].testMethod === 'object');
//     assert('x' in tests[0].tests);
//     assert(tests[0].tests.x.tests[0](1) === true);
//     assert(tests[0].tests.x.tests[0]('str') === false);
// });
// // create a test for [{x: number}, {y: number}]
// test('Array Type: [{x: number}, {y: number}]', () => {
//     const { testMethod, tests } = testBuilder('[{x: number}, {y: number}]');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'array');
//     assert(tests[0].testMethod === 'object');
//     assert('x' in tests[0].tests);
//     assert(tests[0].tests.x.tests[0](1) === true);
//     assert(tests[0].tests.x.tests[0]('str') === false);
//     assert(tests[1].testMethod === 'object');
//     assert('y' in tests[1].tests);
//     assert(tests[1].tests.y.tests[0](1) === true);
//     assert(tests[1].tests.y.tests[0]('str') === false);
// });

// test('Object Type: {key1: number | string, ...}', () => {
//     const { testMethod, tests } = testBuilder('{key1: number | string, ...}');
//     // console.log('__testLogHere__', tests);
//     assert(testMethod === 'object');

//     assert('key1' in tests);
//     assert(tests.key1.tests[0](1) === true);
//     assert(tests.key1.tests[1]('str') === true);
// });
