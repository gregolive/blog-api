import LocalStrategy from 'passport-local';
import JWTStrategy from 'passport-jwt';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const initialize = (passport) => {
  passport.use(
    new LocalStrategy.Strategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Username not found' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user);
          } else {
            // passwords do not match!
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      });
    })
  );

  passport.use(new JWTStrategy.Strategy({
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
  }, (jwtPayload, callback) => {
    return User.findOneById(jwtPayload.id)
      .then((user) => {
        return callback(null, user);
      })
      .catch((err) => {
        return callback(err);
      });
    }
  ));
};

export default initialize;
