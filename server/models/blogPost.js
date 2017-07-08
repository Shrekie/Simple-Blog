var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPost = new Schema({
	title: {
		type: String,
		required: true,
		maxlength: 40
	},
	author: {
		type: String
	},
	content: {
		type: String,
		required: true,
		maxlength: 250
	},
	profileID: {
		type: String,
		required: true
	},
	date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('BlogPost', BlogPost);