const randomstring = require("randomstring");
const fs = require("fs");
const axios = require("axios");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelizeCN");

const nodemailer = require("nodemailer");

const Meta = require("../models/Meta");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Image = require("../models/Image");
const Product = require("../models/Product");
const Size = require("../models/Size");
const Blog = require("../models/Blog");
const RFQ = require("../models/RFQ");

module.exports.home = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "home" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };

  const categories = await getActiveCatAndSubCategories();

  const categorySections = await Category.findAll({
    where: { active: true, showOnHomepage: true },
  });

  const products = await Product.findAll({
    include: [{ model: Category, where: { showOnHomepage: true } }, { model: SubCategory }, { model: Image }],
    order: [["id", "ASC"]],
    where: { active: true, showcased: true },
  });

  res.render("home", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    products,
    categorySections,
    categories,
  });
};

module.exports.about = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "about" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };

  const categories = await getActiveCatAndSubCategories();

  res.render("about", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    categories,
  });
};

module.exports.contact = async (req, res) => {
  let meta = (await Meta.findOne({ where: { page: "contact" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Sudan, South",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  res.render("contact", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    categories,
    countries,
  });
};

// https://medium.com/@sergeisizov/using-recaptcha-v3-with-node-js-6a4b7bc67209
module.exports.contact_post = async (req, res) => {
  captchaVerification(req);

  const { name, email, country, message } = req.body;

  let transport = nodemailer.createTransport(
    {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: "ca01814960f9c3", pass: "662cb7ad726e43" },
    },
    (tls = { rejectUnauthorized: false })
  );

  const mail = {
    from: "reematec@gmail.com", // Sender address
    to: email, // List of recipients
    subject: "Inquiry to Reema Group of Companies", // Subject line
    html: `<p> Hello ${name} </p>

        <p>Thanks for writing to us, your inquiry is important us and we reply you as soon as possible.</p>

        <p>Kind Regards,</p>
        <p>Reema Group of Companies</p>`,
  };

  transport.sendMail(mail, function (err, info) {
    if (err) {
      console.log(err);
      return res.json({ message: "Email could not be sent.", success: false });
    } else {
      return res.json({ message: "Email has been sent", success: true });
      req.flash("success", [{ message: "Email has been sent." }]);
      // console.log(info);
    }
  });
  // res.render('contact', {layout: 'layouts/main.ejs'})
};

module.exports.rfq_post = async (req, res) => {
  captchaVerification(req);

  const { fullname, email, country, quantity, identifier } = req.body;

  let transport = nodemailer.createTransport(
    {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: { user: "ca01814960f9c3", pass: "662cb7ad726e43" },
    },
    (tls = { rejectUnauthorized: false })
  );

  const mail = {
    from: "reematec@gmail.com", // Sender address
    to: email, // List of recipients
    subject: "Inquiry to Reema Group of Companies", // Subject line
    html: `<p> Hello ${fullname} </p>

        <p>Thanks for writing to us, your inquiry is important us and we reply you as soon as possible.</p>

        <p>Kind Regards,</p>
        <p>Reema Group of Companies</p>`,
  };

  transport.sendMail(mail, async function (err, info) {
    if (err) {
      console.log(err);

      return res.json({ message: "Email could not be sent.", success: false });
    } else {
      req.session.guestUser = email;
      let product = await Product.findOne({ where: { identifier } });

      await RFQ.create({
        identifier: randomstring.generate(),
        name: fullname,
        email: email,
        country: country,
        quantity: quantity,
        productId: product.id,
      });

      return res.json({ message: "Email has been sent", success: true });
    }
  });
  // return res.json({'message': "Your RFQ has been sent successfully", success: true})
};

module.exports.products = async (req, res) => {
  // http://localhost:3000/products

  const categories = await getActiveCatAndSubCategories();
  const random = await getRandomProducts();
  const { sort, collection, page } = req.query;
  const { limit, offset } = getPagination(page - 1);
  let where = collection ? { active: true, year: collection } : { active: true };

  const products = await Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category }, { model: SubCategory }, { model: Image }],
    order: [orderSTR(sort)],
    where: where,
  });

  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(products.count / limit);

  products.currentPage = currentPage;
  products.totalPages = totalPages;

  res.render("products", {
    layout: "layouts/main.ejs",
    title: categories[0] ? categories[0].pagetitle : "Empty Page Title",
    description: categories[0] ? categories[0].description : "Empty page description",
    categories,
    products,
    name: categories[0] ? categories[0].name : "Undefined Name",
    randomProducts: random,
    sort: sort,
    currentUrl: pathname(req),
    collection,
    filterCollection: await filterCollection(),
  });
};

