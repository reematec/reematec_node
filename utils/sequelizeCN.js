const Sequelize = require('sequelize');
const path = require('path');
const colors = require('colors')

const sequelize = new Sequelize(
	// 'reema_node', 'root', '', 
	{
	// host: 'localhost',
	// dialect: 'mysql',
	// // operatorsAliases: false,
	
	dialect: 'sqlite',
	storage: path.join(__dirname, '..', 'database_test.sqlite'),
	logging: false,
	dialectOptions: {
		// Your sqlite3 options here
		// for instance, this is how you can configure the database opening mode:
		// mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
	},
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.')
}).catch(
	err => console.error('Unable to connect to the database:', err)
	);

module.exports = sequelize