import { body, validationResult } from 'express-validator';
import Comment from '../../models/comment.js';

// Handle Comment create on POST.
export const comment_create_post = [
  // Validate and sanitize
  body('content', 'Comment required').trim().isLength({ min: 1 }).escape(),

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const comment = new Comment({ 
        content: req.body.content,
        author: req.body.user_id,
        post: req.params.post_id,
      });

      comment.save((err) => {
        if (err) { return next(err); }
        Comment.findOne(comment).lean().populate('author', 'username').exec((error, populated_comment) => {
          res.json({ comment: populated_comment });
        });
      });
    }
  }
];

// Handle Comment delete on POST.
export const comment_delete_post = (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.json({ msg: 'Comment deleted! 👍' });
  });
};

// Handle Comment update on POST.
export const comment_update_post = [
  // Validate and sanitize
  body('content', 'Comment required').trim().isLength({ min: 1 }).escape(),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req).mapped();

    const comment = new Comment({
      content: req.body.content,
      author: req.body.user_id,
      post: req.params.post_id,
      _id: req.params.id,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      Comment.findByIdAndUpdate(req.params.id, comment, { new: true }).populate('author', 'username').exec((err, updated_comment) => {
        if (err) { return next(err); }
        res.json({ comment: updated_comment, msg: 'Comment updated! 👍' });
      })
    }
  }
];
