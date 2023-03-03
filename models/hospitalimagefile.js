'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HospitalImageFile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Hospital }) {
            // define association here
            this.belongsTo(Hospital, { foreignKey: 'hospitalId', as: 'hospitalImageFiles' });
        }
    }
    HospitalImageFile.init(
        {
            hospitalId: DataTypes.INTEGER,
            url: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'hospitalImageFiles',
            modelName: 'HospitalImageFile',
        }
    );
    return HospitalImageFile;
};
