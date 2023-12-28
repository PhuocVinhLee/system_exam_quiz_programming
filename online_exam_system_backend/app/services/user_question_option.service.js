const { ObjectId } = require("mongodb");
class User_question_optionService {
    constructor(client) {
        this.User_question_option = client.db().collection("user_question_options");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        payload.exam_id = ObjectId.isValid(payload.exam_id) ? new ObjectId(payload.exam_id) : null
        payload.user_id = ObjectId.isValid(payload.user_id) ? new ObjectId(payload.user_id) : null
        payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
        const user_question_option = {
            user_id: payload.user_id,
            question_id: payload.question_id,
            user_answer_option: payload.user_answer_option,
            marks: payload.marks,
            exam_id: payload.exam_id
        };
        // Remove undefined fields
        Object.keys(user_question_option).forEach(
            (key) => user_question_option[key] === undefined && delete user_question_option[key]
        );
        return user_question_option;
    }

    async create(payload) {
        const user_question_option = this.extractConactData(payload);
        const result = await this.User_question_option.insertOne(
            {
                _id: { exam_id: user_question_option.exam_id, user_id: user_question_option.user_id },
                list_question: [
                    {
                        question_id: user_question_option.question_id,
                        user_answer_option: user_question_option.user_answer_option,
                        marks: user_question_option.marks,
                    }
                ]
            }
        );
        return result;
    }
    async update_arr(payload) {
        const user_question_option = this.extractConactData(payload);
      //  console.log(user_question_option)
        const result = await this.User_question_option.findOneAndUpdate(
            {
                _id: {
                    exam_id: user_question_option.exam_id,
                    user_id: user_question_option.user_id
                },
                "list_question.question_id": user_question_option.question_id 
            },
            {
                $set: {
                    "list_question.$[elem]": {
                        question_id: user_question_option.question_id,
                        user_answer_option: user_question_option.user_answer_option,
                        marks: user_question_option.marks,
                    }
                }
            },
            {
               arrayFilters: [{ "elem.question_id": user_question_option.question_id }],
               //upsert: true
            }
        );
        return result.value;// return ve 200 neu doc ton tai else return false
    }
    async create_arr(payload) {
        const user_question_option = this.extractConactData(payload);
        const result = await this.User_question_option.findOneAndUpdate(
            {
                _id: {
                    exam_id: user_question_option.exam_id,
                    user_id: user_question_option.user_id
                }
            },
            {
                $addToSet: {
                    list_question: {
                        question_id: user_question_option.question_id,
                        user_answer_option: user_question_option.user_answer_option,
                        marks: user_question_option.marks,
                    }
                }
            },
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.User_question_option.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(payload) {
        const user_question_option = this.extractConactData(payload);
        return await this.User_question_option.findOne({
            _id: {
                exam_id: user_question_option.exam_id,
                user_id: user_question_option.user_id
            },
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.User_question_option.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(payload) {
        const user_question_option = this.extractConactData(payload);
        const result = await this.User_question_option.findOneAndDelete({
            _id: {
                exam_id: user_question_option.exam_id,
                user_id: user_question_option.user_id
            }
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.User_question_option.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = User_question_optionService;
