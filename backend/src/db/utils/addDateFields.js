/* This is useful for adding the date fields to the schemas as part of the migrations,
 * since creating the actual Sequelize models with `sequelize.define` automatically
 * adds the date fields. */
const addDateFields = (Sequelize, schema) => ({
  ...schema(Sequelize),
  created_at: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

module.exports = addDateFields;
