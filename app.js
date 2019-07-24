const express = require('express')
const app = express();
const path = require('path')
const exphbs = require('express-handlebars')
// middleware : connect public folder
app.use(express.static(path.join(__dirname, 'public')))
// setup template engine & set default page layout
app.engine('handlebars', exphbs( {defaultLayout: 'home'} ))
app.set('view engine', 'handlebars')
// https://www.npmjs.com/package/express-handlebars
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
app.listen(4500, ()=>{
    console.log(`listening on port 45000`)
})