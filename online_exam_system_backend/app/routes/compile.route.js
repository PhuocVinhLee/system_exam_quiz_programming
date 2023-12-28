
const express = require("express");
//const compiler = require("compilex");
//const options = { status: true }
//compiler.init(options)

const compile = require("../controllers/compile.controller");


const router = express.Router();

router.route("/")
.post(compile.getOut_put)




module.exports = router;
