const { ObjectId } = require("mongodb");
class List_exam_questionService {
  constructor(client) {
    this.List_exam_question = client.db().collection("list_exam_questions");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    payload.exam_id = ObjectId.isValid(payload.exam_id) ? new ObjectId(payload.exam_id) : null
    //payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
   // console.log(payload.exam_id)
    const list_exam_question = {
      list_question : payload.list_question
    };
    // Remove undefined fields
    Object.keys(list_exam_question).forEach(
      (key) => list_exam_question[key] === undefined && delete list_exam_question[key]
    );
    return list_exam_question;
  }
  async create(payload) {
    const list_exam_question = this.extractConactData(payload);
    console.log(list_exam_question)
    const result = await this.List_exam_question.findOneAndUpdate(
      { _id : payload.exam_id },
      { $set: list_exam_question },
      {  upsert:true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.List_exam_question.find(filter);
    return await cursor.toArray();
  }

  async findById(id) {
    return await this.List_exam_question.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }



  async delete(id) {
    const result = await this.List_exam_question.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }
}
module.exports = List_exam_questionService;
