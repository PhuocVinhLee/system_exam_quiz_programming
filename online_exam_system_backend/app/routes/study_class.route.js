const express = require("express");
const study_class = require("../controllers/study_class.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();

router.route("/")
   .get(middleware.verifyTokenAndUserAuth,study_class.findAll)
   .post(middleware.verifyTokenAndUserAuth,study_class.create);

router.route("/:id")
  .get(study_class.findOne)
  .put(study_class.update)
  .delete(study_class.delete);

  router.route("/arr/:id")
  .post(middleware.verifyTokenAndUserAuth,study_class.create_arr)
  // .put(study_class.update)
  // .delete(study_class.delete);

module.exports = router;
