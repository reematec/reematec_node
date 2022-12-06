const Sequelize = require('sequelize');

const sequelize = require('../utils/sequelizeCN');


const Size = sequelize.define('size', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    active:{
        type: Sequelize.DataTypes.BOOLEAN,        
        defaultValue: true,
    },
})

// User.beforeCreate(async (user, options) => {
//     const salt = await bcrypt.genSalt();
//  	user.password = await bcrypt.hash(user.password, salt)    
// });

// User.afterSave(async function (user, options){
//     console.log('new user was created & saved', user)
// });

Size.sync(
    // { force: true }
    // { alter: true }
)


module.exports = Size;