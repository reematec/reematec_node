"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      displayName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      firstname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      lastname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      role: {
        type: Sequelize.DataTypes.STRING,
      },
      token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      expiresIn: {
        type: Sequelize.DataTypes.DATE,
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
    await queryInterface.dropTable("users");
  },
};
