'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Hospital extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Doctor, User, Review, HospitalImageFile }) {
            // define association here
            this.hasMany(Doctor, { foreignKey: 'hospitalId', as: 'doctors' });
            this.belongsTo(User, { foreignKey: 'userId', as: 'users' });
            this.belongsTo(Review, { foreignKey: 'hospitalId', as: 'reviews' });
            this.belongsTo(HospitalImageFile, {
                foreignKey: 'hospitalId',
                as: 'hospitalImageFiles',
            });
        }
    }
    Hospital.init(
        {
            hospitalId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            longitude: DataTypes.DOUBLE,
            latitude: DataTypes.DOUBLE,
        },
        {
            sequelize,
            tableName: 'hospitals',
            modelName: 'Hospital',
        }
    );
    return Hospital;
};
