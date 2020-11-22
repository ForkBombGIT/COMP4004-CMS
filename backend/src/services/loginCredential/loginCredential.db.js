const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const { loginCredentialSchema } = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const loginCredential = sequelizeClient.define(
    tableNames.LOGIN_CREDENTIAL,
    loginCredentialSchema(DataTypes),
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
      underscored: true
    }
  );

  loginCredential.associate = function (models) {
    loginCredential.belongsTo(models.student,{
      allowNull: false
    });
    loginCredential.belongsTo(models.professor,{
      allowNull: false
    });
    loginCredential.belongsTo(models.administrator,{
      allowNull: false
    });
  };

  return loginCredential;
}; 