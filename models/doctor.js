'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ DoctorCategoryMapping, Hospital, WorkingTime, Reservation }) {
            // define association here
            this.hasMany(DoctorCategoryMapping, {
                foreignKey: 'doctorId',
                as: 'doctorCategoryMappings',
            });
            this.belongsTo(Hospital, { foreignKey: 'hospitalId', as: 'hospitals' });
            this.hasMany(WorkingTime, { foreignKey: 'doctorId', as: 'workingTimes' });
            this.belongsTo(Reservation, { foreignKey: 'doctorId', as: 'reservations' });
        }
    }

    Doctor.init(
        {
            doctorId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            hospitalId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            contents: DataTypes.STRING,
        },
        {
            sequelize,
            timestamps: true, // createAt & updateAt 활성화
            paranoid: true, //timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
            tableName: 'doctors',
            modelName: 'Doctor',
        }
    );
    return Doctor;
};
