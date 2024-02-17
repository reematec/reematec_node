const Sequelize = require('sequelize');

const sequelize = require('../utils/sequelizeCN');


const Tag = sequelize.define('tag', {
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
    active:{
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

// Tag.sync(
//     //  { force: true }
//     // { alter: true }
// )


module.exports = Tag;