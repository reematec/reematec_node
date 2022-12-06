const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const InstagramStrategy = require('passport-instagram').Strategy
const User = require('../models/User')
const randomstring = require("randomstring");


module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField:'email'}, User.login))

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        }, async (accessToken, refreshToken, profile, done) => {

            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
                password: randomstring.generate(),
            }

            try {
                let user = await User.findOne({where: {googleId : profile.id}})

                if (user) {
                    done(null, user)
                }else{
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err);
            }
        }
    ))

    passport.use(new InstagramStrategy({
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: '/auth/instagram/callback',
        // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
        async (accessToken, refreshToken, profile, done) => {

            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
                password: randomstring.generate(),
            }

            try {
                // User.findOrCreate({ instagramId: profile.id }, function (err, user) {
                //     return done(err, user);
                //   });



                let user = await User.findOne({where: {googleId : profile.id}})

                if (user) {
                    done(null, user)
                }else{
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err);
            }
    }))

    

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        // const user = User.findByPk(id);

        // if (user) {
        //     done(null, user)
        // }

        const user = await User.findByPk(id);

        if (user) {
            done(null, user)
        }
    });
}