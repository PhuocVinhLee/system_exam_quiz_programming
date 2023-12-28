const ApiError = require("../api-error");
//const { param } = require("../routes/subject.route");
const SubjectService = require("../services//subject.service");
const MongoDB = require("../utils/mongodb.util")
const PeriodService = require("../services//period.service");


exports.findAllTeacher = async (req, res, next) => {
  let documents = [];
  try {

    const teacher_id = await req.user._id;// lay id teacher tu token
    const subjectService = new SubjectService(MongoDB.client);
   
        documents = await subjectService.find(teacher_id);
       

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving subjects"));
  }

  return res.send(documents);

};
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const subjectService = new SubjectService(MongoDB.client);
    const { name } = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if (name) {
      documents = await subjectService.findByName(name);// name = red.query.name
    }
    else {
      documents = await subjectService.find1({});


    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving subjects"));
  }

  return res.send(documents);

};

exports.findOne = async (req, res, next) => {
  try {
    const subjectService = new SubjectService(MongoDB.client);
    const document = await subjectService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Subject not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving subject witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const subjectService = new SubjectService(MongoDB.client);
    const document = await subjectService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(400, "Conact not found"));
    }
    return res.send({ message: "Subject was updated successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error updating subject with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const subjectService = new SubjectService(MongoDB.client);
    const document = await subjectService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Conact not found"));
    }
    return res.send({ message: "Subject was delete successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete subject with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const subjectService = new SubjectService(MongoDB.client);
    const deletedCount = await subjectService.deleteAll();
    return res.send({ message: `${deletedCount}Subject was delete successfully` });
  } catch (error) {
    return next(new ApiError(500, "An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const subjectService = new SubjectService(MongoDB.client);
    const documents = await subjectService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, " An occurred while retrieving favorite subjects"));
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.subject_title) {
    return next(new ApiError(400, "subject title can not be empty 11!!!"));
  }
  try {
    const subjectService = new SubjectService(MongoDB.client);
    console.log(req.body.email);
    const document = await subjectService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the subject")
    );
  }
};
