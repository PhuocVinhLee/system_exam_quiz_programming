const express = require("express");
const files = require("../controllers/file.controller");
const middleware = require("../controllers/middleware.Controller");
const router = express.Router();
const multer = require('multer')


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("etsttsts",req)
//      const allowedType = ["image/jpeg", "image/png", "image/gif"];
//      if(!allowedType.includes(file.mimetype)){
//      // const error = new Error("Wrong file type");
//      error_type.code = "Limit file type";
//      //req.error = "Limit file type"
//       //res.send({error: error.code});
//      }
//        cb(null, 'file/');
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname)
//   }
// });

// const upload = multer({ storage: storage }).single("file");
// if(error_type.code){
//   console.log("Loi sijee");
// }

router.route("/")
   .get(files.findAll)
   .post(files.create);

router.route("/:id")
  .get(middleware.verifyToken,files.findOne)
  .put(files.update)
  .delete(files.delete);

  router.route("/arr/:id")
  .post(files.create_arr)

module.exports = router;
