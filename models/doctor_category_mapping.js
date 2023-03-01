'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorCategoryMapping extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Category, Doctor }) {
            // define association here
            this.belongsTo(Category, { foreignKey: 'categoryId', as: 'categories' });
            this.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctors' });
        }
    }
    DoctorCategoryMapping.init(
        {
            doctorId: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'doctors_categories_mappings',
            modelName: 'DoctorCategoryMapping',
        }
    );
    return DoctorCategoryMapping;
};
