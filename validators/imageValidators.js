const { check, param, body } = require('express-validator');
const Image = require('../models/Image')
const { Op } = require("sequelize");

// const addValidator = [
//     body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Image name must be a valid string'),
//     body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),
//     body('slug').custom(value => {
//         return Image.findOne({ where: { slug: value } }).then(category => {
//             if (category) {
//                 return Promise.reject('slug already in use');
//             }
//         });
//     }),
//     body('pagetitle').trim().escape(),
//     body('description').trim().escape(),
//     body('active').toBoolean(),
//     body('showSubMenu').toBoolean(),
// ]

// const slugValidator = [
//     param('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct'),
// ]

const editImageDetails = [
    body('identifier').not().isEmpty().trim().escape().withMessage('Image is not available.'),
    body('src').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Image name must be a valid string'),    
    body('src').custom((value, {req}) => {
        
        const img =  Image.findOne({ where: { name: value, [Op.not]: {identifier: req.body.identifier} } }).then(image => {
            if (image) return Promise.reject('Image name already in use');
        });
        return img;

    }),
    body('alText').trim().escape(),
    body('title').trim().escape(),
    body('description').escape(),
    body('caption').escape(),
]

module.exports = { editImageDetails }