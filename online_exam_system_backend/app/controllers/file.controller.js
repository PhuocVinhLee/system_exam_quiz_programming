const ApiError = require("../api-error");
//const { param } = require("../routes/file.route");
const FileService = require("../services/file.service");
const MongoDB = require("../utils/mongodb.util")
const multer = require('multer')


exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const fileService = new FileService(MongoDB.client);
        const name = req.query.name;// == 
        const page = req.query.page;
        const period_id = req.query.id
        // const period_id = {
        //  period_id: req.query.id
        // }

        if (name) {
            // documents = await fileService.findByName(name);// name = red.query.name
        }
        else {
            // console.log({period_id})
            documents = await fileService.find(period_id, page);
        }
    } catch (error) {
        return next(new ApiError(500, "An erro occurred while retrieving files"));
    }

    return res.send(documents);

};

exports.findOne = async (req, res, next) => {
    try {
        const fileService = new FileService(MongoDB.client);
        const document = await fileService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "file not found finone"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Erro retrieving file witd id = ${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const fileService = new FileService(MongoDB.client);
        const document = await fileService.update(req.params.id, req.body);
        console.log(req.body)
        if (!document) {
            return res.send(document);
        }

        return res.send(document);

    } catch (error) {
        return next(new ApiError(500, `Error updating file with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const fileService = new FileService(MongoDB.client);
        console.log(req.params);
        const document = await fileService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "file not found"));
        }
        return res.send({ message: "file was delete successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error delete file with id=${req.params.id}`));
    }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("file ne", file);
        const allowedType = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
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

exports.create = async (req, res, next) => {

    try {

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return next(
                    new ApiError(422, 'size file limits ' + 700000 / 1024 + 'kb')
                );
            } else if (err) {
                return next(
                    new ApiError(422, err + " ")
                );
            }

            const fileService = new FileService(MongoDB.client);

            const document = await fileService.create(req.body, req.file.filename);

            return res.send(document);
        })



    } catch (error) {
        return res.send(error)
    }

}


exports.create_arr = async (req, res, next) => {

    try {
        console.log("mullter e")
       
        upload_arr(req, res, async function (err) {
            
            if (err instanceof multer.MulterError) {
                return next(
                    new ApiError(422, 'size file limits ' + 700000 / 1024 + 'kb')
                );
            } else if (err) {
                return next(
                    new ApiError(422, err + " ")
                );
            }
            console.log(req.body);
            const fileService = new FileService(MongoDB.client);
            const list_files_name = req.files.map((file) => {
                return { filename: file.filename };
            })
            if(list_files_name[0]){
                console.log("body",req.body.files_title)
                const document = await fileService.create_arr(list_files_name);
                return res.send(document);
            }
            return next(new ApiError(500, `Error add file `));
           
        })



    } catch (error) {
        return res.send(error)
    }
};
