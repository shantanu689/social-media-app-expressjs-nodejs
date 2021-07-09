const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "60841255761-02970mmtankvdvs97ir0sj9rusqigi86.apps.googleusercontent.com",
      clientSecret: "UkXTPUp4Vhhte6DI72cpFmua",
      callbackURL: "http://localhost:8080/users/auth/google/callback",
      // Google sends the data of user back on callback URL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
        if (err) return console.log("Error in google strategy passport ", err);
        // console.log(accessToken, refreshToken);
        // console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          // Signing up the user if user not present
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
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
