'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return [
      queryInterface.addColumn("workingTimes", "startDate", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("workingTimes", "endDate", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('workingTimes', 'deletedAt', {
        type: Sequelize.DATE,
        allowNull: false,
    })
    ];
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
