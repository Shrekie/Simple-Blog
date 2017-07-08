var express = require('express');
var router = express.Router();
const _ = require('lodash');

var BlogPost = require('./../models/blogPost');

router.get('/blog/me', (req, res)=>{
	res.render('home.hbs', req.user);
});

router.post('/blog/new', (req, res)=>{
	var body = _.pick(req.body, ['title', 'content']);

	console.log(req.user + ' ' + body.title + ' ' + body.content);

	var blogPost = new BlogPost({
		title: body.title,
		author: req.user.name,
		content: body.content,
		profileID: req.user.profileID
	});

	console.log(blogPost);

	blogPost.save().then((doc)=>{
		res.send(doc);
	}, (e) =>{
		res.status(400).send(e);
	})
});

module.exports = router;