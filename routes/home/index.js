const express = require('express')
const router = express.Router()
const Post = require('../../models/Post')
const Category = require('../../models/Category')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
// check email - password
const LocalStrategy = require('passport-local').Strategy

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

router.get('/logout', (req,res)=>{
    // passport method
    req.logOut()
    //
    res.redirect('/login')
})


// tell passport to authenticate emails - like middleware 
passport.use( new LocalStrategy({
    // instead of validating username use email instead
    usernameField: 'email'
}, (email, password, done)=>{
    
    User.findOne({email:email}).then(user=>{

        if(!user) return done(null, false, {message:'User not found.'})

        bcrypt.compare(password, user.password, (err, matched)=>{
            if (err) return err;

            if(matched){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect password.'})
            }
        })
    })
}))
//
// - passport.method() using sessions
//
passport.serializeUser( function(user,done){
    done(null,user.id)
})
passport.deserializeUser( function(id, done){
    User.findById(id, function(err, user){
        done(err,user)
    })
})
// login route
router.post('/login', (req,res,next)=>{

    // passport lib 
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next)
    
})

router.get('/register', (req,res)=>{
    res.render('home/register')
})
router.post('/register', (req,res)=>{
    // res.send('home/register')

    let errors=[];
    // if no title and then run this
    !req.body.firstName && errors.push( {message: 'please add a first name'})
    // if no title and then run this
    !req.body.lastName && errors.push( {message: 'please add a last name'})
    // if no title and then run this
    !req.body.email && errors.push( {message: 'please add an email'})
    // passwords don't match
    if(req.body.password !== req.body.passwordConfirm){
        errors.push( {message: 'These passwords don\'t match'})
    }
    // console.log(req.body)
    // console.log(errors)
    if(errors.length>0){

        res.render('home/register',{
            errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        })
        
    }else{

        User.findOne( {email: req.body.email}).then( (user)=>{
            
            if( !user ){

                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                })
                // (rounds, callback) - higher rounds make it slower but more secure
                bcrypt.genSalt(10, (err,salt)=>{
                    //
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        //
                        newUser.password = hash
                        //
                        newUser.save().then( savedUser=>{
                            //variable set in app.js middleware
                            req.flash('success-message', `Hi, ${newUser.firstName}! You have been successfully registered. Please Login`)
                            res.redirect('/login')
                        })
                    })
                })

            }else{
                req.flash('error_message', 'That email already exists, login?')
                res.redirect('/login')
            }
        }) 
    }

})


module.exports = router