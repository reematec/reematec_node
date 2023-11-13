const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelizeCN');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Image = require('../models/Image');
const Size = require('../models/Size');
const Tag = require('../models/Tag');


const Product = sequelize.define('product', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    slug:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    showcased:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    recommended:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    active:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    price:{
        type: Sequelize.DataTypes.DECIMAL(10,2),
        allowNull:true
    },
    pagetitle:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    shortDescription:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,        
    },
    LongDescription:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,        
    },
    specifications:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,        
    },
    features:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,        
    },
    care:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,        
    },    
    usage:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },    
    categoryId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: true,
	},
    subCategoryId: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: true,
	},
})

Category.hasMany(Product);
Product.belongsTo(Category);

SubCategory.hasMany(Product);
Product.belongsTo(SubCategory);

Image.belongsToMany(Product, {   through: 'Product_Image' });
Product.belongsToMany(Image, { through: 'Product_Image'});

Size.belongsToMany(Product, {  through: 'Product_Size'});
Product.belongsToMany(Size, { through: 'Product_Size'});

Tag.belongsToMany(Product, { through: 'Product_Tag'});
Product.belongsToMany(Tag, {  through: 'Product_Tag'});

sequelize.sync();

Product.sync(
    // { force: true }
    // { alter: true }
)


module.exports = Product;