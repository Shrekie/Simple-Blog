require('./config/config.js');

// Package imports
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');

// Custom imports
const {secrets} = require('./config/secrets.js');
const {mongoose} = require('./db/mongoose.js');
const oAuthRoute = require('./routes/google-oauth');
const blogRoute = require('./routes/blog');

const app = express();

// Middleware
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(session({ 
	secret: secrets.sessionSecret,
	resave: true,
  	saveUninitialized: true,
  	cookie: { secure: false }
}));

app.get('/error', (req, res) => {
	res.send('Something went wrong.');
});

// OAuth2 authentication
app.use(oAuthRoute);

// isAuthenticated 
app.use('/blog/*', function(req, res, next){
	console.log(req.isAuthenticated());
	if(req.isAuthenticated()) next();
	else res.redirect('/');
});

// After authentication blog calls
app.use(blogRoute);

app.get('/', (req, res) => {
	console.log(req.isAuthenticated());
	if(req.isAuthenticated()) res.redirect('/blog/me');
	else res.render('frontPage.hbs');
});

app.listen(process.env.PORT, () => {
	console.log('Started on port ', process.env.PORT);
});