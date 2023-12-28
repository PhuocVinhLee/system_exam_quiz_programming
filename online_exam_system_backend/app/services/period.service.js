const { ObjectId } = require("mongodb");
class PeriodsService {
    constructor(client) {
        this.Periods = client.db().collection("periods");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData_create(payload) {
        payload.question_id = ObjectId.isValid(payload.question_id) ? new ObjectId(payload.question_id) : null
        const periods = {
            school_year: payload.school_year,
            semester: payload.semester,
        };
        // Remove undefined fields
        Object.keys(periods).forEach(
            (key) => periods[key] === undefined && delete periods[key]
        );
        return periods;
    }
    async create(payload) {
        const periods = this.extractConactData_create(payload);
        const result = await this.Periods.insertOne(
            periods
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Periods.find(filter).sort({"_id":-1});
        return await cursor.toArray();
    }  

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $periods: "i" },
        });
    }
    async findByIdAndIdTeacher(id_period, id_teacher) {
        
        return await this.Periods.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findById(id) {
        return await this.Periods.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        console.log(id);
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData_create(payload);
        const result = await this.Periods.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Periods.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Periods.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = PeriodsService;
