var express = require('express');
const {ObjectID} = require('mongodb');
var router = express.Router();
const _ = require('lodash');

var BlogPost = require('./../models/blogPost');

// Blog page
router.get('/blog/me', (req, res)=>{
	res.render('home.hbs', {user:req.user});
});

// Admin panel
router.get('/blog/admin/', (req, res)=>{

	BlogPost.find({profileID:req.user.profileID}).sort('-date').exec(function(err, docs) {
		if(err){
			res.status(400).send(e);
		}
		res.render('adminPanel.hbs',{docs,user:req.user});
	});

});

// Get blog posts by profileID
router.get('/blog/posts/:id', (req, res)=>{
	var userID = req.params.id;

	BlogPost.find({profileID:userID}).sort('-date').exec(function(err, docs) {
		if(err){
			res.status(400).send(e);
		}
		res.render('blogPosts.hbs',{docs,user:req.user});
	});

});

// Save blog post
router.post('/blog/new', (req, res)=>{
	var body = _.pick(req.body, ['title', 'content']);

	var blogPost = new BlogPost({
		title: body.title,
		author: req.user.name,
		content: body.content,
		profileID: req.user.profileID
	});

	blogPost.save().then((doc)=>{
		res.json({success : "Updated Successfully", title:body.title , status : 200});
	}, (e) =>{
		res.status(400).send(e);
	});
});

router.delete('/blog/remove/:id', (req, res)=>{
	var docID = req.params.id;

	BlogPost.findOneAndRemove({
		profileID:req.user.profileID,
		_id:new ObjectID(docID)
	}, function(err, doc) {
		if(err){
			res.status(400).send(e);
		}else if(!doc){
			res.status(400).send(e);
		}
		res.json({success : "RemovedDoc", status : 200});
	});

});

module.exports = router;