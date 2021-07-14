const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer')

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

      await comment
        .populate({
          path: "user",
          select: "_id name email avatar",
        })
        .execPopulate();
      // req.flash("success", "Comment published!");
        // commentsMailer.newComment(comment);
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
            length: post.comments.length
          },
          message: "Comment created!",
        });
      }
    }
    return res.redirect("back");
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
      // req.flash("success", "Your comment has been deleted!");
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
            length: post.comments.length-1
          },
          message: "Comment deleted",
        });
      }
    } else {
      req.flash("error", "You cannot delete this comment!");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error ", err);
    return;
  }
};
