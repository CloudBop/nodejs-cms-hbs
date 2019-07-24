const express = require('express')
const router = express.Router()
// admin/ is defined in middleware
// for all routes after admin/
router.all('/*', (req, res, next)=>{
    // override | req.app.locals.layout = 'home'
    req.app.locals.layout = 'admin'
    //
    next();
})

router.get('/', (req,res)=>{
    res.render('admin/index')
})
// 
// 
//  


 



module.exports = router