const tableNames = require('db/tableNames');
const {PREREQUISITES, PREREQUISITES_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.PREREQUISITES, PREREQUISITES, PREREQUISITES_IDS);