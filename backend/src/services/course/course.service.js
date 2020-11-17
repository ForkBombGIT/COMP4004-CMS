const createService = require('feathers-sequelize');
const createModel = require('./course.db');
const hooks = require('./course.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/course', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('course');

  service.hooks(hooks);
};