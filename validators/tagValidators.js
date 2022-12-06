const { check, param, body } = require('express-validator');
const {Op} = require('sequelize');
const Tag = require('../models/Tag')


const addTagValidator = [
    
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Tag name must be a valid string').not().matches('/^[-\w\s]+$/').withMessage('testing regex').custom(value => {
        return Tag.findOne({ where: { name: value } }).then(t => {
            if (t) {
                return Promise.reject('Name already in use');
            }
        });
    }),

    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase()
    .custom(value => {
        return Tag.findOne({ where: { slug: value } }).then(t => {
            if (t) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('active').toBoolean(),
]

const editTagValidator = [
    
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Tag name must be a valid string').not().matches('/^[-\w\s]+$/').withMessage('Only Words are allowed')
    .custom((value,  {req}) => {
        return Tag.findOne({ where: { name: value, [Op.not]: {identifier: req.body.identifier} } }).then(t => {
            if (t) {
                return Promise.reject('name already in use');
            }
        });
    }),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase()
    .custom((value, {req}) => {
        return Tag.findOne({ where: { slug: value, [Op.not]: {identifier: req.body.identifier} } }).then(t => {
            if (t) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('active').toBoolean(),
]

module.exports = { addTagValidator, editTagValidator }