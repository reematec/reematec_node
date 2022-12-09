const jwt = require('jsonwebtoken');
const passport = require('passport')
const randomstring = require("randomstring");
const fs = require('fs')
const { body, validationResult } = require('express-validator');
const {colors} = require('colors')

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const Tag = require('../models/Tag');
const Size = require('../models/Size');
const Image = require('../models/Image');
const sequelize = require('../utils/sequelizeCN');
const { createCanvas, loadImage } = require('canvas')
const FileType = require('file-type');


module.exports.dashboard = (req, res) => {
    res.render('backend/dashboard', { layout: 'layouts/app.ejs' })
}

//#region Category
module.exports.category = async (req, res) => {
    const categories = await Category.findAll()
    res.render('backend/category', { layout: 'layouts/app.ejs', categories })
}
module.exports.addCategory_get = (req, res) => {
    console.log(req.headers);
    res.render('backend/category-add', { layout: 'layouts/app.ejs' })
}
module.exports.addCategory_post = async (req, res) => {
    const {name, slug, pagetitle, description, active, showSubMenu} = req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('category', {name, slug, pagetitle, description, active, showSubMenu})
        
        req.flash('errors', errors.array())
        return res.redirect('/home/add-category')
    }
    
    const category = {
        identifier: randomstring.generate(),
        name: name,
        slug: slug,
        pagetitle: pagetitle,
        description: description,
        active: active, 
        showSubMenu: showSubMenu,
    };    

    try {
        await Category.create(category)
        req.flash('success', [{msg: 'Category created successfully.'}])
        delete req.session.category
        res.redirect('/home/category')
    } catch (err) {
        res.status(500).send(err.errors);  
    }       
}
module.exports.updateCategory_get = async (req, res) => {
    const slug = req.params.slug

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('category', {slug})
        
        req.flash('errors', errors.array())
        return res.redirect('/home/category')
    }
    
    const category = await Category.findOne({ where: { slug } });
    if (!category) {
        req.flash('errors', [{msg: 'category not found.'}])
        return res.redirect('/home/category')
    }

    res.render('backend/category-update', { layout: 'layouts/app.ejs', category })
}
module.exports.updateCategory_post = async (req, res) => {
    const {identifier, name, slug, pagetitle, description, active, showSubMenu} = req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('category', {identifier, name, slug, pagetitle, description, active, showSubMenu})
        
        req.flash('errors', errors.array())
        return res.redirect(`/home/update-category/${slug}`)
    }

    try {
        const category = await Category.findOne({ where: { identifier } });
        if (!category) {
            req.flash('errors', [{msg: 'category not found.'}])
            return res.redirect('/home/category')
        }

        category.name = name;
        category.slug = slug;
        category.pagetitle = pagetitle;
        category.description = description;
        category.active = active;
        category.showSubMenu = showSubMenu;
        
        await category.save();

        res.redirect('/home/category')
    } catch (error) {
        res.send(error)
    }
       
    
}
module.exports.deleteCategory_get = async (req, res) => {
    const slug = req.params.slug
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('category', {slug})
        
        req.flash('errors', errors.array())
        return res.redirect('/home/category')
    }

    const category = await Category.findOne({ where: { slug } });
    if (!category) {
        req.flash('errors', [{msg: 'category not found.'}])
        return res.redirect('/home/category')
    }
    res.render('backend/category-delete', { layout: 'layouts/app.ejs', category })
}
module.exports.deleteCategory_post = async (req, res) => {
    const {identifier} = req.body
    
    const category = await Category.findOne({ where: { identifier } });
    if (category) {
        req.flash('success', [{msg: `Category "${category.name}" deleted successfully.`}])
        await category.destroy()
    }else{
        req.flash('errors', [{msg: 'category not found.'}])
    }
    res.redirect('/home/category')
}
//#endregion

