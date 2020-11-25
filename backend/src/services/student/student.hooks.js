// const {authenticate} = require("@feathersjs/authentication").hooks;
const { paramsFromClient } = require('feathers-hooks-common');

// GET /my-service?name=John&include=1
const includeCourse = () => (context) => {
  console.log(context.params.models);
  if (context.params.models && context.params.models.includes('course')) {
    const courseModel = context.app.services.course.Model;

    context.params.sequelize = {
      raw: false,
      include: [{
        model: courseModel
      }],
    };
  }
  return context;
};

module.exports = {
  before: {
    all: [paramsFromClient('models','data')],
    find: [includeCourse()],
    get: [],
    create: [],
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