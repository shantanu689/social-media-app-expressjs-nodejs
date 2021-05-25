const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async (req, res) => {
  // if (req.params.id == req.user.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
  //     req.flash("success", "Your profile has been updated");
  //     return res.redirect("back");
  //   });
  // } else {
  //   return res.status(401).send("Unauthorised");
  // }
  if (req.params.id == req.user.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("***** Multer Error");
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.status(401).send("Unauthorised");
  }
};

module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "the hex | Sign Up",
  });
};

module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "the hex | Sign In",
  });
};

module.exports.create = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("Error in creating user while signing up");
          return;
        }
        req.flash("success", "Signup successfull");
        return res.redirect("/users/sign-in");
      });
    } else {
      req.flash("error", "Email-id already exists!");
      return res.redirect("back");
    }
  });
};

module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in Succesfully");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash("success", "You have logged out!");
  return res.redirect("/users/sign-in");
};
