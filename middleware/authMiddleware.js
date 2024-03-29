const jwt = require('jsonwebtoken');
const User = require('../models/User');


const isAccountActive = (req, res, next) => {
    if (req.user.active) {
        return next()
    }else{
        res.redirect('/logout')
    }
}
const requireAuth = (req, res, next) => {
    // console.log(req.cookies)
    // const token = req.cookies.jwt;

    // if (token) {
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //         if (err) {
    //             console.log(err.message)
    //             res.redirect('/login')
    //         }else{
    //             console.log(decodedToken)
    //             next()
    //         }
    //     })
    // }else{
    //     res.redirect('/login')
    // }
    // console.log(req.user, " ", 4);
    console.log('is authenticated-------------------------------');
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


const onlyAdmin = (req, res, next) => {
    if (req.user.active === true && req.user.role === "Admin") {
        return next()
    }
    res.redirect('/restricted')
}



const guestUser = (req, res, next) => {
    
    // console.log(res.locals.user);
    // if (res.locals.user) {        
    //     res.redirect('/account')
    // }else{
    //     next()
    // }
    
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}

// const checkUser = async (req, res, next) => {
//     const token = req.cookies.jwt;
//     console.log(token)
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message, ' check user' )
//                 res.locals.user = null;
//                 next()
//             }else{
//                 console.log(decodedToken, ' decoded token' )
//                 let user = await User.findByPk(decodedToken.id)
//                 res.locals.user = user;
//                 next()
//             }
//         })
//     }else{
//         res.locals.user = null;
//         next()
//     }
// }

module.exports = {requireAuth, guestUser, onlyAdmin, isAccountActive}