const ApiError = require("../api-error");
//const { param } = require("../routes/level_question.route");
const Level_questionService = require("../services//level_question.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const level_questionService = new Level_questionService(MongoDB.client);
    const {name} = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if(name){
      documents = await level_questionService.findByName(name);// name = red.query.name
    }
    else{
      documents = await level_questionService.find({});

      
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving level_questions"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const level_questionService = new Level_questionService(MongoDB.client);
    const document = await level_questionService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "Level_question not found"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving level_question witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const level_questionService = new Level_questionService(MongoDB.client);
    const document = await level_questionService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400,"Conact not found"));
    }
    return res.send({message: "Level_question was updated successfully"});
  } catch(error){
    return next( new ApiError(500,`Error updating level_question with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const level_questionService = new Level_questionService(MongoDB.client);
    const document = await level_questionService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "Level_question was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete level_question with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try{
    const level_questionService = new Level_questionService(MongoDB.client);
    const deletedCount = await level_questionService.deleteAll();
    return res.send({message:  `${deletedCount}Level_question was delete successfully`});
  } catch(error){
    return next( new ApiError(500,"An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res , next) => {
  try{
    const level_questionService = new Level_questionService(MongoDB.client);
    const documents = await level_questionService.findFavorite();
    return res.send(documents);
  } catch(error){
    return next( new ApiError(500," An occurred while retrieving favorite level_questions" ));
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.level_question) {
    return next(new ApiError(400, "level question can not be empty 11!!!"));
  }
  try {
    const level_questionService = new Level_questionService(MongoDB.client);
   // console.log(req.body.email);
    const document = await level_questionService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the level_question")
    );
  }
};
