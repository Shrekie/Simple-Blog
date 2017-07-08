var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPost = new Schema({
	title: String,
	author: String,
	content: String,
	profileID: String,
	date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('BlogPost', BlogPost);