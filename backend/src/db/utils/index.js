const addDateFields = require('./addDateFields');
const { addForeignKey } = require('./addForeignKey');
const { addDeleteForeignKey } = require('./addForeignKey');
const seederGenerator = require('./seederGenerator');

module.exports = {
  addDateFields,
  addForeignKey,
  seederGenerator,
  addDeleteForeignKey
};
