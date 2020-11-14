const createService = require('feathers-sequelize');
const createModel = require('./administrator.db');
const hooks = require('./administrator.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/administrator', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('administrator');

  service.hooks(hooks);
};