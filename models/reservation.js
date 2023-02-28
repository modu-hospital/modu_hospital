'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Doctor, User}) {
      // define association here
      this.hasMany(Doctor, {foreignKey: 'DoctorId', as:'doctors'});
      this.hasMany(User, {foreignKey:'userId', as: 'users'});
    }
  }
  Reservation.init({
    doctorId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    relationship: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    date: DataTypes.DATE,
    contents: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'reservations',
    modelName: 'Reservation',
  });
  return Reservation;
};