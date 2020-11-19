const createService = require('feathers-sequelize');
const createModel = require('./application.db');
const hooks = require('./application.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model
  };

  // Initialize our service with any options it requires
  app.use('/application', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('application');

  service.hooks(hooks);
};