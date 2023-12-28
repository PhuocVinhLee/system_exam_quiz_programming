const { ObjectId } = require("mongodb");
const multer  = require('multer')

class FilesService {
  constructor(client) {
    this.Files = client.db().collection("files");
  }

  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    console.log(payload.teacher_id)
    console.log("okedsadasd")
    payload.teacher_id = ObjectId.isValid(payload.teacher_id) ? new ObjectId(payload.teacher_id) : null
    payload.period_id = ObjectId.isValid(payload.period_id) ? new ObjectId(payload.period_id) : null
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    payload.study_class_id = ObjectId.isValid(payload.study_class_id) ? new ObjectId(payload.study_class_id) : null
    //payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null

    const files = {
      files_title: payload.files_title,
      teacher_id: payload.teacher_id,
      study_class_id: payload.study_class_id,
      list_files_title: payload.list_files_title,
      filename:payload.filename
       
    };
    // Remove undefined fields
    Object.keys(files).forEach(
      (key) => files[key] === undefined && delete files[key]// delete elements undefinded
    );
    return files;
  }
  async create_arr( list_files_name) {// update


    const result = await this.Files.insertMany(
        list_files_name
    );
    return result;
  }

  async create(payload, filename) {

    const files = this.extractConactData(payload);
    console.log("ten file ne",  files)
    const result = await this.Files.insertOne({filename: filename});
   
    return result;
  }

  async find(id, page) {// doi tuong filter
    const filter = {
      period_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    var number_page = 1;// trang hien tai
    if (page != 0) {
      number_page = parseInt(page);
    }
    const litmit = 9;// so luong files trong mot trang
    const number_skip = (number_page - 1) * litmit;// so luong files se bo qua
    const data = await this.Files.find(filter).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
    const length_clt = await this.Files.countDocuments(filter);

    const result = {
      data,
      length_clt

    }
    console.log(result)

    return result;// 
  }

  async findByName(name) {
    return await this.find({
      files_title: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Files.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    console.log("neeee")
    console.log(update)
    const result = await this.Files.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Files.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }


}
module.exports = FilesService;
