const express = require("express");
const usersApi = require("../../../controllers/api/v1/users_api");

const router = express.Router();

router.use("/create-session", usersApi.createSession);

module.exports = router;
