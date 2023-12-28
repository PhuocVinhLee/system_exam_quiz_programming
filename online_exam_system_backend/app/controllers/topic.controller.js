const ApiError = require("../api-error");
//const { param } = require("../routes/topic.route");
const TopicService = require("../services//topic.service");
const MongoDB = require("../utils/mongodb.util")


exports.create_arr = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data  can not be empty"));
  }
  try {
    const topicService = new TopicService(MongoDB.client);

    const document = await topicService.create_arr(req.query.id, req.body);
    console.log(req.body);
    console.log("lksablkcb")
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the  active in topic")
    );
  }
};

exports.update_arr = async (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const topicService = new TopicService(MongoDB.client);
    const document = await topicService.update_arr(req.query.id, req.params.id, req.body);// id topic, id active
    if (!document) {
      return next(new ApiError(400, "topic not found"));
    }

    return res.send(document);

  } catch (error) {
    return next(new ApiError(500, `Error updating topic with id=${req.params.id}`));
  }
};
exports.delete_arr = async (req, res, next) => {
  try {
    const topicService = new TopicService(MongoDB.client);
    const document = await topicService.delete_arr(req.query.id, req.params.id);
    if (!document) {
      return next(new ApiError(404, "Conact not found"));
    }
    return res.send({ message: "Topic was delete successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete  arr topic with id=${req.params.id}`));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const topicService = new TopicService(MongoDB.client);
    const { name } = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if (name) {
      documents = await topicService.findByName(name);// name = red.query.name
    }
    else {

      documents = await topicService.find(req.query.id);


    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving topics"));
  }

  return res.send(documents);

};

exports.findOne = async (req, res, next) => {
  try {
    const topicService = new TopicService(MongoDB.client);
    const document = await topicService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Topic not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving topic witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const topicService = new TopicService(MongoDB.client);
    const document = await topicService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(400, "Conact not found"));
    }
    return res.send({ message: "Topic was updated successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error updating topic with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const topicService = new TopicService(MongoDB.client);
    const document = await topicService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Conact not found"));
    }
    return res.send({ message: "Topic was delete successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete topic with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const topicService = new TopicService(MongoDB.client);
    const deletedCount = await topicService.deleteAll();
    return res.send({ message: `${deletedCount}Topic was delete successfully` });
  } catch (error) {
    return next(new ApiError(500, "An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const topicService = new TopicService(MongoDB.client);
    const documents = await topicService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, " An occurred while retrieving favorite topics"));
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.topic_title) {
    return next(new ApiError(400, "topic title can not be empty 11!!!"));
  }
  try {
    const topicService = new TopicService(MongoDB.client);
    console.log(req.body.email);
    const document = await topicService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the topic")
    );
  }
};
