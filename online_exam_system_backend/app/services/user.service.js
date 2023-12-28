const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }
  //const satl = await bcrypt.hash(req.body.password,satl);
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  async extractConactData(payload) {
    const user = {
      email: payload.email,
      password: await this.password1(payload.password),// bam
      name: payload.name,
      teacher_id: payload.teacher_id
    };
    // Remove undefined fields
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }
    async password1(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword =  await bcrypt.hash(password,salt);
    console.log(hashedpassword);
    return hashedpassword;
  }
  async create(payload) {
    const user =  await this.extractConactData(payload);
    console.log(payload.password);
    console.log(payload.email);
    console.log(user.password);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { } },
      { returnDocument: "after", upsert: true }
    )

    // const {password, ...data} = await result.toJSON();
    return result.value;
  }
  async findTeacher(search) {// doi tuong filter
    console.log("nenennen")
    console.log(search);
    
    const filter1 = {
      name: { $regex: new RegExp(search), $options: "i"  }
    };
    const filter2 = {
      teacher_id: { $regex: new RegExp(search), $options: "i"  }
    };
    console.log(filter1)
    console.log(filter2)
   
    const data = await this.User.find({ $or: [ filter1,filter2] }).toArray(); //tra ve con tro nen phai toArray()
console.log(data)
    return data;// 
  }
  async findByEmail(email) {
    return await this.User.findOne({
      email: { $regex: new RegExp(email), $options: "i" },
    });
  }
  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  


}
module.exports = UserService;
