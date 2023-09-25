import { types, defaultType } from './types';

function any(fn, arr) {
    return arr.some(fn);
}

function all(fn, arr) {
    return arr.every(fn);
}

// Functions to check various types of structures
function checkArray(input, type, options) {
    return all(function (it) {
        return checkMultiple(it, type.of, options);
    }, input);
}

function checkMultiple(input, types, options) {
    if (Object.prototype.toString.call(types).slice(8, -1) !== 'Array') {
        throw new Error('Types must be in an array. Input: ' + input + '.');
    }
    return any(function (it) {
        return check(input, it, options);
    }, types);
}

function checkTuple(input, type, options) {
    let i, len, types;
    i = 0;
    for (i = 0, len = type.of.length; i < len; i++) {
        types = type.of[i];
        if (!checkMultiple(input[i], types, options)) {
            return false;
        }
    }
    return input.length <= i;
}

function checkFields(input, type, options) {
    let inputKeys, numInputKeys, numOfKeys, key, types;
    inputKeys = {};
    numInputKeys = 0;
    for (let k in input) {
        inputKeys[k] = true;
        numInputKeys++;
    }
    numOfKeys = 0;
    for (key in type.of) {
        types = type.of[key];
        if (!checkMultiple(input[key], types, options)) {
            return false;
        }
        if (inputKeys[key]) {
            numOfKeys++;
        }
    }
    return type.subset || numInputKeys === numOfKeys;
}

function checkStructure(input, typeObj, options) {
    if (!(input instanceof Object)) {
        return false;
    }
    switch (typeObj.structure) {
        case 'fields':
            return checkFields(input, typeObj, options);
        case 'array':
            return checkArray(input, typeObj, options);
        case 'tuple':
            return checkTuple(input, typeObj, options);
        default:
            return false;
    }
}

function check(input, typeObj, options) {
    let type = typeObj.type || null;
    let structure = typeObj.structure || null;
    let setting;
    if (type) {
        if (type === '*') {
            return true;
        }
        setting = options.customTypes[type] || types[type];
        if (setting) {
            return (
                (typeof setting.typeOf === 'undefined' ||
                    setting.typeOf === Object.prototype.toString.call(input).slice(8, -1)) &&
                setting.validate(input)
            );
        } else {
            return type === Object.prototype.toString.call(input).slice(8, -1);
        }
    } else if (structure) {
        return checkStructure(input, typeObj, options);
    } else {
        throw new Error('No type defined. Input: ' + input + '.');
    }
}

export { check, checkMultiple, checkFields, checkArray, checkTuple, checkStructure, check as default };
