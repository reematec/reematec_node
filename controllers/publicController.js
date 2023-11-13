const randomstring = require("randomstring");
const fs = require("fs");
const Sequelize = require('sequelize');

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
    // http://localhost:3000/products
    const categories = await Category.findAll({ include: SubCategory })
    const randomProducts = await Product.findAll({ order: Sequelize.literal('random()'), limit: 4, include: [ { model: Category}, { model: SubCategory}, { model: Image } ] })


    const products = await Product.findAndCountAll({
        distinct: true,
        limit:9,
        offset:0,
        include: [ { model: Category}, { model: SubCategory}, { model: Image } ]
    })

    res.render('products', {layout: 'layouts/main.ejs', categories, products, title: categories[0].name, randomProducts})
}
module.exports.products_page = async (req, res) => {
    
    const { page } = req.params;
    const { limit, offset } = getPagination(page);

    Product.findAndCountAll({
        distinct: true, 
        limit, offset,
        include: [ { model: Category}, { model: SubCategory}, { model: Image } ] 
    }).then(data => {
            const response = getPagingData(data, page, limit);
            res.json(response);
        }).catch((err) => { 
            res.json(500, { message: err.message || "Some error occurred."}
        );
    });
    
}
module.exports.categoryProducts = async (req, res) => {
    // http://localhost:3000/category/futsal-balls
    const {slug} = req.params

    const categories = await Category.findAll({ include: SubCategory })
    const randomProducts = await Product.findAll({ order: Sequelize.literal('random()'), limit: 4, include: [ { model: Category}, { model: SubCategory}, { model: Image } ] })
    const breadcrumb = await Category.findOne({ where: {slug} })

    const products = await Product.findAndCountAll({
        distinct: true, 
        limit:9,
        offset : 0,
        include: [ { model: Category, where: {slug}}, { model: SubCategory}, { model: Image } ]
    })
    res.render('products', {layout: 'layouts/main.ejs', categories, products, title: breadcrumb.name, randomProducts})
}
module.exports.categoryProducts_page = async (req, res) => {
    
    const {slug, page} = req.params
    const { limit, offset } = getPagination(page);
    
    Product.findAndCountAll({
        distinct: true, 
        limit, offset,
        include: [ { model: Category, where: {slug}}, { model: SubCategory}, { model: Image } ]
    }).then(data => {
            const response = getPagingData(data, page, limit);
            res.json(response);
        }).catch((err) => { 
            res.json(500, { message: err.message || "Some error occurred."}
        );
    });    
}

module.exports.subCategoryProducts = async (req, res) => {
    // http://localhost:3000/subcategory/fusiontec-hybrid-footballs
    const {slug} = req.params

    const categories = await Category.findAll({ include: SubCategory })
    const randomProducts = await Product.findAll({ order: Sequelize.literal('random()'), limit: 4, include: [ { model: Category}, { model: SubCategory}, { model: Image } ] })
    const breadcrumb = await SubCategory.findOne({ where: {slug}, include: Category })
    
    const products = await Product.findAndCountAll({
        distinct: true, 
        limit:9,
        offset : 0,
        include: [ { model: Category}, { model: SubCategory, where: {slug}}, { model: Image } ]
    })
    res.render('products', {layout: 'layouts/main.ejs', categories, products, title: breadcrumb.category.name, randomProducts})
}
module.exports.subCategoryProducts_page = async (req, res) => {
    const {slug, page} = req.params
    const { limit, offset } = getPagination(page);
    
    Product.findAndCountAll({
        distinct: true, 
        limit, offset,
        include: [ { model: Category}, { model: SubCategory, where: {slug}}, { model: Image } ]
    }).then(data => {
            const response = getPagingData(data, page, limit);
            res.json(response);
        }).catch((err) => { 
            res.json(500, { message: err.message || "Some error occurred."}
        );
    });    
}
module.exports.product = async (req, res) => {
    const slug = req.params.slug

    const randomProducts = await Product.findAll({ order: Sequelize.literal('random()'), limit: 4, include: [ { model: Category}, { model: SubCategory}, { model: Image } ] })
        
    const product = await Product.findOne({
        where: {slug},
        include: [ { model: Category}, { model: SubCategory}, { model: Image }, {model: Size} ]
    })
    
    res.render('product_details', {layout: 'layouts/main.ejs', product, randomProducts})
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


const getPagination = (page, size) => {
    const limit=9;
    const offset = page ? page * limit : 0;         
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {        
    const { count: totalItems } = data;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, currentPage };
};