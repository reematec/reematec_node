const jwt = require("jsonwebtoken");
const passport = require("passport");
const randomstring = require("randomstring");
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const path = require("path");
const sharp = require("sharp");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const Tag = require("../models/Tag");
const Size = require("../models/Size");
const Image = require("../models/Image");
const Blog = require("../models/Blog");
const Meta = require("../models/Meta");
const User = require("../models/User");
const sequelize = require("../utils/sequelizeCN");
// const { createCanvas, loadImage } = require("canvas");
const FileType = require("file-type");

const nodemailer = require("nodemailer");
const { encrypt, decrypt } = require("../utils/encrypter");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const imageDimensions = [100, 300, 500];

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

module.exports.dashboard = (req, res) => {
  res.render("backend/dashboard", { layout: "layouts/app.ejs" });
};

//#region Category
module.exports.category = async (req, res) => {
  const categories = await Category.findAll();
  res.render("backend/category", { layout: "layouts/app.ejs", categories });
};
module.exports.addCategory_get = (req, res) => {
  res.render("backend/category-add", { layout: "layouts/app.ejs" });
};
module.exports.addCategory_post = async (req, res) => {
  const { name, slug, pagetitle, description, showSubMenu } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("category", { name, slug, pagetitle, description, showSubMenu });

    req.flash("errors", errors.array());
    return res.redirect("/home/add-category");
  }

  const category = {
    identifier: randomstring.generate(),
    name: name,
    slug: slug,
    pagetitle: pagetitle,
    description: description,
    showSubMenu: showSubMenu,
  };

  try {
    await Category.create(category);
    req.flash("success", [{ message: "Category created successfully." }]);
    delete req.session.category;
    res.redirect("/home/category");
  } catch (err) {
    console.log(err.errors);
  }
};
module.exports.updateCategory_get = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("category", { slug });

    req.flash("errors", errors.array());
    return res.redirect("/home/category");
  }

  const category = await Category.findOne({ where: { slug } });
  if (!category) {
    req.flash("errors", [{ message: "category not found." }]);
    return res.redirect("/home/category");
  }

  res.render("backend/category-update", { layout: "layouts/app.ejs", category });
};
module.exports.updateCategory_post = async (req, res) => {
  const { identifier, name, slug, pagetitle, description, showSubMenu } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("category", { identifier, name, slug, pagetitle, description, showSubMenu });

    req.flash("errors", errors.errors);
    return res.redirect(`/home/update-category/${slug}`);
  }

  try {
    const category = await Category.findOne({ where: { identifier } });
    if (!category) {
      req.flash("errors", [{ message: "category not found." }]);
      return res.redirect("/home/category");
    }

    category.name = name;
    category.slug = slug;
    category.pagetitle = pagetitle;
    category.description = description;
    category.showSubMenu = showSubMenu ? true : false;

    await category.save();

    res.redirect("/home/category");
  } catch (error) {
    req.flash("errors", [{ message: "category not found." }]);
    console.log(JSON.stringify(error, null, 4));
    // res.send(error)
  }
};
module.exports.deleteCategory_get = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("category", { slug });

    req.flash("errors", errors.array());
    return res.redirect("/home/category");
  }

  const category = await Category.findOne({ where: { slug } });
  if (!category) {
    req.flash("errors", [{ message: "category not found." }]);
    return res.redirect("/home/category");
  }
  res.render("backend/category-delete", { layout: "layouts/app.ejs", category });
};
module.exports.deleteCategory_post = async (req, res) => {
  const { identifier } = req.body;

  const category = await Category.findOne({ where: { identifier } });
  if (category) {
    req.flash("success", [{ message: `Category "${category.name}" deleted successfully.` }]);
    await category.destroy();
  } else {
    req.flash("errors", [{ message: "category not found." }]);
  }
  res.redirect("/home/category");
};
module.exports.categoryStatus_post = async (req, res) => {
  const { slug } = req.body;

  try {
    const category = await Category.findOne({ where: { slug } });
    category.active = !category.active;
    await category.save();
    req.flash("info", [{ message: "Category status updated successfully." }]);
  } catch (error) {
    req.flash("errors", [{ message: "Category status failed to update." }]);
    console.log(error);
  }
  res.redirect(req.headers.referer);
};
module.exports.categoryDisplay_post = async (req, res) => {
  const { slug } = req.body;

  try {
    const category = await Category.findOne({ where: { slug } });
    category.showOnHomepage = !category.showOnHomepage;
    await category.save();
    req.flash("info", [{ message: `Category "${category.name}" status updated successfully.` }]);
  } catch (error) {
    req.flash("errors", [{ message: `Category status failed to update.` }]);
    console.log(error);
  }
  res.redirect(req.headers.referer);
};
//#endregion

