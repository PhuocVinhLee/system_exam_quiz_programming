const ApiError = require("../api-error");
//const { param } = require("../routes/list_exam_question.route");
const List_exam_questionService = require("../services//list_exam_question.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const list_exam_questionService = new List_exam_questionService(MongoDB.client);  
      documents = await list_exam_questionService.find({});

  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving list_exam_questions"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const list_exam_questionService = new List_exam_questionService(MongoDB.client);
    const document = await list_exam_questionService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "List_exam_question not found"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving list_exam_question witd id = ${req.params.id}`));
  }
};


exports.delete = async (req, res, next) => {
  try{
    const list_exam_questionService = new List_exam_questionService(MongoDB.client);
    const document = await list_exam_questionService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "List_exam_question was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete list_exam_question with id=${req.params.id}`));
  }
};


exports.create = async (req, res, next) => {
  if (!req.body?.exam_id) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const list_exam_questionService = new List_exam_questionService(MongoDB.client);
    const document = await list_exam_questionService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the list_exam_question")
    );
  }
};
