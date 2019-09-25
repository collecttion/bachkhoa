const express = require("express");
const app = express();
const pug = require("pug");
const port = 3000;
const mongoose = require('mongoose');
const Post = require('./models/post.models');
const bodyParser = require('body-parser');
const multer = require("multer");

var upload = multer({ dest: 'puclic/uploads'})


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

app.post('/create', upload.single('imgeFile'), async function(req, res){
    var posts = new Post(req.body);
    
    req.body.imgeFile = req.file.path;

    console.log(req.body)

    var post = await Post.find();

    posts.save(function(error){
        if(error)
            return res.json({ posts : posts })
    })
    res.redirect('/post')

})

app.get('/post:id', async function(req, res){
    var id = req.params.id;
    var post = await Post.findById(id, function(error, idpost){
        if (error){
        console.log('id wes')
        }else{
        res.render('post/view', {
            title:idpost.name,
            conten:idpost.conten
        })
    }
    });
     
})



app.listen(port, function(){
    console.log("hey,babe tuan" + port)
});