"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("images", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      src: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      ext: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      altText: {
        type: Sequelize.DataTypes.STRING,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
      caption: {
        type: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable("images");
  },
};
