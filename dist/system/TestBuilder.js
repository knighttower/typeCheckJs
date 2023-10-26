System.register('adaptive', [], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      exports({
        default: testBuilder,
        testBuilder: testBuilder
      });

      function _typeof(o) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
          return typeof o;
        } : function (o) {
          return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function () {};
            return {
              s: F,
              n: function () {
                if (i >= o.length) return {
                  done: true
                };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function (e) {
                throw e;
              },
              f: F
            };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true,
          didErr = false,
          err;
        return {
          s: function () {
            it = it.call(o);
          },
          n: function () {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function (e) {
            didErr = true;
            err = e;
          },
          f: function () {
            try {
              if (!normalCompletion && it.return != null) it.return();
            } finally {
              if (didErr) throw err;
            }
          }
        };
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }

      // Author Knighttower
      // MIT License
      // [2022] [Knighttower] https://github.com/knighttower
      /**
       * @module DomObserver
       * Detect DOM changes
       * @name DomObserver
       * @param {window} selector
       * @param {Function}
       * @return DomObserver
       * @example DomObserver.addOnNodeChange('elementIdentifier', () => { console.log('Node changed') })
       * @example DomObserver.removeOnNodeChange('elementIdentifier')
       */
      /**
       * Holds memory of registered functions
       * @private
       */
      var executeOnNodeChanged = {};
      /**
       * Observer
       * @private
       * @return {MutationObserver}
       */
      (function () {
        if (typeof window !== 'undefined') {
          var callback = function callback(mutationList) {
            var _iterator = _createForOfIteratorHelper(mutationList),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var mutation = _step.value;
                if (mutation.type === 'childList') {
                  for (var id in executeOnNodeChanged) {
                    executeOnNodeChanged[id]();
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          };
          var config = {
            childList: true,
            subtree: true
          };
          var observer = new MutationObserver(callback);
          observer.observe(document.body, config);
        }
      })();

      /**
       * Converts a given variable to a number if possible.
       * @param {string|number} input - The input variable to convert.
       * @returns {string|number} - The converted number or the original variable.
       * @example convertToNumber(123) // Output: 123 (number)
       * @example convertToNumber(123.45) // Output: 123.45 (number)
       * @example convertToNumber("123") // Output: 123 (number)
       * @example convertToNumber("123.45") // Output: 123.45 (number)
       * @example convertToNumber("abc") // Output: "abc" (original string)
       * @example convertToNumber("123abc") // Output: "123abc" (original string)
       * @example convertToNumber(null) // Output: null (original)
       */
      function convertToNumber(input) {
        var isNum = isNumber(input);
        if (isNum !== null) {
          return isNum;
        }
        // Case: String that cannot be converted to a number
        return input;
      }

      /**
       * Check if there is a value, if not return null or the default value
       * It can test strings, arrays, objects, numbers, booleans
       * @function emptyOrValue
       * @memberof Utility
       * @param {String|Number} value If the value is not empty, returns it
       * @param {String|Number} _default The default value if empty
       * @return mixed
       * @example emptyOrValue('test', 'default') // 'test'
       * @example emptyOrValue('', 'default') // 'default'
       * @example emptyOrValue('test') // 'test'
       * @example emptyOrValue('') // null
       * @example emptyOrValue(0) // 0
       * @example var hello = ''; emptyOrValue(hello) // Null
       * @example var hello = 'test'; emptyOrValue(hello) // 'test'
       * @example var hello = 'test'; emptyOrValue(hello, 'default') // 'test'
       * @example var hello = ''; emptyOrValue(hello, 'default') // 'default'
       * @example var hello = []; emptyOrValue(hello, 'default') // null
       * @example var hello = {}; emptyOrValue(hello, 'default') // null
       * @example var hello = [...]; emptyOrValue(hello') // [...]
       */
      function emptyOrValue(value) {
        var _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        /**
         * Test sequence:
         * If it is a number 0> : true
         * If is not undefined: true
         * If it is boolean (true|false) prevents going to empty
         * If it is not Empty, [], null, {}, 0, true, false: true
         */

        if (isNumber(value) !== null || typeof value === 'boolean') {
          return value;
        } else if (!isEmpty(value)) {
          return value;
        }
        return _default;
      }

      /**
       * Generate unique ids
       * @function getDynamicId
       * @memberof Utility
       * @return string Format kn__000000__000
       */
      function getDynamicId() {
        return 'kn__' + new Date().getTime() + '__' + Math.floor(Math.random() * (999 - 100));
      }

      /**
       * Alias to getDynamicId
       * @function getRandomId
       * @memberof Utility
       * @return string
       * @example getRandomId() // kn__000000__000
       */
      var getRandomId = getDynamicId;

      /**
       * Check if a value is empty
       * @function isEmpty
       * @memberof Utility
       * @param {string|array|object|map|set|number|boolean} value
       * @url https://moderndash.io/
       * @return {string}
       */
      function isEmpty(value) {
        if (value === null || value === undefined) {
          return true;
        }
        if (typeof value === 'string' || Array.isArray(value)) {
          return value.length === 0;
        }
        if (value instanceof Map || value instanceof Set) {
          return value.size === 0;
        }
        if (ArrayBuffer.isView(value)) {
          return value.byteLength === 0;
        }
        if (_typeof(value) === 'object') {
          return Object.keys(value).length === 0;
        }
        return false;
      }

      /**
       * Check if is a number or Int, if not return null
       * Integrates both Int and Number, or convert a string number to number to test
       * Note: this is not like Lodash isNumber since this one takes into consideration the 'string number'
       * @function isNumber
       * @memberof Utility
       * @param {String|Number} value
       * @return null|int
       * @example isNumber(123) // true
       * @example isNumber(123.45) // true
       * @example isNumber('123abc') // false
       * @example isNumber('abc') // false
       * @example isNumber('') // false
       * @example isNumber("123") // true
       * @example isNumber("123.45") // true
       */
      function isNumber(value) {
        var isType = _typeof(value);
        switch (value) {
          case null:
          case undefined:
          case '':
            return null;
          case '0':
          case 0:
            return 0;
          default:
            if (isType === 'number' || isType === 'string') {
              if (typeof value === 'number' || !Number.isNaN(Number(value))) {
                return +value;
              }
            }
            break;
        }
        return null;
      }

      /**
       * Check the type of a variable, and get the correct type for it. It also accepts simple comparisons
       * For more advance type checking see https://github.com/knighttower/JsTypeCheck
       * @param {any} input - The variable to check
       * @param {string} test - The types to check against, piped string
       * @return {string|boolean} - The type of the variable
       * @example typeOf('hello', 'string') // returns true
       * @example typeOf('hello', 'number') // returns false
       * @example typeOf('hello', 'string') // returns true
       * @example typeOf('hello') // returns 'string'
       * @example typeOf({}) // returns 'object'
       */
      function typeOf(input, test) {
        // Special case for null since it can be treated as an object
        if (input === null) {
          if (test) {
            return test === null || test === 'null' ? true : false;
          }
          return 'null';
        }
        var inputType;
        switch (_typeof(input)) {
          case 'number':
          case 'string':
          case 'boolean':
          case 'undefined':
          case 'bigint':
          case 'symbol':
          case 'function':
            inputType = _typeof(input);
            break;
          case 'object':
            inputType = Array.isArray(input) ? 'array' : 'object';
            break;
          default:
            inputType = 'unknown';
        }
        if (test) {
          return test === inputType;
        }
        return inputType;
      }

      // @private
      function _removeBrackets(strExp) {
        var regex = /^(\[|\{)(.*?)(\]|\})$/; // Match brackets at start and end
        var match = strExp.match(regex);
        if (match) {
          return match[2].trim(); // Extract and trim the content between brackets
        }

        return strExp; // Return the original string if no brackets found at start and end
      }

      /**
       * Clean a string from delimeters or just trimmed if no delimeters given
       * @funtion cleanStr
       * @param {String} str - String to use
       * @param {String|Regex} p1 - Delimeter 1
       * @param {String|Regex} p2 - Delimeter 2
       * @return {String|void}
       * @example cleanStr('hello world', 'h', 'd') // 'ello worl'
       * @example cleanStr('  hello world  ') // 'hello world'
       * @example cleanStr('hello world', 'hello') // 'world'
       * @example cleanStr('Hello World. Sunshine is here!', '\..*!') // Hello World
       * @example cleanStr('Hello World. Sunshine is here!', /Hello/g) // ' World. Sunshine is here!'
       * @example cleanStr('Hello World. Sunshine is here!', /Hello/g, /Sunshine/g) // ' World.  is here!'
       */
      function cleanStr(str) {
        var arguments$1 = arguments;

        if (!str) {
          return;
        }
        if (typeof str !== 'string') {
          return str;
        }
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }
        return args.reduce(function (accStr, arg) {
          var regex = arg instanceof RegExp ? arg : new RegExp(setExpString(arg));
          return accStr.replace(regex, '');
        }, str).trim();
      }

      /**
       * Find the last instance of nested pattern with delimeters
       * @function findNested
       * @param {string} str
       * @param {string} start - Delimeter 1
       * @param {string} end - Delimeter 2
       * @return {string|null}
       * @example findNested('[[]hello [world]]', '[', ']') // [world]
       */
      function findNested(str) {
        var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '[';
        var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ']';
        if (typeof str !== 'string') {
          return str;
        }
        // Find the last index of '['
        var lastIndex = str.lastIndexOf(start);
        // If '[' is not found, return null or some default value
        if (lastIndex === -1) {
          return null;
        }

        // Extract the substring starting from the last '[' to the end
        var substring = str.substring(lastIndex);
        // Find the index of the first ']' in the substring
        var endIndex = substring.indexOf(end);
        // If ']' is not found, return null or some default value
        if (endIndex === -1) {
          return null;
        }
        // Extract and return the content between the last '[' and the next ']', including them
        return substring.substring(0, endIndex + 1);
      }

      /**
       * Converts strings formats into objects or arrays
       * Note: quoted strings are not supported, use getDirectiveFromString instead
       * @param {string} strExp
       * @return {object|array|string}
       * @example getArrObjFromString('[[value,value],value]') // [['value', 'value'], 'value']
       * @example getArrObjFromString('[[value,value],value, { y: hello }, hello]') // [['value', 'value'], 'value', { y: 'hello' }, 'hello']
       * @example getArrObjFromString('{ y: hello, x: world, z: [value,value]}') // { y: 'hello', x: 'world', z: ['value', 'value'] }
       */
      function getArrObjFromString(strExp) {
        // alredy typeof object or array just return it
        if (typeOf(strExp, 'object') || typeOf(strExp, 'array')) {
          return strExp;
        }
        var isObject = startAndEndWith(strExp, '{', '}');
        var isArray = startAndEndWith(strExp, '[', ']');
        // If it is other type of string, return it
        if (!isObject && !isArray) {
          return strExp;
        }
        var newCollection = isObject ? {} : [];
        var nestedElements = {};

        //remove the brackets
        var newStrExp = _removeBrackets(strExp);
        var loopNested = function loopNested() {
          var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          // ignore eslint comment
          // eslint-disable-next-line no-constant-condition
          while (true) {
            //find any nested arrays or objects
            var matched = objects ? findNested(newStrExp, '{', '}') : findNested(newStrExp);
            if (!matched) {
              break;
            }

            //replace the nested array or object with a marker so that we can safely split the string
            var marker = "__".concat(getRandomId(), "__");
            nestedElements[marker] = matched;
            newStrExp = newStrExp.replace(matched, marker);
          }
        };
        loopNested();
        loopNested(true);
        getChunks(newStrExp).forEach(function (chunk, index) {
          var isObjectKey = chunk.includes(':') && isObject;
          var chunkParts = isObjectKey ? getChunks(chunk, ':') : [];
          var chunkKey = removeQuotes(emptyOrValue(chunkParts[0], index));
          chunk = isObjectKey ? chunkParts[1] : chunk;
          if (chunk in nestedElements) {
            chunk = getArrObjFromString(nestedElements[chunk]);
          }
          chunk = convertToNumber(removeQuotes(chunk));
          // set back in the collection either as an object or array
          isObject ? newCollection[chunkKey] = chunk : newCollection.push(chunk);
        });
        // uncomment to debug
        // console.log('___ log ___', newCollection);
        return newCollection;
      }
      /**
       * Splits a string into chunks by a given splitter and cleans the chunks
       * @param {string} str
       * @param {string} splitter - The string/character to split the string by. Defaults to ','
       * @return {string|array}
       */
      function getChunks(str) {
        var splitter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
        if (typeof str !== 'string') {
          return str;
        }
        if (isEmpty(str)) {
          return [];
        }
        str = cleanStr(str);
        var chunks = str.split(splitter).map(function (t) {
          return cleanStr(t);
        });
        return chunks.length === 1 && chunks[0] === '' ? [str] : chunks;
      }

      /**
       * Remove quotes from a string
       * @function removeQuotes
       * @param {String} str
       * @return {String}
       * @example removeQuotes('"hello"') // hello
       * @example removeQuotes("'hello'") // hello
       */
      function removeQuotes(str) {
        if (typeof str !== 'string') {
          return str;
        }
        return str.replace(/`|'|"/g, '');
      }

      /**
       * Checks if a string starts and ends with a given string
       * @param {string} strExp
       * @param {string} start - The string/character to check it starts with
       * @param {string} end - The string/character to check it ends with
       * @return {string}
       * @example startAndEndWith('hello world', 'h', 'd') // false
       * @example startAndEndWith('hello world', 'h', 'd') // true
       */
      function startAndEndWith(strExp) {
        var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        return (!start || strExp.startsWith(start)) && (!end || strExp.endsWith(end));
      }

      /**
       * Scapes a string to create a regex or returns the regex if it already is an expression
       * @function setExpString
       * @param {String|Regex} exp
       * @return {String|Regex}
       * @example setExpString('hello') // '\h\e\l\l\o'
       * @example setExpString(/hello/) // /hello/
       * @example setExpString([hello]) // \\[hello\\/ then use like new new RegExp(setExpString(StringOrRegex))
       */
      function setExpString(exp) {
        if (exp instanceof RegExp) {
          return exp;
        } else {
          return exp.split('').map(function (_char) {
            return ['$', '^', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|', '\\'].includes(_char) ? "\\".concat(_char) : _char;
          }).join('');
        }
      }

      var typesMap = new Map([['array', function (_var_) {
        return typeOf(_var_, 'array');
      }], ['bigInt', function (_var_) {
        return typeof _var_ === 'bigint';
      }], ['boolean', function (_var_) {
        return typeof _var_ === 'boolean';
      }], ['date', function (_var_) {
        return _var_ instanceof Date;
      }], ['float', function (_var_) {
        return typeof _var_ === 'number' && !Number.isInteger(_var_);
      }], ['function', function (_var_) {
        return typeof _var_ === 'function';
      }], ['int', function (_var_) {
        return Number.isInteger(_var_);
      }], ['map', function (_var_) {
        return _var_ instanceof Map;
      }], ['null', function (_var_) {
        return _var_ === null;
      }], ['number', function (_var_) {
        return typeof _var_ === 'number';
      }], ['object', function (_var_) {
        return typeOf(_var_, 'object');
      }], ['promise', function (_var_) {
        return _var_ instanceof Promise;
      }], ['regExp', function (_var_) {
        return _var_ instanceof RegExp;
      }], ['set', function (_var_) {
        return _var_ instanceof Set;
      }], ['string', function (_var_) {
        return typeof _var_ === 'string';
      }], ['symbol', function (_var_) {
        return _typeof(_var_) === 'symbol';
      }], ['undefined', function (_var_) {
        return typeof _var_ === 'undefined';
      }], ['weakMap', function (_var_) {
        return _var_ instanceof WeakMap;
      }], ['weakSet', function (_var_) {
        return _var_ instanceof WeakSet;
      }]]);

      // =========================================
      // --> STORAGE
      // --------------------------
      // Cache storage for tests
      var cachedTests = new Map();
      var cachedPipedTypes = new Map();

      // =========================================
      // --> Utility functions
      // --------------------------

      /**
       * If the type is a union type, split it and return the tests for each type
       * @param {string} str
       * @return {array} tests
       */
      function getPipedTypes(str) {
        if (cachedPipedTypes.has(str)) {
          return cachedPipedTypes.get(str);
        }
        return str.split('|').reduce(function (testsForKey, t) {
          var itCanBeNull = false;
          var type = t.trim();
          if (type.endsWith('?')) {
            type = type.slice(0, -1);
            itCanBeNull = true;
          }
          // lookup the test for the type and add it to the testsForKey array
          var typeObj = typesMap.get(type);
          var test = typeObj !== null && typeObj !== void 0 ? typeObj : isNoType(type);
          if (test) {
            testsForKey.push(test);
          }
          // for optional types, add the tests for null and undefined
          if (itCanBeNull) {
            testsForKey.push(typesMap.get('null'), typesMap.get('undefined'));
          }
          cachedPipedTypes.set(str, testsForKey);
          return testsForKey;
        }, []);
      }

      /**
       * Get the tests for a type
       * @param {string} type
       * @return {function[]} tests
       * @throws {Error} if type is not supported
       */
      function isNoType(type) {
        throw new Error("Type Error: \"".concat(type, "\" is not supported"));
      }

      /**
       * Determine the type of the expression
       * @param {any} strExp
       * @return {string}
       */
      function determineMethod(strExp) {
        if (typeOf(strExp, 'array') || typeOf(strExp, 'object')) {
          return typeOf(strExp);
        }
        var __str = strExp.trim();
        if (startAndEndWith(__str, '[', ']')) {
          return 'array';
        }
        if (startAndEndWith(__str, '{', '}')) {
          return 'object';
        }
        return 'basic';
      }

      // =========================================
      // --> Handlers for different types
      // --------------------------

      /**
       * Basic single types
       * @param {string} typeStr
       * @return {object} tests
       */
      var basicTypes = function basicTypes(typeStr) {
        return getPipedTypes(typeStr);
      };

      /**
       * Handle array types
       * @param {string} strExp
       * @return {array} tests
       */
      var arrayTypes = function arrayTypes(strExp) {
        var testUnit = [];
        var convertedObj = getArrObjFromString(strExp);
        convertedObj.forEach(function (test) {
          testUnit.push(testBuilder(test));
        });
        return testUnit;
      };

      /**
       * Handle object types
       * @param {string} strExp
       * @return {object} tests
       */
      var objectTypes = function objectTypes(strExp) {
        return new ( /*#__PURE__*/function () {
          function handleObjects() {
            _classCallCheck(this, handleObjects);
            this.testUnit = new Map([['tests', new Map()], ['optionalKeys', []], ['testFew', []], ['testAllAny', false], ['testOnly', false]]);
            return this.handleObject();
          }
          _createClass(handleObjects, [{
            key: "checkOptionalKey",
            value: function checkOptionalKey(key) {
              if (key.endsWith('?')) {
                key = key.slice(0, -1);
                this.testUnit.get('optionalKeys').push(key);
              }
              return key;
            }
          }, {
            key: "checkTheAnyKey",
            value: function checkTheAnyKey(obj) {
              if ('any' in obj) {
                var keys = Object.keys(obj);
                if (keys.length === 1) {
                  this.testUnit.set('testAllAny', true);
                } else {
                  this.testUnit.set('testFew', keys.filter(function (key) {
                    return key !== 'any';
                  }));
                }
              }
            }
          }, {
            key: "handleObject",
            value: function handleObject() {
              var convertedObj = getArrObjFromString(strExp);
              this.checkTheAnyKey(convertedObj);
              for (var key in convertedObj) {
                var cleanKey = this.checkOptionalKey(key);
                var value = convertedObj[key];
                if (value === '...') {
                  delete convertedObj[key];
                  this.testUnit.set('testOnly', true);
                  continue;
                }
                this.testUnit.get('tests').set(cleanKey, testBuilder(value));
              }
              return this.testUnit;
            }
          }]);
          return handleObjects;
        }())();
      };

      /**
       * Build the test unit
       * @param {any} strExp String expression
       * @return {object} testUnit
       * @throws {Error} if type is not supported
       * @example testBuilder('number') // returns {testMethod: 'basic', tests: [function]}
       * @example testBuilder('[number]') // returns {testMethod: 'array', tests: [[function]]}
       * @example testBuilder('{any: number}') // returns {testMethod: 'object', tests: {any: [function]}}
       * @usage See more cases in the 'type-pattern.txt' file
       */
      function testBuilder(strExp) {
        if (cachedTests.has(strExp)) {
          return cachedTests.get(strExp);
        }
        var testUnit = new Map([['testMethod', determineMethod(strExp)], ['tests', null]]);
        switch (testUnit.get('testMethod')) {
          case 'basic':
            testUnit.set('tests', basicTypes(strExp));
            break;
          case 'array':
            testUnit.set('tests', arrayTypes(strExp));
            break;
          case 'object':
            /* eslint-disable-next-line */
            var objTypes = objectTypes(strExp);
            testUnit = new Map([].concat(_toConsumableArray(testUnit), _toConsumableArray(objTypes)));
            break;
          default:
            isNoType(strExp);
        }
        cachedTests.set(strExp, testUnit);
        return testUnit;
      }

      /**
       * Add a new type test
       * @param {string} name The name of the test to add
       * @param {function} testUnit The test function
       * @return {boolean} true if the test was added
       * @throws {Error} if the test already exists
       */
      var addTypeTest = exports('addTypeTest', function addTypeTest(name, testUnit) {
        if (!typesMap.has(name)) {
          typesMap.set(name, testUnit);
          return true;
        }
        throw new Error("Type Error: \"".concat(name, "\" already exists"));
      });

    })
  };
}));
