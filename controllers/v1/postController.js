import { body, validationResult } from 'express-validator';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';

// Display list of all Posts.
export const post_list = async (req, res) => {
  const posts = await Post.find({ 'author': req.params.user_id }).populate('author', 'username first_name last_name')
    .catch((err) => { return next(err); });

  res.json({ posts });
};

// Display detail page for a specific Post.
export const post_detail = async (req, res) => {
  const post = await Post.findOne({ 'formatted_title': req.params.title }).populate('author', 'username first_name last_name')
    .catch((err) => { return res.status(400).json({ err }); });
  const comments = await Comment.find({ 'post': post._id });
  
  res.json({ post, comments });
};

// Handle Post create on POST.
export const post_create_post = [
  // Validate and sanitize
  body('title', 'Title required').trim().isLength({ min: 1 }).escape().custom((title) => {
    return Post.findOne({ title: title.toLowerCase() }).then((post) => {
      if (post) { return Promise.reject('You already have a blog post with this title'); }
    });
  }),
  body('content', 'Content required').trim().isLength({ min: 1 }).escape(),
  body('preview').trim().escape(),
  body('visibility').escape(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const post = new Post(
        { 
          title: req.body.title,
          formatted_title: req.body.title.replace(/\s+/g, '-').toLowerCase(),
          content: req.body.content,
          author: req.body.author,
          preview: req.body.preview,
          visibility: req.body.visibility,
        }
      );

      post.save((err) => {
        if (err) { return next(err); }
        post.populate('author', 'username first_name last_name');
        res.json({ post });
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
