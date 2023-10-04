// @vitest-environment jsdom
import { test } from 'vitest';
import { typeCheck, _tc, _tcx } from '../src/TypeCheck';
import assert from 'assert';

// typeCheck('[number, {y: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]);
// if (typeCheck('[string]', [1])) {
//     console.log(3);
// }
// if (typeCheck('[number]', [1])) {
//     console.log(66);
// }
// console.log(typeCheck('[number]', [1], { log: true }));
// console.log(typeCheck('[number]', [1], 'log'));

// console.log(typeCheck('[number]', [1], 'fail'));
// console.log(typeCheck('[number]', [1], { fail: true }));

// console.log(typeCheck('[number]', [1], { fail: true, log: true }));
// console.log(typeCheck('[number]', [1], { fail: true, log: true, callback: () => {} }));
// console.log(
//     typeCheck('[number]', [1], {
//         fail: true,
//         log: true,
//         callback: () => {
//             console.log('__testLogHere__');
//         },
//     }),
// );
let myCoolFunction;
// myCoolFunction = _tc('[number, number]', function (myVar, hello) {
//     //code
//     console.log(myVar, hello);
// });

// myCoolFunction(44.5, 'hello');

myCoolFunction = _tcx('[number, number]', function (myVar, hello) {
    //code
    console.log(hello);
    return hello;
});
myCoolFunction(44.5, 'yes!'); //logs yes!
myCoolFunction(44.5, 'dude!').fail(); //logs dude! and then triggers failure
myCoolFunction(44.5, 'wow!').log(); //logs wow! and then triggers log
// myCoolFunction(44.5, 'yes').test(); // logs hello and then does something else

// Test for basic types
// test('basic Type', () => {
//     assert.equal(typeCheck('number', 1), true);
//     assert.equal(typeCheck('number', 'str'), false);
//     assert.equal(typeCheck('string', 'str'), true);
//     assert.equal(typeCheck('string | null', 1), false);
//     assert.equal(typeCheck('string | null', null), true);
//     assert.equal(typeCheck('string?', null), true);
//     assert.equal(typeCheck('string?', undefined), true);
//     assert.equal(typeCheck('string?', 1), false);
//     assert.equal(typeCheck('number?', 2), true);
//     assert.equal(typeCheck('float', 1.2), true);
//     assert.equal(typeCheck('float', 1), false);
//     assert.equal(typeCheck('float', 'str'), false);
//     assert.equal(typeCheck('boolean', true), true);
//     assert.equal(typeCheck('object', {}), true);
//     assert.equal(typeCheck('object', []), false);
//     assert.equal(typeCheck('array', []), true);
//     assert.equal(typeCheck('array', {}), false);
//     assert.equal(typeCheck('null', null), true);
//     assert.equal(typeCheck('date', new Date()), true);
//     assert.equal(typeCheck('date', 'str'), false);
//     assert.equal(typeCheck('int', 1), true);
//     assert.equal(typeCheck('int', 1.2), false);
//     assert.equal(typeCheck('int', 'str'), false);
//     assert.equal(typeCheck('bigInt', 1), false);
//     assert.equal(typeCheck('bigInt', 1n), true);
//     assert.equal(typeCheck('map', new Map()), true);
//     assert.equal(typeCheck('map', {}), false);
//     assert.equal(typeCheck('promise', new Promise(() => {})), true);
//     assert.equal(typeCheck('promise', {}), false);
//     assert.equal(typeCheck('regExp', new RegExp()), true);
//     assert.equal(typeCheck('regExp', {}), false);
//     assert.equal(typeCheck('set', new Set()), true);
//     assert.equal(typeCheck('set', {}), false);
//     assert.equal(
//         typeCheck('function', () => {}),
//         true,
//     );
// });

// // Test for array types
// test('Array Type: [number]', () => {
//     assert.equal(typeCheck('[number]', [1]), true);
//     assert.equal(typeCheck('[number]', ['str']), false);
//     assert.equal(typeCheck('[number, string]', [1, 'str']), true);
//     assert.equal(typeCheck('[number, number, string]', [1, 3, null]), false);
//     assert.equal(typeCheck('[number, {any: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]), false);
//     assert.equal(typeCheck('[number, {any: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]), false);
//     assert.equal(typeCheck('[number, {any: number, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]), true);
// });

// // test objects

// test('objects', () => {
//     assert.equal(typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10 }), true);
//     assert.equal(typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10, z: 20 }), true);
//     assert.equal(typeCheck('{x: string, y: number, z: number?}', { x: 'string', y: 10, z: 'str' }), false);
//     assert.equal(typeCheck('{x: string, y: number, ...}', { x: 'string', y: 10, z: 20 }), true);
// });

// // create tests for {key1: type}
// test('objects: {key: type}', () => {
//     assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 10 }), true);
//     assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 'str' }), false);
//     assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 10, z: 20 }), false);
//     assert.equal(typeCheck('{x: string, y: number, ...}', { x: 'string', y: 10, z: 'str' }), true);
//     assert.equal(typeCheck('{x: string, y: number, any: number}', { x: 'string', y: 10, z: 20 }), true);
// });

// // create tests for {key1: type, key2: type}
// test('objects: {key: type, key: type}', () => {
//     assert.equal(typeCheck('{x: string|number, y: number}', { x: 2, y: 10 }), true);
//     assert.equal(typeCheck('{x: string, y: number|null}', { x: 'string', y: 'str' }), false);
//     assert.equal(typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10, z: 20 }), true);
//     assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 10, z: 'str' }), false);
// });
