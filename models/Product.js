const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelizeCN");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Image = require("../models/Image");
const Size = require("../models/Size");
const Tag = require("../models/Tag");

const Product = sequelize.define("product", {
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
  },
  subcategoryId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
  },
});

Category.hasMany(Product);
Product.belongsTo(Category);

SubCategory.hasMany(Product);
Product.belongsTo(SubCategory);

Image.belongsToMany(Product, { through: "product_image" });
Product.belongsToMany(Image, { through: "product_image" });

Size.belongsToMany(Product, { through: "product_size" });
Product.belongsToMany(Size, { through: "product_size" });

Tag.belongsToMany(Product, { through: "product_tag" });
Product.belongsToMany(Tag, { through: "product_tag" });

sequelize.sync();

// Product.sync(
//     // { force: true }
//     // { alter: true }
// )

module.exports = Product;
