const tableNames = require('db/tableNames');
const {TEACHES, TEACHES_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.TEACHES, TEACHES, TEACHES_IDS);