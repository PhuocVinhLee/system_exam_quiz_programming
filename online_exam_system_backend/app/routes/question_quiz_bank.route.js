const express = require("express");
const question_quiz_banks = require("../controllers/question_quiz_bank.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(middleware.verifyTokenAndUserAuth,question_quiz_banks.findAll)
   .post(middleware.verifyTokenAndUserAuth,question_quiz_banks.create)
   .delete(question_quiz_banks.deleteAll)

router.route("/teacher")
  .get(middleware.verifyTokenAndUserAuth,question_quiz_banks.findAllFormTeacherId);

router.route("/:id")
  .get(question_quiz_banks.findOne)
  .put(question_quiz_banks.update)
  .delete(question_quiz_banks.delete);
router.route("/arr/:id")// questionn_id
  .post(middleware.verifyTokenAndUserAuth,question_quiz_banks.create_arr)
  router.route("/arr_teacher/:id")// teacher_id
  .post(middleware.verifyTokenAndUserAuth,question_quiz_banks.create_arr_teacher_id)



module.exports = router;
