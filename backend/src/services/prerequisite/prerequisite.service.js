const createService = require('feathers-sequelize');
const createModel = require('./prerequisite.db');
const hooks = require('./prerequisite.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/prerequisite', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('prerequisite');

  service.hooks(hooks);
};