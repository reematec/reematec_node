const { check, param, body } = require('express-validator');
const {Op} = require('sequelize');
const Product = require('../models/Product')


const addProductVal = [
    
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Tag name must be a valid string').not().matches('/^[-\w\s]+$/').withMessage('testing regex').custom(value => {
        return Product.findOne({ where: { name: value } }).then(t => {
            if (t) {
                return Promise.reject('Name already in use');
            }
        });
    }),

    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase()
    .custom(value => {
        return Product.findOne({ where: { slug: value } }).then(t => {
            if (t) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('showcased').toBoolean(),
    body('recommended').toBoolean(),
    body('usage').not().isEmpty().trim().escape().withMessage('Usage field is required.'),
    body('year').not().isEmpty().trim().escape().withMessage('Year field is required.').isInt().withMessage('Year format is not correct'),
    body('price').not().isEmpty().trim().escape().withMessage('Price field is required.').isDecimal().withMessage('Price format is not correct'),
    body('category').not().isEmpty().trim().escape().withMessage('category  is required.').isInt().withMessage('Category is not correct'),
]

const editProductVal = [
    
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Tag name must be a valid string').not().matches('/^[-\w\s]+$/').withMessage('Only Words are allowed')
    .custom((value,  {req}) => {
        return Product.findOne({ where: { name: value, [Op.not]: {identifier: req.body.identifier} } }).then(t => {
            if (t) {
                return Promise.reject('name already in use');
            }
        });
    }),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase()
    .custom((value, {req}) => {
        return Product.findOne({ where: { slug: value, [Op.not]: {identifier: req.body.identifier} } }).then(t => {
            if (t) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('showcased').toBoolean(),
    body('recommended').toBoolean(),
    body('usage').not().isEmpty().trim().escape().withMessage('Usage field is required.'),
    body('year').not().isEmpty().trim().escape().withMessage('Year field is required.').isInt().withMessage('Year format is not correct'),
    body('price').not().isEmpty().trim().escape().withMessage('Price field is required.').isDecimal().withMessage('Price format is not correct'),
    body('category').not().isEmpty().trim().escape().withMessage('category  is required.').isInt().withMessage('Category is not correct'),
]

module.exports = { addProductVal, editProductVal }