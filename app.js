const path = require('path')
const express = require('express');
const session = require('express-session');
// const { Sequelize } = require('sequelize');
const sequelize = require('./utils/sequelizeCN');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts');
const { getCSRF, verifyCSRF } = require('./middleware/csrfMiddleware');

require('dotenv').config()
require('./utils/passport')(passport)

process.on("uncaughtException", (err)=>{
	console.log('uncaught exception', err)
})

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
});

const app = express();

if (process.env.NODE_ENV === "development") {
	const livereload = require("livereload");
	const connectLivereload = require("connect-livereload");

	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch(path.join(__dirname, "public"));

	liveReloadServer.server.once("connection", () => {
		setTimeout(() => {
			liveReloadServer.refresh("/");
		}, 100);
	});

	// https://www.npmjs.com/package/connect-livereload
	// app.use(require('connect-livereload')({
	//   port: 35729
	// }));
	app.use(connectLivereload());
	app.use(morgan('dev'))
}

app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
	useTempFiles : true,
    tempFileDir : './public/tmp/'
}));



// middleware
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json({limit: '5mb'}))
app.use(cookieParser())

// view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

const sessionStore = new SequelizeStore({
	db: sequelize,
	checkExpirationInterval: 15 * 60 * 1000,
	expiration: 7 * 24 * 60 * 60 * 1000
});	

app.use(session({
	name: 'jwt', // also has a reference in authMiddleware.isAccountActive
	secret: process.env.JWT_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
	},
	store: sessionStore
}));	
sessionStore.sync()	


// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

// Set global var
app.use(function (req, res, next) {
	res.locals.session = req.session;
	res.locals.message = req.flash();
    res.locals.user = req.user || null;
	res.locals.csrfToken = getCSRF()
	// console.log(res.locals);
    next();
})


// routes
app.use(verifyCSRF);
app.use('/', require('./routes/publicRoutes'))
app.use(require('./routes/authRoutes'))

app.use('*', function(req, res){
    // res.type('text/plain');
	res.status(404);
	res.render('404', {layout: 'layouts/main.ejs'})
});



HOST =  'localhost';
HOST =  '192.168.10.27';
const PORT = process.env.PORT;

// var os = require('os');
// var networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);


app.listen(PORT, HOST, () =>{
	console.info(`server is listening to port http://${HOST}:${PORT}`)
})



