const ApiError = require("../api-error");
//const { param } = require("../routes/options.route");
const OptionsService = require("../services//options_question.service");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const optionsService = new OptionsService(MongoDB.client);
    const {name} = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if(name){
      documents = await optionsService.findByName(name);// name = red.query.name
    }
    else{
      documents = await optionsService.find({});

      
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving optionss"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const optionsService = new OptionsService(MongoDB.client);
    const document = await optionsService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "Options not found"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving options witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const optionsService = new OptionsService(MongoDB.client);
    const document = await optionsService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400,"Conact not found"));
    }
    return res.send({message: "Options was updated successfully"});
  } catch(error){
    return next( new ApiError(500,`Error updating options with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const optionsService = new OptionsService(MongoDB.client);
    const document = await optionsService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "Options was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete options with id=${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try{
    const optionsService = new OptionsService(MongoDB.client);
    const deletedCount = await optionsService.deleteAll();
    return res.send({message:  `${deletedCount}Options was delete successfully`});
  } catch(error){
    return next( new ApiError(500,"An Error occurred while removing all contacs"));
  }
};

exports.findAllFavorite = async (req, res , next) => {
  try{
    const optionsService = new OptionsService(MongoDB.client);
    const documents = await optionsService.findFavorite();
    return res.send(documents);
  } catch(error){
    return next( new ApiError(500," An occurred while retrieving favorite optionss" ));
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.option_title) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const optionsService = new OptionsService(MongoDB.client);
    const document = await optionsService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the options")
    );
  }
};