//#region SubCategory
module.exports.subcategory = async (req, res) => {
  const subcategories = await SubCategory.findAll({ include: Category });
  res.render("backend/subcategory", { layout: "layouts/app.ejs", subcategories });
};
module.exports.addSubcategory_get = async (req, res) => {
  const categories = await Category.findAll();
  res.render("backend/subcategory-add", { layout: "layouts/app.ejs", categories });
};
module.exports.addSubcategory_post = async (req, res) => {
  const { category, name, slug, pagetitle, description, active } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("subcategory", { category, name, slug, pagetitle, description, active });

    req.flash("errors", errors.array());
    return res.redirect("/home/add-subcategory");
  }

  const cat = await Category.findOne({ where: { id: category } });
  if (!cat) {
    req.flash("errors", [{ message: "category not found." }]);
    return res.redirect("/home/category");
  }

  const subcategory = {
    identifier: randomstring.generate(),
    name: name,
    slug: slug,
    pagetitle: pagetitle,
    description: description,
    active: active,
    categoryId: cat.id,
  };

  try {
    await SubCategory.create(subcategory);
    req.flash("success", [{ message: "Subcategory created successfully." }]);
    res.redirect("/home/subcategory");
  } catch (err) {
    res.status(500).send(err.errors);
  }
};
module.exports.updateSubcategory_get = async (req, res) => {
  const { slug } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect(`/home/subcategory/`);
  }

  const subcategory = await SubCategory.findOne({ where: { slug } });
  if (!subcategory) {
    req.flash("errors", [{ message: "subcategory not found." }]);
    return res.redirect("/home/subcategory");
  }
  const categories = await Category.findAll();
  res.render("backend/subcategory-update", { layout: "layouts/app.ejs", categories, subcategory });
};
module.exports.updateSubcategory_post = async (req, res) => {
  const { category, name, slug, pagetitle, description, active } = req.body;
  const slugParam = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("subcategory", { category, name, slug, pagetitle, description, active });

    req.flash("errors", errors.array());
    return res.redirect(`/home/update-subcategory/${slugParam}`);
  }

  try {
    const cat = await Category.findOne({ where: { id: category } });
    if (!cat) {
      req.flash("errors", [{ message: "category not found." }]);
      return res.redirect("/home/subcategory");
    }

    const subcategory = await SubCategory.findOne({ where: { slug: slugParam } });
    if (!subcategory) {
      req.flash("errors", [{ message: "subcategory not found." }]);
      return res.redirect("/home/subcategory");
    }

    subcategory.name = name;
    subcategory.slug = slug;
    subcategory.pagetitle = pagetitle;
    subcategory.description = description;
    subcategory.active = active ? true : false;
    subcategory.categoryId = category;

    await subcategory.save();
    req.flash("success", [{ message: "Subcategory updated successfully." }]);
    res.redirect("/home/subcategory");
  } catch (error) {
    res.send(error);
  }
};
module.exports.deleteSubcategory_get = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect(`/home/subcategory/`);
  }

  const subcategory = await SubCategory.findOne({ where: { slug } });
  if (!subcategory) {
    req.flash("errors", [{ message: "subcategory not found." }]);
    return res.redirect("/home/subcategory");
  }
  res.render("backend/subcategory-delete", { layout: "layouts/app.ejs", subcategory });
};
module.exports.deleteSubcategory_post = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect(`/home/subcategory/`);
  }

  const subcategory = await SubCategory.findOne({ where: { slug } });
  if (!subcategory) {
    req.flash("errors", [{ message: "subcategory not found." }]);
    return res.redirect("/home/subcategory");
  }
  await subcategory.destroy();
  req.flash("success", [{ message: "Subcategory deleted successfully." }]);
  res.redirect("/home/subcategory");
};
module.exports.subcategoryStatus_post = async (req, res) => {
  const { slug } = req.body;

  try {
    const subcategory = await SubCategory.findOne({ where: { slug } });
    subcategory.active = !subcategory.active;
    await subcategory.save();
    req.flash("info", [{ message: "SubCategory status updated successfully." }]);
  } catch (error) {
    req.flash("errors", [{ message: "SubCategory status failed to update." }]);
    console.log(error);
  }
  res.redirect(req.headers.referer);
};
module.exports.getSubcatgories = async (req, res) => {
  const id = req.params.id;
  const subcategories = await SubCategory.findAll({ where: { categoryId: id } });

  res.json({ subcategories });
};
//#endregion

