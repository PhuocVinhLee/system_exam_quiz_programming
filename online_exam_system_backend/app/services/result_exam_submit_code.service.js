const { ObjectId } = require("mongodb");
class Result_exam_submit_codesService {
    constructor(client) {
        this.Result_exam_submit_codes = client.db().collection("result_exam_submit_code");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
        const result_exam_submit_codes = {
            user_id: payload.user_id,
            exam_id: payload.exam_id,
            datetime_attempts: payload.datetime_attempts,
            completed: payload.completed,
            list_answer: payload.list_answer,
            datetime_completed: payload.datetime_completed,
            mark: payload.mark,
            
        };
        // Remove undefined fields
        Object.keys(result_exam_submit_codes).forEach(
            (key) => result_exam_submit_codes[key] === undefined && delete result_exam_submit_codes[key]
        );
        return result_exam_submit_codes;
    }
    async create(payload) {
        const result_exam_submit_codes = this.extractConactData(payload);
        const result = await this.Result_exam_submit_codes.insertOne(
            result_exam_submit_codes
        );
        return result;
    }

    async find_by_teacher( id_exam) {
      
          const  exam_id = {
            exam_id:  id_exam
          }

        const cursor = await this.Result_exam_submit_codes.find(exam_id).sort({"_id":1});// check
        return await cursor.toArray();
    }  
    
    async find(id_user, id_exam) {
        const user_id = {
            user_id: id_user
          }
          const  exam_id = {
            exam_id:  id_exam
          }

        const cursor = await this.Result_exam_submit_codes.find({$and:[user_id, exam_id]}).sort({"_id":1});// check
        return await cursor.toArray();
    }  

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $result_exam_submit_codes: "i" },
        });
    }
    async findByIdAndIdTeacher(id_result_exam_submit_code, id_teacher) {
        
        return await this.Result_exam_submit_codes.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findById(id) {
        return await this.Result_exam_submit_codes.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        console.log(filter)
        const update = this.extractConactData(payload);
        const result = await this.Result_exam_submit_codes.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Result_exam_submit_codes.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Result_exam_submit_codes.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = Result_exam_submit_codesService;
