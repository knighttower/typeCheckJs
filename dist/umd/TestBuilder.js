!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("TestBuilder",[],t):"object"==typeof exports?exports.TestBuilder=t():e.TestBuilder=t()}(self,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{addTypeTest:()=>M,default:()=>k,testBuilder:()=>k});const n={};(()=>{if("undefined"!=typeof window){const e={childList:!0,subtree:!0};new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e in n)n[e]()})).observe(document.body,e)}})();const r=function(){return"kn__"+(new Date).getTime()+"__"+Math.floor(899*Math.random())};function s(e){return null==e||("string"==typeof e||Array.isArray(e)?0===e.length:e instanceof Map||e instanceof Set?0===e.size:ArrayBuffer.isView(e)?0===e.byteLength:"object"==typeof e&&0===Object.keys(e).length)}function o(e){const t=typeof e;switch(e){case null:case void 0:case"":return null;case"0":case 0:return 0;default:if(!("number"!==t&&"string"!==t||"number"!=typeof e&&Number.isNaN(Number(e))))return+e}return null}function i(e,t){if(null===e)return t?null===t||"null"===t:"null";let n;switch(typeof e){case"number":case"string":case"boolean":case"undefined":case"bigint":case"symbol":case"function":n=typeof e;break;case"object":n=Array.isArray(e)?"array":"object";break;default:n="unknown"}return t?t===n:n}function c(e,...t){if(e)return"string"!=typeof e?e:t.reduce(((e,t)=>{const n=t instanceof RegExp?t:new RegExp((r=t)instanceof RegExp?r:r.split("").map((e=>["$","^",".","*","+","?","(",")","[","]","{","}","|","\\"].includes(e)?`\\${e}`:e)).join(""));var r;return e.replace(n,"")}),e).trim()}function u(e,t="[",n="]"){if("string"!=typeof e)return e;const r=e.lastIndexOf(t);if(-1===r)return null;const s=e.substring(r),o=s.indexOf(n);return-1===o?null:s.substring(0,o+1)}function a(e){if(i(e,"object")||i(e,"array"))return e;const t=p(e,"{","}"),n=p(e,"[","]");if(!t&&!n)return e;const c=t?{}:[],y={};let b=function(e){const t=e.match(/^(\[|\{)(.*?)(\]|\})$/);return t?t[2].trim():e}(e);const d=(e=!1)=>{for(;;){let t=e?u(b,"{","}"):u(b);if(!t)break;let n=`__${r()}__`;y[n]=t,b=b.replace(t,n)}};return d(),d(!0),l(b).forEach(((e,n)=>{const r=e.includes(":")&&t,i=r?l(e,":"):[],u=f(function(e,t=null){return null!==o(e)||"boolean"==typeof e?e:s(e)?t:e}(i[0],n));(e=r?i[1]:e)in y&&(e=a(y[e])),e=function(e){const t=o(e);return null!==t?t:e}(f(e)),t?c[u]=e:c.push(e)})),c}function l(e,t=","){if("string"!=typeof e)return e;if(s(e))return[];let n=(e=c(e)).split(t).map((e=>c(e)));return 1===n.length&&""===n[0]?[e]:n}function f(e){return"string"!=typeof e?e:e.replace(/`|'|"/g,"")}function p(e,t=null,n=null){return(!t||e.startsWith(t))&&(!n||e.endsWith(n))}const y=new Map([["array",e=>i(e,"array")],["bigInt",e=>"bigint"==typeof e],["boolean",e=>"boolean"==typeof e],["date",e=>e instanceof Date],["float",e=>"number"==typeof e&&!Number.isInteger(e)],["function",e=>"function"==typeof e],["int",e=>Number.isInteger(e)],["map",e=>e instanceof Map],["null",e=>null===e],["number",e=>"number"==typeof e],["object",e=>i(e,"object")],["promise",e=>e instanceof Promise],["regExp",e=>e instanceof RegExp],["set",e=>e instanceof Set],["string",e=>"string"==typeof e],["symbol",e=>"symbol"==typeof e],["undefined",e=>void 0===e],["weakMap",e=>e instanceof WeakMap],["weakSet",e=>e instanceof WeakSet]]),b=new Map,d=new Map;function h(e){throw new Error(`Type Error: "${e}" is not supported`)}function g(e){if(i(e,"array")||i(e,"object"))return i(e);const t=e.trim();return p(t,"[","]")?"array":p(t,"{","}")?"object":"basic"}const m=e=>{return t=e,d.has(t)?d.get(t):t.split("|").reduce(((e,n)=>{let r=!1,s=n.trim();s.endsWith("?")&&(s=s.slice(0,-1),r=!0);const o=y.get(s)??h(s);return o&&e.push(o),r&&e.push(y.get("null"),y.get("undefined")),d.set(t,e),e}),[]);var t},w=e=>{const t=[];return a(e).forEach((e=>{t.push(k(e))})),t},j=e=>new class{constructor(){return this.testUnit=new Map([["tests",new Map],["optionalKeys",[]],["testFew",[]],["testAllAny",!1],["testOnly",!1]]),this.handleObject()}checkOptionalKey(e){return e.endsWith("?")&&(e=e.slice(0,-1),this.testUnit.get("optionalKeys").push(e)),e}checkTheAnyKey(e){if("any"in e){const t=Object.keys(e);1===t.length?this.testUnit.set("testAllAny",!0):this.testUnit.set("testFew",t.filter((e=>"any"!==e)))}}handleObject(){const t=a(e);this.checkTheAnyKey(t);for(const e in t){const n=this.checkOptionalKey(e),r=t[e];"..."!==r?this.testUnit.get("tests").set(n,k(r)):(delete t[e],this.testUnit.set("testOnly",!0))}return this.testUnit}};function k(e){if(b.has(e))return b.get(e);let t=new Map([["testMethod",g(e)],["tests",null]]);switch(t.get("testMethod")){case"basic":t.set("tests",m(e));break;case"array":t.set("tests",w(e));break;case"object":const n=j(e);t=new Map([...t,...n]);break;default:h(e)}return b.set(e,t),t}const M=(e,t)=>{if(!y.has(e))return y.set(e,t),!0;throw new Error(`Type Error: "${e}" already exists`)};return t})()));