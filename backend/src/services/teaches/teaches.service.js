const createService = require('feathers-sequelize');
const createModel = require('./teaches.db');
const hooks = require('./teaches.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/teaches', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('teaches');

  service.hooks(hooks);
};