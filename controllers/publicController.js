const randomstring = require("randomstring");
const fs = require("fs");

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Image = require('../models/Image');
const Product = require('../models/Product');
const Size = require("../models/Size");




module.exports.home = (req, res) => {
    res.render('home', {layout: 'layouts/main.ejs'})
}
module.exports.about = (req, res) => {
    res.render('about', {layout: 'layouts/main.ejs'})
}
module.exports.contact = (req, res) => {
    res.render('contact', {layout: 'layouts/main.ejs'})
}
module.exports.products = async (req, res) => {
    const categories = await Category.findAll({ include: SubCategory })
    const products = await Product.findAll({
        include: [ { model: Category}, { model: SubCategory}, { model: Image } ]
    })
    res.render('products', {layout: 'layouts/main.ejs', categories, products})
}
module.exports.categoryProducts = async (req, res) => {
    
    res.render('products', {layout: 'layouts/main.ejs'})
}
module.exports.subCategoryProducts = async (req, res) => {
    const products = await Product.findAll({
        include: [ { model: Category}, { model: SubCategory}, { model: Image } ]
    })
    
    res.render('products', {layout: 'layouts/main.ejs', products})
}
module.exports.product = async (req, res) => {
    const slug = req.params.slug
    
    const product = await Product.findOne({
        where: {slug},
        include: [ { model: Category}, { model: SubCategory}, { model: Image }, {model: Size} ]
    })
    
    res.render('product_details', {layout: 'layouts/main.ejs', product})
}
module.exports.blog = (req, res) => {
    res.render('blog', {layout: 'layouts/main.ejs'})
}
module.exports.faq = (req, res) => {
    res.render('faq', {layout: 'layouts/main.ejs'})
}
module.exports.terms = (req, res) => {
    res.render('terms-conditions', {layout: 'layouts/main.ejs'})
}
module.exports.privacy = (req, res) => {
    res.render('privacy', {layout: 'layouts/main.ejs'})
}
module.exports.cookie_policy = (req, res) => {
    res.render('cookie-policy', {layout: 'layouts/main.ejs'})
}