//#region SubCategory
module.exports.subcategory = async (req, res) => {
    const subCategories = await SubCategory.findAll({ include: Category })    
    res.render('backend/subcategory', { layout: 'layouts/app.ejs', subCategories })
}
module.exports.addSubcategory_get = async (req, res) => {    
    const categories = await Category.findAll()
    res.render('backend/subcategory-add', { layout: 'layouts/app.ejs', categories })
}
module.exports.addSubcategory_post = async (req, res) => {
    const {category, name, slug, pagetitle, description, active} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('subcategory', {category, name, slug, pagetitle, description, active})
        
        req.flash('errors', errors.array())
        return res.redirect('/home/add-subcategory')
    }

    const cat = await Category.findOne({ where: { id: category } });
    if (!cat) {
        req.flash('errors', [{msg: 'category not found.'}])
        return res.redirect('/home/category')
    }
    

    const subcategory = {
        identifier: randomstring.generate(),
        name: name,
        slug: slug,
        pagetitle: pagetitle,
        description: description,
        active: active,
        categoryId: cat.id
    };    

    try {
        await SubCategory.create(subcategory)
        req.flash('success', [{msg: 'Subcategory created successfully.'}])
        res.redirect('/home/subcategory')
    } catch (err) {
        res.status(500).send(err.errors);  
    }
}
module.exports.updateSubcategory_get = async (req, res) => {
    const { slug } = req.params

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        return res.redirect(`/home/subcategory/`)
    }

    const subcategory = await SubCategory.findOne({ where: { slug } });
     if (!subcategory) {
        req.flash('errors', [{msg: 'subcategory not found.'}])
        return res.redirect('/home/subcategory')
    }
    const categories = await Category.findAll()
    res.render('backend/subcategory-update', { layout: 'layouts/app.ejs', categories, subcategory  })
}
module.exports.updateSubcategory_post = async (req, res) => {
    const {category, name, slug, pagetitle, description, active} = req.body
    const slugParam = req.params.slug

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('subcategory', {category, name, slug, pagetitle, description, active})
        
        req.flash('errors', errors.array())
        return res.redirect(`/home/update-subcategory/${slugParam}`)
    }    
    
    try {
        const cat = await Category.findOne({ where: { id: category } });
        if (!cat) {
            req.flash('errors', [{msg: 'category not found.'}])
            return res.redirect('/home/subcategory')
        }

        const subcategory = await SubCategory.findOne({ where: { slug: slugParam } });
        if (!subcategory) {
            req.flash('errors', [{msg: 'subcategory not found.'}])
            return res.redirect('/home/subcategory')
        }

        subcategory.name = name;
        subcategory.slug = slug;
        subcategory.pagetitle = pagetitle;
        subcategory.description = description;
        subcategory.active = active;
        subcategory.categoryId = category;
        
        await subcategory.save();
        req.flash('success', [{msg: 'Subcategory updated successfully.'}])
        res.redirect('/home/subcategory')
    } catch (error) {
        res.send(error)
    }
    
}
module.exports.deleteSubcategory_get = async (req, res) => {
    const slug = req.params.slug
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        return res.redirect(`/home/subcategory/`)
    }

    const subcategory = await SubCategory.findOne({ where: { slug } });
    if (!subcategory) {
        req.flash('errors', [{msg: 'subcategory not found.'}])
        return res.redirect('/home/subcategory')
    }
    res.render('backend/subcategory-delete', { layout: 'layouts/app.ejs', subcategory })
}
module.exports.deleteSubcategory_post = async (req, res) => {
    const slug = req.params.slug
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        return res.redirect(`/home/subcategory/`)
    }

    const subcategory = await SubCategory.findOne({ where: { slug } });
    if (!subcategory) {
        req.flash('errors', [{msg: 'subcategory not found.'}])
        return res.redirect('/home/subcategory')
    }
    await subcategory.destroy();
    req.flash('success', [{msg: 'Subcategory deleted successfully.'}])
    res.redirect('/home/subcategory')
}
module.exports.getSubcatgories = async (req, res) => {
    const id  = req.params.id
    const subCategories = await SubCategory.findAll({ where: {categoryId: id} })
        
    res.json({subcategories: subCategories})
}
//#endregion

