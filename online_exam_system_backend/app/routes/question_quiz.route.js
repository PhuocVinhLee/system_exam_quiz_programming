const express = require("express");
const question_quizs = require("../controllers/question_quiz.controller");
const middleware = require("../controllers/middleware.Controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(question_quizs.findAll)
   .post(middleware.verifyTokenAndUserAuth,question_quizs.create)
   .delete(question_quizs.deleteAll)
   
   router.route("/teacher") 
  .get(middleware.verifyTokenAndUserAuth,question_quizs.findAllByTeacher)



router.route("/favorite/")
  .get(question_quizs.findAllFavorite);

router.route("/:id")
  .get(question_quizs.findOne)
  .put(middleware.verifyTokenAndUserAuth,question_quizs.update)
  .delete(question_quizs.delete);

 

module.exports = router;
