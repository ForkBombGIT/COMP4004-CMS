const createService = require('feathers-sequelize');
const createModel = require('./deliverable.db');
const hooks = require('./deliverable.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/deliverable', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('deliverable');

  service.hooks(hooks);
};