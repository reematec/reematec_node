const { check, param, body } = require('express-validator');
const User = require('../models/User')
const { Op } = require("sequelize");

const singupValidator = [
    body('first_name').not().isEmpty().trim().escape().withMessage('First name is required.').isString().withMessage('First name is not a valid format').isLength({min:3}).withMessage('Name must be of 3 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('First name must be alphabetic.'),
    body('last_name').not().isEmpty().trim().escape().withMessage('Last name is required.').isString().withMessage('Last name is not a valid format').isLength({min:3}).withMessage('Name must be of 3 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('Last name must be alphabetic.'),
    body('email').not().isEmpty().trim().escape().withMessage('Email is required.').isEmail().withMessage('Email format is not correct'),
    
    body('email').custom(value => {
        return User.findOne({ where: { email: value } }).then(user => {
            if (user) {
                return Promise.reject('Email already in use');
            }
        });
    }),

    body('password1').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
    }).withMessage('Password must be Eight characters long and a mix of a symbol, lowercase and an uppercase'),

    body('password2').custom((value, {req})=>{
        if (value !== req.body.password1) {
            return Promise.reject('Password do not match');
        }else{
            return Promise.resolve('true')
        }
    })
]
const pwResetValidator = [
    body('password1').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
    }).withMessage('Password must be Eight characters long and a mix of a symbol, lowercase and an uppercase'),

    body('password2').custom((value, {req})=>{
        if (value !== req.body.password1) {
            return Promise.reject('Password do not match');
        }else{
            return Promise.resolve('true')
        }
    })
]

// const editSubValidator = [
//     body('first_name').not().isEmpty().trim().escape().withMessage('First name is required.').isString().withMessage('First name is not a valid format').not().matches('/^[-\w\s]+$/').withMessage('Only Words are allowed'),
//     body('last_name').not().isEmpty().trim().escape().withMessage('Last name is required.').isString().withMessage('Last name is not a valid format').not().matches('/^[-\w\s]+$/').withMessage('Only Words are allowed'),
//     body('email').not().isEmpty().trim().escape().withMessage('Email is required.').isEmail().withMessage('Email format is not correct'),
//     body('email').custom((value, {req}) => {
//         return User.findOne({ where: { email: value, [Op.not]: {identifier: req.body.identifier} } }).then(subcategory => {
//             if (subcategory) {
//                 return Promise.reject('Email already in use');
//             }
//         });
//     }),
// ]

module.exports = { singupValidator, pwResetValidator }