const { ObjectId } = require("mongodb");
class TopicService {
  constructor(client) {
    this.Topic = client.db().collection("topics");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    const topic = {
      topic_title: payload.topic_title,
      study_class_id: payload.study_class_id,
      topic_describe: payload.topic_describe,
      list_active: payload.list_active// obj
      // list_exam: payload.list_exam,
      // list_document: payload.list_document,
      // list_notification: payload.list_notification,
      // list_exercise: payload.list_exercise
    };
    // Remove undefined fields
    Object.keys(topic).forEach(
      (key) => topic[key] === undefined && delete topic[key]
    );
    return topic;
  }

  async create_arr(topic_id, payload) {// id topic
    const data = this.extractConactData(payload);

    console.log(topic_id)
    const result = await this.Topic.findOneAndUpdate(
      {
        _id: ObjectId.isValid(topic_id) ? new ObjectId(topic_id) : null,// chu de topic

      },// filter
      {
        $addToSet: {
          list_active: data.list_active
        }
      },
    );
    return result;
  }
  async update_arr(topic_id, active_id, payload) {
    const update = this.extractConactData(payload);
    //  console.log(user_question_option)
    const result = await this.Topic.findOneAndUpdate(
      {
        _id: ObjectId.isValid(topic_id) ? new ObjectId(topic_id) : null,// chu de topic

      },// filter
      {
        $set: {
          "list_active.$[elem]": update.list_active// obj
        }
      },// value
      {
        arrayFilters: [{ "elem.id": active_id }],
        // upsert: true
      }// fliter arr
    );
    return result.value;// return ve 200 neu doc ton tai else return false
  }

  // .update({},{$pull:{"data":{"id":3}}},{multi:true}

  async delete_arr(topic_id, active_id) {
    console.log(topic_id);
    console.log(active_id)
    const result = await this.Topic.updateOne(
      {
        _id: ObjectId.isValid(topic_id) ? new ObjectId(topic_id) : null,
      },
      { $pull: { "list_active": { "id": active_id } } },
      { multi: true }

    );
    return result;
  }

  async create(payload) {
    const topic = this.extractConactData(payload);
    const result = await this.Topic.insertOne(
      topic
    );
    return result;
  }

  async find(id) {
    const study_class_id = {
      study_class_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const cursor = await this.Topic.find(study_class_id);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Topic.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Topic.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Topic.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Topic.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = TopicService;