// for Fetch Call
module.exports.products_page = async (req, res) => {
  // Fetch http://localhost:3000/products/page
  const query = req.query;
  const { page } = req.params;
  const { limit, offset } = getPagination(page);

  Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category }, { model: SubCategory }, { model: Image }],
    order: [orderSTR(query)],
    where: { active: true },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch((err) => {
      res.json(500, { message: err.message || "Some error occurred." });
    });
  console.log(JSON.stringify(products, null, 4));
};

module.exports.categoryProducts = async (req, res) => {
  // http://localhost:3000/category/futsal-balls
  const { slug } = req.params;
  const { sort, collection, page } = req.query;

  const categories = await getActiveCatAndSubCategories();
  const random = await getRandomProducts();
  const breadcrumb = await Category.findOne({ where: { slug } });
  const { limit, offset } = getPagination(page - 1);
  let where = collection ? { active: true, year: collection } : { active: true };

  const products = await Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category, where: { slug } }, { model: SubCategory }, { model: Image }],
    order: [orderSTR(sort)],
    where: where,
  });

  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(products.count / limit);

  products.currentPage = currentPage;
  products.totalPages = totalPages;

  res.render("products", {
    layout: "layouts/main.ejs",
    title: breadcrumb.pagetitle,
    description: breadcrumb.description,
    categories,
    products,
    name: breadcrumb.name,
    randomProducts: random,
    sort: sort,
    currentUrl: pathname(req),
    collection,
    filterCollection: await filterCollection(),
  });
};

// for Fetch Call
module.exports.categoryProducts_page = async (req, res) => {
  const { slug, page } = req.params;
  const { limit, offset } = getPagination(page);

  Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category, where: { slug } }, { model: SubCategory }, { model: Image }],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch((err) => {
      res.json(500, { message: err.message || "Some error occurred." });
    });
};

module.exports.subCategoryProducts = async (req, res) => {
  // http://localhost:3000/subcategory/fusiontec-hybrid-footballs

  const { slug } = req.params;
  const { sort, collection, page } = req.query;

  const categories = await getActiveCatAndSubCategories();
  const random = await getRandomProducts();
  const breadcrumb = await SubCategory.findOne({
    where: { slug },
    include: Category,
  });
  const { limit, offset } = getPagination(page - 1);
  let where = collection ? { active: true, year: collection } : { active: true };

  const products = await Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category }, { model: SubCategory, where: { slug } }, { model: Image }],
    order: [orderSTR(sort)],
    where: where,
  });

  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(products.count / limit);

  products.currentPage = currentPage;
  products.totalPages = totalPages;

  res.render("products", {
    layout: "layouts/main.ejs",
    title: breadcrumb.pagetitle,
    description: breadcrumb.description,
    categories,
    products,
    name: breadcrumb.category.name,
    randomProducts: random,
    sort: sort,
    currentUrl: pathname(req),
    collection,
    filterCollection: await filterCollection(),
  });
};
// for Fetch Call
module.exports.subCategoryProducts_page = async (req, res) => {
  const { slug, page } = req.params;
  const { limit, offset } = getPagination(page);

  Product.findAndCountAll({
    distinct: true,
    limit,
    offset,
    include: [{ model: Category }, { model: SubCategory, where: { slug } }, { model: Image }],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch((err) => {
      res.json(500, { message: err.message || "Some error occurred." });
    });
};

module.exports.product = async (req, res) => {
  const categories = await getActiveCatAndSubCategories();
  const slug = req.params.slug;

  const randomProducts = await Product.findAll({
    order: Sequelize.literal("rand()"),
    limit: 4,
    include: [{ model: Category }, { model: SubCategory }, { model: Image }],
  });

  const product = await Product.findOne({
    where: { slug },
    include: [{ model: Category }, { model: SubCategory }, { model: Image }, { model: Size }],
  });

  res.render("product_details", {
    layout: "layouts/main.ejs",
    title: product.pagetitle,
    description: product.shortDescription,
    product,
    randomProducts,
    categories,
  });
};

module.exports.blogs = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "blogs" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  const blogs = await Blog.findAll({});
  res.render("blogs", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    blogs,
    categories,
  });
};

module.exports.blog = async (req, res) => {
  const slug = req.params.slug;
  const categories = await getActiveCatAndSubCategories();

  const blog = await Blog.findOne({ where: { slug: slug } });
  res.render("blog", {
    layout: "layouts/main.ejs",
    title: blog.title,
    description: "",
    blog,
    categories,
  });
};

module.exports.faq = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "faqs" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  res.render("faq", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    categories,
  });
};

