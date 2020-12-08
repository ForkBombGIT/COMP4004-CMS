const { paramsFromClient } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');

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

const validateCourseData = () => (context) => {
  const registrationDate = context.params.data.courseRegistrationDate;
  const withdrawDate = context.params.data.courseWithdrawDate;
  if (withdrawDate && registrationDate) {
    return context;
  } else throw new errors.GeneralError('Failure, missing dates');
};

const createCourseDeadlines = () => (context) => {
  const registrationDate = context.params.data.courseRegistrationDate;
  const withdrawDate = context.params.data.courseWithdrawDate;
  if (registrationDate) {
    context.app.service('academicDeadline').create({
      type: 'registration',
      due_date: registrationDate,
      courseId: context.result.id,
    });
  }
  if (withdrawDate) {
    context.app.service('academicDeadline').create({
      type: 'withdraw',
      due_date: withdrawDate,
      courseId: context.result.id,
    });
  }
};

module.exports = {
  before: {
    all: [paramsFromClient('models','data'), includeDeliverable()],
    find: [includeStudent() ],
    get: [],
    create: [validateCourseData()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createCourseDeadlines()],
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