'use strict';
const { Model } = require('sequelize');
const refreshtoken = require('./refreshtoken');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Hospital, Review, Reservation, RefreshToken}) {
            // define association here
            this.hasMany(Hospital, { foreignKey: 'hospitalId', as: 'hospitals' });
            this.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
            this.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
            this.belongsTo(RefreshToken, {foreignKey: 'userId', as: 'refreshtokens'})
        }
    }
    User.init(
        {
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            loginId: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            idNumber: DataTypes.STRING,
            address: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
        }
    );
    return User;
};
