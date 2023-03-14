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
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // Promise.all([queryInterface.removeColumn('hospitals', 'longitude')]);
        // return Promise.all([queryInterface.removeColumn('hospitals', 'latitude')]);
    },
};
