'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'userId', as: 'users' });
        }
    }
    RefreshToken.init(
        {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'refreshTokens',
            modelName: 'RefreshToken',
        }
    );
    return RefreshToken;
};
