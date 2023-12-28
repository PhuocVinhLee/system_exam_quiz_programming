const express = require("express");
const level_questions = require("../controllers/level_question.controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(level_questions.findAll)
   .post(level_questions.create)
   .delete(level_questions.deleteAll)

router.route("/favorite")
  .get(level_questions.findAllFavorite);

router.route("/:id")
  .get(level_questions.findOne)
  .put(level_questions.update)
  .delete(level_questions.delete);



module.exports = router;
