const express = require("express");
const teachers = require("../controllers/teacher.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();
//router.route("/").get();
//router.route("/login").post(teachers.findTeacher);
router.route("/register").post(teachers.registerTeacher);
router.route("/login").post(teachers.loginTeacher);
router.route("/logout").post(teachers.logout);
router.route("/teacher").get(teachers.findTeacher);
router.route("/account_teacher")
    .get(middleware.verifyTokenAndUserAuth,teachers.findOneAccount)
.put(middleware.verifyTokenAndUserAuth,teachers.update);
router.route("/:id")
  .get(teachers.findOne)
  //  .put(teachers.update)
//   .delete(teachers.delete);
module.exports = router;;
