import Comment from '../models/comment.js';

// Display list of all Comments.
export const comment_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment list');
};

// Display detail page for a specific Comment.
export const comment_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment detail: ' + req.params.id);
};

// Display Comment create form on GET.
export const comment_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment create GET');
};

// Handle Comment create on POST.
export const comment_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment create POST');
};

// Display Comment delete form on GET.
export const comment_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment delete GET');
};

// Handle Comment delete on POST.
export const comment_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment delete POST');
};

// Display Comment update form on GET.
export const comment_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment update GET');
};

// Handle Comment update on POST.
export const comment_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Comment update POST');
};
