import { defineStore } from "pinia"
import SubjectService from "@/services/subject.service";
import { useIndexStore } from "./index.js"//useIndexStore
export const useSubjectStore = defineStore("subjects", {
    state: () => ({
        subjects: [],
        isLoading: false,
        subjects_peroid_teacher: [],
        state_subject: false,
        one_subject: {}
    }),
    getters: {
        get_all_subjects: (state) => {
            return state.subjects;
        },
        get_one_subjects: (state) => {
            return state.one_subject;
        },
        get_all_subjects_peroid_teacher: (state) => {
            return state.subjects_peroid_teacher;
        }
    },
    actions: {

        async action_one_subjects(id) {
            const indexStore = useIndexStore();
            try {
                this.one_subject = await SubjectService.get(id)
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        },
        async action_all_subjects() {
            const indexStore = useIndexStore();
            try {
                this.subjects = await SubjectService.getAll()
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        },
        async action_all_subjects_by_period_teacher() {
            const indexStore = useIndexStore();
            try {
                this.subjects_peroid_teacher = await SubjectService.getbyTeacher()
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        },
        async reset_state_subject() {
            this.state_subject = false

        },
        async action_add_subject(data) {
            const indexStore = useIndexStore();
            try {
                this.state_subject = await SubjectService.create(data)
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        }
        ,
        async action_update_subject(id,data) {
            const indexStore = useIndexStore();
            try {
                this.state_subject = await SubjectService.update(id,data)
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        }
    },

})