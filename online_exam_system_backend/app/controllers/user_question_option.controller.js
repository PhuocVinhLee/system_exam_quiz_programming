const ApiError = require("../api-error");
//const { param } = require("../routes/user_question_option.route");
const User_question_optionService = require("../services//user_question_option.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    const { name } = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if (name) {
      documents = await user_question_optionService.findByName(name);// name = red.query.name
    }
    else {
      documents = await user_question_optionService.find({});


    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving user_question_options"));
  }

  return res.send(documents);

};

exports.findOne = async (req, res, next) => {
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    const document = await user_question_optionService.findById(req.body);
    if (!document) {
      return next(new ApiError(400, "User_question_option not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving user_question_option witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    const document = await user_question_optionService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(400, "Conact not found"));
    }
    return res.send({ message: "User_question_option was updated successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error updating user_question_option with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    const document = await user_question_optionService.delete(req.body);
    if (!document) {
      return next(new ApiError(404, "Conact not found"));
    }
    return res.send({ message: "User_question_option was delete successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete user_question_option with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    const deletedCount = await user_question_optionService.deleteAll();
    return res.send({ message: `${deletedCount}User_question_option was delete successfully` });
  } catch (error) {
    return next(new ApiError(500, "An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    const documents = await user_question_optionService.create(req.body);
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, " An occurred while retrieving favorite user_question_options"));
  }
};

exports.create = async (req, res, next) => {
  try {
    const user_question_optionService = new User_question_optionService(MongoDB.client);
    let documents = false;
    documents = await user_question_optionService.findById(req.body);
    if (documents) {// tim co tai lieu
      documents = await user_question_optionService.update_arr(req.body);// kt xem co trong csdl hay k
      if (documents) {
        return res.send(documents);
      } else {
        documents = await user_question_optionService.create_arr(req.body);
        return res.send(documents);
      }
    }
    else {
      documents = await user_question_optionService.create(req.body);
      return res.send(documents);
    }

  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the user_question_option")
    );
  }
};
