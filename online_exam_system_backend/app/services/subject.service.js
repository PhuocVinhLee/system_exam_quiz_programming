const { ObjectId } = require("mongodb");
class SubjectService {
  constructor(client) {
    this.Subject = client.db().collection("subjects");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    const subject = {
      subject_title: payload.subject_title,
    };
    // Remove undefined fields
    Object.keys(subject).forEach(
      (key) => subject[key] === undefined && delete subject[key]
    );
    return subject;
  }
  async create(payload) {
    const subject = this.extractConactData(payload);
    const result = await this.Subject.insertOne(
      subject
    );
    return result;
  }

  async find(id_teacher) {
    const teacher_id = {
      teacher_id: ObjectId.isValid(id_teacher) ? new ObjectId(id_teacher) : null,
    }
   
    const cursor = await this.Subject.find({});
    return await cursor.toArray();
  }

  async find1() {
   
    const cursor = await this.Subject.find({});
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Subject.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Subject.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Subject.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Subject.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = SubjectService;
