/*! For license information please see typeCheck.js.LICENSE.txt */
(()=>{var t={66:()=>{(()=>{var t={222:(t,e,n)=>{var r,o,i;!function(a){if("object"==typeof t.exports){var u=a(n(747),e);void 0!==u&&(t.exports=u)}else o=[n,e],void 0===(i="function"==typeof(r=a)?r.apply(e,o):r)||(t.exports=i)}((function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DomObserver=e.cleanup=e.removeOnNodeChange=e.addOnNodeChange=e.executeOnNodeChanged=void 0;const n={};e.executeOnNodeChanged=n;const r=(t,e)=>{e&&(n[t]=e)};e.addOnNodeChange=r;const o=t=>{t&&delete n[t]};e.removeOnNodeChange=o;const i=()=>{Object.keys(n).forEach((t=>delete n[t]))};e.cleanup=i,new MutationObserver(((t,e)=>{for(const e of t)if("childList"===e.type)for(const t in n)n[t]()})).observe(document.body,{childList:!0,subtree:!0});const a={executeOnNodeChanged:n,addOnNodeChange:r,removeOnNodeChange:o,cleanup:i};e.DomObserver=a,e.default=a}))},747:t=>{function e(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}e.keys=()=>[],e.resolve=e,e.id=747,t.exports=e},979:(t,e,n)=>{var r,o,i;!function(a){if("object"==typeof t.exports){var u=a(n(526),e);void 0!==u&&(t.exports=u)}else o=[n,e],void 0===(i="function"==typeof(r=a)?r.apply(e,o):r)||(t.exports=i)}((function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){const e=new Set(t._private?["_private",...t._private]:["_private"]),n=new Set(t._protected?[...e,...t._protected]:[...e]),r=new Set(t._mutable||[]);return new Proxy(t,{get(t,n){if(n in t&&!e.has(String(n)))return t[n];console.error("Prop is private, not set or object is protected",n)},set(t,e,o){if(e in t){if(r.has(String(e)))return t[e]=o;"function"==typeof t[e]?n.add(String(e)):n.has(String(e))?console.error("The prop is a function and cannot be modified",e,o):t[e]=o}else console.error("Protected Object, cannot set props",e,o);return!0}})}}))},526:t=>{function e(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}e.keys=()=>[],e.resolve=e,e.id=526,t.exports=e}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{Utility:()=>C,convertToBool:()=>l,currencyToDecimal:()=>c,dateFormat:()=>f,decimalToCurrency:()=>y,default:()=>C,emptyOrValue:()=>p,formatPhoneNumber:()=>d,getDynamicId:()=>h,getGoogleMapsAddress:()=>b,getRandomId:()=>m,includes:()=>g,instanceOf:()=>M,isEmpty:()=>v,isNumber:()=>O,logThis:()=>w,openGoogleMapsAddress:()=>S,proxyObject:()=>j,select:()=>A,toCurrency:()=>T,toDollarString:()=>E,typeOf:()=>k,utility:()=>C,utils:()=>C,validateEmail:()=>N,validatePhone:()=>P});var t=n(979),e=n.n(t);const o=function(t,e){const n=window,r=document,o=n.$HOST||!1,i=n.$TEMPLATE||!1,a=n.location.protocol.replace(":",""),u=o||n.location.host,s=i||"",l=location.pathname,c=o||`${a}://${u}`,f=o?`${o}${l}`:`${a}://${u}${l}`;let y=null;const p=()=>{if(y)return y;const t=new URLSearchParams(n.location.search),e={};for(const[n,r]of t.entries())e[n]=r;return y={params:t,queryString:t.toString(),search:n.location.search,keys:Array.from(t.keys()),values:Array.from(t.values()),collection:e},y};t.getPage=()=>r.location.toString().toLowerCase().split("/").pop().split(".")[0]||"index",t.getParams=()=>p(),t.getQuery=()=>p().queryString,t.addToQuery=t=>{const e=p().collection;return Object.assign(e,t),{collection:e,queryString:Object.entries(e).map((([t,e])=>`${t}=${e}`)).join("&")}},t.getHash=()=>n.location.hash.substring(1),t.setHash=t=>{r.location.hash=t},t.deleteHash=()=>{history.pushState("",r.title,n.location.pathname)},t.goTo=t=>(n.location.href=t,!1),t.open=(t,e="_blank",r="")=>n.open(t,e,r),t.onChange=t=>{"function"==typeof t&&n.addEventListener("hashchange",t)},t.fullUrl=f,t.siteUrl=c,t.template=s,t.protocol=a,t.host=u,t.path=l,t.readUrl=r.URL};var i=n(222),a=n.n(i);class u{constructor(t,e=document){this.selector=t,"object"==typeof t?this.domElement=t:String(t).includes("//")?this.domElement=this.getElementByXpath(t):this.domElement=e.querySelector(t)}isInDom(){return Boolean(this.domElement?.outerHTML)}whenInDom(){let t=this,e=Date.now()+Math.floor(1e3*Math.random());return new Promise((function(n){t.isInDom()?n(t):a().addOnNodeChange(e,(()=>{let r=new u(t.selector);r.isInDom()&&(t=r,n(t),a().removeOnNodeChange(e))}))}))}getElementByXpath(t){return document.evaluate(t,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}getXpathTo(){let t=this.domElement;if(t.id)return"//*[@id='"+t.id+"']";if(t===document.body)return"//"+t.tagName;let e=0,n=t.parentNode.childNodes;for(let r=0;r<n.length;r++){let o=n[r];if(o===t)return new u(t.parentNode).getXpathTo()+"/"+t.tagName+"["+(e+1)+"]";1===o.nodeType&&o.tagName===t.tagName&&e++}}getAttribute(t){return this.domElement.getAttribute(t)||null}getHash(){let t=String(this.getXpathTo()),e=0;if(0===t.length)return e;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e&=e;return e}}function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(t){switch(s(t)){case"boolean":return t;case"string":return"false"!==t&&"0"!==t;case"number":return 0!==t;default:return Boolean(t)}}function c(t){return Number(t.replace(/[^0-9.-]+/g,""))}function f(t,e){if(!t||isNaN(new Date(t).getTime()))return null;var n=new Date(t),r=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:"UTC"}).format(n);if(e){var o=new Intl.DateTimeFormat("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:"UTC"}).format(n);return"".concat(r," @ ").concat(o)}return r}function y(t){return new Intl.NumberFormat("en-GB",{minimumFractionDigits:2}).format(t)}function p(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return O(t)||"boolean"==typeof t?t:v(t)?e:t}function d(t,e){var n=t.replace(/\D/g,"");if(10!==n.length)throw new Error("Invalid phone number length");for(var r=[],o=0,i=0;i<e.length;i++)"0"===e[i]?(r.push(n[o]),o++):r.push(e[i]);return r.join("")}function h(){return"kn__"+(new Date).getTime()+"__"+Math.floor(899*Math.random())}var m=h;function b(t){if(!t)return!1;var e="";return e=k(t,"string")?t:["address","address1","city","state","zip","zipcode"].reduce((function(e,n){var r=Object.keys(t).find((function(e){return e.includes(n)&&t[e]}));return r?"".concat(e," ").concat(t[r]):e}),""),e=e.trim().replace(/\s+|,/g,"+"),"https://maps.google.it/maps?q=".concat(e)}function g(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(Array.isArray(t)||"string"==typeof t)return t.includes(e,n);if("object"===s(t))for(var r in t)if(t[r]===e)return!0;return!1}function v(t){return null==t||("string"==typeof t||Array.isArray(t)?0===t.length:t instanceof Map||t instanceof Set?0===t.size:ArrayBuffer.isView(t)?0===t.byteLength:"object"===s(t)&&0===Object.keys(t).length)}function O(t){return!(!Number.isInteger(t)&&Number.isNaN(Number(t)))&&+t}function w(t){console.log(t)}function S(t){if(!k(t,"string")||!k(t,"object"))throw new Error("The input must be a string or an object.");var e=b(t);if(!v(e)||!k(e,"string"))throw new Error("The address you are trying to open is invalid.");return o.open(e)}function j(t){return new(e())(t)}function A(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return new u(t,e)}function T(t){return y(t)}function E(t){return k(t,"string")&&(t=c(t)),Math.abs(t)>999&&Math.abs(t)<999999?Math.sign(t)*(Math.abs(t)/1e3).toFixed(1)+"K":Math.abs(t)>999999?Math.sign(t)*(Math.abs(t)/1e6).toFixed(1)+"M":Math.sign(t)*Math.abs(t)}function k(t,e){if(null===t)return e?null===e||"null"===e:"null";var n;switch(s(t)){case"number":case"string":case"boolean":case"undefined":case"bigint":case"symbol":case"function":n=s(t);break;case"object":n=Array.isArray(t)?"array":"object";break;default:n="unknown"}return e?e===n:n}function M(t,e){var n="unknown";if(null===t||"object"!==s(t))return n;for(var r=[{type:"date",inst:Date},{type:"regexp",inst:RegExp},{type:"promise",inst:Promise},{type:"map",inst:Map},{type:"set",inst:Set},{type:"weakMap",inst:WeakMap},{type:"weakSet",inst:WeakSet}],o=r.length;o--;)if(t instanceof r[o].inst){n=r[o].type;break}return e?e===n:n}function N(t){return/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(t)}function P(t){return/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(t)}var C={convertToBool:l,currencyToDecimal:c,dateFormat:f,decimalToCurrency:y,emptyOrValue:p,formatPhoneNumber:d,getDynamicId:h,getGoogleMapsAddress:b,getRandomId:h,includes:g,isEmpty:v,isNumber:O,instanceOf:M,logThis:w,openGoogleMapsAddress:S,proxyObject:j,select:A,toCurrency:T,toDollarString:E,typeOf:k,urlHelper:o,validateEmail:N,validatePhone:P}})(),window.PowerHelpers=r})()}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{default:()=>k,typeCheck:()=>k});var t=n(66);function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}var o={array:function(e){return(0,t.typeOf)(e,"array")},bigInt:function(t){return"bigint"==typeof t},boolean:function(t){return"boolean"==typeof t},date:function(t){return t instanceof Date},float:function(t){return"number"==typeof t&&!Number.isInteger(t)},function:function(t){return"function"==typeof t},int:function(t){return Number.isInteger(t)},map:function(t){return t instanceof Map},null:function(t){return null===t},number:function(t){return"number"==typeof t},object:function(e){return(0,t.typeOf)(e,"object")},promise:function(t){return t instanceof Promise},regExp:function(t){return t instanceof RegExp},set:function(t){return t instanceof Set},string:function(t){return"string"==typeof t},symbol:function(t){return"symbol"===e(t)},undefined:function(t){return void 0===t},weakMap:function(t){return t instanceof WeakMap},weakSet:function(t){return t instanceof WeakSet}};function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(t){return function(t){if(Array.isArray(t))return u(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(o=r.key,a=void 0,a=function(t,e){if("object"!==i(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===i(a)?a:String(a)),r)}var o,a}function l(t){throw new Error('Type Error: "'.concat(t,'" is not supported'))}function c(e){if((0,t.typeOf)(e,"array")||(0,t.typeOf)(e,"object"))return(0,t.typeOf)(e);var n=e.trim();return(0,t.startAndEndWith)(n,"[","]")?"array":(0,t.startAndEndWith)(n,"{","}")?"object":"basic"}var f=function(t){return t.split("|").reduce((function(t,e){var n=!1,r=e.trim();r.endsWith("?")&&(r=r.slice(0,-1),n=!0);var i=o[r],a=null!=i?i:l(r);return a&&t.push(a),n&&t.push(o.null,o[void 0]),t}),[])},y=function(e){return new(function(){function n(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.testUnit=new Map([["tests",new Map],["optionalKeys",[]],["testFew",[]],["testAllAny",!1],["testOnly",!1]]),this.handleObject()}var r,o,i;return r=n,(o=[{key:"splitKeyAndType",value:function(t){return t.split(":").map((function(t){return t.trim()}))}},{key:"checkOptionalKey",value:function(t){return t.endsWith("?")&&(t=t.slice(0,-1),this.testUnit.get("optionalKeys").push(t)),t}},{key:"checkTheAnyKey",value:function(t){if("any"in t){var e=Object.keys(t);1===e.length?this.testUnit.set("testAllAny",!0):this.testUnit.set("testFew",e.filter((function(t){return"any"!==t})))}}},{key:"handleObject",value:function(){var n=(0,t.getArrObjFromString)(e);for(var r in this.checkTheAnyKey(n),n){var o=this.checkOptionalKey(r),i=n[r];"..."!==i?this.testUnit.get("tests").set(o,p(i)):(delete n[r],this.testUnit.set("testOnly",!0))}return this.testUnit}}])&&s(r.prototype,o),i&&s(r,i),Object.defineProperty(r,"prototype",{writable:!1}),n}())};function p(e){var n=new Map([["testMethod",c(e)],["tests",null]]);if("basic"===n.get("testMethod"))n.set("tests",f(e));else if("array"===n.get("testMethod"))n.set("tests",function(e){var n=[];return(0,t.getArrObjFromString)(e).forEach((function(t){n.push(p(t))})),n}(e));else if("object"===n.get("testMethod")){var r=y(e);n=new Map([].concat(a(n),a(r)))}else l(e);return n}function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,u=[],s=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=i.call(n)).done)&&(u.push(r.value),u.length!==e);s=!0);}catch(t){l=!0,o=t}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,e)||b(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t){return function(t){if(Array.isArray(t))return g(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||b(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t,e){if(t){if("string"==typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(o=r.key,i=void 0,i=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===d(i)?i:String(i)),r)}var o,i}function w(t,e,n){return e&&O(t.prototype,e),n&&O(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var S=[],j=function(){function e(t,n){v(this,e),this.testUnitKeys=m(n.get("tests").keys()),this.testOnly=n.get("testOnly"),this.testFew=n.get("testFew"),this.testAllAny=n.get("testAllAny"),this.optionalKeys=n.get("optionalKeys"),this.testCollection=n.get("tests"),this.inputObject=t}return w(e,[{key:"handleUnitTest",value:function(){switch(!0){case this.testAllAny:return this.testObjAllAny();case!(0,t.isEmpty)(this.testFew):var e=this.testObjFew();return this.filterOutFew(),e&&this.testObjAllAny();case!(0,t.isEmpty)(this.optionalKeys):var n=this.testObjOptionalKeys();return this.filterOutOptionalKeys(),n&&this.defaultTest();case!this.testOnly:for(var r in this.inputObject)if(!this.testCollection.has(r))return!1}return this.defaultTest()}},{key:"filterOutOptionalKeys",value:function(){var t=this;this.testUnitKeys=this.testUnitKeys.filter((function(e){return!t.optionalKeys.includes(e)}))}},{key:"filterOutFew",value:function(){var t=this;this.inputObject=Object.fromEntries(Object.entries(this.inputObject).filter((function(e){var n=h(e,1)[0];return!t.testFew.includes(n)})))}},{key:"testObjOptionalKeys",value:function(){var t=this;return this.optionalKeys.every((function(e){var n=t.testCollection.get(e),r=t.inputObject[e];return!r||T(r,n)}))}},{key:"testObjFew",value:function(){var t=this;return this.testFew.every((function(e){var n=t.testCollection.get(e);return T(t.inputObject[e],n)}))}},{key:"testObjAllAny",value:function(){var t=this;return Object.values(this.inputObject).every((function(e){return T(e,t.testCollection.get("any"))}))}},{key:"defaultTest",value:function(){var t=this;return this.testUnitKeys.every((function(e){var n=t.testCollection.get(e);return T(t.inputObject[e],n)}))}}]),e}(),A=function(e,n){return!!(0,t.typeOf)(e,"object")&&new j(e,n).handleUnitTest()};function T(e,n){switch(n.get("testMethod")){case"basic":return function(t,e){return e.some((function(n){var r=n(t);return r||S.push({value:t,tests:e}),r}))}(e,n.get("tests"));case"array":return function(e,n){return!!(0,t.typeOf)(e,"array")&&n.every((function(t,n){return T(e[n],t)}))}(e,n.get("tests"));case"object":return A(e,n);default:return!1}}var E=function(){function t(e,n,r){v(this,t),this.typeExp=e,this.inputVal=n,this.callback=r||null,this.unitTest=null,this.testResult=null}return w(t,[{key:"runTest",value:function(){this.unitTest=p(this.typeExp),this.testResult=T(this.inputVal,this.unitTest);var t=new Boolean(this.testResult);return t.log=this.log.bind(this),t.fail=this.fail.bind(this),this.callback&&this.callback.apply(this,m(args).concat([this])),t}},{key:"log",value:function(){console.table(this)}},{key:"fail",value:function(){if(!1===this.testResult){this.log();var t=S[S.length-1];throw new Error('Type Error: "'.concat(t.value,'" is not valid, see log console for details'))}}}]),t}(),k=function(t,e,n){return new E(t,e,n).runTest()}})(),window.PowerHelpers=r})();