const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Category = require('../../models/Category');

const { userAuthenticated } = require('../../helpers/authentication');

// admin/ is defined in middleware
// for all routes after admin/
router.all('/*', userAuthenticated, (req, res, next) => {
  // override | req.app.locals.layout = 'home'
  req.app.locals.layout = 'admin';
  //
  next();
});
// admin/index barchart
router.get('/', (req, res) => {
  // query db [ count.() is deprecated use collection.countDocuments]
  const promises = [ Post.countDocuments().exec(), Category.countDocuments().exec(), Comment.countDocuments().exec() ];
  // const promises = [ Post.count().exec() ];

  //
  Promise.all(promises).then(([ postCount, categoryCount, commentCount ]) => {
    // pass result vars to hbs render
    res.render('admin/index', { postCount: postCount, categoryCount: categoryCount, commentCount: commentCount });
  });
});
//
router.post('/generate-fake-posts', (req, res) => {
  //
  for (let index = 0; index < req.body.amount; index++) {
    //
    let post = new Post();
    const title = faker.name.title();
    post.title = title;
    post.slug = title;
    post.status = 'public';
    post.allowComments = faker.random.boolean();
    post.body = faker.lorem.sentence();

    post.save(function(error) {
      if (error) throw error;
    });
  }
  //
  res.redirect('/admin/posts');
});

module.exports = router;
