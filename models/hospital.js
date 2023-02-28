'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Doctor, User, Review, Reservation, HospitalImageFile}) {
      // define association here
      this.belongsTo(Doctor, {foreignKey: 'doctorId', as: 'doctors'});
      this.belongsTo(User, { foreignKey: 'userId', as:'users'});
      this.belongsTo(Review, {foreignKey: 'hospitalId', as:'reviews'});
      this.belongsTo(Reservation, {foreignKey:'hospitalId', as:'reservations'});
      this.belongsTo(HospitalImageFile, {foreignKey:'hospitalId', as:'hospitalImageFiles'});

    }
  }
  Hospital.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    tableName:'hospitals',
    modelName: 'Hospital',
  });
  return Hospital;
};