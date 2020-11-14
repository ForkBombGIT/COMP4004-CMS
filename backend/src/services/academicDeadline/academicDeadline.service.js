const createService = require('feathers-sequelize');
const createModel = require('./academicDeadline.db');
const hooks = require('./academicDeadline.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    Model 
  };

  // Initialize our service with any options it requires
  app.use('/academicDeadline', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('academicDeadline');

  service.hooks(hooks);
};