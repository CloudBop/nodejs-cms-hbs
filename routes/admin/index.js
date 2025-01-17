const express = require('express')
const router = express.Router()
const faker = require('faker')
const Post = require('../../models/Post')
const { userAuthenticated } = require('../../helpers/authentication')

// admin/ is defined in middleware
// for all routes after admin/
router.all('/*', userAuthenticated, (req, res, next)=>{
    // override | req.app.locals.layout = 'home'
    req.app.locals.layout = 'admin'
    //
    next();
})

router.get('/', (req,res)=>{
    res.render('admin/index')
})
// 
router.post('/generate-fake-posts', (req,res)=>{

    for (let index = 0; index < req.body.amount; index++) {
       let post = new Post()

       post.title=faker.name.title()
       post.status='public'
       post.allowComments=faker.random.boolean()
       post.body=faker.lorem.sentence()

       post.save( function (error){
           if (error) throw error 
       })
    }

    res.redirect('/admin/posts')
})

 



module.exports = router