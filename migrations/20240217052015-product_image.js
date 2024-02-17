"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_image", {
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      imageId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
        references: {
          model: "images",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
        references: {
          model: "products",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_image");
  },
};
