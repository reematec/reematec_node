const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../models/User');


function initialize(passport, getUserByEmail, getUserById) {
    // console.log(passport);
    // const authenticateUser = async (email, password, done)=>{
    //     const user = getUserByEmail(email)
    //     if (user == null) {
    //         return done(null, false, {message: 'No user with that email'})
    //     }
    //     try {
    //         if (await bcrypt.compare(password, user.password)) {
    //             return done(null, user) 
    //         }else{
    //             return done(null, false, {message: 'Password incorrect'})
    //         }
    //     } catch (error) {
    //         return done(error)
    //     }
    // }


    // passport.use(new LocalStrategy({usernameField:'email'}, User.login))

    // passport.serializeUser((user, done) =>{
    //     console.log(user, '-----------------------');
    //     done(null, user.id)
    // })
    
    // passport.deserializeUser(async (id, done) =>{
    //     // return done(null, getUserById(id))
    //     console.log(id, '-----------------------');
    //     const user = await User.findByPk(id);

    //     if (user) {
    //         done(null, user)
    //     }
    // })
}

module.exports = initialize
