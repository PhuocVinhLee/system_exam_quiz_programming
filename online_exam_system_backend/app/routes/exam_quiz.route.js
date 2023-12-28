const express = require("express");
const exam_quizs = require("../controllers/exam_quiz.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();

router.route("/")
   .get(exam_quizs.findAll)
   .post(exam_quizs.create)

router.route("/:id")
  .get(middleware.verifyToken,exam_quizs.findOne)
  .put(exam_quizs.update)
  .delete(exam_quizs.delete);

  router.route("/arr/:id")
  .post(exam_quizs.create_arr)

module.exports = router;
