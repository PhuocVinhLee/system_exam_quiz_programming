const express = require("express");
const question_submit_code_banks = require("../controllers/question_submit_code_bank.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(middleware.verifyTokenAndUserAuth,question_submit_code_banks.findAll)
   .post(middleware.verifyTokenAndUserAuth,question_submit_code_banks.create)
   .delete(question_submit_code_banks.deleteAll)

router.route("/teacher")
  .get(middleware.verifyTokenAndUserAuth,question_submit_code_banks.findAllFormTeacherId);

router.route("/:id")
  .get(question_submit_code_banks.findOne)
  .put(question_submit_code_banks.update)
  .delete(question_submit_code_banks.delete);
router.route("/arr/:id")// questionn_id
  .post(middleware.verifyTokenAndUserAuth,question_submit_code_banks.create_arr)
  router.route("/arr_teacher/:id")// teacher_id
  .post(middleware.verifyTokenAndUserAuth,question_submit_code_banks.create_arr_teacher_id)



module.exports = router;
