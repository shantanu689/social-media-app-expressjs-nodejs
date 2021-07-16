const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require('multer')


const postsController = require("../controllers/posts_controller");

const uploads = multer({dest: 'uploads/'})
router.post("/create", passport.checkAuthentication, uploads.single('image') ,postsController.create);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destroy
);
router.get('/show-likes/:id',passport.checkAuthentication,postsController.showLikes);

module.exports = router;
