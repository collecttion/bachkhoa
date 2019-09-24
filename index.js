const express = require("express");
const app = express();
const pug = require("pug");
const port = 3000;
var mongoose = require('mongoose');
var Post = require('./models/post.models');


mongoose.connect('mongodb://localhost:27017/bachkhoa', {useNewUrlParser: true});

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/post', async function(req, res){
    var post = await Post.find();
    console.log(post)
    res.render('post/index',{
        post:post
    })
})

app.listen(port, function(){
    console.log("hey,babe tuan" + port)
});