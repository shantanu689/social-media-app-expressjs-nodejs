const mongoose = require("mongoose");
const path=require('path');

const POST_IMAGE_PATH=path.join("/uploads/posts");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    image: {
      type: String
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
