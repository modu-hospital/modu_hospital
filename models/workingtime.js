'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WorkingTime extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Doctor }) {
            this.hasMany(Doctor, { foreignKey: 'doctorId', as: 'doctors' });
        } //hasMany로 바꿔봄
    }
    WorkingTime.init(
        {
            doctorId: DataTypes.INTEGER,
            dayOfTheWeek: DataTypes.INTEGER,
            startTime: DataTypes.TIME,
            endTime: DataTypes.TIME,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
        },
        {
            sequelize,
            tableName: 'workingTimes',
            modelName: 'WorkingTime',
        }
    );
    return WorkingTime;
};
