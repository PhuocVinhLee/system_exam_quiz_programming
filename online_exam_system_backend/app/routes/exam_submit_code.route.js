const express = require("express");
const exam_submit_codes = require("../controllers/exam_submit_code.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();

router.route("/")
   .get(exam_submit_codes.findAll)
   .post(exam_submit_codes.create)

router.route("/:id")
  .get(middleware.verifyToken,exam_submit_codes.findOne)
  .put(exam_submit_codes.update)
  .delete(exam_submit_codes.delete);

  router.route("/arr/:id")
  .post(exam_submit_codes.create_arr)

module.exports = router;
