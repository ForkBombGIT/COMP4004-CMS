module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
  },
  grade: {
    type: DataTypes.INTEGER
  },
  submission: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
});