const tableNames = require('db/tableNames');
const {COURSE, COURSE_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.COURSE, COURSE, COURSE_IDS);