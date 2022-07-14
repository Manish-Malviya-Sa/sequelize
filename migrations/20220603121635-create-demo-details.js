'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DemoDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE  // CREATE USER 'root'@'localhost' IDENTIFIED BY 'Manish@123';

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DemoDetails');
  }
};