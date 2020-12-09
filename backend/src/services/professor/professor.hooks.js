const { paramsFromClient } = require('feathers-hooks-common');
const { createUserCredential, updateUserEmail } = require('utils/helpers.js');
const errors = require('@feathersjs/errors');

const validateEmail = () => (context) => {
  if (context.params.data !== undefined) {
    const email = context.params.data.email;
    if (email) {
      return context;
    } else throw new errors.GeneralError('Failure, missing dates');
  } else return context;
};

const createLoginCredentials = () => async (context) => {
  const email = context.params.data.email;
  if (email) {
    const creds = await createUserCredential(context,'professor',email);
    if (creds === null) {
      throw new errors.GeneralError('Failure, creating credentials unsuccessful'); 
    }
    return creds;
  }
};

const updateEmail = () => async (context) => {
  const email = context.params.data.email;
  console.log(context);
  if (email) {
    console.log(email);
    const creds = await updateUserEmail(context,'professor',email);
    if (creds === null) {
      throw new errors.GeneralError('Failure, creating credentials unsuccessful'); 
    }
    return creds;
  }
};

module.exports = {
  before: {
    all: [paramsFromClient('data')],
    find: [],
    get: [],
    create: [validateEmail()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createLoginCredentials()],
    update: [],
    patch: [updateEmail()],
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