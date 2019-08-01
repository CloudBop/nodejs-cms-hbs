const express = require('express')
const app = express();
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const upload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
const {mongoDbURL} = require('./config/database')
const passport = require('passport')
// mongoose will connect || create [cms]
mongoose.connect(mongoDbURL, { useNewUrlParser: true } ).then( db=>{
    console.log('MONGO connected')
} ).catch( err=>{ console.log(err) } )


// - Middleware 
// ```````````````````````````````````````````````````
// control over requests

// middleware : connect static public folder
app.use(express.static(path.join(__dirname, 'public')))

const { select, generateDate } = require('./helpers/hbs-helpers')
// setup template engine & set default page layout
app.engine('handlebars', exphbs( {
    defaultLayout: 'home', 
    helpers: { select:select, generateDate:generateDate }, 
}))
app.set('view engine', 'handlebars')
// https://www.npmjs.com/package/express-handlebars

// overrides method on client
app.use( methodOverride('_method') )
// file upload middleware | binary encode/decode ?
app.use( upload() )
// parse json 
app.use(bodyParser.urlencoded( {extended:true} ))
app.use(bodyParser.json())

// session | has to be before routes
app.use( session({
    secret: 'edwindiaz123ilovecoding',
    resave: true,
    saveUninitialized: true
}))
// flash
app.use( flash() )
// passport
app.use(passport.initialize() )
// creates a req.user on the session
app.use(passport.session() )

// local variables using middleware
app.use( (req,res,next)=>{
    // sets local variable within handlebars
    res.locals.success_message = req.flash('success-message')
    res.locals.error_message = req.flash('error_message')
    res.locals.form_errors = req.flash('form_errors')
    // bind req.user && req.error from passport, this means we don't need to pass the variable to handblebars via individual responses
    res.locals.user = req.user || null
    res.locals.error = req.flash('error')
    // invoke rest of called route
    next()
})

// routes
const home = require('./routes/home/index')
const admin = require('./routes/admin/index')
const posts = require('./routes/admin/posts')
const categories = require('./routes/admin/categories')

// connect routes to middleware
app.use('/', home)
// connects routes on this path
app.use('/admin', admin)
app.use('/admin/posts', posts)
app.use('/admin/categories', categories)


app.listen(4500, ()=>{
    console.log(`listening on port 45000`)
})