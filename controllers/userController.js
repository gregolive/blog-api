import User from '../models/user.js';

// Display list of all Users.
export const user_list = (req, res) => {
  res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User.
export const user_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: User detail: ' + req.params.username);
};

// Display User create form on GET.
export const user_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
export const user_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User create POST');
};

// Display User delete form on GET.
export const user_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
export const user_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
export const user_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
export const user_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User update POST');
};
