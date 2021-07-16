const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const usersController = require("../controllers/users_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
const uploads = multer({ dest: "uploads/" });

router.post(
  "/update/:id",
  passport.checkAuthentication,
  uploads.single("avatar"),
  usersController.update
);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
router.post("/search", passport.checkAuthentication, usersController.search);

module.exports = router;
