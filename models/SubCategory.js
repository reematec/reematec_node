const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelizeCN');
const Category = require('../models/Category');


const SubCategory = sequelize.define('subCategory', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    slug:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pagetitle:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    description:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,        
    },
    active:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,        
    },
    categoryId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
	},
})

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

SubCategory.sync(
    //  { force: true }
    // { alter: true }
)


module.exports = SubCategory;