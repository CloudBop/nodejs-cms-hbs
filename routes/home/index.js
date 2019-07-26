const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')
const Category = require('../../models/Category')

router.all('/*', (req, res, next)=>{
    // override | req.app.locals.layout = 'home'
    req.app.locals.layout = 'home'
    //
    next();
})

router.get('/', (req,res)=>{
    // get all the posts
    Post.find({}).then( posts=>{


        Category.find({}).then( categories=>{
           res.render('home/index', { posts:posts, categories:categories} )
        })
    })

    // res.render('home/index')
})

router.get('/posts/:id', (req,res)=>{
    // get all the posts
    Post.findOne({_id : req.params.id}).then( post=>{
        Category.find({}).then( categories=>{
            res.render('home/post', { post:post, categories:categories} )
         })
    })

    // res.render('home/index')
})


router.get('/about', (req,res)=>{
    res.render('home/about')
})
router.get('/login', (req,res)=>{
    res.render('home/login')
})
router.get('/register', (req,res)=>{
    res.render('home/register')
})


module.exports = router