const Sequelize = require("sequelize");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const sequelize = require("../utils/sequelizeCN");

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identifier: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
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
    content: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
sequelize.sync();
// User.beforeCreate(async (user, options) => {
//     const salt = await bcrypt.genSalt();
//  	user.password = await bcrypt.hash(user.password, salt)
// });

// User.afterSave(async function (user, options){
//     console.log('new user was created & saved', user)
// });

// Blog.sync(
//     //  { force: true }
//     // { alter: true }
// )

module.exports = Blog;
