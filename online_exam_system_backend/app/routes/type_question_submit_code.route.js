const express = require("express");
const type_question_submit_codes = require("../controllers/type_question_submit_code.controller");

const router = express.Router();

router.route("/")
   .get(type_question_submit_codes.findAll)
   .post(type_question_submit_codes.create)

router.route("/:id")
  .get(type_question_submit_codes.findOne)
  .put(type_question_submit_codes.update)
  .delete(type_question_submit_codes.delete);



module.exports = router;
