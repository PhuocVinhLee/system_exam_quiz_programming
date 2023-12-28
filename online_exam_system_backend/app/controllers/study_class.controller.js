const ApiError = require("../api-error");
//const { param } = require("../routes/study_class.route");
const Study_classService = require("../services//study_class.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const study_classService = new Study_classService(MongoDB.client);
    console.log(req.user);
    console.log(";ncslack")
    
      documents = await study_classService.find(req.query.id );     
   
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving study_classs"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const study_classService = new Study_classService(MongoDB.client);
    
    const document = await study_classService.findById(req.params.id);

    if(!document){
      return next(new ApiError(400, "study_class not found finone"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving study_class witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const study_classService = new Study_classService(MongoDB.client);
    const document = await study_classService.update(req.params.id, req.body);
    if(!document){
      return res.send(document);
    }

    return res.send(document);

  } catch(error){
    return next( new ApiError(500,`Error updating study_class with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const study_classService = new Study_classService(MongoDB.client);
    console.log(req.params);
    const document = await study_classService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"study_class not found"));
    }
    return res.send({message: "study_class was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete study_class with id=${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {

  try {
    const study_classService = new Study_classService(MongoDB.client);

     req.body.teacher_id = await req.user._id;
    const document = await study_classService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the study_class")
    );
  }
};

exports.create_arr = async (req, res, next) => {

  try {
    const study_classService = new Study_classService(MongoDB.client);

     req.body.teacher_id = await req.user._id;
    const document = await study_classService.create_arr(req.params.id,req.body);/// id study_class
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the arr study_class")
    );
  }
};