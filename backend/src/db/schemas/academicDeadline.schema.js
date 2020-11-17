module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
  },
  type: {
    type: DataTypes.STRING
  },
  due_date: {
    type: DataTypes.DATE
  }
});