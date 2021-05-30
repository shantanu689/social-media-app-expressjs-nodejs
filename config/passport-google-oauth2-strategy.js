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
    },
    (accessToken, refreshToken) => {}
  )
);
