const tableNames = require('db/tableNames');
const {STUDENT, STUDENT_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.STUDENT, STUDENT, STUDENT_IDS);