const ApiError = require("../api-error");
//const { param } = require("../routes/question_submit_code_bank.route");
const Question_submit_code_bankService = require("../services//question_submit_code_bank.service");
const MongoDB = require("../utils/mongodb.util")

exports.create_arr = async (req, res, next) => {

  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);

    req.body.teacher_id = await req.user._id;
    const document = await question_submit_code_bankService.create_arr(req.params.id, req.body);/// id study_class
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the arr question_bank")
    );
  }
};

exports.create_arr_teacher_id = async (req, res, next) => {

  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);

    req.body.teacher_id = await req.user._id;
    const document = await question_submit_code_bankService.create_arr_teacher_id(req.params.id, req.body);/// id study_class
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the arr question_bank")
    );
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const page = req.query.page;
    const subject_id = req.query.id
    const type = req.query.type;
    console.log("qerryyy")
    console.log(req.query);
    const teacher_id = await req.user._id;

    documents = await question_submit_code_bankService.find(subject_id, teacher_id, type, page);

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving question_submit_code_banks"));
  }

  return res.send(documents);

};
exports.findAllFormTeacherId = async (req, res, next) => {
  let documents = [];
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const subject_id = req.query.subject_id;
    const teacher_id = await req.user._id;
    documents = await question_submit_code_bankService.find(subject_id, teacher_id);

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving question_submit_code_banks"));
  }

  return res.send(documents);

};

exports.findOne = async (req, res, next) => {
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const document = await question_submit_code_bankService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Question_submit_code_bank not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving question_submit_code_bank witd id = ${req.params.id}`));
  }
};

exports.findByTeacherId = async (req, res, next) => {
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const document = await question_submit_code_bankService.findByTeacherId(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Question_submit_code_bank not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving question_submit_code_bank witd id = ${req.params.id}`));
  }
};
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const document = await question_submit_code_bankService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(400, "Conact not found"));
    }
    return res.send({ message: "Question_submit_code_bank was updated successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error updating question_submit_code_bank with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const document = await question_submit_code_bankService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Conact not found"));
    }
    return res.send({ message: "Question_submit_code_bank was delete successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete question_submit_code_bank with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const deletedCount = await question_submit_code_bankService.deleteAll();
    return res.send({ message: `${deletedCount}Question_submit_code_bank was delete successfully` });
  } catch (error) {
    return next(new ApiError(500, "An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    const documents = await question_submit_code_bankService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, " An occurred while retrieving favorite question_submit_code_banks"));
  }
};

exports.create = async (req, res, next) => {
  // if (!req.body?.question_submit_code_bank_title) {
  //   return next(new ApiError(400, "Name can not be empty 11!!!"));
  // }
  try {
    const question_submit_code_bankService = new Question_submit_code_bankService(MongoDB.client);
    req.body.teacher_id = await req.user._id;
    const document = await question_submit_code_bankService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the question_submit_code_bank")
    );
  }
};
