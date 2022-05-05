import passport from 'passport';
import jwt from 'jsonwebtoken';

// Handle User login on POST.
export const auth_login_post = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info,
        user : user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) { res.send(err); }
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      return res.json({ 
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        token
      });
    });
  })(req, res);
};
