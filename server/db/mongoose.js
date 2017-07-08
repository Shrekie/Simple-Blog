var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.dbURI,{
	useMongoClient: true
});

module.exports = {mongoose};