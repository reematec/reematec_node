const Sequelize = require("sequelize");

const sequelize = require("../utils/sequelizeCN");

const Tag = sequelize.define("tag", {
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
  active: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: true,
  },
});

sequelize.sync();

// Tag.sync(
//     //  { force: true }
//     // { alter: true }
// )

module.exports = Tag;
