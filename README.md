# TypeCheck JS

## A simple type checker for JavaScript

TypeCheck JS is a JavaScript library designed for fast and efficient type checking. Inspired by [gkz/type-check](https://github.com/gkz/type-check), this library aims to overcome the limitations and complexities associated with TypeScript. It offers a lightweight, memory-efficient, and easy-to-use solution for both basic and complex type-checking requirements.

### Installation

#### Via npm

```javascript
npm i @knighttower/type-check-js
```

```javascript
yarn add @knighttower/type-check-js
```

#### In the Browser

Include the following script tag in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@knighttower/type-check-js@latest/dist/typeCheck.min.js"></script>
```

| File             | Size     |
| ---------------- | -------- |
| /typeCheck.js    | 19.1 KiB |
| /typeCheck.js.br | 5.42 KiB |
| /typeCheck.js.gz | 5.89 KiB |

<br/>

## Why TypeCheck JS?

1. **Lightweight**: Adds minimal overhead to your project (only 6k GZip).
2. **Fast Performance**: Optimized for quick type-checking operations.
3. **Ease of Use**: Simple API and intuitive pattern syntax.
4. **No Compile Step**: Works directly in vanilla JavaScript projects without the need for a compilation step.
5. **Complementary**: Can be used alongside TypeScript to check front-end and back-end data types.
6. **Functionality**: Supports callbacks, log and fail functions.
7. **Flexibility**: Supports piped comparisons, optional arguments and keys.
8. **Extensibility**: Supports custom type definitions. (Coming soon)
9. **Tested**: All code used has been fully tested with Vitest Unit tests

## What aims to solve?

TypeCheck JS aims to solve the following problems:

-   All TypeScript type definitions are lost at runtime. Once a library is in production, it is impossible to check the types of the data being passed around.
-   Does not require Build Step. Most TypeScript solution requires a build step to compile the code into JavaScript. This is not always possible in some projects or it adds complexity to the project.
-   Most library authors know what types should work with their code, but is hard to enforce once it goes to distribution. TypeCheck JS allows library authors to enforce the types when others use their libraries at runtime.
-   Be able to be used directly in browser or with Js that does not support TypeScript.
-   Complexity. TypeScript is a complex language and it is not always easy to understand the type definitions. TypeCheck JS aims to be simple and easy to understand.
-   Syntax. Projects are becaming too complex and heavily using 'defensive programming' to avoid errors. TypeCheck JS aims to be simple and easy to understand by all developers regardless of their experience while helping to focus on what really matters.

## What does no solve?

-   Bad programming.
-   Replacing TypeScript at build time.

## Usage

```javascript
/**
 * TypeCheck
 * @param {string} testExpression (see below for patterns)
 * @param {any} valueToTest
 * @param {function} callback optional
 * @return {object} TypeChecker Boolean Object
 * @see testUnit for more examples and test cases
 */
typeCheck(testExpression, valueToTest, callback);
```

## Usage Examples

You can perform type checks like this:

```javascript
// Basic
typeCheck('number', 1); // true
typeCheck('number', '1'); // false
typeCheck('string', 'str'); // true
// With optional arguments
typeCheck('string?', null); // true
typeCheck('string?', undefined); // true
typeCheck('string?', 'str'); // true

// Piped
typeCheck('string | number', 1); // true
typeCheck('string | int', 'str'); // true

// Array
typeCheck('[number]', [1]); // true
typeCheck('[number]', [1, 2, 3]); // true
typeCheck('[number, number, string]', [1, 3, null]); // Matches the index of the array

// Object
typeCheck('{x: string, y: number}', { x: 'string', y: 10 }); // true
typeCheck('{x: string, y: number}', { x: 'string', y: 'str' }); // false
typeCheck('{x: string, y: number}', { x: 'string', y: 10, z: 10 }); // false
typeCheck('{x: string|number, y: number}', { x: 2, y: 10 }); // true

// Object with optional keys
typeCheck('{x: string, y: number, z?: number}', { x: 'string', y: 10 }); // true

// Object with specific keys to test all other ignore
typeCheck('{x: string, y: number, ...}', { x: 'string', y: 10, z: 20 }); // true

// Object with specific keys to test all test a common test method
typeCheck('{x: string, y: number, any: number}', { x: 'string', y: 10, z: 20 }); // true

// Nested arrays or objects
typeCheck('[number, {any: number, x: string}, number]', [1, { x: 'string', y: 10, z: 20 }, 3]); // true

// With callback functions
typeCheck('{y: number, x: string}', { x: 'string', y: 10 }, ($this) => {
    console.log('__testLogHere__', $this);
}).log();

//with log function to see the results in the console
typeCheck('{y: number, x: string}', { x: 'string', y: 10 }).log();

//with fail function to stop execution if the type is not correct
typeCheck('{y: number, x: string}', { x: 'string', y: 10 }).fail();
```

<br/>

## Possible patterns

```
Possible type patterns:

// basic string
'type' // only one test
'type | type' // returns to test one or more types
'type?' // is type or null/undefined
'type | type?' // the second type would be type or null/undefined


// basic array
'[type]' // returns test to test all the keys
'[type | type]' // returns test to test all key with one or more
'[[type],[type]]'

// basic object
'{key1: type}'
'{key1: type | type}'
'{key1: type, key2: type}'
'{key1: type, key2?: type}' // if key2 is not present or null/undefined, it will not be tested
'{key1: type, key2: type?}' // if key2 is not set or null/undefined, it will not be tested
'{key1: type | type, key2: type | type}'
'{any: type}' // any key
'{any: type | type}' // any key
'{key1: type, any: type}' // specific key, and all other "any"
'{key1: type | type, ...}' // specific key, and all other no test


// ADVANCE
// array of objects
'[{key1: type}]' // returns test to test all the keys
'[{key1: type | type}]' // returns test to test all key with one or more
'[{key1: type, key2: type}]' // returns
'[{key1: type, key2: type}, {key1: type, key2: type}]'
'[{key1: type | type, key2: type | type}, {key1: type | type, key2: type | type}]'
'[{key1: type, any: type}]'

```

For more examples and usage patterns, further information and advanced use-cases, please refer to the `patterns` [here](/type-patterns.txt/) and `test` [here](/test/TypeCheck.test.js) files.
