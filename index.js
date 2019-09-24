const express = require("express");
const app = express();
const pug = require("pug");
const port = 3000;
var mongoose = require('mongoose');
var Post = require('./models/post.models');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/bachkhoa', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/post', async function(req, res){
    var post = await Post.find();
    res.render('post/index',{
        post:post
    })
})

app.get('/create', function(req, res){
    res.render('create/index')
})

app.post('/create', async function(req, res){
    var posts = new Post(req.body);
    console.log(posts)
    var post = await Post.find();
    posts.save(function(error){
        if(error)
            return res.json({ posts : posts })
    })
    res.redirect('/post')

})

app.get('/post:id', async function(req, res){
    var id = req.params.id;
    console.log(id)
    var post = await Post.find();
    res.render('post/view', {
        post:post
    })
})

app.listen(port, function(){
    console.log("hey,babe tuan" + port)
});