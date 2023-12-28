const express = require("express");
const questions = require("../controllers/question.controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(questions.findAll)
   .post(questions.create)
   .delete(questions.deleteAll)

router.route("/favorite")
  .get(questions.findAllFavorite);

router.route("/:id")
  .get(questions.findOne)
  .put(questions.update)
  .delete(questions.delete);



module.exports = router;