//#region Gallery
module.exports.gallery_get = async (req, res) => {
    const images = await Image.findAll()    
    res.render('backend/gallery', { layout: 'layouts/app.ejs', images })    
}
module.exports.addImages_get = async (req, res) => {
    res.render('backend/image', { layout: 'layouts/app.ejs'})
}
module.exports.addImages_post = async (req, res) => {

    let uploadedData = []
    
    if (req.files.images && !req.files.images.length) {        
        uploadedData.push(req.files.images)        
    }else{
        uploadedData = req.files.images
    }    
    
    const imageObjects = [];
    const myPromise = [];
        
    for (let i = 0; i < uploadedData.length; i++) {
        const image = uploadedData[i]; 

        await FileType.fromFile(image.tempFilePath)

        myPromise.push(new Promise((resolve, reject) => {
            const imagePath = `./public/images/assets/${image.name}`
            
            image.mv(imagePath, (err)=>{
                if (err) {
                    reject(err);
                }else{
                    imageResize(imagePath, image.name, 100) // Product detail page Icon
                    imageResize(imagePath, image.name, 300) // Product card thumb
                    imageResize(imagePath, image.name, 500) // Product detail page large image
                    resolve(image.name)
                    const img = { identifier: randomstring.generate(), src: image.name, }
                    imageObjects.push(img)
                }
            })  
        }))
    }

    Promise.all(myPromise).then((values)=>{
        try {
            Image.bulkCreate(imageObjects).then((data)=>{ }).catch((reason)=>{ console.log(reason); })
        } catch (err) {
            res.status(500).send(err.errors);  
        }

        res.redirect('/home/images')
    }).catch((reason)=>{
        console.log(reason);
    })
}
module.exports.updateImage_get = async (req, res) => {
    const { identifier } = req.params
    const image = await Image.findOne({ where: { identifier } });

    res.render('backend/image-update', { layout: 'layouts/app.ejs', image })
}
module.exports.updateImage_post = async (req, res) => {
    const { identifier } = req.params
    const { altText, title, description, caption } = req.body
    const image = await Image.findOne({ where: { identifier } });

    if (altText) image.altText = altText
    if (title) image.title = title
    if (description) image.description = description
    if (caption) image.caption = caption

    await image.save();

    res.redirect('/home/images')
}
module.exports.imagesAjax = async (req, res) => {
    const getPagination = (page, size) => {
        const limit = 2;
        const offset = page ? page * limit : 0;         
        return { limit, offset };
    };
    const getPagingData = (data, page, limit) => {        
        const { count: totalItems, rows: images } = data;        
        const currentPage = page ? page : 0;        
        const totalPages = Math.ceil(totalItems / limit);        
        return { totalItems, images, totalPages, currentPage };
    };
    
    const { page } = req.query;
    const { limit, offset } = getPagination(page);
    
    Image.findAndCountAll({ limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.json(response);
        }) .catch(err => { res.json(500, { message: err.message || "Some error occurred."});
    });
}
module.exports.deleteImage_get = async (req, res) => {
    const identifier = req.params.identifier
    const image = await Image.findOne({ where: { identifier } });
    res.render('backend/image-delete', { layout: 'layouts/app.ejs',  image})
}
module.exports.deleteImage_post = async (req, res) => {
    const identifier = req.params.identifier
    const image = await Image.findOne({ where: { identifier } });
    await image.destroy();

    fs.unlinkSync(`./public/images/assets/${image.src}`);
    fs.unlinkSync(`./public/images/assets/200/${image.src}`);

    res.redirect('/home/images')
}
//#endregion

