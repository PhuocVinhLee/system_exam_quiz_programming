const express = require("express");
const optionss = require("../controllers/options_question.controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(optionss.findAll)
   .post(optionss.create)
   .delete(optionss.deleteAll)

router.route("/favorite")
  .get(optionss.findAllFavorite);

router.route("/:id")
  .get(optionss.findOne)
  .put(optionss.update)
  .delete(optionss.delete);



module.exports = router;
