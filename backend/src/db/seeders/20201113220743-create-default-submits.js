const tableNames = require('db/tableNames');
const {SUBMITS, SUBMITS_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.SUBMITS, SUBMITS, SUBMITS_IDS);