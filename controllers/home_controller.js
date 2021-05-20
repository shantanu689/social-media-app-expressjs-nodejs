const Post = require("../models/post");

module.exports.home = (req, res) => {
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      return res.render("home", {
        title: "the-hex | Home",
        posts: posts,
      });
    });
};
