const { ObjectId } = require("mongodb");
const { use } = require("../routes/teacher.route");
class List_exam_questionService {
  constructor(client) {
    this.Study_class = client.db().collection("study_class");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    
    payload.teacher_id = ObjectId.isValid(payload.teacher_id) ? new ObjectId(payload.teacher_id) : undefined
   payload.period_id = ObjectId.isValid(payload.period_id) ? new ObjectId(payload.period_id) : undefined
   payload.subject_id = ObjectId.isValid(payload.subject_id) ? new ObjectId(payload.subject_id) : undefined
   const study_class = {
      study_class_title: payload.study_class_title,
      study_class_describe: payload.study_class_describe,
      study_class_img: payload.study_class_img,
      password: payload.password,
      teacher_id: payload.teacher_id,
      period_id: payload.period_id,
      subject_id:payload.subject_id,
      topic_id: payload.topic_id,
      list_student: payload.list_student,
     
  
    };
    // Remove undefined fields
    Object.keys(study_class).forEach(
      (key) => study_class[key] === undefined && delete study_class[key]
    );
    return study_class;
  }
  async create_arr(study_class_id,payload) {// update
    console.log(study_class_id );
    console.log(payload);
    const data = this.extractConactData(payload);
    const filter = {
      _id: ObjectId.isValid(study_class_id) ? new ObjectId(study_class_id) : null,// id study_class
    };
    const teacher_id = {// id 
      teacher_id: payload.teacher_id
    }
    const result = await this.Study_class.findOneAndUpdate(
      { $and: [ filter,teacher_id] },// filter
      {
        $addToSet: {
          list_topic: data.topic_id
        }
      },
    );
    return result;
  }
  async create(payload) {
    const study_class = this.extractConactData(payload);
    
    console.log(study_class)
    const result = await this.Study_class.insertOne(
     study_class
    );
    return result;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Study_class.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }


  async find(id_period) {
     const period_id = {
      period_id: ObjectId.isValid(id_period) ? new ObjectId(id_period) : null,
    }
    
    const cursor = await this.Study_class.find({ $and: [ period_id] });
    return await cursor.toArray();
  }

  async findById(id) {
    console.log(id)
    return await this.Study_class.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }



  async delete(id) {
    const result = await this.Study_class.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }
}
module.exports = List_exam_questionService;
