const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.findById(req.body.post, (err, post) => {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        (err, comment) => {
          post.comments.push(comment._id);
          post.save();
          return res.redirect("/");
        }
      );
    }
  });
};
