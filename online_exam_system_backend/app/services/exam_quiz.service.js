const { ObjectId } = require("mongodb");
class Exam_quizService {
  constructor(client) {
    this.Exam_quiz = client.db().collection("exam_quizs");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    console.log(payload.teacher_id)
    console.log("okedsadasd")
    payload.teacher_id = ObjectId.isValid(payload.teacher_id) ? new ObjectId(payload.teacher_id) : null
    payload.period_id = ObjectId.isValid(payload.period_id) ? new ObjectId(payload.period_id) : null
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    //payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null

    console.log(payload.teacher_id)
    // payload.lang = (payload.exam_quiz_type == "submitcode") ? payload.lang : undefined;
    const exam_quiz = {
      exam_quiz_title: payload.exam_quiz_title,
      exam_quiz_status: payload.exam_quiz_status,
      exam_quiz_datetime_start: payload.exam_quiz_datetime_start,
      exam_quiz_datetime_end: payload.exam_quiz_datetime_end,
      exam_quiz_duration: payload.exam_quiz_duration,
      total_question: payload.total_question,
      max_marks: payload.max_marks,
      max_percent_marks: payload.max_percent_marks,
      teacher_id: payload.teacher_id,
      // subject_id: payload.subject_id,
      study_class_id: payload.study_class_id,
      // exam_quiz_type: payload.exam_quiz_type,
      exam_quiz_wait: payload.exam_quiz_wait,
      list_question: payload.list_question,
      // lang:  payload.lang,
      period_id: payload.period_id,
      password: payload.password,
      question_id: payload.question_id,
      number_attempts: payload.number_attempts,
      list_question: payload.list_question
    };
    // Remove undefined fields
    Object.keys(exam_quiz).forEach(
      (key) => exam_quiz[key] === undefined && delete exam_quiz[key]// delete elements undefinded
    );
    return exam_quiz;
  }
  async create_arr(id_exam, payload) {// update
    console.log(payload);
    const data = this.extractConactData(payload);
    console.log(data)
    const filter = {
      _id: ObjectId.isValid(id_exam) ? new ObjectId(id_exam) : null,// id study_class
    };

    const result = await this.Exam_quiz.findOneAndUpdate(
      filter,
      {
        $addToSet: {
          list_question: data.question_id
        }
      },
    );
    return result;
  }

  async create(payload) {
    const exam_quiz = this.extractConactData(payload);
    const data = await this.Exam_quiz.insertOne(exam_quiz);
    const length_clt = await this.Exam_quiz.countDocuments({});/// count thep ky thi
    const result = {
      data,
      length_clt

    }
    return result;
  }

  async find(id, page) {// doi tuong filter
    const filter = {
      period_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    var number_page = 1;// trang hien tai
    if (page != 0) {
      number_page = parseInt(page);
    }
    const litmit = 9;// so luong exam_quiz trong mot trang
    const number_skip = (number_page - 1) * litmit;// so luong exam_quiz se bo qua
    const data = await this.Exam_quiz.find(filter).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
    const length_clt = await this.Exam_quiz.countDocuments(filter);

    const result = {
      data,
      length_clt

    }
    console.log(result)

    return result;// 
  }

  async findByName(name) {
    return await this.find({
      exam_quiz_title: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Exam_quiz.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    console.log("neeee")
    console.log(update)
    const result = await this.Exam_quiz.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Exam_quiz.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }


}
module.exports = Exam_quizService;
