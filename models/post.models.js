var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
	name : String,
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;