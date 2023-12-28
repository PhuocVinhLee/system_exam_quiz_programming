const ApiError = require("../api-error");
//const { param } = require("../routes/question.route");
const QuestionService = require("../services//question.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const questionService = new QuestionService(MongoDB.client);
    const {name} = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if(name){
      documents = await questionService.findByName(name);// name = red.query.name
    }
    else{
      documents = await questionService.find({});

      
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving questions"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const questionService = new QuestionService(MongoDB.client);
    const document = await questionService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "Question not found"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving question witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const questionService = new QuestionService(MongoDB.client);
    const document = await questionService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400,"Conact not found"));
    }
    return res.send({message: "Question was updated successfully"});
  } catch(error){
    return next( new ApiError(500,`Error updating question with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const questionService = new QuestionService(MongoDB.client);
    const document = await questionService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "Question was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete question with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try{
    const questionService = new QuestionService(MongoDB.client);
    const deletedCount = await questionService.deleteAll();
    return res.send({message:  `${deletedCount}Question was delete successfully`});
  } catch(error){
    return next( new ApiError(500,"An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res , next) => {
  try{
    const questionService = new QuestionService(MongoDB.client);
    const documents = await questionService.findFavorite();
    return res.send(documents);
  } catch(error){
    return next( new ApiError(500," An occurred while retrieving favorite questions" ));
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.question_title) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const questionService = new QuestionService(MongoDB.client);
    const document = await questionService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the question")
    );
  }
};
