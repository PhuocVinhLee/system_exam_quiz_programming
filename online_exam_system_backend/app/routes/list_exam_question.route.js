const express = require("express");
const list_exam_questions = require("../controllers/list_exam_question.controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(list_exam_questions.findAll)
   .post(list_exam_questions.create)

router.route("/:id")
  .get(list_exam_questions.findOne)
  .delete(list_exam_questions.delete);



module.exports = router;
