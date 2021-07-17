const Post = require("../models/post");
const path = require("path");
const fs = require("fs");
const util = require("util");
// const unlinkFile = util.promisify(fs.unlink);

const Comment = require("../models/comment");
const aws_config = require("../config/aws-config");

module.exports.create = async (req, res) => {
  try {
    const file = req.file;
    let result;
    if (file) {
      result = await aws_config.uploadFile(file);
      // await unlinkFile(path.normalize(file.path));
    }
    else {
      result = {Key: null}
    }
    console.log('started creating post')
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
      image: result.Key,
    });
    console.log('created post')
    // if (req.file) post.image = req.file.location;
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
    console.log('returning now')
    return res.redirect("/");
  } catch (err) {
    req.flash("Error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      if(post.image) {
        await aws_config.deleteFile(post.image);
      }
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
