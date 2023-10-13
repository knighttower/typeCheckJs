# TypeCheck JS

## A simple type checker for JavaScript

TypeCheck JS is a JavaScript library designed for fast and efficient type checking. Inspired by [gkz/type-check](https://github.com/gkz/type-check), this library aims to overcome the limitations and complexities associated with TypeScript. It offers a lightweight, memory-efficient, and easy-to-use solution for both basic and complex type-checking requirements.  
[![release version](https://github.com/knighttower/typeCheckJs/actions/workflows/pre-release.yml/badge.svg)](https://github.com/knighttower/typeCheckJs/actions/workflows/pre-release.yml)
[![NPM published](https://github.com/knighttower/typeCheckJs/actions/workflows/to-npm.yml/badge.svg)](https://github.com/knighttower/typeCheckJs/actions/workflows/to-npm.yml)

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
Note: by default the library is ESM, but other builds are available in the dist folder (cjs, umd and iife)

```html
<script src="https://cdn.jsdelivr.net/npm/@knighttower/type-check-js@latest/dist/typeCheck.min.js"></script>
// or as ESM
<script type="module">
    import { typeCheck } from 'https://esm.run/@knighttower/type-check-js@latest/index.js';
</script>
```

| File             | Size  |
| ---------------- | ----- |
| /typeCheck.js    | 8 KiB |
| /typeCheck.js.br | 3 KiB |
| /typeCheck.js.gz | 3 KiB |

<br/>

## Why TypeCheck JS?

1. **Lightweight**: Adds minimal overhead to your project (only 6k GZip).
2. **Fast Performance**: Micro Optimized for quick type-checking operations.
3. **Ease of Use**: Simple API and intuitive pattern syntax.
4. **Quick implementation**: Can be implemented in any existing projects with minimal effort.
5. **No Compile Step**: Works directly in vanilla JavaScript projects without the need for a compilation step.
6. **Complementary**: Can be used alongside TypeScript to check front-end and back-end data types.
7. **Functionality**: Supports callbacks, log and fail functions.
8. **Flexibility**: Supports piped comparisons, optional arguments and keys.
9. **Extensibility**: Supports custom type definitions.
10. **Tested**: All code used has been fully tested with Vitest Unit tests
11. **Well Commented**: JSDocs comments for all methods and functions.

## What aims to solve?

TypeCheck JS aims to solve the following problems:

-   Drop-in solution for existing projects. Most projects are already in production and it is not always possible to add a build step to compile TypeScript.
-   Overkill. Typescript can be too much for just small projects or quick projects.
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

### Basic:

### -- typeCheck(testExpression, valueToTest, options);

```javascript
/**
 * @param {string} testExpression (see below for patterns)
 * @param {any} valueToTest
 * @param {function} callback optional
 * @return {object} TypeCheck Object with chainable methods
 * @see testUnit for more examples and test cases
 */
typeCheck(testExpression, valueToTest, options);

// Methods:
typeCheck(..).test(); // returns true or false, helpful for if statements or other logic
typeCheck(..).bool; // same as 'test()', returns true or false, but more direct in the intent
typeCheck(..).log(); // logs the results, helpful for debugging
typeCheck(..).fail(); // throws exception if the test fails. Strict validation enforcement
typeCheck(..).return(); // returns the valueToTest (non chainable with 'test' method)

//Chain methods
typeCheck(..).log().test(); // logs the results and returns true or false
typeCheck(..).fail().test(); // throws exception if the test fails and returns true or false
typeCheck(..).log().fail().return(); // returns the valueToTest and logs the results and throws exception if the test fails


// Options
{
    log: true, // default false. Same as method log()
    fail: true, // default false. Same as method fail()
    callback: function, // default null. Only available in 'options'
}
```

<br/>

### Utility functions and advance usage:

### -- validType(testExpression, valueToTest);

-   Does not take any options
-   Strict validation, throws exception if the test fails;
-   Less options, but faster to implement

```javascript
function yourExistingFunction(valueToTest) {
    validType('string', valueToTest);
    // your code here
}
```

<br/>

### -- \_tc(testExpression, \_\_function, options);

-   Wrapper for "typeCheck" (\_tc) to implement functions with type checking.
-   Does not validate the "return value" of the function. (use "\_tcx" instead).
-   lightweight, fast and easy to implement.
-   Does take options.
-   Does return the 'return value' of the function for each instance.
-   Note: all test expressions are passed as 'array' like because args are 1 or more.

```javascript
const yourCoolFunction = _tc('[number, number]', function (myVar, theOtherVar) {
    // .. your code here
});

yourCoolFunction(44.5, 'hello'); // validates that both are numbers

// Options
{
    log: false, // default false. Same as method log()
    fail: false, // default false. Same as method fail()
}
```

<br/>

### -- \_tcx(testExpression, \_\_function, options);

-   Wrapper for "typeCheck" with 'return X' (\_tcx) to implement functions with type checking
-   Validates the "return value" of the function.
-   Offers more options.
-   Has built in features for all its instances.
-   Does take options.
-   slighty slower than "\_tc", but more robust for full type checking.
-   Does not return the 'return value' as '\_tc', instead it has to be explicitly called with '.return()'.
-   Note: all test expressions are passed as 'array' like because args are 1 or more.

```javascript
const yourCoolFunction = _tcx('[number, string]', function (myVar, theOtherVar) {
    // .. your code here
    return 'hello';
}, {validOutput: 'string'});

yourCoolFunction(44.5, 'hello'); // validates that arg1 is 'number' and arg2 is 'string' and that the return value is a string

// Options
{
    validOutput: 'testExpression', // default null. Same as method log()
    log: false, // default false. Same as method log()
    fail: false, // default false. Same as method fail()
}

// Built in features
yourCoolFunction(...).log(); // logs the results, helpful for debugging individual functions
yourCoolFunction(...).fail(); // throws exception if the test fails. Strict validation enforcement
yourCoolFunction(...).return(); // returns the 'return value' (non chainable with 'test' method)
yourCoolFunction(...).test(); // returns true or false, helpful for if statements or other logic
yourCoolFunction(...).fail().return(); // if the test fails, it will throw exception and if passes returns the 'return value'
```

<br />

### -- addTypeTest(name, testUnitFunction);

-   Add custom type test to the library.
-   Can be used with 'typeCheck' or '\_tc' and '\_tcx' functions.

```javascript
/**
 * Add a new type test
 * @param {string} name The name of the test to add
 * @param {function} testUnit The test function
 * @return {boolean} true if the test was added
 * @throws {Error} if the test already exists
 */
addTypeTest('customTypeTest', function (x) {
    return typeof x === 'number';
});
if (typeCheck('[customTypeTest]', [1]).test()) {
    console.log(999); // logs 999 when validates to true
}
```

<br /><br />

## Examples

You can perform type checks like this:

```javascript
// Basic
typeCheck('number', 1).test(); // true and returns a boolean
typeCheck('number', '1').fail().test(); // false and throw exception
typeCheck('string', 'str').log().test(); // true and logs the test results
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

<br />

### ---> For more examples and usage patterns, further information and advanced use-cases, please refer to the `patterns` [here](/type-patterns.txt/) and `test` [here](/test/TypeCheck.test.js) files.

---

<br /><br />

Check out other cool stuff at https://knighttower.io and help support open source projects.

<br />

---

Sponsored By:

[![image](https://github.com/knighttower/typeCheckJs/assets/649334/024f2e7d-d3d0-4558-8893-2e6bbea29a6f)](https://squarefox.us/)
