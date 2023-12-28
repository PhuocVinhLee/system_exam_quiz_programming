const express = require("express");
const periods = require("../controllers/period.controller");
const middleware = require("../controllers/middleware.Controller");

const router = express.Router();

router.route("/")
   .get(periods.findAll)
   .post(periods.create)

router.route("/:id")
  .get(periods.findOne)
  .put(periods.update)
  .delete(periods.delete);
router.route("teacher/:id")  
  .get(middleware.verifyTokenAndUserAuth,periods.findOneByIdTeacher);



module.exports = router;
