import { typeOf } from '@knighttower/js-utility-functions';

export const types = {
    array: {
        type: 'array',
        validate: (_var_) => typeOf(_var_, 'array'),
    },

    bigInt: {
        type: 'bigInt',
        validate: (_var_) => typeof _var_ === 'bigint',
    },
    boolean: {
        type: 'boolean',
        validate: (_var_) => typeof _var_ === 'boolean',
    },
    date: {
        type: 'date',
        validate: (_var_) => _var_ instanceof Date,
    },
    float: {
        type: 'float',
        validate: (_var_) => typeof _var_ === 'number' && !Number.isInteger(_var_),
    },
    function: {
        type: 'function',
        validate: (_var_) => typeof _var_ === 'function',
    },
    int: {
        type: 'int',
        validate: (_var_) => Number.isInteger(_var_),
    },
    map: {
        type: 'map',
        validate: (_var_) => _var_ instanceof Map,
    },
    null: {
        type: 'null',
        validate: (_var_) => _var_ === null,
    },
    number: {
        type: 'number',
        validate: (_var_) => typeof _var_ === 'number',
    },
    object: {
        type: 'object',
        validate: (_var_) => typeOf(_var_, 'object'),
    },
    promise: {
        type: 'promise',
        validate: (_var_) => _var_ instanceof Promise,
    },
    regExp: {
        type: 'regExp',
        validate: (_var_) => _var_ instanceof RegExp,
    },
    set: {
        type: 'set',
        validate: (_var_) => _var_ instanceof Set,
    },
    string: {
        type: 'string',
        validate: (_var_) => typeof _var_ === 'string',
    },
    symbol: {
        type: 'symbol',
        validate: (_var_) => typeof _var_ === 'symbol',
    },
    undefined: {
        type: 'undefined',
        validate: (_var_) => typeof _var_ === 'undefined',
    },
    weakMap: {
        type: 'weakMap',
        validate: (_var_) => _var_ instanceof WeakMap,
    },
    weakSet: {
        type: 'weakSet',
        validate: (_var_) => _var_ instanceof WeakSet,
    },
};
