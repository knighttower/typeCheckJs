// @vitest-environment jsdom
import { test } from 'vitest';
import { typeCheck, _tc, _tcx, validType, addTypeTest } from '../src/TypeCheck';
import assert from 'assert';

const benchmark = (name, fn, iterations) => {
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
        fn();
    }

    const end = performance.now();

    console.log(`${name}: ${(end - start).toFixed(3)}ms`);
};

const recordsTotest = 100;
// Benchmark the _tc function with 100 records
benchmark(
    '_tc',
    () => {
        const typeExp = ['number'];
        const __function = (x) => x + 1;
        const params = {};

        const tc = _tc(typeExp, __function, params);

        const records = [];
        for (let i = 0; i < 10; i++) {
            records.push(i);
        }

        tc(records);
    },
    recordsTotest,
);

// Benchmark the _tcx function with 10 records
benchmark(
    '_tcx',
    () => {
        const typeExp = ['number'];
        const __function = (x) => x + 1;
        const params = {};

        const tcx = _tcx(typeExp, __function, params);

        const records = [];
        for (let i = 0; i < 10; i++) {
            records.push(i);
        }

        tcx(records);
    },
    recordsTotest,
);

addTypeTest('customTypeTest', function (x) {
    return typeof x === 'number';
});
if (typeCheck('[customTypeTest]', [1]).test()) {
    console.log(999);
}

typeCheck('[number, {y: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]).test();
if (typeCheck('[string]', [1]).test()) {
    console.log(3);
}
if (typeCheck('[number]', [1]).test()) {
    console.log(66);
}
console.log(typeCheck('[number]', [1], { log: true }).return());
console.log(typeCheck('[number]', [1], 'log').test());
console.log(typeCheck('[number]', [1]).log());

console.log(typeCheck('[number]', [1], 'fail'));
console.log(typeCheck('[number]', [1], { fail: true }));

console.log(typeCheck('[number]', [1], { fail: true, log: true }));
console.log(typeCheck('[number]', [1], { fail: true, log: true, return: true, callback: () => {} }));
console.log(
    typeCheck('[number]', [1], {
        fail: true,
        log: true,
        callback: () => {
            console.log('__testLogHere__');
        },
    }),
);

console.log(typeCheck('[number]', [1]).return()); // returns [1], the inputValue

let myCoolFunction;
myCoolFunction = _tc('[number, number]', function (myVar, hello) {
    //code
    console.log(myVar, hello);
    return 1000;
});

myCoolFunction(44.5, 'hello');

myCoolFunction = _tcx(
    '[number, number]',
    function (myVar, hello) {
        //code
        return [myVar, hello];
    },
    { validOutput: '[number, string]' },
);
console.log(myCoolFunction(44.5, 'yes!').return()); //gets the return value of the function
myCoolFunction(44.5, 'dude!'); //logs dude! and then triggers failure
myCoolFunction(44.5, 'wow!'); //logs wow! and then triggers log
myCoolFunction(44.5, 'nooo').log(); // logs hello and then does something else

console.log(validType('[number]', [1]));

// Test for array types
test('Array Type: [number]', () => {
    assert.equal(typeCheck('[number]', [1]).test(), true);
    assert.equal(typeCheck('[number]', ['str']).test(), false);
    assert.equal(typeCheck('[number, string]', [1, 'str']).test(), true);
    assert.equal(typeCheck('[number, number, string]', [1, 3, null]).test(), false);
    assert.equal(
        typeCheck('[number, {any: string, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]).test(),
        false,
    );
    assert.equal(typeCheck('[number, {any: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]).test(), false);
    assert.equal(
        typeCheck('[number, {any: number, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]).test(),
        true,
    );
});

// test objects

test('objects', () => {
    assert.equal(typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10 }).test(), true);
    assert.equal(typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10, z: 20 }).test(), true);
    assert.equal(typeCheck('{x: string, y: number, z: number?}', { x: 'string', y: 10, z: 'str' }).test(), false);
    assert.equal(typeCheck('{x: string, y: number, ...}', { x: 'string', y: 10, z: 20 }).test(), true);
});

// create tests for {key1: type}
test('objects: {key: type}', () => {
    assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 10 }).test(), true);
    assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 'str' }).test(), false);
    assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 10, z: 20 }).test(), false);
    assert.equal(typeCheck('{x: string, y: number, ...}', { x: 'string', y: 10, z: 'str' }).test(), true);
    assert.equal(typeCheck('{x: string, y: number, any: number}', { x: 'string', y: 10, z: 20 }).test(), true);
});

// create tests for {key1: type, key2: type}
test('objects: {key: type, key: type}', () => {
    assert.equal(typeCheck('{x: string|number, y: number}', { x: 2, y: 10 }).test(), true);
    assert.equal(typeCheck('{x: string, y: number|null}', { x: 'string', y: 'str' }).test(), false);
    assert.equal(typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10, z: 20 }).test(), true);
    assert.equal(typeCheck('{x: string, y: number}', { x: 'string', y: 10, z: 'str' }).test(), false);
});
