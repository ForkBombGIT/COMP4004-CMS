const tableNames = require('db/tableNames');
const {ADMINISTRATOR, ADMINISTRATOR_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.ADMINISTRATOR, ADMINISTRATOR, ADMINISTRATOR_IDS);