const express = require("express");
const result_exam_quizs = require("../controllers/result_exam_quiz.controller");
const middleware = require("../controllers/middleware.Controller");

const router = express.Router();

router.route("/")
   .get(middleware.verifyTokenAndUserAuth,result_exam_quizs.findAll)
   .post(middleware.verifyToken,result_exam_quizs.create)

   router.route("/teacher").get(middleware.verifyToken,result_exam_quizs.findAllByTeacher);
router.route("/:id")
  .get(result_exam_quizs.findOne)
  .put(middleware.verifyTokenAndUserAuth,result_exam_quizs.update)
  .delete(result_exam_quizs.delete);
 
router.route("teacher/:id")  
  .get(middleware.verifyTokenAndUserAuth,result_exam_quizs.findOneByIdTeacher);


module.exports = router;