//#region Tags
module.exports.tags = async (req, res) => {
    const tags = await Tag.findAll()
    res.render('backend/tag', { layout: 'layouts/app.ejs', tags })
}
module.exports.addTag_get = (req, res) => {    
    res.render('backend/tag-add', { layout: 'layouts/app.ejs' })
}
module.exports.addTag_post = async (req, res) => {
    const {name, slug, active} = req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('tags', {name, slug, active})
        
        req.flash('errors', errors.array())
        return res.redirect('/home/add-tag')
    }
    
    try {
        const tag = {
            identifier: randomstring.generate(),
            name: name,
            slug: slug,
            active: active,
        };

        await Tag.create(tag)
        req.flash('success', [{msg: 'Tag created successfully.'}])
        res.redirect('/home/tags')
    } catch (err) {
        
        req.flash('errors', dbValidationResult(err))
        return res.redirect('/home/add-tag')
        // res.status(500).send(err.errors);
    }    
}
module.exports.updateTag_get = async (req, res) => {
    const slug = req.params.slug
    const tag = await Tag.findOne({ where: { slug } });
    res.render('backend/tag-update', { layout: 'layouts/app.ejs', tag })
}
module.exports.updateTag_post = async (req, res) => {
    const {identifier, name, slug, active} = req.body
    const pSlug = req.params.slug
        
    validationResultwithFields(req, res, 'tags', `/home/tags`, {identifier, name, slug, active})

    try {
        const tag = await Tag.findOne({ where: { identifier } });

        tag.name = name;
        tag.slug = slug;
        tag.active = active;
        
        await tag.save();
        req.flash('success', [{msg: 'Tag updated successfully.'}])
        res.redirect('/home/tags')

    } catch (error) {
        req.flash('errors', dbValidationResult(error))
        return res.redirect(`/home/tags`)
    }
    
}
module.exports.deleteTag_get = async (req, res) => {
    const {slug} = req.params
    const tag = await Tag.findOne({ where: { slug } });
    if (tag) res.render('backend/tag-delete', { layout: 'layouts/app.ejs', tag })

    req.flash('errors', {msg: 'Tag not found'})
    return res.redirect(`/home/tags`)
}
module.exports.deleteTag_post = async (req, res) => {
    const slug = req.params.slug
    const tag = await Tag.findOne({ where: { slug } });

    validationResultwithoutFields(req, res, '/home/tags')
    
    try {
        await tag.destroy()
        req.flash('success', [{msg: 'Tag deleted successfully.'}])
        res.redirect('/home/tags')
    } catch (error) {
        req.flash('errors', dbValidationResult(error))
        return res.redirect(`/home/tags`)
    }
}
//#endregion

//#region Size
module.exports.sizes = async (req, res) => {
    const sizes = await Size.findAll()
    res.render('backend/size', { layout: 'layouts/app.ejs', sizes })
}
module.exports.addSize_get = (req, res) => {
    res.render('backend/size-add', { layout: 'layouts/app.ejs' })
}
module.exports.addSize_post =async (req, res) => {
    const size = {
        identifier: randomstring.generate(),
        size: req.body.size,
        active: req.body.active ? true : false,
    };    

    try {
        await Size.create(size)        
        res.redirect('/home/sizes')
    } catch (err) {
        res.status(500).send(err.errors);  
    }    
}
module.exports.updateSize_get = async (req, res) => {
    const identifier = req.params.identifier
    const size = await Size.findOne({ where: { identifier } });
    res.render('backend/size-update', { layout: 'layouts/app.ejs', size })
}
module.exports.updateSize_post = async (req, res) => {
    try {
        const identifier = req.params.identifier
        const size = await Size.findOne({ where: { identifier } });
        

        size.size = req.body.size;
        size.active = req.body.active ? true : false;
        
        await size.save();
        res.redirect('/home/sizes')

    } catch (error) {
        res.send(error)
    }
}
module.exports.deleteSize_get = async (req, res) => {
    const identifier = req.params.identifier
    const size = await Size.findOne({ where: { identifier } });
    res.render('backend/size-delete', { layout: 'layouts/app.ejs', size })
}
module.exports.deleteSize_post = async (req, res) => {
    const identifier = req.params.identifier
    const size = await Size.findOne({ where: { identifier } });
    if (size) {
        await size.destroy()
    }
    res.redirect('/home/sizes')
}
//#endregion

