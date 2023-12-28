const { flush } = require("compilex");
const { ObjectId } = require("mongodb");
class Question_quizService {
  constructor(client) {
    this.Question_quiz = client.db().collection("question_quizs");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  async extractConactData(payload) {
    //payload.level_id = ObjectId.isValid(payload.level_id) ? new ObjectId(payload.level_id) : null
    payload.subject_id = ObjectId.isValid(payload.subject_id) ? new ObjectId(payload.subject_id) : null
    payload.type_id = ObjectId.isValid(payload.type_id) ? new ObjectId(payload.type_id) : null
    payload.teacher_id = ObjectId.isValid(payload.teacher_id) ? new ObjectId(payload.teacher_id) : null
    const question_quiz = {
      question_quiz_title: payload.question_quiz_title,
      question_quiz_describe: payload.question_quiz_describe,
      question_quiz_level: payload.question_quiz_level,
      lang: payload.lang,
      subject_id: payload.subject_id,
      teacher_id: payload.teacher_id,
      question_quiz_img: payload.question_quiz_img,
      //type_id: payload.type_id,
      study_class_id: payload.study_class_id,
      answer: payload.answer , //list obj
      right_answer: payload.right_answer,
      question_quiz_type: payload.question_quiz_type,
      image_name: payload.image_name
    };
    // Remove undefined fields
    Object.keys(question_quiz).forEach(
      (key) => question_quiz[key] === undefined && delete question_quiz[key]
    );
    return question_quiz;
  }
  async update(id, payload) {
    const user_question_option = await this.extractConactData(payload);

    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const result = await this.Question_quiz.findOneAndUpdate(
      filter,
      {
        $set: user_question_option
      },
      { returnDocument: "after" }
    );
    return result.value;// return ve 200 neu doc ton tai else return false
  }

  async update1(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractConactData(payload);
    console.log(filter)
    console.log("one")
    console.log(update)
    const result = await this.Question_quiz.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async create(payload) {
    const filter = {
      subject_id: ObjectId.isValid(payload.subject_id) ? new ObjectId(payload.subject_id) : null,
    };
    const question_quiz = await this.extractConactData(payload);

    const data = await this.Question_quiz.insertOne(question_quiz);
    const length_clt = await this.Question_quiz.countDocuments(filter);
    const result = {
      data,
      length_clt

    }
    return  result;

    // const result = await this.Question_quiz.insertOne(
    //   question_quiz,
    // );
    // return result;
  }



  async findbyTeacher(id_subject, id_teacher, page) {
    // const cursor = await this.Question_quiz.find(filter);
    const filter1 = {
      subject_id: ObjectId.isValid(id_subject) ? new ObjectId(id_subject) : null,
    };
    const filter2 = {
      teacher_id: ObjectId.isValid(id_teacher) ? new ObjectId(id_teacher) : null,
    };
    const filter3 = {
      type: 'public'
    }
  
    var number_page = 1 ;// trang hien tai
    if (page != 0) {
      number_page = parseInt(page);
    }
    const litmit = 9;// so luong exam_submit_code trong mot trang
    const number_skip = (number_page - 1) * litmit;// so luong exam_submit_code se bo qua//{ $or: [filter3, { $and: [filter1, filter2] }] }
    const data = await await this.Question_quiz.find( { $or: [{$and:[ filter1, filter3]} ,{$and:[ filter1, filter2]} ]} ).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
    const length_clt = await this.Question_quiz.countDocuments({ $or: [{$and:[ filter1, filter3]} ,{$and:[ filter1, filter2]} ]});
  
    const result = {
      data,
      length_clt

    }

    return result;
  }
  async find(id, page) {
    // const cursor = await this.Question_quiz.find(filter);
    const filter1 = {
      subject_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    console.log(filter1);
    const filter2 = {
      type: "public",
    };
    var number_page = 1 ;// trang hien tai
    if (page != 0) {
      number_page = parseInt(page);
    }
    const litmit = 9;// so luong exam_submit_code trong mot trang
    const number_skip = (number_page - 1) * litmit;// so luong exam_submit_code se bo qua
    const data = await await this.Question_quiz.find({$and:[filter1, filter2]}).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
    const length_clt = await this.Question_quiz.countDocuments({$and:[filter1, filter2]});
  
    const result = {
      data,
      length_clt

    }

    return result;
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Question_quiz.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async delete(id) {
    const result = await this.Question_quiz.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Question_quiz.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = Question_quizService;
