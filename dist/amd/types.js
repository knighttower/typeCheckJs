define(['exports'], (function (exports) { 'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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

  exports.typesMap = typesMap;

}));
