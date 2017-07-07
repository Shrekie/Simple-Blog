var mongoose = require('mongoose');

mongoose.Promise = mongoose.connect(process.env.dbURI,{
	useMongoClient: true
});

module.exports = {mongoose};