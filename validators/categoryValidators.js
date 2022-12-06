const { check, param, body } = require('express-validator');
const Category = require('../models/Category')

const addValidator = [
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Category name must be a valid string'),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),
    body('slug').custom(value => {
        return Category.findOne({ where: { slug: value } }).then(category => {
            if (category) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('pagetitle').trim().escape(),
    body('description').trim().escape(),
    body('active').toBoolean(),
    body('showSubMenu').toBoolean(),
]

const slugValidator = [
    param('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct'),
]

const editValidator = [
    body('identifier').not().isEmpty().trim().escape().withMessage('category is not available.'),
    body('name').not().isEmpty().trim().escape().withMessage('Name field is required.').isString().withMessage('Category name must be a valid string'),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),
    body('slug').custom(value => {
        return Category.findOne({ where: { slug: value } }).then(category => {
            if (category) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('pagetitle').trim().escape(),
    body('description').trim().escape(),
    body('active').toBoolean(),
    body('showSubMenu').toBoolean(),
]

module.exports = { addValidator, slugValidator, editValidator }