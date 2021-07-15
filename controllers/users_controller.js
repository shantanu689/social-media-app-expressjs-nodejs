const User = require("../models/user");
const Post = require("../models/post")
const fs = require("fs");
const path = require("path");

module.exports.profile = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    Post.find({ user: user._id })
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("likes")
      .exec((err, posts) => {
        return res.render("user_profile", {
          profile_user: user,
          posts: posts,
          title: "Profile"
        });
      });
  });
};

module.exports.update = async (req, res) => {
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
          user.avatar = User.avatarPath+"/"+req.file.filename;
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
        user.avatar = path.normalize(
          path.join(User.avatarPath, "/", "default.jpg")
        );
        user.save();
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
  console.log('in')
  req.flash("success", "Logged in Succesfully");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash("success", "You have logged out!");
  return res.redirect("/users/sign-in");
};

module.exports.search = async (req, res) => {
  try {
    let users = await User.find({
      name: { $regex: new RegExp(req.body.search_user, "i") },
    }).sort("name");
    let usersFields = [];
    for (let user of users) {
      usersFields.push({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    }
    if (users.length) {
      return res.render("search_users", {
        title: "Search",
        users: usersFields,
      });
    } else {
      return res.render("search_users", {
        title: "Search",
        message: "No user(s) found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};