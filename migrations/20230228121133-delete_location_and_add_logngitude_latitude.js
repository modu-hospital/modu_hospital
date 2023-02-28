'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('hospitals', 'longitude', {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }),
      queryInterface.addColumn('hospitals', 'latitude', {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }),
    ]);
  },
};
