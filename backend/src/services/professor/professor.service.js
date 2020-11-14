const createService = require('feathers-sequelize');
const createModel = require('./professor.db');
const hooks = require('./professor.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/professor', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('professor');

  service.hooks(hooks);
};