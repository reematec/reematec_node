const randomstring = require("randomstring");
const fs = require("fs");

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');




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
    
    res.render('products', {layout: 'layouts/main.ejs', categories})
}
module.exports.categoryProducts = (req, res) => {
    // products = Product.objects.all()
    // categories = Category.objects.all()
    res.render('products', {layout: 'layouts/main.ejs'})
}
module.exports.subCategoryProducts = (req, res) => {
    // products = Product.objects.all()
    // categories = Category.objects.all()
    res.render('products', {layout: 'layouts/main.ejs'})
}
module.exports.product = (req, res) => {
    res.render('product', {layout: 'layouts/main.ejs'})
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
