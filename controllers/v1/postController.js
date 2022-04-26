import Post from '../../models/post.js';

// Display list of all Posts.
export const post_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Post list');
};

// Display detail page for a specific Post.
export const post_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Post detail: ' + req.params.title);
};

// Handle Post create on POST.
export const post_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post create POST');
};

// Handle Post delete on POST.
export const post_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post delete POST');
};

// Handle Post update on POST.
export const post_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Post update POST');
};
