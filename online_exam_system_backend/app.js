const express = require("express");// fw
const cookieParser = require('cookie-parser');
const contactsRouter = require("./app/routes/contact.route");
const examsRouter = require("./app/routes/exam_quiz.route");
const exam_submit_codeRouter = require("./app/routes/exam_submit_code.route");
const subjectRouter = require("./app/routes/subject.route");
const study_classRouter = require("./app/routes/study_class.route");
const level_questionRouter = require("./app/routes/level_question.route");
const options_questionRouter = require("./app/routes/options_question.route");
const questionRouter = require("./app/routes/question.route");
const list_exam_questionRouter = require("./app/routes/list_exam_question.route");
const user_question_optionRouter = require("./app/routes/user_question_option.route");
const question_submit_code = require("./app/routes/question_submit_code.route");
const question_submit_code_bank = require("./app/routes/question_submit_code_bank.route");
const question_quiz= require("./app/routes/question_quiz.route");
const question_quiz_bank = require("./app/routes/question_quiz_bank.route");
const compile = require("./app/routes/compile.route");
const period = require("./app/routes/period.route");
const type_question_submit_code = require("./app/routes/type_question_submit_code.route");
const topic = require("./app/routes/topic.route");
const student = require("./app/routes/student.route");
const teacher = require("./app/routes/teacher.route");

const result_exam_quiz = require("./app/routes/result_exam_quiz.route");
const file = require("./app/routes/file.route");

const result_exam_submit_code = require("./app/routes/result_exam_submit_code.route");
const compiler = require("compilex");
const options = { status: true }
compiler.init(options)

const multer = require('multer');


const userRouter = require("./app/routes/user.route");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/files",express.static('file'));

app.use("/api/file", file);

app.use("/api/result_exam_quizs", result_exam_quiz);
app.use("/api/result_exam_submit_code", result_exam_submit_code);
app.use("/api/student", student);
app.use("/api/teacher", teacher);
app.use("/api/exam_quizs", examsRouter);
app.use("/api/exam_submit_codes", exam_submit_codeRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/study_class", study_classRouter);

app.use("/api/compile", compile);
app.use("/api/periods", period);

app.use("/api/question_submit_code", question_submit_code);
app.use("/api/question_submit_code_bank", question_submit_code_bank);

app.use("/api/question_quiz", question_quiz);
app.use("/api/question_quiz_bank", question_quiz_bank);
app.use("/api/list_exam_question", list_exam_questionRouter);
app.use("/api/type_question_submit_code", type_question_submit_code);

app.use("/option", options_questionRouter);
app.use("/level", level_questionRouter);
app.use("/question", questionRouter);

app.use("/user_question_option", user_question_optionRouter);

app.use("/api/topics", topic);

app.use("/contacts", contactsRouter);
app.use("/api/user", userRouter);


// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found app"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to conntact book application." });
});
//app.use("/api/contacts", contactsRouter);

module.exports = app;