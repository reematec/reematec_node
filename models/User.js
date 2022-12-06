const Sequelize = require('sequelize');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const sequelize = require('../utils/sequelizeCN');


const User = sequelize.define('user', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    googleId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    displayName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    firstname:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    lastname:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    email:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },    
    password:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.DataTypes.STRING,
    },
    role: {
        type: Sequelize.DataTypes.STRING,
    },

})

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
 	user.password = await bcrypt.hash(user.password, salt)    
});

User.afterSave(async function (user, options){
    console.log('new user was created & saved', user)
});

User.sync(
    // { force: true }
    // { alter: true }
)

User.login = async function (email, password, done) {

	const user = await User.findOne({where: { email }})
	if (user) {
		const auth = await bcrypt.compare(password, user.password)
		if (auth) {
            return done(null, user) 
			// return user;
		}
        return done(null, false, {message: 'Password incorrect'})
		// throw Error('incorrect password')
	}
    return done(null, false, {message: 'No user with that email'})
	// throw Error('incorrect email')
}

module.exports = User;