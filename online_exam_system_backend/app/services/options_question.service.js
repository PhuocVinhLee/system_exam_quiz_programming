const { ObjectId } = require("mongodb");
class OptionsService {
  constructor(client) {
    this.Options = client.db().collection("options");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
    const options = {
      option_title: payload.option_title,
      option_number: payload.option_number,
      question_id: payload.question_id,
    };
    // Remove undefined fields
    Object.keys(options).forEach(
      (key) => options[key] === undefined && delete options[key]
    );
    return options;
  }
  async create(payload) {
    const options = this.extractConactData(payload);
    const result = await this.Options.insertOne(
      options
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Options.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Options.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Options.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Options.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Options.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = OptionsService;
