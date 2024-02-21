"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subcategories", {
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
        // unique: true,
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
      categoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
        references: {
          model: "categories",
          key: "id",
        },
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
    await queryInterface.dropTable("subcategories");
  },
};
