const types = [
    {
        type: 'number',
        validate: function (_var_) {
            return typeof _var_ === 'number' && isFinite(_var_);
        },
    },
    {
        type: 'int',
        validate: function (_var_) {
            return !isNaN(_var_) && _var_ % 1 === 0;
        },
    },
    {
        type: 'float',
        validate: function (_var_) {
            return typeof _var_ === 'number' && isFinite(_var_) && _var_ % 1 !== 0;
        },
    },
    {
        type: 'date',
        validate: function (_var_) {
            return _var_ instanceof Date && !isNaN(_var_.getTime());
        },
    },
    {
        type: 'object',
        validate: function (_var_) {
            return _var_ !== null && typeof _var_ === 'object' && !Array.isArray(_var_);
        },
    },
    {
        type: 'string',
        validate: function (_var_) {
            return typeof _var_ === 'string';
        },
    },
    {
        type: 'boolean',
        validate: function (_var_) {
            return typeof _var_ === 'boolean';
        },
    },
    {
        type: 'function',
        validate: function (_var_) {
            return typeof _var_ === 'function';
        },
    },
    {
        type: 'null',
        validate: function (_var_) {
            return _var_ === null;
        },
    },
    {
        type: 'undefined',
        validate: function (_var_) {
            return typeof _var_ === 'undefined';
        },
    },
    {
        type: 'regExp',
        validate: function (_var_) {
            return _var_ instanceof RegExp;
        },
    },
    {
        type: 'symbol',
        validate: function (_var_) {
            return typeof _var_ === 'symbol';
        },
    },
    {
        type: 'bigInt',
        validate: function (_var_) {
            return typeof _var_ === 'bigint';
        },
    },
    {
        type: 'set',
        validate: function (_var_) {
            return _var_ instanceof Set;
        },
    },
    {
        type: 'map',
        validate: function (_var_) {
            return _var_ instanceof Map;
        },
    },
    {
        type: 'array',
        validate: function (_var_) {
            return Array.isArray(_var_);
        },
    },
    {
        type: 'promise',
        validate: function (_var_) {
            return _var_ instanceof Promise;
        },
    },
    {
        type: 'weakMap',
        validate: function (_var_) {
            return _var_ instanceof WeakMap;
        },
    },
    {
        type: 'weakSet',
        validate: function (_var_) {
            return _var_ instanceof WeakSet;
        },
    },
];

export { types, types as default };
