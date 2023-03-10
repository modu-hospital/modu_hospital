'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkingTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(Doctor, {foreignKey: 'doctorId', as: 'doctors'});
    }
  }
  WorkingTime.init({
    doctorId: DataTypes.INTEGER,
    dayOfTheWeek: DataTypes.INTEGER,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME
  }, {
    sequelize,
    tableName: 'workingTimes',
    modelName: 'WorkingTime',
  });
  return WorkingTime;
};