const Sequelize = require('sequelize');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')


const sequelize = require('../utils/sequelizeCN');


const Category = sequelize.define('category', {
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
        unique: true,
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
    showSubMenu:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,        
    },
    showOnHomepage:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,        
    },
})

// User.beforeCreate(async (user, options) => {
//     const salt = await bcrypt.genSalt();
//  	user.password = await bcrypt.hash(user.password, salt)    
// });

// User.afterSave(async function (user, options){
//     console.log('new user was created & saved', user)
// });

Category.sync(
    //  { force: true }
    // { alter: true }
)


module.exports = Category;