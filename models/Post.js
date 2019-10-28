const mongoose = require('mongoose');
// const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    },

    title: {
      type: String,
      required: true
    },

    // slug: {

    //     type: String

    // },

    status: {
      type: String,
      default: 'public'
    },

    allowComments: {
      type: Boolean,
      require: true
    },

    body: {
      type: String,
      require: true
    },

    file: {
      type: String
    },
    // ids of all the comments
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comments'
      }
    ],

    date: {
      type: Date,
      default: Date.now()
    }
  },
  { usePushEach: true }
);

// PostSchema.plugin(URLSlugs('title', {field: 'slug'}));

module.exports = mongoose.model('posts', PostSchema);
