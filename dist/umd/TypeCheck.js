!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("TypeCheck",[],e):"object"==typeof exports?exports.TypeCheck=e():t.TypeCheck=e()}(self,(()=>(()=>{"use strict";var t={d:(e,s)=>{for(var n in s)t.o(s,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{TypeCheck:()=>C,_tc:()=>K,_tcx:()=>x,_typeCheck:()=>M,default:()=>C,typeCheck:()=>C,validType:()=>E});const s={};(()=>{if("undefined"!=typeof window){const t={childList:!0,subtree:!0};new MutationObserver((t=>{for(const e of t)if("childList"===e.type)for(const t in s)s[t]()})).observe(document.body,t)}})();const n=function(){return"kn__"+(new Date).getTime()+"__"+Math.floor(899*Math.random())};function r(t){return null==t||("string"==typeof t||Array.isArray(t)?0===t.length:t instanceof Map||t instanceof Set?0===t.size:ArrayBuffer.isView(t)?0===t.byteLength:"object"==typeof t&&0===Object.keys(t).length)}function i(t){const e=typeof t;switch(t){case null:case void 0:case"":return null;case"0":case 0:return 0;default:if(!("number"!==e&&"string"!==e||"number"!=typeof t&&Number.isNaN(Number(t))))return+t}return null}function o(t,e){if(null===t)return e?null===e||"null"===e:"null";let s;switch(typeof t){case"number":case"string":case"boolean":case"undefined":case"bigint":case"symbol":case"function":s=typeof t;break;case"object":s=Array.isArray(t)?"array":"object";break;default:s="unknown"}return e?e===s:s}function l(t,...e){if(t)return"string"!=typeof t?t:e.reduce(((t,e)=>{const s=e instanceof RegExp?e:new RegExp((n=e)instanceof RegExp?n:n.split("").map((t=>["$","^",".","*","+","?","(",")","[","]","{","}","|","\\"].includes(t)?`\\${t}`:t)).join(""));var n;return t.replace(s,"")}),t).trim()}function c(t,e="[",s="]"){if("string"!=typeof t)return t;const n=t.lastIndexOf(e);if(-1===n)return null;const r=t.substring(n),i=r.indexOf(s);return-1===i?null:r.substring(0,i+1)}function u(t){if(o(t,"object")||o(t,"array"))return t;const e=f(t,"{","}"),s=f(t,"[","]");if(!e&&!s)return t;const l=e?{}:[],p={};let y=function(t){const e=t.match(/^(\[|\{)(.*?)(\]|\})$/);return e?e[2].trim():t}(t);const b=(t=!1)=>{for(;;){let e=t?c(y,"{","}"):c(y);if(!e)break;let s=`__${n()}__`;p[s]=e,y=y.replace(e,s)}};return b(),b(!0),a(y).forEach(((t,s)=>{const n=t.includes(":")&&e,o=n?a(t,":"):[],c=h(function(t,e=null){return null!==i(t)||"boolean"==typeof t?t:r(t)?e:t}(o[0],s));(t=n?o[1]:t)in p&&(t=u(p[t])),t=function(t){const e=i(t);return null!==e?e:t}(h(t)),e?l[c]=t:l.push(t)})),l}function a(t,e=","){if("string"!=typeof t)return t;if(r(t))return[];let s=(t=l(t)).split(e).map((t=>l(t)));return 1===s.length&&""===s[0]?[t]:s}function h(t){return"string"!=typeof t?t:t.replace(/`|'|"/g,"")}function f(t,e=null,s=null){return(!e||t.startsWith(e))&&(!s||t.endsWith(s))}const p=new Map([["array",t=>o(t,"array")],["bigInt",t=>"bigint"==typeof t],["boolean",t=>"boolean"==typeof t],["date",t=>t instanceof Date],["float",t=>"number"==typeof t&&!Number.isInteger(t)],["function",t=>"function"==typeof t],["int",t=>Number.isInteger(t)],["map",t=>t instanceof Map],["null",t=>null===t],["number",t=>"number"==typeof t],["object",t=>o(t,"object")],["promise",t=>t instanceof Promise],["regExp",t=>t instanceof RegExp],["set",t=>t instanceof Set],["string",t=>"string"==typeof t],["symbol",t=>"symbol"==typeof t],["undefined",t=>void 0===t],["weakMap",t=>t instanceof WeakMap],["weakSet",t=>t instanceof WeakSet]]),y=new Map,b=new Map;function g(t){throw new Error(`Type Error: "${t}" is not supported`)}function d(t){if(o(t,"array")||o(t,"object"))return o(t);const e=t.trim();return f(e,"[","]")?"array":f(e,"{","}")?"object":"basic"}const O=t=>new class{constructor(){return this.testUnit=new Map([["tests",new Map],["optionalKeys",[]],["testFew",[]],["testAllAny",!1],["testOnly",!1]]),this.handleObject()}checkOptionalKey(t){return t.endsWith("?")&&(t=t.slice(0,-1),this.testUnit.get("optionalKeys").push(t)),t}checkTheAnyKey(t){if("any"in t){const e=Object.keys(t);1===e.length?this.testUnit.set("testAllAny",!0):this.testUnit.set("testFew",e.filter((t=>"any"!==t)))}}handleObject(){const e=u(t);this.checkTheAnyKey(e);for(const t in e){const s=this.checkOptionalKey(t),n=e[t];"..."!==n?this.testUnit.get("tests").set(s,w(n)):(delete e[t],this.testUnit.set("testOnly",!0))}return this.testUnit}};function w(t){if(y.has(t))return y.get(t);let e=new Map([["testMethod",d(t)],["tests",null]]);switch(e.get("testMethod")){case"basic":e.set("tests",(s=t,b.has(s)?b.get(s):s.split("|").reduce(((t,e)=>{let n=!1,r=e.trim();r.endsWith("?")&&(r=r.slice(0,-1),n=!0);const i=p.get(r)??g(r);return i&&t.push(i),n&&t.push(p.get("null"),p.get("undefined")),b.set(s,t),t}),[])));break;case"array":e.set("tests",(t=>{const e=[];return u(t).forEach((t=>{e.push(w(t))})),e})(t));break;case"object":const n=O(t);e=new Map([...e,...n]);break;default:g(t)}var s;return y.set(t,e),e}const j=[],k=new Map;class m{constructor(t,e){const{testOnly:s,testFew:n,testAllAny:r,optionalKeys:i,tests:o}=[...e.entries()].reduce(((t,[e,s])=>({...t,[e]:s})),{});this.testUnitKeys=[...o.keys()],this.testOnly=s,this.testFew=n,this.testAllAny=r,this.optionalKeys=i,this.testCollection=o,this.inputObject=t}handleUnitTest(){switch(!0){case this.testAllAny:return this.testObjAllAny();case!r(this.testFew):const t=this.testObjFew();return this.filterOutFew(),t&&this.testObjAllAny();case!r(this.optionalKeys):const e=this.testObjOptionalKeys();return this.filterOutOptionalKeys(),e&&this.defaultTest();case!this.testOnly:for(const t in this.inputObject)if(!this.testCollection.has(t))return!1}return this.defaultTest()}filterOutOptionalKeys(){this.testUnitKeys=this.testUnitKeys.filter((t=>!this.optionalKeys.includes(t)))}filterOutFew(){this.inputObject=Object.fromEntries(Object.entries(this.inputObject).filter((([t])=>!this.testFew.includes(t))))}testObjOptionalKeys(){return this.optionalKeys.every((t=>{const e=this.testCollection.get(t),s=this.inputObject[t];return!s||T(s,e)}))}testObjFew(){return this.testFew.every((t=>{const e=this.testCollection.get(t);return T(this.inputObject[t],e)}))}testObjAllAny(){const t=Object.values(this.inputObject);return 0===t.length?T(null,this.testCollection.get("any")):t.every((t=>T(t,this.testCollection.get("any"))))}defaultTest(){return this.testUnitKeys.every((t=>{const e=this.testCollection.get(t);return T(this.inputObject[t],e)}))}}const v=(t,e)=>!!o(t,"object")&&new m(t,e).handleUnitTest();function T(t,e){const s=e.get("testMethod"),n=e.get("tests");switch(s){case"basic":return((t,e)=>e.some((s=>{const n=s(t);return n||j.push({value:t,tests:String(e),found:o(t)}),n})))(t,n);case"array":return((t,e)=>!(!o(t,"array")||0===t.length)&&e.every(((e,s)=>T(t[s],e))))(t,n);case"object":return v(t,e);default:return!1}}function A(t){if(t){if(k.has(t))return k.get(t);let e=null;switch(typeof t){case"function":e={callback:t};break;case"object":e=t;break;case"string":switch(t){case"log":e={log:!0};break;case"fail":e={fail:!0};break;case"return":e={return:!0};break;case"validOutput":e={validOutput:t}}}return k.set(t,e),e}return{log:!1,fail:!1,return:!1,validOutput:!1,callback:null}}const M=(t,e,s)=>new class{constructor(){this.unitTest=w(e),this.testResult=T(t,this.unitTest),this.bool=this.testResult,this.settings=A(s),this.callback=this.settings.callback??null,this.testData={typeExp:e,inputVal:t,inputType:o(t),callback:this.callback,unitTest:this.unitTest,testResult:this.testResult},this.settings.log&&this.log(),this.settings.fail&&this.fail(),this.callback&&this.callback(this.testData)}test(){return this.testResult}log(){return console.log("-------------------------- \n ::: Test Data Info :::"),console.table(this.testData),this}fail(){return this.testResult?this:(this.log(),this.settings?.error&&console.log("-----\x3e Error: ",this.settings.error),function(t){const e=j[j.length-1];throw console.log("::::::::::::: Type error or not valid ::::::::::::::"),console.log("Input Value used: ",t),console.log("---\x3e Value Found:",e.found),console.log("---\x3e Test Permormed:",e.tests),j.length=0,new Error(`Type Error: "${e.value}" is not valid, see log console for details`,!1,!1)}(t))}return(){return t}},K=(t,e,s={})=>(...n)=>(s={fail:!0,...s},M(n,t,s),e(...n)),x=(t,e,s)=>{let n=A(s);return n={fail:!0,...n},(...s)=>new class{constructor(){return this.args=s,this.testResults=M(s,t,n),this.default()}default(){this.returns=e(...s);const t=n.validOutput??!1;return t&&M(this.returns,t,"fail"),this}log(){return this.testResults.log(),this}fail(){return this.testResults.fail(),this}return(){return this.returns}}},E=(t,e)=>M(t,e).test(),C=(t,e,s=null)=>M(t,e,s).fail();return e})()));