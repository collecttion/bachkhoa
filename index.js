const express = require("express");
const app = express();
const pug = require("pug");
const port = 3000;
const mongoose = require('mongoose');
const Post = require('./models/post.models');
const bodyParser = require('body-parser');
const multer = require("multer");

var upload = multer({ dest: 'puclic/uploads/' });



mongoose.connect('mongodb://localhost:27017/bachkhoa',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('puclic'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//HOME table
app.get('/create/table', async function(req, res){
    var post = await Post.find();
    res.render('create/table',{
        post:post
    })
})
//home post
app.get('/post', async function(req, res){
    var page = parseInt(req.query.page) || 1;
	var perPage = 9;

	var start = (page - 1) * perPage;
    var end = page * perPage;
    
    var post = await Post.find();
    res.render('post/index',{
        post:post.slice(start, end),
    })
})

//create
app.get('/create', function(req, res){
    res.render('create/index')
})

app.post('/create', upload.single('imgeFile'), async function(req, res){
    
    req.body.imgeFile = "uploads/" + req.file.path.split('puclic\\uploads\\').slice(1).join('/');

    var posts = new Post(req.body);

    var post = await Post.find();

    posts.save(function(error){
        if(error)
            return res.json({ posts : posts })
    })
    res.redirect('/post')

})
//delete
app.get('/create/table:id', async function(req, res){
    var id = req.params.id;
    var psost = await Post.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Err deleteting ebook");
            console.log(err);
        }else{
			console.log("delete ebook" + id);
			res.redirect('/create/table')
        }
    })
})
//edit
app.get('/create/table/edit:id', async function(req, res){
    var id = req.params.id;
    var post = await Post.findById(id, function(error, idpost){
        if (error){
        console.log('id wes')
        }else{
            res.render('create/edit',{
                title:idpost.name,
                conten:idpost.conten,
                id:idpost.id
            })
    }
    });

})

app.post('/uploads:id', function(req, res){
    var id = req.params.id;
    console.log(req.body)
    Post.findByIdAndUpdate(id,{
        title: req.body.name,
        conten:req.body.conten
    }, function(err, updateText){
        if(err){
            console.log("could text");
            console.log(err)
        }else{
            res.redirect('/create/table');
            console.log("update" + updateText);
            
        }
    })
})


//view id
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