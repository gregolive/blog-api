import User from '../../models/user.js';

// Display detail page for a specific User.
export const user_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: User detail: ' + req.params.username);
};

// Handle User create on POST.
export const user_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User create POST');
};

// Handle User delete on POST.
export const user_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// Handle User update on POST.
export const user_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User update POST');
};