//#region Gallery
module.exports.gallery_get = async (req, res) => {
  let { page } = req.query;
  const limit = 25;
  page -= 1;
  const offset = page ? page * limit : 0;

  const images = await Image.findAndCountAll({
    distinct: true,
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  page += 1;
  images.currentPage = page ? page : 1;
  images.totalPages = Math.ceil(images.count / limit);

  res.render("backend/gallery", { layout: "layouts/app.ejs", images, currentUrl: pathname(req), title: "Reema", description: "Description" });
};

module.exports.addImages_get = async (req, res) => {
  res.render("backend/image", { layout: "layouts/app.ejs" });
};

module.exports.addImages_post = async (req, res) => {
  let uploadedData = [];

  if (req.files.images && !req.files.images.length) {
    uploadedData.push(req.files.images);
  } else {
    uploadedData = req.files.images;
  }

  uploadedData.forEach((data) => {
    const image = data;

    const file = path.parse(image.name);
    const imageName = `${file.name}-${Date.now()}${file.ext}`;
    const imagePath = `./public/images/assets/${imageName}`;
    // console.log(imageName);

    // Moving original uploaded image to assets directory
    image.mv(imagePath, async (err) => {
      if (err) {
        console.log("Image Move Error: " + err);
      } else {
        imageDimensions.forEach((dim) => {
          const dir = `./public/images/assets/${dim}`;
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

          // Creating thumbnails for uploaded image after moving it to assets directory.
          sharp(imagePath, { failOnError: false })
            .resize(dim)
            .toFile(`${dir}/${imageName}`, (err, info) => {
              err ? console.log(err) : "";
            });
        });

        // console.log("Image moved successfully: " + imageName);

        // Inserting image record to database after original image upload & moving and creating its thumbnails
        const img = {
          identifier: randomstring.generate(),
          src: imageName,
          name: imageName.substring(0, imageName.indexOf(".")),
          ext: imageName.substring(imageName.indexOf(".") + 1),
        };

        try {
          req.flash("success", [{ message: imageName + " uploaded successfully." }]);
          await Image.create(img);
        } catch (error) {
          req.flash("errors", error);
          console.log(console.log(error));
        }
      }
    });
  });

  setTimeout(() => {
    return res.redirect("/home/images");
  }, 1000);
};
module.exports.updateImage_get = async (req, res) => {
  const { identifier } = req.params;
  const image = await Image.findOne({ where: { identifier } });

  res.render("backend/image-update", { layout: "layouts/app.ejs", image });
};
module.exports.updateImage_post = async (req, res) => {
  // const { identifier } = req.params
  const { identifier, src, altText, title, description, caption } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("image", { src, altText, title, description, caption });

    req.flash("errors", errors.array());
    return res.redirect("/home/images");
  }
  const image = await Image.findOne({ where: { identifier } });

  try {
    const fileName = src + image.src.substring(image.src.indexOf("."));

    fs.renameSync(`./public/images/assets/${image.src}`, `./public/images/assets/${fileName}`, function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Large image renamed");
    });

    imageDimensions.forEach((dim) => {
      fs.renameSync(`./public/images/assets/${dim}/${image.src}`, `./public/images/assets/${dim}/${fileName}`, function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log(`${dim} Pixel Image renamed`);
      });
    });

    // fs.renameSync(`./public/images/assets/300/${image.src}`, `./public/images/assets/300/${fileName}`, function (err) {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   }
    //   console.log("300 Pixel Image renamed");
    // });

    // fs.renameSync(`./public/images/assets/100/${image.src}`, `./public/images/assets/100/${fileName}`, function (err) {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   }
    //   console.log("100 Pixel Image renamed");
    // });

    if (src) image.src = fileName;
    if (altText) image.altText = altText;
    if (title) image.title = title;
    if (description) image.description = description;
    if (caption) image.caption = caption;

    await image.save();
    req.flash("success", [{ message: "Image updated successfully." }]);
  } catch (error) {
    req.flash("errors", [{ message: "Error occurred." }]);
    console.log(error);
  }

  return res.redirect("/home/images");
};
module.exports.imagesAjax = async (req, res) => {
  const getPagination = (page, size) => {
    const limit = 10;
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

  Image.findAndCountAll({
    limit,
    offset,
    order: [["id", "DESC"]],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch((err) => {
      res.json(500, { message: err.message || "Some error occurred." });
    });
};
module.exports.deleteImage_get = async (req, res) => {
  const identifier = req.params.identifier;
  const image = await Image.findOne({ where: { identifier } });
  res.render("backend/image-delete", { layout: "layouts/app.ejs", image });
};
module.exports.deleteImage_post = async (req, res) => {
  const identifier = req.params.identifier;
  const image = await Image.findOne({ where: { identifier } });

  try {
    await image.destroy();

    imageDimensions.forEach((dim) => {
      fs.unlinkSync(`./public/images/assets/${dim}/${image.src}`);
    });

    fs.unlinkSync(`./public/images/assets/${image.src}`);

    req.flash("success", [{ message: image.src + " deleted successfully." }]);
    res.redirect("/home/images");
  } catch (errors) {
    console.log(errors.error);
    req.flash("errors", [{ message: errors.error }]);
    res.redirect("/home/images");
  }
};
//#endregion

//#region Tags
module.exports.tags = async (req, res) => {
  const tags = await Tag.findAll();
  res.render("backend/tag", { layout: "layouts/app.ejs", tags });
};
module.exports.addTag_get = (req, res) => {
  res.render("backend/tag-add", { layout: "layouts/app.ejs" });
};
module.exports.addTag_post = async (req, res) => {
  const { name, slug, active } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("tags", { name, slug, active });

    req.flash("errors", errors.array());
    return res.redirect("/home/add-tag");
  }

  try {
    const tag = {
      identifier: randomstring.generate(),
      name: name,
      slug: slug,
      active: active,
    };

    await Tag.create(tag);
    req.flash("success", [{ message: "Tag created successfully." }]);
    res.redirect("/home/tags");
  } catch (err) {
    req.flash("errors", dbValidationResult(err));
    return res.redirect("/home/add-tag");
    // res.status(500).send(err.errors);
  }
};
module.exports.updateTag_get = async (req, res) => {
  const slug = req.params.slug;
  const tag = await Tag.findOne({ where: { slug } });
  res.render("backend/tag-update", { layout: "layouts/app.ejs", tag });
};
module.exports.updateTag_post = async (req, res) => {
  const { identifier, name, slug, active } = req.body;
  const pSlug = req.params.slug;

  validationResultwithFields(req, res, "tags", `/home/tags`, { identifier, name, slug, active });

  try {
    const tag = await Tag.findOne({ where: { identifier } });

    tag.name = name;
    tag.slug = slug;
    tag.active = active;

    await tag.save();
    req.flash("success", [{ message: "Tag updated successfully." }]);
    res.redirect("/home/tags");
  } catch (error) {
    req.flash("errors", dbValidationResult(error));
    return res.redirect(`/home/tags`);
  }
};
module.exports.deleteTag_get = async (req, res) => {
  const { slug } = req.params;
  const tag = await Tag.findOne({ where: { slug } });
  if (tag) res.render("backend/tag-delete", { layout: "layouts/app.ejs", tag });

  req.flash("errors", { msg: "Tag not found" });
  return res.redirect(`/home/tags`);
};
module.exports.deleteTag_post = async (req, res) => {
  const slug = req.params.slug;
  const tag = await Tag.findOne({ where: { slug } });

  validationResultwithoutFields(req, res, "/home/tags");

  try {
    await tag.destroy();
    req.flash("success", [{ message: "Tag deleted successfully." }]);
    res.redirect("/home/tags");
  } catch (error) {
    req.flash("errors", dbValidationResult(error));
    return res.redirect(`/home/tags`);
  }
};
//#endregion

//#region Size
module.exports.sizes = async (req, res) => {
  const sizes = await Size.findAll();
  res.render("backend/size", { layout: "layouts/app.ejs", sizes });
};
module.exports.addSize_get = (req, res) => {
  res.render("backend/size-add", { layout: "layouts/app.ejs" });
};
module.exports.addSize_post = async (req, res) => {
  const size = {
    identifier: randomstring.generate(),
    size: req.body.size,
    active: req.body.active ? true : false,
  };

  try {
    await Size.create(size);
    res.redirect("/home/sizes");
  } catch (err) {
    res.status(500).send(err.errors);
  }
};
module.exports.updateSize_get = async (req, res) => {
  const identifier = req.params.identifier;
  const size = await Size.findOne({ where: { identifier } });
  res.render("backend/size-update", { layout: "layouts/app.ejs", size });
};
module.exports.updateSize_post = async (req, res) => {
  try {
    const identifier = req.params.identifier;
    const size = await Size.findOne({ where: { identifier } });

    size.size = req.body.size;
    size.active = req.body.active ? true : false;

    await size.save();
    res.redirect("/home/sizes");
  } catch (error) {
    res.send(error);
  }
};
module.exports.deleteSize_get = async (req, res) => {
  const identifier = req.params.identifier;
  const size = await Size.findOne({ where: { identifier } });
  res.render("backend/size-delete", { layout: "layouts/app.ejs", size });
};
module.exports.deleteSize_post = async (req, res) => {
  const identifier = req.params.identifier;
  const size = await Size.findOne({ where: { identifier } });
  if (size) {
    await size.destroy();
  }
  res.redirect("/home/sizes");
};
//#endregion

//#region Product
module.exports.productPosting = async (req, res) => {
  let { page } = req.query;
  const limit = 25;
  page -= 1;
  const offset = page ? page * limit : 0;

  const products = await Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category }, { model: SubCategory }, { model: Image }],
    order: [["id", "DESC"]],
  });

  page += 1;
  products.currentPage = page ? page : 1;
  products.totalPages = Math.ceil(products.count / limit);

  res.render("backend/product", { layout: "layouts/app.ejs", products, currentUrl: pathname(req) });
};
module.exports.addProduct_get = async (req, res) => {
  const sizes = await Size.findAll();
  const tags = await Tag.findAll();
  const categories = await Category.findAll();
  res.render("backend/product-add", { layout: "layouts/app.ejs", sizes, tags, categories });
};
module.exports.addProduct_post = async (req, res) => {
  const { name, slug, usage, year, price, pagetitle, shortDescription, LongDescription, specifications, features, care, category, subCategory, image, size, tag } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("addProduct", { name, slug, usage, year, price, pagetitle, shortDescription, LongDescription, specifications, features, care, category, subCategory, image, size, tag });

    req.flash("errors", errors.array());
    return res.redirect("/home/add-product");
  }

  if (!name || !slug) res.redirect("/home/add-product");

  const t = await sequelize.transaction();

  try {
    const product = await Product.create(
      {
        identifier: randomstring.generate(),
        name: name,
        slug: slug,
        // showcased: showcased ? true : false,
        // recommended: recommended ? true : false,
        usage: usage,
        year: year,
        price: price,
        pagetitle: pagetitle,
        shortDescription: shortDescription,
        LongDescription: LongDescription,
        specifications: specifications,
        features: features,
        care: care,
        categoryId: category == 0 ? null : category,
        subCategoryId: subCategory == 0 ? null : subCategory,
      },
      { transaction: t }
    );

    //#region Foreign Keys Array
    const imageKey = [];
    const sizeKey = [];
    const tagKey = [];

    if (image && image.length > 0) {
      const images = await Image.findAll({ raw: true, attributes: ["id"], where: { id: image } });
      Object.keys(images).forEach((key) => imageKey.push(images[key].id));
    }

    if (size && size.length > 0) {
      const sizes = await Size.findAll({ attributes: ["id"], where: { identifier: size } });
      Object.keys(sizes).forEach((key) => sizeKey.push(sizes[key].id));
    }

    if (tag && tag.length > 0) {
      const tags = await Tag.findAll({ attributes: ["id"], where: { identifier: tag } });
      Object.keys(tags).forEach((key) => tagKey.push(tags[key].id));
    }
    //#endregion

    await product.addImage(imageKey, { transaction: t });
    await product.addSize(sizeKey, { transaction: t });
    await product.addTag(tagKey, { transaction: t });
    await t.commit();

    // console.log(JSON.stringify(product, null, 4));

    req.flash("info", [{ message: "Product saved successfully." }]);
    res.redirect("/home/product");
  } catch (err) {
    req.flash("addProduct", { name, slug, showcased, recommended, active, usage, year, price, pagetitle, shortDescription, LongDescription, specifications, features, care, category, subCategory });

    if (err.errors.length > 0) {
      req.flash("errors", err.errors);
    } else {
      req.flash("errors", [{ message: "some error occured." }]);
    }

    await t.rollback();
    res.redirect("/home/add-product");
  }
};
module.exports.viewProduct_get = async (req, res) => {
  const slugParam = req.params.slug;

  const product = await Product.findOne({
    where: { slug: slugParam },
    include: [{ model: Size }, { model: Tag }, { model: SubCategory }, { model: Image }],
  });

  const sizes = await Size.findAll();
  const tags = await Tag.findAll();
  const categories = await Category.findAll();
  const subcategories = await SubCategory.findAll();
  const images = await Image.findAll();
  res.render("backend/product-view", { layout: "layouts/app.ejs", sizes, tags, categories, subcategories, product, images });
};
module.exports.updateProduct_get = async (req, res) => {
  const slugParam = req.params.slug;

  const product = await Product.findOne({
    where: { slug: slugParam },
    include: [{ model: Size }, { model: Tag }, { model: SubCategory }, { model: Image }],
  });

  const sizes = await Size.findAll();
  const tags = await Tag.findAll();
  const categories = await Category.findAll();
  const subcategories = await SubCategory.findAll();
  const images = await Image.findAll();
  res.render("backend/product-update", { layout: "layouts/app.ejs", sizes, tags, categories, subcategories, product, images });
};
module.exports.updateProduct_post = async (req, res) => {
  const slugParam = req.params.slug;

  console.log(req.body);

  const { name, slug, usage, year, price, pagetitle, shortDescription, LongDescription, specifications, features, care, category, subCategory, image, size, tag } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("product", { name, slug, usage, year, price, pagetitle, shortDescription, LongDescription, specifications, features, care, category, subCategory, image, size, tag });

    console.log(errors.array());
    req.flash("errors", errors.array());
    res.redirect(`/home/update-product/${product.slug}`);
  }

  const product = await Product.findOne({ where: { slug: slugParam } });

  const t = await sequelize.transaction();

  try {
    product.name = name;
    product.slug = slug;
    // product.showcased = showcased ? true : false;
    // product.recommended = recommended ? true : false;
    product.usage = usage;
    product.year = year;
    product.price = price;
    product.pagetitle = pagetitle;
    product.shortDescription = shortDescription;
    product.LongDescription = LongDescription;
    product.specifications = specifications;
    product.features = features;
    product.care = care;
    product.categoryId = category == 0 ? null : category;
    product.subCategoryId = subCategory == 0 ? null : subCategory;

    //

    //#region Foreign Keys Array
    const imageKey = [];
    const sizeKey = [];
    const tagKey = [];

    if (image && image.length > 0) {
      const images = await Image.findAll({ raw: true, attributes: ["id"], where: { id: image } });
      Object.keys(images).forEach((key) => {
        imageKey.push(images[key].id);
      });
    }

    if (size && size.length > 0) {
      const sizes = await Size.findAll({ attributes: ["id"], where: { id: size } });
      Object.keys(sizes).forEach((key) => sizeKey.push(sizes[key].id));
    }

    if (tag && tag.length > 0) {
      const tags = await Tag.findAll({ attributes: ["id"], where: { id: tag } });
      Object.keys(tags).forEach((key) => tagKey.push(tags[key].id));
    }
    //#endregion

    await product.setImages([], { transaction: t });
    await product.setSizes([], { transaction: t });
    await product.setTags([], { transaction: t });

    await product.addImage(imageKey, { transaction: t });
    await product.addSize(sizeKey, { transaction: t });
    await product.addTag(tagKey, { transaction: t });
    await product.save({ transaction: t });
    await t.commit();

    req.flash("info", [{ message: "Product updated successfully." }]);
    res.redirect("/home/product");
  } catch (err) {
    req.flash("product", { name, slug, usage, year, price, pagetitle, shortDescription, LongDescription, specifications, features, care, category, subCategory });

    console.log(err);
    if (err.errors) {
      req.flash("errors", err.errors);
    } else {
      req.flash("errors", [{ message: "some error occured." }]);
    }

    await t.rollback();
    res.redirect(`/home/update-product/${product.slug}`);
  }
};
module.exports.deleteProduct_get = async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ where: { slug } });
  res.render("backend/product-delete", { layout: "layouts/app.ejs", product });
};
module.exports.deleteProduct_post = async (req, res) => {
  const { slug } = req.body;
  const product = await Product.findOne({ where: { slug } });

  await product.destroy();
  req.flash("info", "Product deleted successfully");
  res.redirect("/home/product");
};
module.exports.showcase_post = async (req, res) => {
  const { slug } = req.body;

  try {
    const product = await Product.findOne({ where: { slug } });
    product.showcased = !product.showcased;
    await product.save();
    req.flash("info", [{ message: "Showcase status updated successfully." }]);
  } catch (error) {
    req.flash("errors", [{ message: "Showcase status failed to update." }]);
    console.log(error);
  }
  res.redirect(req.headers.referer);
};
module.exports.recommendation_post = async (req, res) => {
  const { slug } = req.body;

  try {
    const product = await Product.findOne({ where: { slug } });
    product.recommended = !product.recommended;
    await product.save();
    req.flash("info", [{ message: "Product status updated successfully." }]);
  } catch (error) {
    req.flash("errors", [{ message: "Product status failed to update." }]);
    console.log(error);
  }
  res.redirect(req.headers.referer);
};
module.exports.changeStatus_post = async (req, res) => {
  const { slug } = req.body;

  try {
    const product = await Product.findOne({ where: { slug } });
    product.active = !product.active;
    await product.save();
    req.flash("info", [{ message: "Product status updated successfully." }]);
  } catch (error) {
    req.flash("errors", [{ message: "Product status failed to update." }]);
    console.log(error);
  }
  res.redirect(req.headers.referer);
};
//#endregion

