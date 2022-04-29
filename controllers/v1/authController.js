import passport from 'passport';
import jwt from 'jsonwebtoken';

// Handle User login on POST.
export const auth_login_post = async (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info,
        user : user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) { res.send(err); }
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};
