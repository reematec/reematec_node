const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("reema_node", "amir", "testing@123", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
  // operatorsAliases: false,

  // dialect: 'sqlite',
  // storage: path.join(__dirname, '..', 'database_test.sqlite'),
  // logging: false,
  // dialectOptions: {
  // 	// Your sqlite3 options here
  // 	// for instance, this is how you can configure the database opening mode:
  // 	// mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  // },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

sequelize.sync();

module.exports = sequelize;

// ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*
blogs .
rfqs .
products .
product_tag
product_size
product_image
meta .
images .
categories .
tags
subcategories .
sizes .
sessions .
users .
*/
