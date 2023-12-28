const ApiError = require("../api-error");
//const { param } = require("../routes/type_question_submit_code.route");
const Type_question_submit_codeService = require("../services/type_question_submit_code.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const type_question_submit_codeService = new Type_question_submit_codeService(MongoDB.client);
    const name = req.query.name;// == 
    const page = req.query.page;
    //console.log(page); 
    if(name){
      documents = await type_question_submit_codeService.findByName(name);// name = red.query.name
    }
    else{
      documents = await type_question_submit_codeService.find({},page);     
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving type_question_submit_codes"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const type_question_submit_codeService = new Type_question_submit_codeService(MongoDB.client);
    const document = await type_question_submit_codeService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "type_question_submit_code not found finone"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving type_question_submit_code witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const type_question_submit_codeService = new Type_question_submit_codeService(MongoDB.client);
    const document = await type_question_submit_codeService.update(req.params.id, req.body);
    if(!document){
      return res.send(document);
    }

    return res.send(document);

  } catch(error){
    return next( new ApiError(500,`Error updating type_question_submit_code with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const type_question_submit_codeService = new ExamService(MongoDB.client);
    console.log(req.params);
    const document = await type_question_submit_codeService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"type_question_submit_code not found"));
    }
    return res.send({message: "type_question_submit_code was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete type_question_submit_code with id=${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  if (0) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const type_question_submit_codeService = new Type_question_submit_codeService(MongoDB.client);
    console.log("dosdifj");
    const document = await type_question_submit_codeService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the type_question_submit_code")
    );
  }
};