//#region Blog
module.exports.blogs = async (req, res) => {
  const blogs = await Blog.findAll({});
  res.render("backend/blogs", { layout: "layouts/app.ejs", blogs });
};
module.exports.viewBlog_get = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("blog", { slug });

    req.flash("errors", errors.array());
    return res.redirect("/home/blogs");
  }

  const blog = await Blog.findOne({ where: { slug: slug } });
  if (!blog) {
    req.flash("errors", [{ message: "blog not found." }]);
    return res.redirect("/home/blogs");
  }

  res.render("backend/blog-view", { layout: "layouts/app.ejs", blog });
};
module.exports.addBlog_get = async (req, res) => {
  res.render("backend/blog-add", { layout: "layouts/app.ejs" });
};
module.exports.addBlog_post = async (req, res) => {
  const { name, slug, pagetitle, content, active } = req.body;

  const blogImage = req.files;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("blog", { name, slug, pagetitle, content, active });

    req.flash("errors", errors.array());
    return res.redirect("/home/add-blog");
  }

  if (blogImage) {
    blogImage.image.mv(`./public/images/assets/${blogImage.image.name}`, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("uploaded");
      }
    });
  }

  const blog = {
    identifier: randomstring.generate(),
    image: blogImage ? blogImage.image.name : null,
    name: name,
    slug: slug,
    pagetitle: pagetitle,
    content: content,
    active: active,
  };

  try {
    await Blog.create(blog);
    req.flash("success", [{ message: `Blog <strong>"${blog.name}"</strong> created successfully.` }]);
    // delete req.session.blog
    res.redirect(`/home/view-blog/${blog.slug}`);
  } catch (err) {
    console.log(err.errors);
    // res.status(500).send(err.errors);
  }
};
module.exports.updateBlog_get = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("blog", { slug });

    req.flash("errors", errors.array());
    return res.redirect("/home/blogs");
  }

  const blog = await Blog.findOne({ where: { slug } });
  if (!blog) {
    req.flash("errors", [{ message: "blog not found." }]);
    return res.redirect("/home/blogs");
  }

  res.render("backend/blog-update", { layout: "layouts/app.ejs", blog });
};
module.exports.updateBlog_post = async (req, res) => {
  const { identifier, name, slug, pagetitle, content, active } = req.body;
  const blogImage = req.files;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("blog", { identifier, name, slug, pagetitle, content, active });

    req.flash("errors", errors.array());
    return res.redirect(`/home/update-blog/${slug}`);
  }

  if (blogImage) {
    blogImage.image.mv(`./public/images/assets/${blogImage.image.name}`, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("uploaded");
      }
    });
  }

  try {
    const blog = await Blog.findOne({ where: { identifier } });
    if (!blog) {
      req.flash("errors", [{ message: "blog not found." }]);
      return res.redirect("/home/blogs");
    }
    (blog.image = blogImage ? blogImage.image.name : blog.image), (blog.name = name);
    blog.slug = slug;
    blog.pagetitle = pagetitle;
    blog.content = content;
    blog.active = active;

    await blog.save();

    req.flash("success", [{ message: `Blog <strong>"${blog.name}"</strong> Updated successfully.` }]);
    res.redirect(`/home/view-blog/${blog.slug}`);
  } catch (error) {
    res.send(error);
  }
};
module.exports.deleteBlog_get = async (req, res) => {
  const slug = req.params.slug;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("blog", { slug });

    req.flash("errors", errors.array());
    return res.redirect("/home/blogs");
  }

  const blog = await Blog.findOne({ where: { slug } });
  if (!blog) {
    req.flash("errors", [{ message: "blog not found." }]);
    return res.redirect("/home/blogs");
  }
  res.render("backend/blog-delete", { layout: "layouts/app.ejs", blog });
};
module.exports.deleteBlog_post = async (req, res) => {
  const { identifier } = req.body;

  const blog = await Blog.findOne({ where: { identifier } });
  if (blog) {
    req.flash("success", [{ message: `Blog "${blog.name}" deleted successfully.` }]);
    await blog.destroy();
  } else {
    req.flash("errors", [{ message: "blog not found." }]);
  }
  res.redirect("/home/blogs");
};
//#endregion

