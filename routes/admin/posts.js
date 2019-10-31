const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const fs = require('fs');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const { userAuthenticated } = require('../../helpers/authentication');
// admin/ is defined in middleware
// for all routes after admin/
router.all('/*', userAuthenticated, (req, res, next) => {
  // override | req.app.locals.layout = 'home'
  req.app.locals.layout = 'admin';
  //
  next();
});
//
router.get('/', (req, res) => {
  // query db
  Post.find({})
    // mongooose stuff | post stores cat-_id not  cat-_id.name
    .populate('category')
    .then(posts => {
      // obj destructuring/ shorthand
      res.render('admin/posts', { posts });
    })
    .catch(e => {
      console.log(e);
    });
});
// /admin/posts/create
router.get('/create', (req, res) => {
  Category.find({}).then(categories => {
    res.render('admin/posts/create', { categories: categories });
  });
});
// go to edit page of post
router.get('/edit/:id', (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      Category.find({}).then(categories => {
        res.render('admin/posts/edit', { post: post, categories: categories });
      });
    })
    .catch(e => {
      console.log(e);
    });
});
// delete post from btn
router.delete('/:id', (req, res) => {
  // make sure relational data is also delete
  Post.findOne({ _id: req.params.id })
    // populate relational data into post
    .populate('comments')
    .then(post => {
      // console.log(post.comments);
      // delete file from filesystem
      fs.unlink(uploadDir + post.file, err => {
        // if comment length greater than 0
        if (!post.comments.length < 1) {
          // loop through all comments...
          post.comments.forEach(comment => {
            // ... and remove from model
            comment
              .remove()
              .then(comment => {
                // flash msging ?
              })
              .catch(e => console.log(e));
          });
        }
        //
        if (err) {
          console.log(err);
          return err;
        }
        // remove post from model
        post.remove().then(postRemoved => {
          //
          req.flash('success-message', `The post, ${post.title} was successfully deledted.`);
          res.redirect('/admin/posts');
        });
      });
    })
    .catch(e => {
      console.log(e);
    });
});
//
router.post('/create', (req, res) => {
  let errors = [];
  // if no title and then run this
  !req.body.title && errors.push({ message: 'please add a title' });
  // if no title and then run this
  !req.body.body && errors.push({ message: 'please add a description' });
  //
  //
  if (errors.length > 0) {
    res.render('admin/posts/create', {
      errors
    });
  } else {
    let filename = '';

    // watchout ! req.files === innput name=file
    if (!isEmpty(req.files)) {
      // save data to to server /uplodads/
      const file = req.files.file;
      // append
      filename = Date.now() + '-' + file.name;
      //
      const dirUploads = './public/uploads/';
      //
      file.mv(dirUploads + filename, err => {
        if (err) throw err;
      });
    }
    // sanitise (BS4 CB === on || undefined   )
    const allowComments = req.body.allowComments === 'on' ? true : false;
    // create post model data
    const newPost = new Post({
      // get user. WON'T EXIST UNLESS USER IS LOGGED IN
      user: req.user.id,
      title: req.body.title,
      status: req.body.status,
      allowComments: allowComments,
      body: req.body.body,
      category: req.body.category,
      file: filename
    });
    // save to db
    newPost
      .save()
      .then(savedPost => {
        // console.log(savedPost)
        // makes an error
        req.flash('success-message', `The post, ${savedPost.title} was successfully created.`);
        res.redirect('/admin/posts');
      })
      .catch(validator => {
        // mongoose Schema validation error
        console.log(validator);
        // res.render('/admin/posts/create', {errors: validator.errors })
        // should never be called
      });
  }
});
// submit edit form | requires method override (in mark up)
router.put('/edit/:id', (req, res) => {
  //
  Post.findOne({ _id: req.params.id }).then(post => {
    //
    const allowComments = req.body.allowComments ? true : false;
    // create new model interface
    // get user. WON'T EXIST UNLESS USER IS LOGGED IN
    post.user = req.user.id;
    //
    post.title = req.body.title;
    post.status = req.body.status;
    post.allowComments = allowComments;
    post.body = req.body.body;
    post.category = req.body.category;

    /** BUG WARNING
         * doesn't remove original image. meaning origianl will be stored indefinitely.
         */

    // if img changed
    if (!isEmpty(req.files)) {
      // save data to to server /uplodads/
      const file = req.files.file;
      // prepend
      let filename = Date.now() + '-' + file.name;
      //
      const dirUploads = './public/uploads/';
      //
      post.file = filename;
      file.mv(dirUploads + filename, err => {
        if (err) throw err;
      });
    }

    post.save().then(updatedPost => {
      req.flash('success-message', `The post, ${updatedPost.title} was successfully edited.`);
      res.redirect('/admin/posts');
    });
  });
});

module.exports = router;
