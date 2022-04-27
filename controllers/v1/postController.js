import { body, validationResult } from 'express-validator';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';

// Display list of all Posts.
export const post_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Post list');
};

// Display detail page for a specific Post.
export const post_detail = async (req, res) => {
  const post = await Post.findOne({ 'author': req.user._id }).populate('author')
    .catch((err) => { return next(err); });
  const comments = Comment.find({ 'user': req.user._id });
  
  if (err) { return res.status(400).json({ err }); }
  res.json({ post, comments });
};

// Handle Post create on POST.
export const post_create_post = [
  // Validate and sanitize
  body('title', 'Title required').trim().isLength({ min: 1 }).escape().custom((title) => {
    return Post.findOne({ title }).then((post) => {
      if (post) { return Promise.reject('You already have a blog post with this title'); }
    });
  }),
  body('content', 'Content required').trim().isLength({ min: 1 }).escape(),
  body('preview').trim().escape(),
  body('visibility').escape(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req).mapped();

    let post = new Post(
      { 
        title: req.body.title,
        content: req.body.content,
        author: '6268d3e429d867f9b90d985a',
        preview: req.body.preview,
        visibility: req.body.visibility,
      }
    );

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      post.save((err) => {
        if (err) { return next(err); }
        post.populate('author');
        res.json({ post, url: post.formatted_title });
      });
    }
  }
];

// Handle Post delete on POST.
export const post_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post delete POST');
};

// Handle Post update on POST.
export const post_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post update POST');
};