//#region Description
module.exports.meta = async (req, res) => {
  const meta = await Meta.findAll();
  res.render("backend/meta", { layout: "layouts/app.ejs", meta });
};
module.exports.viewMeta_get = async (req, res) => {
  const identifier = req.params.identifier;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("meta", { identifier });

    req.flash("errors", errors.array());
    return res.redirect("/home/meta");
  }

  const meta = await Meta.findOne({ where: { identifier } });
  if (!meta) {
    req.flash("errors", [{ message: "Meta info not found." }]);
    return res.redirect("/home/meta");
  }

  res.render("backend/meta-view", { layout: "layouts/app.ejs", meta });
};
module.exports.addMeta_get = async (req, res) => {
  res.render("backend/meta-add", { layout: "layouts/app.ejs" });
};
module.exports.addMeta_post = async (req, res) => {
  const { page, title, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("meta", { page, description });

    req.flash("errors", errors.array());
    return res.redirect("/home/add-meta");
  }

  const desc = {
    identifier: randomstring.generate(),
    page: page,
    title: title,
    description: description,
  };

  try {
    await Meta.create(desc);
    req.flash("success", [{ message: `Meta <strong>"${page}"</strong> created successfully.` }]);
    res.redirect(`/home/view-meta/${desc.identifier}`);
  } catch (err) {
    console.log(err.errors);
  }
};
module.exports.updateMeta_get = async (req, res) => {
  const identifier = req.params.identifier;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("meta", { identifier });

    req.flash("errors", errors.array());
    return res.redirect("/home/meta");
  }

  const meta = await Meta.findOne({ where: { identifier } });
  if (!meta) {
    req.flash("errors", [{ message: "Meta not found." }]);
    return res.redirect("/home/meta");
  }

  res.render("backend/meta-update", { layout: "layouts/app.ejs", meta });
};
module.exports.updateMeta_post = async (req, res) => {
  const { identifier, page, title, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("meta", { identifier, page, description });

    req.flash("errors", errors.array());
    return res.redirect(`/home/update-meta/${identifier}`);
  }

  try {
    const meta = await Meta.findOne({ where: { identifier } });
    if (!meta) {
      req.flash("errors", [{ message: "Meta not found." }]);
      return res.redirect("/home/meta");
    }

    meta.page = page;
    meta.title = title;
    meta.description = description;

    await meta.save();

    req.flash("success", [{ message: `Meta <strong>"${meta.page}"</strong> Updated successfully.` }]);
    res.redirect(`/home/view-meta/${meta.identifier}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteMeta_get = async (req, res) => {
  const identifier = req.params.identifier;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("meta", { identifier });

    req.flash("errors", errors.array());
    return res.redirect("/home/meta");
  }

  const meta = await Meta.findOne({ where: { identifier } });
  if (!meta) {
    req.flash("errors", [{ message: "meta not found." }]);
    return res.redirect("/home/meta");
  }
  res.render("backend/meta-delete", { layout: "layouts/app.ejs", meta });
};
module.exports.deleteMeta_post = async (req, res) => {
  const { identifier } = req.body;

  const meta = await Meta.findOne({ where: { identifier } });
  if (meta) {
    req.flash("success", [{ message: `Meta "${meta.page}" deleted successfully.` }]);
    await meta.destroy();
  } else {
    req.flash("errors", [{ message: "meta not found." }]);
  }
  res.redirect("/home/meta");
};
//#endregion

//#region User
module.exports.users = async (req, res) => {
  const users = await User.findAll();
  res.render("backend/users", { layout: "layouts/app.ejs", users });
};
module.exports.viewUser_get = async (req, res) => {
  // const slug = req.params.slug;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     req.flash('blog', { slug })
  //     req.flash('errors', errors.array())
  //     return res.redirect('/home/blogs')
  // }
  // const blog = await Blog.findOne({ where: { slug: slug } })
  // if (!blog) {
  //     req.flash('errors', [{ message: 'blog not found.' }])
  //     return res.redirect('/home/blogs')
  // }
  // res.render('backend/blog-view', { layout: 'layouts/app.ejs', blog })
};
module.exports.updateUser_get = async (req, res) => {
  User;
  const identifier = req.params.identifier;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // req.flash('user', { identifier })

    req.flash("errors", errors.array());
    return res.redirect("/home/users");
  }

  const user = await User.findOne({ where: { identifier } });
  if (!user) {
    req.flash("errors", [{ message: "User not found." }]);
    return res.redirect("/home/Users");
  }

  res.render("backend/user-update", { layout: "layouts/app.ejs", user });
};
module.exports.updateUser_post = async (req, res) => {
  console.log(req.body);
  const { identifier, role, active } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("user", { identifier, role, active });

    req.flash("errors", errors.array());
    return res.redirect(`/home/update-user/${identifier}`);
  }

  try {
    const user = await User.findOne({ where: { identifier } });
    if (!user) {
      req.flash("errors", [{ message: "User not found." }]);
      return res.redirect("/home/users");
    }

    const adminUsers = await User.findAndCountAll({ where: { role: "Admin" } });
    if (user.role === "Admin" && adminUsers.count <= 1) {
      req.flash("info", [{ message: `User "${user.firstname} ${user.lastname}" could not be edited.` }]);
      return res.redirect("/home/users");
    }

    user.role = role;
    user.active = active ? true : false;

    await user.save();

    req.flash("success", [{ message: `User <strong>"${user.firstname} ${user.lastname}"</strong> Updated successfully.` }]);
    // res.redirect(`/home/view-user/${user.slug}`)
    res.redirect(`/home/users`);
  } catch (error) {
    res.send(error);
  }
};
module.exports.deleteUser_get = async (req, res) => {
  const identifier = req.params.identifier;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("user", { identifier });

    req.flash("errors", errors.array());
    return res.redirect("/home/users");
  }

  const user = await User.findOne({ where: { identifier } });
  if (!user) {
    req.flash("errors", [{ message: "User not found." }]);
    return res.redirect("/home/users");
  }
  res.render("backend/user-delete", { layout: "layouts/app.ejs", user });
};
module.exports.deleteUser_post = async (req, res) => {
  const { identifier } = req.body;

  const user = await User.findOne({ where: { identifier } });

  const adminUsers = await User.findAndCountAll({ where: { role: "Admin" } });
  if (user.role === "Admin" && adminUsers.count <= 1) {
    req.flash("info", [{ message: `User "${user.firstname} ${user.lastname}" could not be deleted.` }]);
    return res.redirect("/home/users");
  }

  if (user) {
    req.flash("success", [{ message: `User "${user.firstname} ${user.lastname}" deleted successfully.` }]);
    await user.destroy();
  } else {
    req.flash("errors", [{ message: "user not found." }]);
  }
  return res.redirect("/home/users");
};
//#endregion

module.exports.signup_get = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "signup" } })) || { title: "No title - Reema", description: "No Description" };
  res.render("signup", { layout: "layouts/main.ejs", title: meta.title, description: meta.description });
};

module.exports.signup_post = async (req, res) => {
  const { first_name, last_name, email, password1, password2 } = req.body;
  let role = "Visitor";

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("signup", { first_name, last_name, email });

    req.flash("errors", errors.array());
    return res.redirect("/signup");
  }

  const users = await User.findAndCountAll();
  if (users.count === 0) role = "Admin";

  // if (password1 !== password2) {
  //     req.flash('signup', { first_name, last_name, email })
  //     req.flash('errors', [{ message: "Password is not correct" }])
  //     return res.redirect('/signup');
  // }

  try {
    const user = await User.create({
      identifier: randomstring.generate(),
      firstname: first_name,
      lastname: last_name,
      email: email,
      password: password1,
      role: role,
      active: true,
    });

    req.flash("success", [{ message: "Account created" }]);
    return res.redirect("/login");
  } catch (err) {
    req.flash("errors", err.errors);
    return res.redirect("/signup");
  }
};

module.exports.login_get = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "login" } })) || { title: "Reema - Login", description: "Login to view your profile." };
  res.render("login", { layout: "layouts/main.ejs", title: meta.title, description: meta.description });
};

// this login_post is old code
// module.exports.login_post = (req, res) => {
//     // const { email, password} = req.body;

//     // try {
//     //     const user = await User.login(email, password)
//     //     const token = createToken(user.id)
//     //     res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
//     //     res.redirect('/account')
//     //     // res.render('account', {layout: 'layouts/main.ejs'})
//     //     // res.status(200).json({user: user.id})

//     // } catch (err) {
//     //     console.log(err);
//     //     // const errors =  handleErrors(err)
//     //     res.send(err)
//     // }
// 	res.redirect('/account');
// }

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.password_forgot_get = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "password-reset" } })) || { title: "No title - Reema", description: "No Description" };
  res.render("reset_password", { layout: "layouts/main.ejs", title: meta.title, description: meta.description });
};

module.exports.password_forgot_post = async (req, res) => {
  const email = req.body.email;

  try {
    let user = await User.findOne({ where: { email } });

    if (!user) res.redirect("/signup");

    user = await user.update({
      token: crypto.randomBytes(32).toString("hex"),
      expiresIn: new Date().addHours(1),
    });

    let transport = nodemailer.createTransport(
      {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: { user: "ca01814960f9c3", pass: "662cb7ad726e43" },
      },
      (tls = { rejectUnauthorized: false })
    );

    const encryptedUserId = encrypt(`${user.id}`);

    const url = `http://${req.get("host")}/password-reset/${encryptedUserId}/${user.token}`;
    console.log("url: " + url);
    const message = {
      from: "reematec@gmail.com", // Sender address
      to: user.email, // List of recipients
      subject: "Reset Password", // Subject line
      html: `<h1> Hello ${user.firstname} ${user.lastname}</h1>
            <p>Please click on the below link to reset your password</p>
            <p>${url}</p>            
            <p>Kind Regards,</p>
            <p>Reema Technologies</p>`,
    };
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    return res.render("reset_password_sent", { layout: "layouts/main", title: "Reema - Password reset link via email sent", description: "Password reset link sent" });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports.password_reset_form = async (req, res) => {
  const id = decrypt(req.params.id);
  const token = req.params.token;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.redirect("/signup");

    if (user.expiresIn && user.expiresIn.getTime() > Date.now()) {
      if (user.token === token) {
        res.render("reset_password_form", {
          layout: "layouts/main",
          id: req.params.id,
          title: "Reema - Password reset verification link email",
          description: "Password reset verification link email",
        });
      } else {
        req.flash("error", [{ message: "Invalid email verification link" }]);
        res.render("reset_password", { layout: "layouts/main", title: "Reema - Invalid verification link email", description: "Invalid verification link email" });
      }
    } else {
      await user.update({ token: null, expiresIn: null });
      req.flash("error", [{ message: "Verification token has expired" }]);
      res.render("reset_password", { layout: "layouts/main", title: "Reema - Verification token has expired", description: "Verification token has expired" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports.password_reset_confirm_post = async (req, res) => {
  const id = decrypt(req.params.id);
  const password = req.body.password1;
  const confirmPassword = req.body.password2;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect(`/password-reset/${req.params.id}/${req.params.token}`);
  }

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      req.flash("info", [{ message: "Invalid user" }]);
      res.redirect("/signup");
    }

    if (user.token && password === confirmPassword) {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);

      await user.update({ password: hash, token: null, expiresIn: null });

      req.flash("info", [{ message: "Password has been reset, you may login." }]);
      res.redirect("/login");
    } else {
      req.flash("errors", [{ message: "Verification token has already been used." }]);
      res.render("/reset_password", { layout: "layouts/main", title: "Reema - Verification token already used", description: "Verification token already used" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports.password_forgot_done_get = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "password-reset" } })) || { title: "No title - Reema", description: "No Description" };
  res.render("password-reset-done", { layout: "layouts/main.ejs", title: meta.title, description: meta.description });
};

function imageResize(file, name, width) {
  // http://jsfiddle.net/sp3c7jeq/

  var canvas = createCanvas(),
    ctx = canvas.getContext("2d");

  loadImage(file).then((img) => {
    canvas.width = width;
    canvas.height = canvas.width * (img.height / img.width);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    SaveImage(canvas.toDataURL(), name, width);
  });
}

function SaveImage(base64Image, name, width) {
  // SaveImage function takes base64 image and save it to folder. Name of the image is returned with correct extension

  var dir = `./public/images/assets/${width}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const imageType = base64Image.substring(base64Image.indexOf(":") + 1, base64Image.indexOf(";"));
  const ext = imageType.replace("image/", "");

  const data = base64Image.replace(`data:${imageType};base64,`, "");

  fs.writeFile(`${dir}/${name}`, data, "base64", (err) => {
    if (err) console.log(err);
  });

  return `${name}`;
}

function dbValidationResult(err) {
  console.log(err.errors, "db errors-----------------------");
  let errmsg = [];
  if (err.errors) {
    err.errors.forEach((e) => {
      errmsg.push({ msg: e.message });
    });
    console.log(errmsg, "---- errmsg");
    return errmsg;
  }
  return { msg: "Tag not found" };
}

function validationResultwithFields(req, res, key, redirect, values) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash(key, values);

    req.flash("errors", errors.array());
    return res.redirect(redirect);
  }
}
function validationResultwithoutFields(req, res, redirect) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect(redirect);
  }
}

const pathname = (req) => {
  let pathname = "";
  if (req.url.includes("?")) {
    pathname = req.url.substring(0, req.url.indexOf("?"));
  }
  return pathname;
};
