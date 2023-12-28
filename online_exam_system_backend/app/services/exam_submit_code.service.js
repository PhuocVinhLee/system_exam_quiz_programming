const { ObjectId } = require("mongodb");
class Exam_submit_codeService {
  constructor(client) {
    this.Exam_submit_code = client.db().collection("exam_submit_codes");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    console.log(payload.teacher_id)
    console.log("okedsadasd")
    payload.teacher_id = ObjectId.isValid(payload.teacher_id) ? new ObjectId(payload.teacher_id) : null
    payload.period_id = ObjectId.isValid(payload.period_id) ? new ObjectId(payload.period_id) : null
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null

    console.log(payload.teacher_id)
    // payload.lang = (payload.exam_submit_code_type == "submitcode") ? payload.lang : undefined;
    const exam_submit_code = {
      exam_submit_code_title: payload.exam_submit_code_title,
      exam_submit_code_status: payload.exam_submit_code_status,
      exam_submit_code_datetime_start: payload.exam_submit_code_datetime_start,
      exam_submit_code_datetime_end: payload.exam_submit_code_datetime_end,
      exam_submit_code_duration: payload.exam_submit_code_duration,
      total_question: payload.total_question,
      max_marks: payload.max_marks,
      max_percent_marks: payload.max_percent_marks,
      teacher_id: payload.teacher_id,
      // subject_id: payload.subject_id,
      study_class_id: payload.study_class_id,
      // exam_submit_code_type: payload.exam_submit_code_type,
      exam_submit_code_wait: payload.exam_submit_code_wait,
      // lang:  payload.lang,
      period_id: payload.period_id,
      password: payload.password,
      question_id: payload.question_id,
      number_attempts: payload.number_attempts,
      list_question: payload.list_question
    };
    // Remove undefined fields
    Object.keys(exam_submit_code).forEach(
      (key) => exam_submit_code[key] === undefined && delete exam_submit_code[key]// delete elements undefinded
    );
    return exam_submit_code;
  }
  async create_arr(id_exam, payload) {// update
    console.log(payload);
    const data = this.extractConactData(payload);
    console.log(data)
    const filter = {
      _id: ObjectId.isValid(id_exam) ? new ObjectId(id_exam) : null,// id study_class
    };

    const result = await this.Exam_submit_code.findOneAndUpdate(
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
    const exam_submit_code = this.extractConactData(payload);
    const data = await this.Exam_submit_code.insertOne(exam_submit_code);
    const length_clt = await this.Exam_submit_code.countDocuments({});/// count thep ky thi
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
    const litmit = 9;// so luong exam_submit_code trong mot trang
    const number_skip = (number_page - 1) * litmit;// so luong exam_submit_code se bo qua
    const data = await this.Exam_submit_code.find(filter).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
    const length_clt = await this.Exam_submit_code.countDocuments(filter);

    const result = {
      data,
      length_clt

    }
    console.log(result)

    return result;// 
  }

  async findByName(name) {
    return await this.find({
      exam_submit_code_title: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Exam_submit_code.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Exam_submit_code.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Exam_submit_code.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }


}
module.exports = Exam_submit_codeService;
