const mongoose = require("mongoose");
const multer =require('multer');
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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",POST_IMAGE_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

postSchema.statics.uploadedImage = multer({storage:storage}).single('image');
postSchema.statics.imagePath=POST_IMAGE_PATH;


const Post = mongoose.model("Post", postSchema);
module.exports = Post;
