import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import Post from '../../models/post.js';

// Display detail page for a specific User on GET.
export const user_detail = async (req, res, next) => {
  const post_count = await Post.countDocuments({ 'author': req.params.id })
    .catch((err) => { return next(err); });
  const recent_posts = await Post.find({ 'author': req.params.id }).sort({ created_at: -1 }).limit(3).populate('author', 'username first_name last_name')
    .catch((err) => { return next(err); });

  res.json({ post_count, recent_posts });
};

// Handle User create on POST.
export const user_create_post = [
  // Validate and sanitize
  body('username').trim().isLength({ min: 5 }).escape().withMessage('Username must be at least 5 characters long')
    .isAlphanumeric().withMessage('Username has non-alphanumeric characters').custom((username) => {
      return User.findOne({ username }).then((user) => {
        if (user) { return Promise.reject('Username already in use'); }
      });
    }),
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name required')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters'),
  body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name required')
    .isAlphanumeric().withMessage('Last name has non-alphanumeric characters'),
  body('email').trim().escape().isEmail().withMessage('Email must be valid').custom((email) => {
    return User.findOne({ email }).then((user) => {
      if (user) { return Promise.reject('Email already in use'); }
    });
  }),
  body('password').trim().isLength({ min: 6 }).escape().withMessage('Password must be at least than 6 characters long')
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}').withMessage('Password must contain an uppercase letter, number, and special character'),
  
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
export const user_delete_post = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id)
    .catch((err) => { return next(err); });
  await Post.deleteMany({ 'author': req.params.id });

  res.json({ msg: 'Account deleted.' });
};

// Handle User update on POST.
export const user_update_post = [
  // Validate and sanitize
  body('username').trim().isLength({ min: 5 }).escape().withMessage('Username must be at least 5 characters long')
    .isAlphanumeric().withMessage('Username has non-alphanumeric characters').custom((username, { req }) => {
      return User.findOne({ username }).then((user) => {
        if (user && user.username !== req.body.username) { return Promise.reject('Username already in use'); }
      });
    }),
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name required')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters'),
  body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name required')
    .isAlphanumeric().withMessage('Last name has non-alphanumeric characters'),
  body('email').trim().escape().isEmail().withMessage('Email must be valid').custom((email, { req }) => {
    return User.findOne({ email }).then((user) => {
      if (user && user.email !== req.body.email) { return Promise.reject('Email already in use'); }
    });
  }),
  body('current_password').trim().escape().custom((password, { req }) => {
    return User.findOne({ _id: req.body._id }).then((user) => {
      bcrypt.compare(password, user.password, (err) => {
        if (err) { return Promise.reject('Incorrect password'); }
      });
    });
  }),
  body('new_password').optional({ checkFalsy: true, nullable: true }).trim().isLength({ min: 6 }).escape().withMessage('Password must be at least than 6 characters long')
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}').withMessage('Password must contain an uppercase letter, number, and special character'),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    } else {
      const userPassword = (req.body.new_password === '') ? req.body.current_password : req.body.new_password;
      bcrypt.hash(userPassword, 10, (err, hashedPassword) => {
        if (err) { return next(err); }
        let user = new User({
          _id: req.body._id,
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
        });
        User.findByIdAndUpdate(req.body._id, user, { new: true }, (error, updated_user) => {
          if (error) { return next(error); }
          res.status(200).json({ updated_user, msg: 'Account details updated! 👍' });
        });
      });
    }
  }
];
