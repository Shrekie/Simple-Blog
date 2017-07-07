var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPost = new Schema({
	title: String,
	author: String,
	body: String,
	date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('BlogPost', BlogPost);