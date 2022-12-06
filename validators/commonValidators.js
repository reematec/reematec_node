const {check, param, body } = require('express-validator');

const slugValidator = [
    param('slug').not().isEmpty().trim().escape().withMessage('Slug is required.').isSlug().withMessage('Slug format is not correct'),
]

module.exports = {slugValidator}