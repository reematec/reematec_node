const Sequelize = require('sequelize');

const sequelize = require('../utils/sequelizeCN');


const Meta = sequelize.define('meta', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    page: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
})

// Meta.sync(
//     // { force: true }
//     // { alter: true }
// )


module.exports = Meta;