const createService = require('feathers-sequelize');
const createModel = require('./submits.db');
const hooks = require('./submits.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model ,
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/submits', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('submits');

  service.hooks(hooks);
};