//#region Product
module.exports.productPosting = async (req, res) => {
        
    const products = await Product.findAll({
        include: [ { model: Category}, { model: SubCategory}, { model: Image } ]
    })
    res.render('backend/product', { layout: 'layouts/app.ejs', products })
}
module.exports.addProduct_get = async (req, res) => {
    const sizes = await Size.findAll()
    const tags = await Tag.findAll()
    const categories = await Category.findAll()
    res.render('backend/product-add', { layout: 'layouts/app.ejs', sizes, tags, categories })
}
module.exports.addProduct_post = async (req, res) => {

    const {name, slug, showcased, recommended, active, usage, price, pagetitle, shortDescription, LongDescription,specifications, features, care, category, subCategory} = req.body
    
    const t = await sequelize.transaction();

    try {        
        const product = await Product.create({
            identifier: randomstring.generate(),
            name: name,
            slug: slug,
            showcased: showcased ? true : false,
            recommended: recommended ? true : false,
            active: active ? true : false,
            usage: usage,
            price: price,
            pagetitle: pagetitle,
            shortDescription: shortDescription,
            LongDescription: LongDescription,
            specifications: specifications,
            features: features,
            care: care,
            categoryId: category,
            subCategoryId: subCategory,
        }, { transaction: t })
        
        //#region Foreign Keys Array
        const images = await Image.findAll({raw:true, attributes: ['id'], where: {id: req.body.image}})
        const imageKey = []
        Object.keys(images).forEach((key)=>{
            imageKey.push(images[key].id)
        })        
        
        const sizes = await Size.findAll({attributes: ['id'],where: {identifier: req.body.size}})
        const sizeKey = []
        Object.keys(sizes).forEach((key)=>{
            sizeKey.push(sizes[key].id)
        })
        
        const tags = await Tag.findAll({attributes: ['id'],where: {identifier: req.body.tag}})
        const tagKey = []
        Object.keys(tags).forEach((key)=>{
            tagKey.push(tags[key].id)
        })
        //#endregion

        await product.addImage(imageKey, { transaction: t });
        await product.addSize(sizeKey, { transaction: t });
        await product.addTag(tagKey, { transaction: t });
        await t.commit();
        
        req.flash('info', 'Product saved successfully')
        res.redirect('/home/product')
    } catch (error) {
        console.log(error);
        req.flash('error', 'error occurred')
        await t.rollback();
        res.redirect('/home/add-product')
    }

}
module.exports.viewProduct_get = async (req, res) => {
    const slugParam = req.params.slug;

    const product = await Product.findOne({
        where: {slug: slugParam},
        include: [
            { model: Size},
            { model: Tag},
            { model: SubCategory},
            { model: Image}
        ]
    })
    
    const sizes = await Size.findAll()
    const tags = await Tag.findAll()
    const categories = await Category.findAll()
    const subCategories = await SubCategory.findAll()
    const images = await Image.findAll()
    res.render('backend/product-view', { layout: 'layouts/app.ejs', sizes, tags, categories, subCategories, product, images })
}
module.exports.updateProduct_get = async (req, res) => {
    const slugParam = req.params.slug;

    const product = await Product.findOne({
        where: {slug: slugParam},
        include: [
            { model: Size},
            { model: Tag},
            { model: SubCategory},
            { model: Image}
        ]
    })
    
    const sizes = await Size.findAll()
    const tags = await Tag.findAll()
    const categories = await Category.findAll()
    const subCategories = await SubCategory.findAll()
    const images = await Image.findAll()
    res.render('backend/product-update', { layout: 'layouts/app.ejs', sizes, tags, categories, subCategories, product, images })
}
module.exports.updateProduct_post = async (req, res) => {
    const slugParam = req.params.slug;
    const product = await Product.findOne({
        where: {slug: slugParam}
    })

    const {name, slug, showcased, recommended, active, usage, price, pagetitle, shortDescription, LongDescription,specifications, features, care, category, subCategory, image, size, tag} = req.body

    const t = await sequelize.transaction();

    try {        
        
        product.name= name;
        product.slug = slug;
        product.showcased= showcased ? true : false;
        product.recommended= recommended ? true : false;
        product.active= active ? true : false;
        product.usage = usage;
        product.price= price;
        product.pagetitle= pagetitle;
        product.shortDescription= shortDescription;
        product.LongDescription= LongDescription;
        product.specifications= specifications;
        product.features= features;
        product.care= care;
        product.categoryId= category;
        product.subCategoryId= subCategory;
           
        // 
        
        //#region Foreign Keys Array
        const images = await Image.findAll({raw:true, attributes: ['id'], where: {id: image}})
        const imageKey = []
        Object.keys(images).forEach((key)=>{
            imageKey.push(images[key].id)
        })        
        
        const sizes = await Size.findAll({attributes: ['id'],where: {id: size}})
        const sizeKey = []
        Object.keys(sizes).forEach((key)=>{
            sizeKey.push(sizes[key].id)
        })
        
        const tags = await Tag.findAll({attributes: ['id'],where: {id: tag}})
        const tagKey = []
        Object.keys(tags).forEach((key)=>{
            tagKey.push(tags[key].id)
        })
        //#endregion

        // console.log(imageKey, sizeKey, tagKey);

        await product.setImages([], {transaction: t})
        await product.setSizes([], {transaction: t})
        await product.setTags([], {transaction: t})
        

        await product.addImage(imageKey, { transaction: t });
        await product.addSize(sizeKey, { transaction: t });
        await product.addTag(tagKey, { transaction: t });
        await product.save({ transaction: t })
        await t.commit();
        
        req.flash('info', 'Product saved successfully')
        res.redirect(`/home/view-product/${product.slug}`)
    } catch (error) {
        console.log(error);
        req.flash('error', 'error occurred')
        await t.rollback();
        res.redirect('/home/update-product')
    }
    
}
module.exports.deleteProduct_get = async (req, res) => {
    const {slug} = req.params;
    const product = await Product.findOne( {where : {slug}})
    res.render('backend/product-delete', { layout: 'layouts/app.ejs', product })
}
module.exports.deleteProduct_post = async (req, res) => {
    const {slug} = req.body;
    const product = await Product.findOne( {where : {slug}})

    await product.destroy();
    req.flash('info', 'Product deleted successfully')
    res.redirect('/home/product');
}
//#endregion





