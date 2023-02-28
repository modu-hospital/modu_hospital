'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Hospital }) {
            this.hasMany(User, { foreignKey: 'userId', as: 'users' });
            this.hasMany(Hospital, { foreignKey: 'hospitalId', as: 'hospitals' });
        }
    }
    Review.init(
        {
            userId: DataTypes.INTEGER,
            hospitalId: DataTypes.INTEGER,
            star: DataTypes.INTEGER,
            contents: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'reviews',
            modelName: 'Review',
        }
    );
    return Review;
};
