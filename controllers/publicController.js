const randomstring = require("randomstring");
const fs = require("fs");
const Sequelize = require('sequelize');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Image = require('../models/Image');
const Product = require('../models/Product');
const Size = require("../models/Size");
const Blog = require('../models/Blog');



module.exports.home = (req, res) => {
    res.render('home', {layout: 'layouts/main.ejs'})
}
module.exports.about = (req, res) => {
    res.render('about', {layout: 'layouts/main.ejs'})
}
module.exports.contact = (req, res) => {
    res.render('contact', {layout: 'layouts/main.ejs'})
}
// https://medium.com/@sergeisizov/using-recaptcha-v3-with-node-js-6a4b7bc67209
module.exports.contact_post = async (req, res) => {
    console.log(req.body);
    
    if (!req.body.captcha) res.json({'message': 'Captcha token is undefined', success: false})

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${'6LefTBApAAAAAA-rYEGQaEeY2FZPqxhkqUQFVAlx'}&response=${req.body.captcha}`
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //   body: JSON.stringify(data),
    });

    const result = await response.json();
    // console.log(result);
    
    if (!result.success || result.score < 0.4) return res.json({'message': "Email could not be sent.", success: false})
        
    const {name, email, country, message} = req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('contact', {name, email, country, message})

        req.flash('errors', errors.array())
        return res.redirect('/contact')
    }

    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: { user: "ca01814960f9c3", pass: "662cb7ad726e43" }
    }, tls = { rejectUnauthorized: false, });
        
    const mail = {
        from: 'reematec@gmail.com', // Sender address
        to: email,         // List of recipients
        subject: 'Inquiry to Reema Group of Companies', // Subject line
        html: `<p> Hello ${name} </p>

        <p>Thanks for writing to us, your inquiry is important us and we reply you as soon as possible.</p>

        <p>Kind Regards,</p>
        <p>Reema Group of Companies</p>`,
    };

    transport.sendMail(mail, function (err, info) {
        if (err) {
            console.log(err)
            return res.json({'message': "Email could not be sent.", success: false})
        } else {
            return res.json({'message': "Email has been sent", success: true})
            req.flash('success', [{ message: "Email has been sent." }])
            // console.log(info);
        }
    });
    // res.render('contact', {layout: 'layouts/main.ejs'})
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
module.exports.blogs = async (req, res) => {
    const blogs = await Blog.findAll({})
    res.render('blogs', {layout: 'layouts/main.ejs', blogs})
}
module.exports.blog = async (req, res) => {
    const slug = req.params.slug;
    
    const blog = await Blog.findOne({ where: { slug: slug } })
    res.render('blog', {layout: 'layouts/main.ejs', blog})
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
module.exports.access_restricted = (req, res) => {
    res.render('access_restricted', {layout: 'layouts/main.ejs'})
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

