'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('workingTimes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            dayOfTheWeek: {
                type: Sequelize.INTEGER,
            },
            startTime: {
                type: Sequelize.TIME,
            },
            endTime: {
                type: Sequelize.TIME,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('workingTimes');
    },
};
