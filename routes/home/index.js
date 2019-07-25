const express = require('express')
const router = express.Router()

router.all('/*', (req, res, next)=>{
    // override | req.app.locals.layout = 'home'
    req.app.locals.layout = 'home'
    //
    next();
})

router.get('/', (req,res)=>{

    // req.session.edwin = "Edwin"

    // req.session.edwin && ( console.log('we found Edwin' ))

    res.render('home/index')
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