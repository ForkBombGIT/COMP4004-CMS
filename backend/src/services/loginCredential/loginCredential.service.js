const createService = require('feathers-sequelize');
const createModel = require('./loginCredential.db');
const hooks = require('./loginCredential.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/loginCredential', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('loginCredential');

  service.hooks(hooks);
}; 