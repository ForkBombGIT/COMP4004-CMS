// const {authenticate} = require("@feathersjs/authentication").hooks;
const errors = require('@feathersjs/errors');

const validatePrerequisite = () => async (context) => {
  const query = {
    prerequisite_course_id: context.data.prerequisite_course_id,
    course_id: context.data.courseId,
  };
  const prereqs = await context.app.service('prerequisite').find({query});
  if (prereqs.length !== 0) {
    throw new errors.GeneralError('Failure, prerequisite exists!');
  } else return context;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validatePrerequisite()],
    update: [],
    patch: [validatePrerequisite()],
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