const express = require('express');
const router = express.Router();
// models
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

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
