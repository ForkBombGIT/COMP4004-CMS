const Sequelize = require('sequelize');
const tableNames = require('db/tableNames');
const {courseSchema} = require('db/schemas');

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const course = sequelizeClient.define(tableNames.COURSE, courseSchema(DataTypes), {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    underscored: true
  });

  course.associate = function(models) {
    course.belongsToMany(models.student, {through: models.enrolled, foreignKey: 'course_id'});
    course.belongsToMany(models.professor, {through: models.teaches, foreignKey: 'course_id'});
    // Need a new model coursePrereqs for this many to many relationship to work... 
    //course.belongsToMany(models.prerequisites, {through: models.coursePrereqs, foreignKey: 'course_id'});
    course.hasMany(models.deliverable);
    course.hasMany(models.academicDeadline);
  };

  return course;
};