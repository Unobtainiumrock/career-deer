const passport = require('passport');
const LocalStrategy = require('./passport-local');
const GoogleStrategy = require('./passport-google');
const db = require('../models');

// Register Strategies
passport.use(LocalStrategy);
passport.use(GoogleStrategy);


// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from the session
passport.deserializeUser(async function(id, done) {
  try {
    const user = await db.User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
