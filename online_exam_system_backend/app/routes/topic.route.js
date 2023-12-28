const express = require("express");
const topics = require("../controllers/topic.controller");
const middleware = require("../controllers/middleware.Controller");

//middleware.verifyToken, 
const router = express.Router();

router.route("/")
  //.get(users.findEmail);
  .get(topics.findAll)
  .post(topics.create)
  .delete(topics.deleteAll)


router.route("/arr")
  .post(topics.create_arr)
router.route("/arr/:id")
.delete(topics.delete_arr)
  .put(topics.update_arr);

router.route("/favorite")
  .get(topics.findAllFavorite);

router.route("/:id")
  .get(topics.findOne)
  .put(topics.update)
  .delete(topics.delete);



module.exports = router;
