import { body, validationResult } from 'express-validator';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';

// Display list of all Posts.
export const post_list = async (req, res) => {
  const posts = await Post.find({}).sort({ created_at: -1 }).populate('author', 'username first_name last_name')
    .catch((err) => { return next(err); });

  res.json({ posts });
};

// Display list of all of a User's Posts.
export const user_post_list = async (req, res) => {
  const posts = await Post.find({ 'author': req.params.user_id }).sort({ created_at: -1 }).populate('author', 'username first_name last_name')
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
    return Post.findOne({ formatted_title: title.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-').toLowerCase() }).then((post) => {
      if (post) { return Promise.reject('A blog post with this title already exists'); }
    });
  }),
  body('content', 'Content required').trim().isLength({ min: 1 }).escape(),
  body('preview').trim().isLength({ max: 1, max: 200 }).escape().withMessage('Preview must be 200 characters or less'),
  body('visibility').escape(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const post = new Post({ 
        title: req.body.title,
        formatted_title: req.body.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toLowerCase(),
        content: req.body.content,
        author: req.body.author,
        preview: req.body.preview,
        visibility: req.body.visibility,
      });

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
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.json({ msg: 'Blog post deleted! 👍' });
  });
};

// Handle Post update on POST.
export const post_update_post = [
  // Validate and sanitize
  body('title', 'Title required').trim().isLength({ min: 1 }).escape().custom((title, { req }) => {
    return Post.findOne({ formatted_title: title.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-').toLowerCase() }).then((post) => {
      if (post && post._id !== req.params.id) { return Promise.reject('A blog post with this title already exists'); }
    });
  }),
  body('content', 'Content required').trim().isLength({ min: 1 }).escape(),
  body('preview').trim().isLength({ max: 1, max: 200 }).escape().withMessage('Preview must be 200 characters or less'),
  body('visibility').escape(),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req).mapped();

    const post = new Post({
      title: req.body.title,
      formatted_title: req.body.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toLowerCase(),
      content: req.body.content,
      author: req.body.author,
      preview: req.body.preview,
      visibility: req.body.visibility,
      _id: req.params.id,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      Post.findByIdAndUpdate(req.params.id, post, {}, (err, updated_post) => {
        if (err) { return next(err); }
        updated_post.populate('author', 'username first_name last_name');
        res.json({ post: updated_post });
      });
    }
  }
];
