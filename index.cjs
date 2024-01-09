// Single Modules and Aliases from: TestBuilder.cjs
const { addTypeTest, testBuilder } = require('./dist/cjs/TestBuilder.cjs');
// Single Modules and Aliases from: TypeCheck.cjs
const { TypeCheck, _tc, _tcx, _typeCheck, typeCheck, validType } = require('./dist/cjs/TypeCheck.cjs');
// Single Modules and Aliases from: types.cjs
const { typesMap } = require('./dist/cjs/types.cjs');

 module.exports = { 
 addTypeTest,
testBuilder,
TypeCheck,
_tc,
_tcx,
_typeCheck,
typeCheck,
validType,
typesMap 
 };