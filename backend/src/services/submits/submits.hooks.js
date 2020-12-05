const errors = require('@feathersjs/errors');

const upsert = () => async (context) => {
  const {data, service} = context;

  // This hook is only for single creations
  if (Array.isArray(data)) {
    return context;
  }

  const response = await service.find({
    query: {
      studentId: data.studentId,
      deliverableId: data.deliverableId
    }
  });

  if (response.length || response.data && response.data.length) {
    context.result = await service.patch(response[0].id,
      data, 
      {
        query: {
          studentId: data.studentId,
          deliverableId: data.deliverableId
        }
      }
    );
  }
  return context;
};

const validateSubmission = () => async (context) => {
  Object.values(context.data).map((field) => {

    if (!field.length) {
      throw new errors.GeneralError('Failure, empty fields!');
    }
  });

  const response = await context.app.service('deliverable').get(context.data.deliverableId);

  if (new Date() > new Date(response.due_date)) {
    throw new errors.GeneralError('Failure, past due date!');
  }

  if (context.data.grade && !context.data.grade.match('^[1-9][0-9]?$|^100$')) {
    throw new errors.GeneralError('Failure, grade must be between 0-100!');
  }

  return context;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateSubmission(), upsert()],
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