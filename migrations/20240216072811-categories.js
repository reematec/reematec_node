"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      pagetitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      showSubMenu: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      showOnHomepage: {
        type: Sequelize.DataTypes.BOOLEAN,
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
    await queryInterface.dropTable("categories");
  },
};
