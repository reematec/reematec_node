const Sequelize = require("sequelize");

const sequelize = require("../utils/sequelizeCN");

const Size = sequelize.define("size", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  identifier: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
sequelize.sync();
// Size.sync(
//     // { force: true }
//     // { alter: true }
// )

module.exports = Size;
