const ApiError = require("../api-error");
//const { param } = require("../routes/result_exam_submit_code.route");
const Result_exam_submit_codeService = require("../services//result_exam_submit_code.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];

  try{
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    const user_id= await req.user._id;
    const exam_id = req.query.exam_id;
    console.log(user_id)
    console.log(exam_id)
   
      documents = await result_exam_submit_codeService.find(user_id, exam_id );     
 
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving result_exam_submit_codes"));
  }

  return res.send(documents);
 
};
exports.findAllByTeacher = async (req, res, next) => {
  let documents = [];

  try{
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    const exam_id = req.query.exam_id;

    console.log(exam_id)
    console.log("ojejoeojeoje")
   
      documents = await result_exam_submit_codeService.find_by_teacher( exam_id );     
 
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving result_exam_submit_codes"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    const document = await result_exam_submit_codeService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "result_exam_submit_code not found finone"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving result_exam_submit_code witd id = ${req.params.id}`));
  }
};
exports.findOneByIdTeacher = async (req, res, next) => {
  try{
    const id_teacher= await req.user._id;
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    const document = await result_exam_submit_codeService.findByIdAndIdTeacher(req.params.id,id_teacher);
    if(!document){
      return next(new ApiError(400, "result_exam_submit_code not found finone"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving result_exam_submit_code witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    const document = await result_exam_submit_codeService.update(req.params.id, req.body);
    if(!document){
      return res.send(document);
    }

    return res.send(document);

  } catch(error){
    return next( new ApiError(500,`Error updating result_exam_submit_code with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    console.log(req.params);
    const document = await result_exam_submit_codeService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"result_exam_submit_code not found"));
    }
    return res.send({message: "result_exam_submit_code was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete result_exam_submit_code with id=${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  
  try {
    const user_id= await req.user._id;
    req.body.user_id = user_id;
    const result_exam_submit_codeService = new Result_exam_submit_codeService(MongoDB.client);
    const document = await result_exam_submit_codeService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the result_exam_submit_code")
    );
  }
};
