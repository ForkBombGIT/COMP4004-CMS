const tableNames = require('db/tableNames');
const {DELIVERABLE, DELIVERABLE_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.DELIVERABLE, DELIVERABLE, DELIVERABLE_IDS);