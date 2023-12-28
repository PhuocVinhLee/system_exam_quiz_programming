const { ObjectId } = require("mongodb");
class Question_submit_code_bankService {
  constructor(client) {
    this.Question_submit_code_bank = client.db().collection("question_submit_code_banks");
  }


  async extractConactData(payload) {
    //payload.level_id = ObjectId.isValid(payload.level_id) ? new ObjectId(payload.level_id) : null
    payload.teacher_id = ObjectId.isValid(payload.teacher_id) ? new ObjectId(payload.teacher_id) : null
    payload.subject_id = ObjectId.isValid(payload.subject_id) ? new ObjectId(payload.subject_id) : null
    payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
    payload.teacher_id_of_list = ObjectId.isValid(payload.teacher_id_of_list) ? new ObjectId(payload.teacher_id_of_list) : null
    const question_submit_code_bank = {
      question_submit_code_bank_title: payload.question_submit_code_bank_title,
      subject_id: payload.subject_id,
      teacher_id_of_list: payload.teacher_id_of_list,
      teacher_id: payload.teacher_id,
      question_submit_code_bank_type: payload.question_submit_code_bank_type,// private public protected
      question_submit_code_bank_authorization: payload.question_submit_code_bank_authorization,// use edit,
      question_submit_code_id: payload.question_submit_code_id,
      question_id: payload.question_id,
      list_question: payload.list_question,
      list_teacher: payload.list_teacher
    };
    // Remove undefined fields
    Object.keys(question_submit_code_bank).forEach(
      (key) => {
        if (question_submit_code_bank[key] === undefined || question_submit_code_bank[key] === null) {
          delete question_submit_code_bank[key]
        }
      }
    );
    return question_submit_code_bank;
  }

  async create_arr(question_bank_id, payload) {// update// payload = {id_question: id_question}
    const data = await this.extractConactData(payload);

    const filter = {
      _id: ObjectId.isValid(question_bank_id) ? new ObjectId(question_bank_id) : null,// id study_class
    };
    const teacher_id = {// id 
      teacher_id: payload.teacher_id
    }
    const result = await this.Question_submit_code_bank.updateOne(
      { $and: [filter, teacher_id] },// filter// thieu tim trong mang xem co ID trachter hay khong

      {
        $addToSet: {
          list_question: data.question_id
        }
      },
    );
    return result;
  }
  async create_arr_teacher_id(question_bank_id, payload) {// update// payload = {id_question: id_question}
    const data = await this.extractConactData(payload);
    console.log(data)
    const filter = {
      _id: ObjectId.isValid(question_bank_id) ? new ObjectId(question_bank_id) : null,// id study_class
    };

    const teacher_id = {// id 
      teacher_id: payload.teacher_id
    }
    const result = await this.Question_submit_code_bank.updateOne(
      { $and: [filter, teacher_id] },// filter// thieu tim trong mang xem co ID trachter hay khong

      {
        $addToSet: {
          list_teacher: data.teacher_id_of_list
        }
      },
    );
    return result;
  }

  async update(id, payload) {
    const user_question_option = await this.extractConactData(payload);

    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const result = await this.Question_submit_code_bank.findOneAndUpdate(
      filter,
      {
        $set: user_question_option
      },
      { returnDocument: "after" }
    );
    return result.value;// return ve 200 neu doc ton tai else return false
  }

  async update1(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Question_submit_code_bank.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async create(payload) {

    const question_submit_code_bank = await this.extractConactData(payload);
    const data = await this.Question_submit_code_bank.insertOne(question_submit_code_bank);
    const length_clt = await this.Question_submit_code_bank.countDocuments({});
    const result = {
      data,
      length_clt

    }
    return result;

    // const result = await this.Question_submit_code_bank.insertOne(
    //   question_submit_code_bank,
    // );
    // return result;
  }



  // db.customers.find({
  //   $and: [
  //     {
  //       Country: {
  //         $ne: "Germany"
  //       }
  //     },
  //     {
  //       VIP: {
  //         $ne: true
  //       }
  //     }
  //   ]
  // })

  async find(subject_id, id_teacher) {

    const filter1 = {
      subject_id: ObjectId.isValid(subject_id) ? new ObjectId(subject_id) : null,
    };
    const filter2 = {
      teacher_id: ObjectId.isValid(id_teacher) ? new ObjectId(id_teacher) : null,
    };

    const filter3 = {
      list_teacher: { $elemMatch: { $eq: new ObjectId(id_teacher) } },// thieu mon hoc
    }


    const data = await this.Question_submit_code_bank.find({ $or: [{ $and: [filter1, filter3] }, { $and: [filter1, filter2] }] }).toArray(); //tra ve con tro nen phai toArray()
    return data;
  }
  async find_question_bank_from_teacher_id(subject_id, teacher_id, page) {
    // const cursor = await this.Question_submit_code_bank.find(filter);
    const filter1 = {
      subject_id: ObjectId.isValid(subject_id) ? new ObjectId(subject_id) : null,
    };
    const filter2 = {
      teacher_id: ObjectId.isValid(teacher_id) ? new ObjectId(teacher_id) : null,
    };

    var number_page = 1;// trang hien tai
    if (page != 0) {
      number_page = parseInt(page);
    }
    const litmit = 9;// so luong exam_submit_code trong mot trang
    const number_skip = (number_page - 1) * litmit;// so luong exam_submit_code se bo qua
    const data = await this.Question_submit_code_bank.find({ $and: [filter1, filter2] }).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
    const length_clt = await this.Question_submit_code_bank.countDocuments(filter1);

    console.log(length_clt);
    const result = {
      data,
      length_clt

    }

    return result;
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Question_submit_code_bank.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async findByTeacherId(id) {
    return await this.Question_submit_code_bank.find({
      teacher_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }).toArray();
  }


  async delete(id) {
    const result = await this.Question_submit_code_bank.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Question_submit_code_bank.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = Question_submit_code_bankService;
