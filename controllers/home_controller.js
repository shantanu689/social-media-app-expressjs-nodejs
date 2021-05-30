const Post = require("../models/post");
const User = require("../models/user");
const path = require("path");

module.exports.home = async (req, res) => {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "the-hex | Home",
      all_users: users,
      posts: posts,
    });
  } catch (err) {
    console.log("Error ", err);
    return;
  }
};
