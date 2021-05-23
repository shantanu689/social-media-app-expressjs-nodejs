const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment._id);
      await post.save();
      req.flash("success", "Comment published!");
    }
    return res.redirect("/");
  } catch (err) {
    req.flash("Error", err);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      let dummy = await comment.remove();
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "Your comment has been deleted!");
    } else {
      req.flash("error", "You cannot delete this comment!");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error ", err);
    return;
  }
};