const express = require("express");
const passport = require("passport");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const {getFileStream} = require('../config/aws-config')

router.get('/images/:key', (req,res) => {
    const key = req.params.key;
    const readStream = getFileStream(key)

    readStream.pipe(res);
})
router.get("/", passport.checkAuthentication, homeController.home);
router.use('/likes', require('./likes'));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/api", require("./api"));
router.use('/reset-password', require('./resetPassword'))

module.exports = router;
