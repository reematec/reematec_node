const Sequelize = require("sequelize");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const sequelize = require("../utils/sequelizeCN");

const Image = sequelize.define("image", {
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
});
sequelize.sync();
// User.beforeCreate(async (user, options) => {
//     const salt = await bcrypt.genSalt();
//  	user.password = await bcrypt.hash(user.password, salt)
// });
Image.beforeCreate(async (image, options) => {
  image.name = image.src.substring(0, image.src.indexOf("."));
  image.ext = image.src.substring(image.src.indexOf(".") + 1);
});

Image.beforeUpdate(async (image, options) => {
  image.name = image.src.substring(0, image.src.indexOf("."));
  image.ext = image.src.substring(image.src.indexOf(".") + 1);
});

// User.afterSave(async function (user, options){
//     console.log('new user was created & saved', user)
// });

// Image.sync(
//     // { force: true }
//     // { alter: true }
// )

module.exports = Image;
