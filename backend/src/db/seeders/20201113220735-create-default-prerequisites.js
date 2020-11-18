const tableNames = require('db/tableNames');
const {PREREQUISITE, PREREQUISITE_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.PREREQUISITE, PREREQUISITE, PREREQUISITE_IDS);