const tableNames = require('db/tableNames');
const {ENROLLED, ENROLLED_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.ENROLLED, ENROLLED, ENROLLED_IDS);