// module.exports.signup_post = async (req, res) => {
//     const { firstname, lastname, email, password, password2 } = req.body;
//     const role = 'customer'

//     try {
//         const user = await User.create({ firstname, lastname, email, password, role})
//         // const token = createToken(user.id)
//         // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
//         // res.render('account', {layout: 'layouts/public_layout.ejs'})

//         res.redirect('/login');

//     } catch (err) {
//         // const errors =  handleErrors(err)
//         // res.status(400).json({errors})
//         res.send(err)
//     }
// }

// module.exports.login_get = (req, res) => {
//     res.render('login', { layout: 'layouts/public_layout.ejs' })
// }

// module.exports.login_post = (req, res) => {
//     // const { email, password} = req.body;

//     // try {
//     //     const user = await User.login(email, password)
//     //     const token = createToken(user.id)
//     //     res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
//     //     res.redirect('/account')
//     //     // res.render('account', {layout: 'layouts/public_layout.ejs'})
//     //     // res.status(200).json({user: user.id})

//     // } catch (err) {
//     //     console.log(err);
//     //     // const errors =  handleErrors(err)
//     //     res.send(err)
//     // }

    
// 	res.redirect('/account');
// }

// module.exports.logout_get = (req, res) => {
//     res.cookie('jwt', '', { maxAge: 1 })
//     res.redirect('/')
// }

// module.exports.account_get = (req, res) => {
//     res.render('account', { layout: 'layouts/public_layout.ejs'})
// }

// module.exports.password_forgot_get = (req, res) => {
//     res.render('forgot-password', { layout: 'layouts/public_layout.ejs' })
// }

// module.exports.password_forgot_done_get = (req, res) => {
//     res.render('password-reset-done', { layout: 'layouts/public_layout.ejs' })
// }

function imageResize(file, name, width) {
    // http://jsfiddle.net/sp3c7jeq/

    var canvas = createCanvas(),
    ctx = canvas.getContext("2d");
    
    loadImage(file).then((img) => {
        canvas.width = width;
        canvas.height = canvas.width * (img.height / img.width);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        SaveImage(canvas.toDataURL(), name, width)
    })
}

function SaveImage(base64Image, name, width) { // SaveImage function takes base64 image and save it to folder. Name of the image is returned with correct extension
    
    var dir = `./public/images/assets/${width}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const imageType = base64Image.substring(base64Image.indexOf(":")+1, base64Image.indexOf(";"))
    const ext = imageType.replace('image/', '');
   
    const data = base64Image.replace(`data:${imageType};base64,`, "");
  
    fs.writeFile(`${dir}/${name}`, data, 'base64', (err) => { if (err) console.log(err); })
  
    return `${name}`
}

function dbValidationResult(err) {
    console.log(err.errors, 'db errors-----------------------');
    let errmsg = []
    if (err.errors) {
        
        err.errors.forEach(e => {
            errmsg.push({msg: e.message})
        });
        console.log(errmsg, '---- errmsg');
        return errmsg;
    }
    return {msg: 'Tag not found'}
}

function validationResultwithFields(req, res, key, redirect, values) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash(key, values)
        
        req.flash('errors', errors.array())
        return res.redirect(redirect)
    }
}
function validationResultwithoutFields(req, res, redirect, ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        req.flash('errors', errors.array())
        return res.redirect(redirect)
    }
}