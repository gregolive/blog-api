import { body, validationResult } from 'express-validator';
import Comment from '../../models/comment.js';

// Display list of all Comments.
export const comment_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment list');
};

// Display detail page for a specific Comment.
export const comment_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment detail: ' + req.params.id);
};

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
  res.send('NOT IMPLEMENTED: Comment delete POST');
};

// Handle Comment update on POST.
export const comment_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment update POST');
};
