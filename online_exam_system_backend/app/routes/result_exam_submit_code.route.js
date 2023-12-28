const express = require("express");
const result_exam_submit_codes = require("../controllers/result_exam_submit_code.controller");
const middleware = require("../controllers/middleware.Controller");

const router = express.Router();

router.route("/")
   .get(middleware.verifyTokenAndUserAuth,result_exam_submit_codes.findAll)
   .post(middleware.verifyToken,result_exam_submit_codes.create)

   router.route("/teacher").get(middleware.verifyToken,result_exam_submit_codes.findAllByTeacher);
router.route("/:id")
  .get(middleware.verifyTokenAndUserAuth,result_exam_submit_codes.findOne)
  .put(middleware.verifyTokenAndUserAuth,result_exam_submit_codes.update)
  .delete(result_exam_submit_codes.delete);
 
router.route("teacher/:id")  
  .get(middleware.verifyTokenAndUserAuth,result_exam_submit_codes.findOneByIdTeacher);


module.exports = router;
