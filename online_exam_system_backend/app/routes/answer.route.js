const express = require("express");
const answers = require("../controllers/answer.controller");

const router = express.Router();

router.route("/")
   .get(answers.findAll)
   .post(answers.create)

router.route("/:id")
  .get(answers.findOne)
  .put(answers.update)
  .delete(answers.delete);



module.exports = router;
