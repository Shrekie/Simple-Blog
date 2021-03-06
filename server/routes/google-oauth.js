const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {secrets} = require('./../config/secrets.js');
const User = require('./../models/user');

// passportjs initialization and strategy call.
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
	clientID: secrets.clientID,
	clientSecret: secrets.clientSecret,
	callbackURL: "/auth/google/callback"
},
	function(accessToken, refreshToken, profile, done) {

	    var searchQuery = {
	    	profileID: profile.id
	    };

	    var updates = {
			name: profile.displayName,
			profileID: profile.id
	    };

	    var options = {
	    	upsert: true,
	    	new: true
	    };

	    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
			if(err) {
				return done(null, err);
			} else {
				return done(null, user);
			}
	    });
	  
	}
));

// Authentication routes
router.get('/auth/google', 
	passport.authenticate('google', 
		{ scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/auth/google/callback', 
passport.authenticate('google', { 
	failureRedirect: '/error',
	successRedirect: '/'
}));

// Serialize user information <->
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

module.exports = router;