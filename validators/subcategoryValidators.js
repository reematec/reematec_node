const { check, param, body } = require('express-validator');
const SubCategory = require('../models/SubCategory')
const { Op } = require("sequelize");

const addSubValidator = [
    body('category').not().isEmpty().trim().escape().withMessage('Category is not selected.'),
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Category name must be a valid string'),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),

    body('slug').custom(value => {
        return SubCategory.findOne({ where: { slug: value } }).then(subcategory => {
            if (subcategory) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('pagetitle').trim().escape(),
    body('description').trim().escape(),
    body('active').toBoolean(),
]

const editSubValidator = [
    body('category').not().isEmpty().trim().escape().withMessage('Category is not selected.'),
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Category name must be a valid string'),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),
    body('slug').custom((value, {req}) => {
        return SubCategory.findOne({ where: { slug: value, [Op.not]: {identifier: req.body.identifier} } }).then(subcategory => {
            if (subcategory) {
                return Promise.reject('slug already in use');
            }
        });
    }),

    body('pagetitle').trim().escape(),
    body('description').trim().escape(),
    body('active').toBoolean(),
]

module.exports = { addSubValidator, editSubValidator }