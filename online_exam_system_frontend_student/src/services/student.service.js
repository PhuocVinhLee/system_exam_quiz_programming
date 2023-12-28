// import createApiClient from "./api.service";

import axios from "axios";
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    // onUploadProgress: progressEvent => {
    //     var progress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
    //     if (config.onProgress)
    //         config.onProgress(progress);
    // }
};

function createApiClient(baseURL) {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};
class StudentService {
    constructor(baseUrl = "/api/student") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async findStudent(search) {
        return (await this.api.get(`/student?data=${search}`)).data;
    }
    async login(data) {
        console.log(data)
        return (await this.api.post("/login", data)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        console.log(data)
        return (await this.api.put(`/account_student`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        })).data;
    }
    async get_one_account() {
        return (await this.api.get(`/account_student`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new StudentService();