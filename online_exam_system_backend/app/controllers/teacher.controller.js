const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TeacherService = require("../services/teacher.service");
const MongoDB = require("../utils/mongodb.util")
const multer = require('multer')





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


exports.update = async (req, res, next) => {

  try {
console.log("bodu ne",req.body)
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
      try {
        const teacherService = new TeacherService(MongoDB.client);

        const teacher_id = await req.user._id;
        let document;
        if (req.file) {
          req.body.avatar = req.file.filename;
           document = await teacherService.update(teacher_id, req.body);
        } else {
           document = await teacherService.update(teacher_id, req.body);
        }

        return res.send(document);
      } catch (error) {
        return next(new ApiError(500, `Error updating teacher `));
      }
    })


  } catch (error) {
    return next(new ApiError(500, `Error updating teacher `));
  }
};

exports.registerTeacher = async (req, res, next) => {
  if (!req.body?.email) {
    return next(new ApiError(400, "Email can not be empty !!!"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty !!!"));
  }
  try {
    const teacherService = new TeacherService(MongoDB.client);
    const document = await teacherService.createTeacher(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the teacher111")
    );
  }
};

exports.loginTeacher = async (req, res, next) => {
console.log("body ne", req.body)
  try {

    const teacherService = new TeacherService(MongoDB.client);
    const teacher_id = req.body.teacher_id;
    const password = req.body.password;
    console.log(req.body)
    if (!teacher_id || !password) {
      return next(new ApiError(404, "MSCB1 và Password không được rỗng"));
    }
    const documents = await teacherService.findByTeacherId(teacher_id);
    console.log(documents);
    if (!documents) {
      return res.json({ message: "Tài khoản này không tồn tại" });

    } else if (! await bcrypt.compare(password, documents.password)) {
      return res.json({ message: "Mat khau khong chinh xac" });
    } else {
      const token = jwt.sign({ _id: documents._id }, "secret");

      res.cookie('jwt', token, { httpOnly: false, maxAge: 24 * 60 * 6 * 1000 });// cookie tu dong luu tren client

      return res.json({ token: token, documents: documents });
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving teacher"));
  }
};


exports.create = async (req, res, next) => {
  if (!req.body?.email) {
    return next(new ApiError(400, "Email can not be empty !!!"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty !!!"));
  }
  try {
    const teacherService = new TeacherService(MongoDB.client);
    const document = await teacherService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the teacher111")
    );
  }
};

exports.findTeacher = async (req, res, next) => {
  try {
    const teacherService = new TeacherService(MongoDB.client);

    const documents = await teacherService.findTeacher(req.query.data);

    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while finde teacher"));
  }
};
// exports.findTeacher = async (req, res, next) => {
//   try {
//     console.log("hfslfh");
//     const teacherService = new TeacherService(MongoDB.client);
//     console.log("hfslfh");
//     const email = req.body.email;
//     console.log("444444");
//     console.log(email);
//     const password = req.body.password;
//     console.log(password);
//     if (!email || !password) {
//       return next(new ApiError(404, "Email và Password không được rỗng"));
//     }
//     const documents = await teacherService.findByEmail(email);
//     if (!documents) {
//       return res.json({message:"Teacher khong ton tai"});
//     } else if (!await bcrypt.compare(password, documents.password)) {
//       return res.json({message:"Mat khau khong chinh xac"});
//     } else {
//       const token = jwt.sign({ _id: documents._id }, "secret");
//       res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 6 * 1000 })
//       return res.json({token: token,documents: documents}) ;
//     }
//   } catch (error) {
//     return next(new ApiError(500, "An erro occurred while retrieving teacher"));
//   }
// };

exports.cookie = async (req, res, next) => {
  try {
    const teacherService = new TeacherService(MongoDB.client);
    const cookie = await req.cookies['jwt'];
    const clains = jwt.verify(cookie, 'secret');
    if (!clains) {
      return next(new ApiError(400, "An erro occurred while retrieving clains"));
    }
    console.log(clains._id);
    const teacher = await teacherService.findById(clains._id);
    console.log(clains._id);
    return res.send(teacher);

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving cookie"));
  }

};

exports.logout = async (req, res, next) => {
  try {
    const logout = await res.cookie('jwt', { maxAge: 0 });

    return res.send("susecfully");

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while logout teacher"));
  }

};

exports.findEmail = async (req, res, next) => {
  let documents = [];
  try {
    const teacherService = new TeacherService(MongoDB.client);

    const email = req.body.email;
    console.log(email);
    documents = await teacherService.findByEmail(email);
    console.log(documents);
    if (!documents) {
      return next(new ApiError(400, "teacher not found"));
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving teacher"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const teacherService = new TeacherService(MongoDB.client);
    const document = await teacherService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Topic not founda"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving topic witd id = ${req.params.id}`));
  }
};
exports.findOneAccount = async (req, res, next) => {
  try {
    const teacherService = new TeacherService(MongoDB.client);
    const teacher_id = await req.user._id;
    const document = await teacherService.findById(teacher_id);
    if (!document) {
      return next(new ApiError(400, "teacher not founda"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving teacher witd id = ${teacher_id}`));
  }
};
