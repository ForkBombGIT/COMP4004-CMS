// const {authenticate} = require("@feathersjs/authentication").hooks;

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

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [upsert()],
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