module.exports.quotes = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "quotes" } })) || { title: "No title - Reema", description: "No Description" };
  const categories = await getActiveCatAndSubCategories();

  if (req.session && !req.session.guestUser) {
    res.render("quotes", { layout: "layouts/app.ejs", title: meta.title, description: meta.description, rfqs: null, categories });
  }

  const rfqs = await RFQ.findAll({
    where: { email: req.session.guestUser },
    include: [{ model: Product, include: [{ model: Image }] }],
  });

  res.render("quotes", { layout: "layouts/app.ejs", title: meta.title, description: meta.description, rfqs, categories });
};

module.exports.search = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "search" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  let keyword;
  if (req.query) keyword = req.query.search;
  // const categories = await Category.findAll({ include: SubCategory })
  // const random = await getRandomProducts()
  const { limit, offset } = getPagination(0);

  // const products = await Product.findAll({offset: 1, limit: 2});

  const products = await Product.findAndCountAll({
    distinct: true,
    limit,
    offset,

    attributes: ["identifier", "name", "usage", "slug", "active"],

    include: [{ model: Image }, { model: Category }, { model: SubCategory, as: "subCategory" }],
    where: {
      [Op.or]: [{ "$product.name$": { [Op.like]: `%${keyword}%` } }, { "$product.usage$": { [Op.like]: `%${keyword}%` } }],
      [Op.and]: [
        // { '$category.name$': { [Op.like]: `%${keyword}%`} },
        // { '$subCategory.name$': { [Op.like]: `%${keyword}%`}, },
        { "$product.active$": { [Op.not]: false } },
      ],
    },
    // order: [['id', 'desc']],
    // logging: console.log
  });

  // https://stackoverflow.com/questions/18838433/sequelize-find-based-on-association
  // console.log(JSON.stringify(products, null, 4));

  // const plainMessages = messages.map((message) => message.get({ plain: true }));

  res.render("search", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    products,
    title: keyword,
    categories,
  });
};

module.exports.terms = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "terms" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  res.render("terms-conditions", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    categories,
  });
};

module.exports.privacy = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "privacy" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  res.render("privacy", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    categories,
  });
};

module.exports.cookie_policy = async (req, res) => {
  const meta = (await Meta.findOne({ where: { page: "cookie-policy" } })) || {
    title: "No title - Reema",
    description: "No Description",
  };
  const categories = await getActiveCatAndSubCategories();
  res.render("cookie-policy", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
    categories,
  });
};

module.exports.access_restricted = async (req, res) => {
  const meta = { title: "No title - Reema", description: "No Description" };
  res.render("access_restricted", {
    layout: "layouts/main.ejs",
    title: meta.title,
    description: meta.description,
  });
};

const getPagination = (page, size) => {
  const limit = 2;
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
  let orderby = [];

  switch (query) {
    case "asc":
      orderby = ["name", "ASC"];
      break;
    case "desc":
      orderby = ["name", "DESC"];
      break;
    // case 'newer':
    //     orderby = ['year', 'ASC']
    //   break;
    // case 'older':
    //     orderby = ['year', 'DESC']
    //   break;
    case "usage":
      orderby = ["usage", "ASC"];
      break;
    default:
      orderby = ["name", "ASC"];
  }

  return orderby;
};

async function getRandomProducts() {
  const products = await Product.findAll({
    order: Sequelize.literal("rand()"),
    limit: 4,
    include: [{ model: Category }, { model: SubCategory }, { model: Image }],
    where: { recommended: true },
  });
  return products;
}

async function getActiveCatAndSubCategories(params) {
  const activeCategories = await Category.findAll({
    include: [{ model: SubCategory, as: "subcategories" }],
    // where: {
    //     [Op.or]: [
    //         { '$category.active$': true, },
    //     ],
    //     [Op.and]: [
    //         { '$subcategories.active$': { [Op.not]: false} },
    //     ],
    // },
    // logging: console.log
  });
  return activeCategories;
}

const pathname = (req) => {
  let pathname = "";
  if (req.url.includes("?")) {
    pathname = req.url.substring(0, req.url.indexOf("?"));
  }
  return pathname;
};

async function filterCollection() {
  const filterCollection = await Product.findAll({
    distinct: true,
    attributes: ["year"],
    // include: [{ model: Category}, { model: SubCategory }, { model: Image }],
    // order: [orderSTR(sort)],
    where: { active: true },
    group: "year",
  });

  return filterCollection;
}

async function captchaVerification(req) {
  if (!req.body.captcha) res.json({ message: "Captcha token is undefined", success: false });

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${"6LefTBApAAAAAA-rYEGQaEeY2FZPqxhkqUQFVAlx"}&response=${req.body.captcha}`;
  let response;

  try {
    response = await axios.get(verifyUrl);
    if (!response.data.success || response.data.score < 0.4) return res.json({ message: "Email could not be sent.", success: false });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Email could not be sent, an error occoured.",
      success: false,
    });
  }
}
