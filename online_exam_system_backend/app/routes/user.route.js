const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();
//router.route("/").get();
//router.route("/login").post(users.findUser);
router.route("/register").post(users.create);
router.route("/teacher").get(users.findTeacher);
router.route("/logout").post(users.logout);

module.exports = router;;
