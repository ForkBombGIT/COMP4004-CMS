module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_number: {
    type: DataTypes.STRING
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});