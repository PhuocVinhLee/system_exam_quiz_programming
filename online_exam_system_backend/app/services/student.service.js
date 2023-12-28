const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class StudentService {
  constructor(client) {
    this.Student = client.db().collection("students");
  }
  //const satl = await bcrypt.hash(req.body.password,satl);
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  async extractConactData(payload) {
    const student = {
      email: payload.email,
      password: payload.password,// bam
      manager: payload.manager,// bolean,
      student_id: payload.student_id,
      firstname: payload.firstname,
      lastname: payload.lastname,
      gender: payload.gender,
      avatar : payload.avatar,
      

    };
    // Remove undefined fields
    Object.keys(student).forEach(
      (key) => student[key] === undefined && delete student[key]
    );
    return student;
  }

  async createStudent(payload) {
    const student = await this.extractConactData(payload);
    student.password = await this.hash_password(student.password);
    const result = await this.Student.insertOne(
      student  // obj
    );
    return result;
  }

  async findByStudentId(student_id) {
    return await this.Student.findOne({
      student_id: student_id,
    });
  }
  async hash_password(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
  }


  //   async create(payload) {
  //     const student =  await this.extractConactData(payload);
  //     console.log(payload.password);
  //     console.log(payload.email);
  //     console.log(student.password);
  //     const result = await this.Student.findOneAndUpdate(
  //       student,
  //       { $set: { } },
  //       { returnDocument: "after", upsert: true }  
  //     )

  //     // const {password, ...data} = await result.toJSON();
  //     return result.value;
  //   }
  async findStudent(search) {// doi tuong filter

    console.log(search);
    const filter1 = {
      username: { $regex: new RegExp(search), $options: "i" }
    };
    const filter2 = {
      student_id: { $regex: new RegExp(search), $options: "i" }
    };
    console.log(filter1)
    console.log(filter2)

    const data = await this.Student.find({ $or: [filter1, filter2] }).toArray(); //tra ve con tro nen phai toArray()
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
    const result = await this.Student.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }


  async findById(id) {
    return await this.Student.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }



}
module.exports = StudentService;
