const { check, param, body } = require('express-validator');
const Category = require('../models/Category')
const { Op } = require("sequelize");

const addValidator = [
    body('name').not().isEmpty().trim().withMessage('Name field is required.').isString().withMessage('Category name must be a valid string'),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug field is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),
    body('slug').custom(value => {
        return Category.findOne({ where: { slug: value } }).then(category => {
            if (category) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('pagetitle').trim(),
    body('description').trim(),
    body('active').toBoolean(),
    body('showSubMenu').toBoolean(),
    body('showOnHomepage').toBoolean(),
]

const slugValidator = [
    param('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct'),
]

const editValidator = [
    body('identifier').not().isEmpty().trim().escape().withMessage('category is not available.'),
    body('name').not().isEmpty().trim().withMessage('Name field is required.').isString().withMessage('Category name must be a valid string'),
    body('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct').toLowerCase(),
    body('slug').custom((value, {req}) => {
        return Category.findOne({ where: { slug: value, [Op.not]: {identifier: req.body.identifier} } }).then(category => {
            if (category) {
                return Promise.reject('slug already in use');
            }
        });
    }),
    body('pagetitle').trim(),
    body('description').trim(),
    body('active').toBoolean(),
    body('showSubMenu').toBoolean(),
    body('showOnHomepage').toBoolean(),
]

module.exports = { addValidator, slugValidator, editValidator }