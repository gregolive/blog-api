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
export const comment_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment create POST');
};

// Handle Comment delete on POST.
export const comment_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment delete POST');
};

// Handle Comment update on POST.
export const comment_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment update POST');
};
