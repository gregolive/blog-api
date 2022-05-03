import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';

// Display detail page for a specific User.
export const user_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: User detail: ' + req.params.username);
};

// Handle User create on POST.
export const user_create_post = [
  // Validate and sanitize
  body('username').trim().isLength({ min: 5 }).escape().withMessage('Username must be at least 5 characters long')
    .isAlphanumeric().withMessage('Username has non-alphanumeric characters').custom(username => {
      return User.findOne({ username: username }).then(user => {
        if (user) { return Promise.reject('Username already in use'); }
      });
    }),
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name required')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters'),
  body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name required')
    .isAlphanumeric().withMessage('Last name has non-alphanumeric characters'),
  body('email').trim().escape().isEmail().withMessage('Email must be valid').custom(email => {
    return User.findOne({ email: email }).then(user => {
      if (user) { return Promise.reject('Email already in use'); }
    });
  }),
  body('password').trim().isLength({ min: 6 }).escape().withMessage('Password must be at least 6 characters long'),
  
  // Process request
  (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) { return next(err); }
        const user = new User({
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
        });
        user.save((error) => {
          if (error) { return next(error); }
          res.status(200).json({ msg: 'Account created! 🎉 Please log in' });
        });
      });
    }
  }
];

// Handle User delete on POST.
export const user_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// Handle User update on POST.
export const user_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: User update POST');
};
