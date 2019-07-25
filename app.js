const express = require('express')
const app = express();
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')   
// mongoose will connect || create [cms]
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true } ).then( db=>{
    console.log('MONGO connected')
} ).catch( err=>{ console.log(err) } )
//
// middleware : connect public folder
app.use(express.static(path.join(__dirname, 'public')))

// overrides method on client
app.use( methodOverride('_method') )

const { select } = require('./helpers/hbs-helpers')
// setup template engine & set default page layout
app.engine('handlebars', exphbs( {
    defaultLayout: 'home', 
    helpers: { select:select }
}))
app.set('view engine', 'handlebars')
// https://www.npmjs.com/package/express-handlebars

// parse json 
app.use(bodyParser.urlencoded( {extended:true} ))
app.use(bodyParser.json())

// routes
const home = require('./routes/home/index')
const admin = require('./routes/admin/index')
const posts = require('./routes/admin/posts')

// connect routes to middleware
app.use('/', home)
// connects routes on this path
app.use('/admin', admin)
app.use('/admin/posts', posts)
//
//
app.listen(4500, ()=>{
    console.log(`listening on port 45000`)
})