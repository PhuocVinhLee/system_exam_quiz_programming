const { ObjectId } = require("mongodb");
class QuestionService {
  constructor(client) {
    this.Question = client.db().collection("questions");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    payload.level_id = ObjectId.isValid(payload.level_id) ? new ObjectId(payload.level_id) : null
    payload.subject_id = ObjectId.isValid(payload.subject_id) ? new ObjectId(payload.subject_id) : null
    payload.type_id = ObjectId.isValid(payload.type_id) ? new ObjectId(payload.type_id) : null
    const question = {
      question_title: payload.question_title,
      answer_option: payload.answer_option,
      level_id: payload.level_id,
      subject_id: payload.subject_id,
      question_img: payload.question_img,
      type_id: payload.type_id
    };
    // Remove undefined fields
    Object.keys(question).forEach(
      (key) => question[key] === undefined && delete question[key]
    );
    return question;
  }
  async create(payload) {
    const question = this.extractConactData(payload);
    const result = await this.Question.insertOne(
      question,
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Question.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Question.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Question.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Question.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Question.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = QuestionService;
