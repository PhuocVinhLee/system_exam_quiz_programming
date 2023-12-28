const express = require("express");
const user_question_options = require("../controllers/user_question_option.controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(user_question_options.findAll)
   .post(user_question_options.create)
   .delete(user_question_options.delete)

router.route("/favorite")
  .post(user_question_options.findAllFavorite);

router.route("/:id")
  .get(user_question_options.findOne)
  .put(user_question_options.update)
  .delete(user_question_options.delete);



module.exports = router;
