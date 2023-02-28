'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('reservations', 'status', {
      type: Sequelize.STRING
    })

  },

  async down (queryInterface, Sequelize) {

}
}