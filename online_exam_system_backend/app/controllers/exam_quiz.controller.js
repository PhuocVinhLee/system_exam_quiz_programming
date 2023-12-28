const ApiError = require("../api-error");
//const { param } = require("../routes/exam_quiz.route");
const Exam_quizService = require("../services//exam_quiz.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const exam_quizService = new Exam_quizService(MongoDB.client);
    const name = req.query.name;// == 
    const page = req.query.page;
    const period_id= req.query.id
    // const period_id = {
    //  period_id: req.query.id
    // }
    
    if(name){
     // documents = await exam_quizService.findByName(name);// name = red.query.name
    }
    else{
      // console.log({period_id})
      documents = await exam_quizService.find(period_id,page);     
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving exam_quizs"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const exam_quizService = new Exam_quizService(MongoDB.client);
    const document = await exam_quizService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "exam_quiz not found finone"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving exam_quiz witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const exam_quizService = new Exam_quizService(MongoDB.client);
    const document = await exam_quizService.update(req.params.id, req.body);
    console.log(req.body)
    if(!document){
      return res.send(document);
    }

    return res.send(document);

  } catch(error){
    return next( new ApiError(500,`Error updating exam_quiz with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const exam_quizService = new Exam_quizService(MongoDB.client);
    console.log(req.params);
    const document = await exam_quizService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"exam_quiz not found"));
    }
    return res.send({message: "exam_quiz was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete exam_quiz with id=${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  if (0) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const exam_quizService = new Exam_quizService(MongoDB.client);
    console.log("dosdifj");
    const document = await exam_quizService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the exam_quiz")
    );
  }

}

  
exports.create_arr = async (req, res, next) => {

  try {
    const exam_quizService = new Exam_quizService(MongoDB.client);

    const document = await exam_quizService.create_arr(req.params.id,req.body);/// id study_class
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the arr exam_submitcode")
    );
  }
};
