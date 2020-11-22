const tableNames = require('db/tableNames');
const {LOGIN_CREDENTIAL, LOGIN_CREDENTIAL_IDS} = require('db/seedData');
const {seederGenerator} = require('db/utils');

module.exports = seederGenerator(tableNames.LOGIN_CREDENTIAL, LOGIN_CREDENTIAL, LOGIN_CREDENTIAL_IDS);