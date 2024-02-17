"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sessions", {
      sid: {
        type: Sequelize.DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
        // autoIncrement: true
      },
      expires: {
        type: Sequelize.DataTypes.DATE,
      },
      data: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("sessions");
  },
};
