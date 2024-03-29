'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ DoctorCategoryMapping }) {
            // define association here
            this.hasMany(DoctorCategoryMapping, {
                foreignKey: 'categoryId',
                as: 'categoriesMapping',
            });
        }
    }
    Category.init(
        {
            department: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'categories',
            modelName: 'Category',
        }
    );
    return Category;
};
