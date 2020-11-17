const tableNames = require('db/tableNames');
const {ACADEMIC_DEADLINE, ACADEMIC_DEADLINE_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.ACADEMIC_DEADLINE, ACADEMIC_DEADLINE, ACADEMIC_DEADLINE_IDS);