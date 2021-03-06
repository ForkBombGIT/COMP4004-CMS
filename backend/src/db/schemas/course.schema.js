
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
  time_slot: {
    type: DataTypes.STRING
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'unscheduled'
  },
});