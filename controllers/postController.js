import Post from '../models/post.js';

// Display list of all Posts.
export const post_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Post list');
};

// Display detail page for a specific Post.
export const post_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Post detail: ' + req.params.title);
};

// Display Post create form on GET.
export const post_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Post create GET');
};

// Handle Post create on POST.
export const post_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post create POST');
};

// Display Post delete form on GET.
export const post_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Post delete GET');
};

// Handle Post delete on POST.
export const post_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post delete POST');
};

// Display Post update form on GET.
export const post_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Post update GET');
};

// Handle Post update on POST.
export const post_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post update POST');
};
