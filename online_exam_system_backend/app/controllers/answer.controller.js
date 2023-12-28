const ApiError = require("../api-error");
//const { param } = require("../routes/answer.route");
const AnswerService = require("../services//answer.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const answerService = new AnswerService(MongoDB.client);
    const name = req.query.name;// == 
    console.log(name); 
    if(name){
      documents = await answerService.findByName(name);// name = red.query.name
    }
    else{
      documents = await answerService.find({});     
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving answers"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const answerService = new AnswerService(MongoDB.client);
    const document = await answerService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "answer not found finone"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving answer witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const answerService = new AnswerService(MongoDB.client);
    const document = await answerService.update(req.params.id, req.body);
    if(!document){
      return res.send(document);
    }

    return res.send(document);

  } catch(error){
    return next( new ApiError(500,`Error updating answer with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const answerService = new AnswerService(MongoDB.client);
    console.log(req.params);
    const document = await answerService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"answer not found"));
    }
    return res.send({message: "answer was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete answer with id=${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  if (0) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const answerService = new AnswerService(MongoDB.client);
    console.log("dosdifj");
    const document = await answerService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the answer")
    );
  }
};
