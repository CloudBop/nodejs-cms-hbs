const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')
// admin/ is defined in middleware
// for all routes after admin/
router.all('/*', (req, res, next)=>{
    // override | req.app.locals.layout = 'home'
    req.app.locals.layout = 'admin'
    //
    next();
})

router.get('/', (req,res)=>{
    // query db
    Post.find( {} ).then( posts=>{
        // obj destructuring/ shorthand
        res.render('admin/posts', { posts })
    }).catch( e=> {console.log(e)})
})
// /admin/posts/create
router.get('/create', (req,res)=>{
    res.render('admin/posts/create')
})
// go to edit page of post
router.get('/edit/:id', (req, res) =>{

    Post.findOne( {_id: req.params.id} ).then( post=>{
        // obj destructuring/ shorthand
        res.render('admin/posts/edit', { post })
    }).catch( e=> {console.log(e)})

})
// delete post from btn
router.delete('/:id', (req, res) =>{

    Post.deleteOne( {_id: req.params.id} ).then( post=>{
        // obj destructuring/ shorthand
        res.redirect('/admin/posts')
    }).catch( e=> {console.log(e)})

})
//
router.post('/create', (req,res)=>{

    // sanitise (BS4 CB === on || undefined   ) 
    const allowComments = req.body.allowComments === 'on' ? true : false
    // console.log(allowComments)
    // create post model data
    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body
    })
    // save to db
    newPost.save().then( savedPost=>{
        console.log(savedPost)
        // makes an error
        res.redirect('/admin/posts')
    }).catch( error =>{
        console.log(error)
    })
})
// submit edit form | requires method override
router.put('/edit/:id', (req, res)=>{
    
    Post.findOne( {_id: req.params.id} ).then( post=>{

        const allowComments = req.body.allowComments ? true : false
        // console.log(allowComments)
        post.title = req.body.title
        post.status = req.body.status
        post.allowComments = allowComments
        post.body = req.body.body

        post.save().then( updatedPost=>{
            res.redirect('/admin/posts')
        })
    })
})

module.exports = router