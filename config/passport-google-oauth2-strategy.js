const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment");

passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_call_back_url,
      // Google sends the data of user back on callback URL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
        if (err) return console.log("Error in google strategy passport ", err);
        if (user) {
          return done(null, user);
        } else {
          // Signing up the user if user not present
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile._json.picture,
              password: crypto.randomBytes(20).toString("hex"),
            },
            (err, user) => {
              if (err)
                return console.log(
                  "Error in creating user google strategy ",
                  err
                );
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
