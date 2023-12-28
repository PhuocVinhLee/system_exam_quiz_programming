import createApiClient from "./api.service";
class Question_quizService {
    constructor(baseUrl = "/api/question_quiz") {
        this.api = createApiClient(baseUrl);
    }
  
    async getAll(subject_id, params) {

        return (await this.api.get(`/?id=${subject_id}&page=${params}`)).data;
    }
    async getAllByTeacher(subject_id, params) {

        return (await this.api.get(`/teacher?subject_id=${subject_id}&page=${params}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        console.log("alsnldlanldn")
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new Question_quizService();