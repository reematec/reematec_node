const User = require('../models/User');

const allowedUsers = (permissions) => {
    return (req, res, next)=>{
        if (req.isAuthenticated()) {
            if (permissions.includes(req.user.role)) {                
                next()
            }
        }
        // res.render('401', {layout: 'layouts/public_layout.ejs', user: req.user})
        return res.redirect('/');
    }
}



module.exports = { allowedUsers }