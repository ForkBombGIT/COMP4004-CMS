// const {authenticate} = require("@feathersjs/authentication").hooks;
const { hashPassword } = require('@feathersjs/authentication-local').hooks; 

const output = () => (context) => {
  return context;
};

module.exports = {
  before: {
    all: [output()],
    find: [],
    get: [],
    create: [hashPassword('password')],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};