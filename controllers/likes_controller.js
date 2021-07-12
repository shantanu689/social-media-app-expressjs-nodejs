// const Like = require("../models/like");
// const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async (req, res) => {
  // likes/toggle/?id=abc123&type=Post

  try {
    let deleted = false;

    let current_post = await Post.findById(req.params.post_id)
    if(current_post.likes.indexOf(req.user._id)!==-1) {
        current_post.likes.pull(req.user._id);
        current_post.save();
        deleted = true;
    }
    else {
        current_post.likes.push(req.user._id)
        current_post.save();
        deleted = false;
    }
    return res.status(200).json({
      message: "Request Successful",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
