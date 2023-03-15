'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passwordResetCases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userId', as:'users'})
    }
  }
  passwordResetCases.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'passwordResetCases',
    modelName: 'PasswordResetCase',
  });
  return passwordResetCases;
};