const ApiError = require("../api-error");
//const { param } = require("../routes/question_quiz.route");
const Question_quizService = require("../services//question_quiz.service");
const MongoDB = require("../utils/mongodb.util")

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file ne", file);
    const allowedType = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedType.includes(file.mimetype)) {
      return cb(new Error('Wrong file type'))
    }
    // if (file.size > 2) {
    //     return cb(new Error('Wrong file litmit byte'))
    // }
    cb(null, 'file/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)
  }

});
const upload = multer({ storage: storage, limits: { fileSize: 700000 } }).single("file");

const upload_arr = multer({ storage: storage, limits: { fileSize: 700000 } }).array("files");


exports.findAllByTeacher = async (req, res, next) => {
  let documents = [];
  console.log("lkan;c")
  try{
    const question_quizService = new Question_quizService(MongoDB.client);

    const page = req.query.page;
    const subject_id= req.query.subject_id
    const teacher_id = await req.user._id;
   
    
      documents = await question_quizService.findbyTeacher(subject_id,teacher_id,page);

  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving question_quizs"));
  }

  return res.send(documents);
 
};


exports.findAll = async (req, res, next) => {
  let documents = [];
  console.log("all")
  try{
    const question_quizService = new Question_quizService(MongoDB.client);

    const page = req.query.page;
    const subject_id= req.query.id
    
      documents = await question_quizService.find(subject_id, page);

  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving question_quizs"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const question_quizService = new Question_quizService(MongoDB.client);
    const document = await question_quizService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "Question_quiz not found"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving question_quiz witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
 
  try{
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return next(
          new ApiError(422, 'size file limits ' + 200000 / 1024 + 'kb')
        );
      } else if (err) {
        return next(
          new ApiError(422, err + " ")
        );
      }
      if(req.file){
        req.body.image_name = req.file.filename;
      }
      req.body.teacher_id = await req.user._id;

    const question_quizService = new Question_quizService(MongoDB.client);
    const document = await question_quizService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400,"Conact not found"));
    }
    return res.send({message: "Question_quiz was updated successfully"});

  });
  } catch(error){
    return next( new ApiError(500,`Error updating question_quiz with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const question_quizService = new Question_quizService(MongoDB.client);
    const document = await question_quizService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "Question_quiz was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete question_quiz with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try{
    const question_quizService = new Question_quizService(MongoDB.client);
    const deletedCount = await question_quizService.deleteAll();
    return res.send({message:  `${deletedCount}Question_quiz was delete successfully`});
  } catch(error){
    return next( new ApiError(500,"An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res , next) => {
  try{
    const question_quizService = new Question_quizService(MongoDB.client);
    const documents = await question_quizService.findFavorite();
    return res.send(documents);
  } catch(error){
    return next( new ApiError(500," An occurred while retrieving favorite question_quizs" ));
  }
};

exports.create = async (req, res, next) => {
  // if (!req.body?.question_quiz_title) {
  //   return next(new ApiError(400, "Name can not be empty 11!!!"));
  // }
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return next(
          new ApiError(422, 'size file limits ' + 200000 / 1024 + 'kb')
        );
      } else if (err) {
        return next(
          new ApiError(422, err + " ")
        );
      }
      if(req.file){
        req.body.image_name = req.file.filename;
      }
      req.body.teacher_id = await req.user._id;
   
    const question_quizService = new Question_quizService(MongoDB.client);
    const document = await question_quizService.create(req.body);
    return res.send(document);
  });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the question_quiz")
    );
  }
};
