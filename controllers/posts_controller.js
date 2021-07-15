const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    Post.uploadedImage(req, res, async (err) => {
      if (err) {
        console.log("*****MULTER ERROR*****", err);
        return;
      }
      // console.log(req.file);
      let post = await Post.create({
        content: req.body.content,
        user: req.user._id,
      });
      if(req.file) {
        post.image = Post.imagePath + "/" + req.file.filename;
        await post.save();
      }
      await post.populate("user").execPopulate();
      let time = post.createdAt.toDateString();
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post: post,
            time,
          },
          message: "Post Created!",
        });
      }

      return res.redirect("/");
    });
  } catch (err) {
    req.flash("Error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await post.remove();
      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }
    }
    return res.redirect("back");
  } catch (err) {
    req.flash("Error", err);
    return;
  }
};

module.exports.showLikes = async (req, res) => {
  try {
    let postId = req.params.id;
    let post = await Post.findById(postId).populate({
      path: "likes",
    });
    let likeUpdated = [];
    for (like of post.likes) {
      likeUpdated.push({
        _id: like._id,
        user: like.user,
      });
    }

    return res.status(200).json({
      likeUpdated,
    });
  } catch (error) {
    console.log(error);
  }
};
