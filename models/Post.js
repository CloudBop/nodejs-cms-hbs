const mongoose = require('mongoose');
// library for default for mongoose schema
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    // point to user_id
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    // point to cat_id
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    },

    title: {
      type: String,
      required: true
    },

    slug: {
      type: String
    },

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
//
// method on schema to connect url slugs
// pass the title to the field called slug
PostSchema.plugin(
  URLSlugs(
    'title',
    // (node:2314) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    // https://github.com/Automattic/mongoose/issues/6880
    { field: 'slug' }
  )
);

module.exports = mongoose.model('posts', PostSchema);
