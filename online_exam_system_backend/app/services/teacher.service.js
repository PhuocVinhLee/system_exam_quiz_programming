const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class TeacherService {
  constructor(client) {
    this.Teacher = client.db().collection("teachers");
  }
  //const satl = await bcrypt.hash(req.body.password,satl);
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  async extractConactData(payload) {
    const teacher = {
      email: payload.email,
      password: payload.password,// bam
      manager: payload.manager,// bolean,
      teacher_id: payload.teacher_id,
      firstname: payload.firstname,
      lastname: payload.lastname,
      gender: payload.gender,
      avatar : payload.avatar

    };
    // Remove undefined fields
    Object.keys(teacher).forEach(
      (key) => teacher[key] === undefined && delete teacher[key]
    );
    return teacher;
  }

  async createTeacher(payload) {
    const teacher = await this.extractConactData(payload);
    teacher.password = await this.hash_password(teacher.password);
    const result = await this.Teacher.insertOne(
      teacher  // obj
    );
    return result;
  }

  async findByTeacherId(teacher_id) {
    return await this.Teacher.findOne({
      teacher_id: teacher_id,
    });
  }
  async hash_password(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
  }


  //   async create(payload) {
  //     const teacher =  await this.extractConactData(payload);
  //     console.log(payload.password);
  //     console.log(payload.email);
  //     console.log(teacher.password);
  //     const result = await this.Teacher.findOneAndUpdate(
  //       teacher,
  //       { $set: { } },
  //       { returnDocument: "after", upsert: true }  
  //     )

  //     // const {password, ...data} = await result.toJSON();
  //     return result.value;
  //   }
  async findTeacher(search) {// doi tuong filter

    console.log(search);
    const filter1 = {
      username: { $regex: new RegExp(search), $options: "i" }
    };
    const filter2 = {
      teacher_id: { $regex: new RegExp(search), $options: "i" }
    };
    console.log(filter1)
    console.log(filter2)

    const data = await this.Teacher.find({ $or: [filter1, filter2] }).toArray(); //tra ve con tro nen phai toArray()
    console.log(data)
    return data;// 
  }


  async update(id, payload) {
   
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = await this.extractConactData(payload);
    console.log(filter),
    console.log(update)
    const result = await this.Teacher.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }


  async findById(id) {
    return await this.Teacher.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }



}
module.exports = TeacherService;
