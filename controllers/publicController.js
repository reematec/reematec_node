const randomstring = require("randomstring");
const fs = require("fs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Image = require('../models/Image');
const Product = require('../models/Product');
const Size = require("../models/Size");
const Blog = require('../models/Blog');
const RFQ = require('../models/RFQ');



module.exports.home = (req, res) => {
    res.render('home', { layout: 'layouts/main.ejs' })
}
module.exports.about = (req, res) => {
    res.render('about', { layout: 'layouts/main.ejs' })
}
module.exports.contact = (req, res) => {
    res.render('contact', { layout: 'layouts/main.ejs' })
}
// https://medium.com/@sergeisizov/using-recaptcha-v3-with-node-js-6a4b7bc67209
module.exports.contact_post = async (req, res) => {

    if (!req.body.captcha) res.json({ 'message': 'Captcha token is undefined', success: false })

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

    if (!result.success || result.score < 0.4) return res.json({ 'message': "Email could not be sent.", success: false })

    const { name, email, country, message } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('contact', { name, email, country, message })

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
            return res.json({ 'message': "Email could not be sent.", success: false })
        } else {
            return res.json({ 'message': "Email has been sent", success: true })
            req.flash('success', [{ message: "Email has been sent." }])
            // console.log(info);
        }
    });
    // res.render('contact', {layout: 'layouts/main.ejs'})
}
module.exports.rfq_post = async (req, res) => {
    // console.log(req.body);

    if (!req.body.captcha) res.json({ 'message': 'Captcha token is undefined', success: false })

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${'6LefTBApAAAAAA-rYEGQaEeY2FZPqxhkqUQFVAlx'}&response=${req.body.captcha}`
    const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!result.success || result.score < 0.4) return res.json({ 'message': "Email could not be sent.", success: false })

    const { fullname, email, country, quantity, identifier } = req.body
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('rfq', { fullname, email, country, quantity, identifier })

        // req.flash('errors', errors.array())
        res.json({ errors: errors.array() })
        return res.redirect('back')
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
        html: `<p> Hello ${fullname} </p>

        <p>Thanks for writing to us, your inquiry is important us and we reply you as soon as possible.</p>

        <p>Kind Regards,</p>
        <p>Reema Group of Companies</p>`,
    };

    transport.sendMail(mail, async function (err, info) {
        if (err) {
            console.log(err)

            return res.json({ 'message': "Email could not be sent.", success: false })
        } else {

            req.session.guestUser = email
            let product = await Product.findOne({ where: { identifier } })

            await RFQ.create({
                identifier: randomstring.generate(),
                name: fullname,
                email: email,
                country: country,
                quantity: quantity,
                productId: product.id
            })

            return res.json({ 'message': "Email has been sent", success: true })
        }
    });
    // return res.json({'message': "Your RFQ has been sent successfully", success: true})
}
module.exports.products = async (req, res) => {
    // http://localhost:3000/products

    const categories = await getActiveCatAndSubCategories()
    const query = req.query
    const random = await getRandomProducts()
    const { limit, offset } = getPagination(0);
    

    const products = await Product.findAndCountAll({
        distinct: true,
        limit,
        offset,
        include: [{ model: Category}, { model: SubCategory }, { model: Image }],
        order: [orderSTR(query.sort)],
        where: { active: 1 }
    })
    
    res.render('products', { layout: 'layouts/main.ejs', categories, products, title: categories[0].name, randomProducts:random, sort: query.sort })
}
module.exports.products_page = async (req, res) => {
    // Fetch http://localhost:3000/products/page
    const query = req.query
    const { page } = req.params;
    const { limit, offset } = getPagination(page);

    Product.findAndCountAll({
        distinct: true,
        limit,
        offset,
        include: [{ model: Category }, { model: SubCategory }, { model: Image }],
        order: [orderSTR(query)],
        where: { active: 1 }
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.json(response);
    }).catch((err) => {
            res.json(500, { message: err.message || "Some error occurred." }
        );
    });
    console.log(JSON.stringify(products, null, 4));
}
module.exports.categoryProducts = async (req, res) => {
    // http://localhost:3000/category/futsal-balls
    const { slug } = req.params
    const query = req.query
    
    const categories = await getActiveCatAndSubCategories()
    const random = await getRandomProducts()
    const breadcrumb = await Category.findOne({ where: { slug } })
    const { limit, offset } = getPagination(0);

    const products = await Product.findAndCountAll({
        distinct: true,
        limit,
        offset,
        include: [{ model: Category, where: { slug } }, { model: SubCategory }, { model: Image }],
        where: { active: 1 }
    })
    res.render('products', { layout: 'layouts/main.ejs', categories, products, title: breadcrumb.name, randomProducts: random, sort: query.sort })
}
// Against Fetch Call
module.exports.categoryProducts_page = async (req, res) => {

    const { slug, page } = req.params
    const { limit, offset } = getPagination(page);

    Product.findAndCountAll({
        distinct: true,
        limit, offset,
        include: [{ model: Category, where: { slug } }, { model: SubCategory }, { model: Image }]
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.json(response);
    }).catch((err) => {
        res.json(500, { message: err.message || "Some error occurred." }
        );
    });
}

module.exports.subCategoryProducts = async (req, res) => {
    // http://localhost:3000/subcategory/fusiontec-hybrid-footballs
    const { slug } = req.params
    const query = req.query

    const categories = await getActiveCatAndSubCategories()
    const random = await getRandomProducts()
    const breadcrumb = await SubCategory.findOne({ where: { slug }, include: Category })
    const { limit, offset } = getPagination(0);

    const products = await Product.findAndCountAll({
        distinct: true,
        limit,
        offset,
        include: [{ model: Category }, { model: SubCategory, where: { slug } }, { model: Image }]
    })
    res.render('products', { layout: 'layouts/main.ejs', categories, products, title: breadcrumb.category.name, randomProducts: random, sort: query.sort })
}
module.exports.subCategoryProducts_page = async (req, res) => {
    const { slug, page } = req.params
    const { limit, offset } = getPagination(page);

    Product.findAndCountAll({
        distinct: true,
        limit, offset,
        include: [{ model: Category }, { model: SubCategory, where: { slug } }, { model: Image }]
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.json(response);
    }).catch((err) => {
        res.json(500, { message: err.message || "Some error occurred." }
        );
    });
}
module.exports.product = async (req, res) => {
    const slug = req.params.slug

    const randomProducts = await Product.findAll({ order: Sequelize.literal('rand()'), limit: 4, include: [{ model: Category }, { model: SubCategory }, { model: Image }] })

    const product = await Product.findOne({
        where: { slug },
        include: [{ model: Category }, { model: SubCategory }, { model: Image }, { model: Size }]
    })

    res.render('product_details', { layout: 'layouts/main.ejs', product, randomProducts })
}
module.exports.blogs = async (req, res) => {
    const blogs = await Blog.findAll({})
    res.render('blogs', { layout: 'layouts/main.ejs', blogs })
}
module.exports.blog = async (req, res) => {
    const slug = req.params.slug;

    const blog = await Blog.findOne({ where: { slug: slug } })
    res.render('blog', { layout: 'layouts/main.ejs', blog })
}
module.exports.faq = (req, res) => {
    res.render('faq', { layout: 'layouts/main.ejs' })
}
module.exports.quotes = async (req, res) => {
    console.log(req.session.guestUser);

    if (!req.session.guestUser) {
        res.render('quotes', { layout: 'layouts/main.ejs', rfqs: null })
    }

    const rfqs = await RFQ.findAll({
        where: { email: req.session.guestUser },
        include: [{ model: Product, include: [{ model: Image }] }],
    })
    res.render('quotes', { layout: 'layouts/main.ejs', rfqs })
}
module.exports.search = async (req, res) => {
    let keyword
    if (req.query) keyword = req.query.search
    // const categories = await Category.findAll({ include: SubCategory })
    // const random = await getRandomProducts()
    const { limit, offset } = getPagination(0);


    const products = await Product.findAll({
        // distinct: true,
        // limit,
        // offset,

        attributes: ['identifier','name', 'usage','slug', 'active'],
        where: {
            [Op.or]: [
                { '$product.name$': { [Op.like]: `%${keyword}%` }, },
                { '$product.usage$': { [Op.like]: `%${keyword}%` }, },
                { '$subCategory.name$': { [Op.like]: `%${keyword}%`}, },
                { '$category.name$': { [Op.like]: `%${keyword}%`} },

            ],
        },
        
        include: [
            { model: Image, as:'images', attributes: ['src', 'altText']},
            { model: Category, as: 'category', attributes: ['name'] },
            { model: SubCategory, as: 'subCategory', attributes: ['name']}
        ],
        logging: console.log
    })
    // https://stackoverflow.com/questions/18838433/sequelize-find-based-on-association
    console.log(JSON.stringify(products, null, 4));

    // const plainMessages = messages.map((message) => message.get({ plain: true }));

    res.render('search', { layout: 'layouts/main.ejs', products, title: keyword, })
}
module.exports.terms = (req, res) => {
    res.render('terms-conditions', { layout: 'layouts/main.ejs' })
}
module.exports.privacy = (req, res) => {
    res.render('privacy', { layout: 'layouts/main.ejs' })
}
module.exports.cookie_policy = (req, res) => {
    res.render('cookie-policy', { layout: 'layouts/main.ejs' })
}
module.exports.access_restricted = (req, res) => {
    res.render('access_restricted', { layout: 'layouts/main.ejs' })
}


const getPagination = (page, size) => {
    const limit = 7;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems } = data;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, currentPage };
};

const orderSTR = (query) => {
    let orderby = []

    switch (query) {
        case 'asc':
            orderby = ['name', 'ASC']
            break;
        case 'desc':
            orderby = ['name', 'DESC']
            break;
        // case 'newer':
        //     orderby = ['year', 'ASC']
        //   break;
        // case 'older':
        //     orderby = ['year', 'DESC']
        //   break;
        case 'usage':
            orderby = ['usage', 'ASC']
            break;
        default:
            orderby = ['name', 'ASC']
    }

    return orderby
}

async function getRandomProducts() {
    const products = await Product.findAll(
        {
            order: Sequelize.literal('rand()'),
            limit: 4,
            include: [{ model: Category }, { model: SubCategory }, { model: Image }]
        }
    )
    return products
}

async function getActiveCatAndSubCategories(params) {
    const activeCategories = await Category.findAll({
        where: {
            [Op.or]: [
                { '$category.active$': true, },
            ],
            [Op.and]: [
                { '$subCategories.active$': { [Op.not]: false} },
            ],
        }, 
        include: [
            {
                model: SubCategory, as:'subCategories',
            },
        ],
        // logging: console.log
    })
    return activeCategories
}