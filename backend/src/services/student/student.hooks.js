// const {authenticate} = require("@feathersjs/authentication").hooks;
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
    const creds = await createUserCredential(context,'student',email);
    if (creds === null) {
      throw new errors.GeneralError('Failure, creating credentials unsuccessful'); 
    }
    return creds;
  }
};

const updateEmail = () => async (context) => {
  const email = context.params.data.email;
  if (email) {
    const creds = await updateUserEmail(context,'student',email);
    if (creds === null) {
      throw new errors.GeneralError('Failure, creating credentials unsuccessful'); 
    }
    return creds;
  }
};


const includeCourse = () => (context) => {
  if (context.params.models && context.params.models.includes('course')) {
    const courseModel = context.app.services.course.Model;

    context.params.sequelize = {
      raw: false,
      include: [{
        model: courseModel,
      }],
    };
  }
  return context;
};

const includeCourseWithQuery = () => (context) => {
  if (context.params.models && context.params.models.includes('courseWithQuery')) {
    const courseModel = context.app.services.course.Model;

    context.params.sequelize = {
      raw: false,
      include: [{
        model: courseModel,
        where: { id: context.params.data }
      }],
    };
  }
  return context;
};

module.exports = {
  before: {
    all: [paramsFromClient('models','data')],
    find: [includeCourse(), ],
    get: [includeCourseWithQuery()],
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