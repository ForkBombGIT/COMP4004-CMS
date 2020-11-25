const createService = require('feathers-sequelize');
const createModel = require('./enrolled.db');
const hooks = require('./enrolled.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model,
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/enrolled', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('enrolled');

  service.hooks(hooks);
};