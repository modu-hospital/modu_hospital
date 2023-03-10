'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hospital, Review, Reservation}) {
      // define association here
      this.hasMany(Hospital, {foreignKey: 'hospitalId', as:'hospitals'});
      this.hasMany(Review, {foreignKey: 'userId', as:'reviews'});
      this.hasMany(Reservation, {foreignKey: 'userId', as: 'reservations'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    loginId: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};