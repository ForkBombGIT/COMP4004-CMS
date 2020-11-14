const createService = require('feathers-sequelize');
const createModel = require('./student.db');
const hooks = require('./student.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/student', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('student');

  service.hooks(hooks);
};