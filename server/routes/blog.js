var express = require('express');
var router = express.Router();
var BlogPost = require('./../models/blogPost');

router.get('/blog/me', (req, res)=>{
	res.render('home.hbs', req.user);
})

module.exports = router;