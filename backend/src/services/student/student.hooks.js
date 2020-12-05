// const {authenticate} = require("@feathersjs/authentication").hooks;
const { paramsFromClient } = require('feathers-hooks-common');

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