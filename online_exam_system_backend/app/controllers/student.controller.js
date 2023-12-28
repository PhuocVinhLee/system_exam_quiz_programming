const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentService = require("../services/student.service");
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
        const studentService = new StudentService(MongoDB.client);

        const student_id = await req.user._id;
        let document;
        if (req.file) {
          req.body.avatar = req.file.filename;
           document = await studentService.update(student_id, req.body);
        } else {
           document = await studentService.update(student_id, req.body);
        }

        return res.send(document);
      } catch (error) {
        return next(new ApiError(500, `Error updating student `));
      }
    })


  } catch (error) {
    return next(new ApiError(500, `Error updating student `));
  }
};

exports.registerStudent = async (req, res, next) => {
  if (!req.body?.email) {
    return next(new ApiError(400, "Email can not be empty !!!"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty !!!"));
  }
  try {
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.createStudent(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the student111")
    );
  }
};

exports.loginStudent = async (req, res, next) => {
console.log("body ne", req.body)
  try {

    const studentService = new StudentService(MongoDB.client);
    const student_id = req.body.student_id;
    const password = req.body.password;
    console.log(req.body)
    if (!student_id || !password) {
      return next(new ApiError(404, "MSSV và Password không được rỗng"));
    }
    const documents = await studentService.findByStudentId(student_id);
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
    return next(new ApiError(500, "An erro occurred while retrieving student"));
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
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the student111")
    );
  }
};

exports.findStudent = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);

    const documents = await studentService.findStudent(req.query.data);

    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while finde student"));
  }
};
// exports.findStudent = async (req, res, next) => {
//   try {
//     console.log("hfslfh");
//     const studentService = new StudentService(MongoDB.client);
//     console.log("hfslfh");
//     const email = req.body.email;
//     console.log("444444");
//     console.log(email);
//     const password = req.body.password;
//     console.log(password);
//     if (!email || !password) {
//       return next(new ApiError(404, "Email và Password không được rỗng"));
//     }
//     const documents = await studentService.findByEmail(email);
//     if (!documents) {
//       return res.json({message:"Student khong ton tai"});
//     } else if (!await bcrypt.compare(password, documents.password)) {
//       return res.json({message:"Mat khau khong chinh xac"});
//     } else {
//       const token = jwt.sign({ _id: documents._id }, "secret");
//       res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 6 * 1000 })
//       return res.json({token: token,documents: documents}) ;
//     }
//   } catch (error) {
//     return next(new ApiError(500, "An erro occurred while retrieving student"));
//   }
// };

exports.cookie = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const cookie = await req.cookies['jwt'];
    const clains = jwt.verify(cookie, 'secret');
    if (!clains) {
      return next(new ApiError(400, "An erro occurred while retrieving clains"));
    }
    console.log(clains._id);
    const student = await studentService.findById(clains._id);
    console.log(clains._id);
    return res.send(student);

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving cookie"));
  }

};

exports.logout = async (req, res, next) => {
  try {
    const logout = await res.cookie('jwt', { maxAge: 0 });

    return res.send("susecfully");

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while logout student"));
  }

};

exports.findEmail = async (req, res, next) => {
  let documents = [];
  try {
    const studentService = new StudentService(MongoDB.client);

    const email = req.body.email;
    console.log(email);
    documents = await studentService.findByEmail(email);
    console.log(documents);
    if (!documents) {
      return next(new ApiError(400, "student not found"));
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving student"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Student not founda"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving tudent witd id = ${req.params.id}`));
  }
};
exports.findOneAccount = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const student_id = await req.user._id;
    const document = await studentService.findById(student_id);
    if (!document) {
      return next(new ApiError(400, "student not founda"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Erro retrieving student witd id = ${student_id}`));
  }
};
