const express = require("express");
const subjects = require("../controllers/subject.controller");
const middleware = require("../controllers/middleware.Controller");

const router = express.Router();

router.route("/")
   //.get(users.findEmail);
   .get(middleware.verifyToken,subjects.findAll)
   .post(middleware.verifyToken,subjects.create)
   .delete(subjects.deleteAll)

router.route("/favorite")
  .get(subjects.findAllFavorite);

  router.route("/teacher")
  .get(middleware.verifyTokenAndUserAuth,subjects.findAllTeacher);

router.route("/:id")
  .get(subjects.findOne)
  .put(subjects.update)
  .delete(subjects.delete);




module.exports = router;
