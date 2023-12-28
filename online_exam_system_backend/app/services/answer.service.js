const { ObjectId } = require("mongodb");
class AnswersService {
  constructor(client) {
    this.Answers = client.db().collection("answers");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData_create(payload) {
    payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
    const answers = {
      input: payload.input,
      ouput: payload.ouput,
    };
    // Remove undefined fields
    Object.keys(answers).forEach(
      (key) => answers[key] === undefined && delete answers[key]
    );
    return answers;
  }
  async create(payload) {
    const answers = this.extractConactData_create(payload);
    const result = await this.Answers.insertOne(
      answers
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Answers.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $answers: "i" },
    });
  }

  async findById(id) {
    return await this.Answers.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Answers.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Answers.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Answers.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = AnswersService;
