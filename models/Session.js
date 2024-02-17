const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelizeCN");

const Session = sequelize.define("sessions", {
  sid: {
    type: Sequelize.DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
    // autoIncrement: true
  },
  expires: {
    type: Sequelize.DataTypes.DATE,
  },
  data: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Session;
