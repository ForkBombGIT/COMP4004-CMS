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
  if (context.params.data !== undefined) {
    const registrationDate = context.params.data.courseRegistrationDate;
    const withdrawDate = context.params.data.courseWithdrawDate;
    if (withdrawDate && registrationDate) {
      return context;
    } else throw new errors.GeneralError('Failure, missing dates');
  } else return context;
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

const updateCourseDeadlines = () => (context) => {
  if (context.params.data !== undefined) {
    const registrationDate = context.params.data.courseRegistrationDate;
    const withdrawDate = context.params.data.courseWithdrawDate;
    if (registrationDate) {
      context.app.service('academicDeadline').find({
        query: {
          type: 'registration',
          courseId: context.result.id,
        }
      }).then(deadline => {
        console.log(deadline[0].id);
        context.app.service('academicDeadline').patch(
          deadline[0].id,{
            due_date: registrationDate,
          });
      }).catch(() => {
        context.app.service('academicDeadline').create({
          type: 'registration',
          due_date: registrationDate,
          courseId: context.result.id,
        });
      });
    }
    if (withdrawDate) {
      context.app.service('academicDeadline').find({
        query: {
          type: 'withdraw',
          courseId: context.result.id,
        }
      }).then(deadline => {
        console.log(deadline[0].id);
        context.app.service('academicDeadline').patch(
          deadline[0].id,{
            due_date: withdrawDate,
          });
      }).catch(() => {
        context.app.service('academicDeadline').create({
          type: 'withdraw',
          due_date: withdrawDate,
          courseId: context.result.id,
        });
      });
    }
  }
};

module.exports = {
  before: {
    all: [paramsFromClient('models','data'), includeDeliverable()],
    find: [includeStudent() ],
    get: [],
    create: [validateCourseData()],
    update: [],
    patch: [validateCourseData()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createCourseDeadlines()],
    update: [],
    patch: [updateCourseDeadlines()],
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