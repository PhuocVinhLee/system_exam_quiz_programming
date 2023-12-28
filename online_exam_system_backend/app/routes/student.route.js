const express = require("express");
const students = require("../controllers/student.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();
//router.route("/").get();
//router.route("/login").post(students.findStudent);
router.route("/register").post(students.registerStudent);
router.route("/login").post(students.loginStudent);
router.route("/logout").post(students.logout);
router.route("/student").get(students.findStudent);
router.route("/account_student")
    .get(middleware.verifyTokenAndUserAuth,students.findOneAccount)
.put(middleware.verifyTokenAndUserAuth,students.update);
router.route("/:id")
  .get(students.findOne)
  //  .put(students.update)
//   .delete(students.delete);
module.exports = router;;
