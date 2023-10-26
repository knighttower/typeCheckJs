// Single Modules and Aliases from: TestBuilder
const { addTypeTest } = require('./src/TestBuilder.js');
// Default Module from: TestBuilder
const testBuilder = require('./src/TestBuilder.js');
// Single Modules and Aliases from: TypeCheck
const { _tc, _tcx, validType } = require('./src/TypeCheck.js');
// Default Module from: TypeCheck
const typeCheck = require('./src/TypeCheck.js');
// Single Modules and Aliases from: types
const { typesMap } = require('./src/types.js');

 module.exports = { 
 addTypeTest,
testBuilder,
_tc,
_tcx,
validType,
typeCheck,
typesMap 
 };