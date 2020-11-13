const tableNames = require('db/tableNames');
const {PROFESSOR, PROFESSOR_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.PROFESSOR, PROFESSOR, PROFESSOR_IDS);