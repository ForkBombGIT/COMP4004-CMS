const createService = require('feathers-sequelize');
const createModel = require('./prerequisites.db');
const hooks = require('./prerequisites.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/prerequisites', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('prerequisites');

  service.hooks(hooks);
};