const { paramsFromClient } = require('feathers-hooks-common');

const includeStudent = () => (context) => {
  if (context.params.models && context.params.models.includes('student')) {
    const studentModel = context.app.services.student.Model;

    context.params.sequelize = {
      raw: false,
      include: [{
        model: studentModel
      }],
    };
  }
  return context;
};

const includeDeliverable = () => (context) => {
  if (context.params.models && context.params.models.includes('deliverable')) {
    const model = context.app.services.deliverable.Model;

    context.params.sequelize = {
      raw: false,
      include: [{
        model: model
      }],
    };
  }
  return context;
};

module.exports = {
  before: {
    all: [paramsFromClient('models','data'), includeDeliverable()],
    find: [includeStudent() ],
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