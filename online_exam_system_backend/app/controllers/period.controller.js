const ApiError = require("../api-error");
//const { param } = require("../routes/period.route");
const PeriodService = require("../services//period.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const periodService = new PeriodService(MongoDB.client);
    const name = req.query.name;// == 
    console.log(name);
    if (name) {
      documents = await periodService.findByName(name);// name = red.query.name
    }
    else {
      documents = await periodService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving periods"));
  }

  return res.send(documents);

};

exports.findOne = async (req, res, next) => {
  try {
    const periodService = new PeriodService(MongoDB.client);
    const document = await periodService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(400, "period not found finone"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving period witd id = ${req.params.id}`));
  }
};
exports.findOneByIdTeacher = async (req, res, next) => {
  try {
    const id_teacher = await req.user._id;
    const periodService = new PeriodService(MongoDB.client);
    const document = await periodService.findByIdAndIdTeacher(req.params.id, id_teacher);
    if (!document) {
      return next(new ApiError(400, "period not found finone"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving period witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const periodService = new PeriodService(MongoDB.client);
    const document = await periodService.update(req.params.id, req.body);

    return res.send(document);

  } catch (error) {
    console.log(error)
    //return res.send(error);
    return next(new ApiError(500, `Error updating period with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const periodService = new PeriodService(MongoDB.client);
    console.log(req.params);
    const document = await periodService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "period not found"));
    }
    return res.send({ message: "period was delete successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete period with id=${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  if (0) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const periodService = new PeriodService(MongoDB.client);
    console.log("dosdifj");
    const document = await periodService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the period")
    );
  }
};
