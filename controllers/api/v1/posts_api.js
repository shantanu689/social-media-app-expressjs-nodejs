const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  res.status(200).json({
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });

      // if (req.xhr) {
      //   return res.status(200).json({
      //     data: {
      //       post_id: req.params.id,
      //     },
      //     message: "Post deleted",
      //   });
      // }

      req.flash("success", "Post and associated comments deleted!");
    } else {
      return res.status(401).json({
        message: "You cannot delete this post",
      });
    }
    return res.status(200).json({
      message: "Post and associated comments deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
