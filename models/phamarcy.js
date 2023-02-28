'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pharmacy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Pharmacy.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'pharmacies',
            modelName: 'Pharmacy',
        }
    );
    return Pharmacy;
};
