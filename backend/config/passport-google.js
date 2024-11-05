const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models');

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.ROOT_URL}/api/auth/google/callback`
  },
  async function(token, tokenSecret, profile, done) {
    try {
      console.log('===== GOOGLE PROFILE =======');
      console.log(profile);
      console.log('======== END ===========');

      const { id, name, photos, emails } = profile;
      const email = emails && emails[0] ? emails[0].value.toLowerCase() : null;

      if (!email) {
        console.log('No email found in Google profile.');
        return done(null, false, { message: 'No email associated with this account.' });
      }

      // Check if user already exists with this Google ID
      let user = await db.User.findOne({ googleId: id });

      if (user) {
        // User exists, proceed
        return done(null, user);
      } else {
        // Check if a user with the same email exists
        user = await db.User.findOne({ email });

        if (user) {
          // User exists with this email but hasn't linked Google account
          user.googleId = id;
          await user.save();
          return done(null, user);
        } else {
          // Create a new user
          const newGoogleUser = new db.User({
            googleId: id,
            email,
            firstName: name.givenName,
            lastName: name.familyName,
          });

          await newGoogleUser.save();
          return done(null, newGoogleUser);
        }
      }
    } catch (error) {
      console.error('Error in Google Strategy:', error);
      return done(error, null);
    }
  }
);

module.exports = strategy;
