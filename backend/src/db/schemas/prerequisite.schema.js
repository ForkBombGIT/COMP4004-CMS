module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
  },
  prerequisite_course_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});