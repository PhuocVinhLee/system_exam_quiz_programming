const express = require("express");
const question_submit_codes = require("../controllers/question_submit_code.controller");
const middleware = require("../controllers/middleware.Controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(question_submit_codes.findAll)
   .post(middleware.verifyTokenAndUserAuth,question_submit_codes.create)
   .delete(question_submit_codes.deleteAll)
   
   router.route("/teacher") 
  .get(middleware.verifyTokenAndUserAuth,question_submit_codes.findAllByTeacher)



router.route("/favorite/")
  .get(question_submit_codes.findAllFavorite);

router.route("/:id")
  .get(question_submit_codes.findOne)
  .put(question_submit_codes.update)
  .delete(question_submit_codes.delete);

 

module.exports = router;
