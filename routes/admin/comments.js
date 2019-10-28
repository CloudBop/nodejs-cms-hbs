const express = require('express');
const router = express.Router();
// models
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
//
// const {userAuthenticated} = require('../../helpers/authentication');
// router.all('/*', userAuthenticated, (req, res, next) => {})

//
// connect url and  hook to middleware
router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  Comment.find({ user: '5a610f5bba96f1e526a5cdbb' }).populate('user').then(comments => {
    res.render('admin/comments', { comments: comments });
  });
});

// FORM[HIDDEN]=POST AT http://localhost:4500/admin/comments
router.post('/', (req, res) => {
  // pass post ID (for mongoose Post.model)
  Post.findOne({ _id: req.body.id }).then(post => {
    // create new comment
    const newComment = new Comment({
      // req.user stored as cookie on login
      user: req.user.id,
      body: req.body.body
    });
    // console.log('newComment', newComment);
    // store newComment
    post.comments.push(newComment);
    // save to post
    post.save().then(savedPost => {
      // save to comment
      // console.log('savedPost', savedPost);
      newComment.save().then(savedComment => {
        // console.log('savedComment', savedComment);
        res.redirect(`/posts/${post.id}`);
      });
    });
  });

  // res.send('it work');
});

module.exports = router;
/**
 * 
 * Remember that req.user is created by session @ login. Passport taking care of this.
 */
