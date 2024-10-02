// config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Create a User model
const mongoose = require('mongoose');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Add to .env
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Add to .env
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Extract user information from profile
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;
        const photo = photos[0].value;

        try {
          let user = await User.findOne({ googleId: id });

          if (user) {
            // Existing user
            done(null, user);
          } else {
            // New user
            user = new User({
              googleId: id,
              displayName,
              email,
              photo,
            });
            await user.save();
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
