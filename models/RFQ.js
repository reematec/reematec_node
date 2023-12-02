const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelizeCN');
const Product = require('./Product');


const RFQ = sequelize.define('RFQ', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    email:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },    
    country:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    quantity:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
    },
    
    productId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: true,
	},
})

Product.hasMany(RFQ);
RFQ.belongsTo(Product);

sequelize.sync();

RFQ.sync(
    // { force: true }
    // { alter: true }
)



module.exports = RFQ;