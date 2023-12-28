const { ObjectId } = require("mongodb");
class Level_questionService {
  constructor(client) {
    this.Level_question = client.db().collection("level_questions");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    
    const level_question = {
      level_question: payload.level_question,
    };
    // Remove undefined fields
    Object.keys(level_question).forEach(
      (key) => level_question[key] === undefined && delete level_question[key]
    );
    return level_question;
  }
  async create(payload) {
    const level_question = this.extractConactData(payload);
    const result = await this.Level_question.findOneAndUpdate(
      level_question,
      { $set: { favorite: level_question.favorite === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Level_question.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Level_question.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Level_question.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Level_question.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Level_question.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = Level_questionService;
