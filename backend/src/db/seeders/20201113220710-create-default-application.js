const tableNames = require('db/tableNames');
const {APPLICATION, APPLICATION_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.APPLICATION, APPLICATION, APPLICATION_IDS);