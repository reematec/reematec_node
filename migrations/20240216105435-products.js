"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
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
      showcased: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      recommended: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      year: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      pagetitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      shortDescription: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      LongDescription: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      specifications: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      features: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      care: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      usage: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
        references: {
          model: "categories",
          key: "id",
        },
      },
      subCategoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
        references: {
          model: "subCategories",
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
    await queryInterface.dropTable("products");
  },
};
