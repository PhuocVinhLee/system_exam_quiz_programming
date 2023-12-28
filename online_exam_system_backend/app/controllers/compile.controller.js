const ApiError = require("../api-error");


const compiler = require("compilex")

const options = { stats: true, }
compiler.init(options)// tao thu muc ao (temp)


exports.getOut_put = async (req, res, next) => {
  //compiler.flushSync(console.log("deleted all"));;
  //compiler.flush(function () {
  //console.log("deleted")
  //})

  //try {
    var code = req.body.code
    console.log(req.body.code)
    var input = (req.body.input);;
    var lang = req.body.lang.toString();
    console.log(lang);
    if (lang == "Cpp") {
      if (!input) {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
        compiler.compileCPP(envData, code, async function (data) {

          if (data.output) {
            res.send(data)
           
            // compiler.flush(function () {
            //   console.log("deleted")
            // });
          }///
          else {
            res.send(data);// loi client code sai

          }
        });
      }
      else {
       
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )

        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            
            res.send(data);
          }
          else {
            res.send(data)
          }
        });


      }
    }
    else if (lang == "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          }
          else {
            res.send({ output: "error" })
          } 0
        })
      }
      else {
        //if windows  
        var envData = { OS: "windows" };
        //else
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          }
          else {
            res.send({ output: "error" })
          }
        })
      }
    }
    else if (lang == "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          }
          else {
            res.send({ output: "error" })
          }
        });
      }
      else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          }
          else {
            res.send({ output: "error" })
          }
        });
      }
    }
  // }
  // catch (e) {
  //   return next(new ApiError(500, "An erro occurred while retrieving contacts"));
  // }
};

