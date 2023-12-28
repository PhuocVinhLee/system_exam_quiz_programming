const { ObjectId } = require("mongodb");
class Type_question_submit_codeService {
    constructor(client) {
        this.Type_question_submit_code = client.db().collection("type_question_submit_codes");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
       
        const type_question_submit_code = {
            type_question_submit_code_title: payload.type_question_submit_code_title,// funtion
            code: {
                begin_program: payload.begin_program,
                input: payload.input,
                funtion: payload.funtion,
                end_program: payload.end_program
            }
        };
        // Remove undefined fields
        Object.keys(type_question_submit_code).forEach(
            (key) => type_question_submit_code[key] === undefined && delete type_question_submit_code[key]// delete elements undefinded
        );
        return type_question_submit_code;
    }
    async create(payload) {
        const type_question_submit_code = this.extractConactData(payload);
        const result = await this.Type_question_submit_code.insertOne(type_question_submit_code);
        return await result;
    }

    async find(filter, page) {
        var number_page = 1;// trang hien tai
        if (page != 0) {
            number_page = parseInt(page);
        }
        const litmit = 9;// so luong type_question_submit_code trong mot trang
        const number_skip = (number_page - 1) * litmit;// so luong type_question_submit_code se bo qua
        const data = await this.Type_question_submit_code.find({}).skip(number_skip).limit(litmit).toArray(); //tra ve con tro nen phai toArray()
        const length_clt = await this.Type_question_submit_code.countDocuments({});
        console.log(length_clt);
        console.log("oje")

        const result = {
            data,
            length_clt

        }

        return result;// 
    }

    async findByName(name) {
        return await this.find({
            type_question_submit_code_title: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Type_question_submit_code.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Type_question_submit_code.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Type_question_submit_code.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


}
module.exports = Type_question_submit_codeService;
