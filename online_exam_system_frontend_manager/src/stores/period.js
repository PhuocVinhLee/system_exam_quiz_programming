import { defineStore } from "pinia"
import periodService from "@/services/period.service";
import { useIndexStore } from "./index.js"//useIndexStore
export const usePeriodStore = defineStore("periods", {
    state: () => ({
        periods: [],
        isLoading: false,
        periods_peroid_teacher: [],
        state_period: false,
        one_period: {}
    }),
    getters: {
        get_all_periods: (state) => {
            return state.periods;
        },
        get_one_periods: (state) => {
            return state.one_period;
        },
        get_all_periods_peroid_teacher: (state) => {
            return state.periods_peroid_teacher;
        }
    },
    actions: {

        async action_one_periods(id) {
            const indexStore = useIndexStore();
            try {
                this.one_period = await periodService.get(id)
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        },
        async action_all_periods() {
            const indexStore = useIndexStore();
            try {
                this.periods = await periodService.getAll()
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        },
        async action_all_periods_by_period_teacher() {
            const indexStore = useIndexStore();
            try {
                this.periods_peroid_teacher = await periodService.getbyTeacher()
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        },
        async reset_state_period() {
            this.state_period = false

        },
        async action_add_period(data) {
            const indexStore = useIndexStore();
            try {
                this.state_period = await periodService.create(data)
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        }
        ,
        async action_update_period(id,data) {
            const indexStore = useIndexStore();
            try {
                this.state_period = await periodService.update(id,data)
            } catch (error) {
                if (error.response.status == 403 || error.response.status == 401) {
                    indexStore.state_error = error.response.data;
                    console.log(indexStore.state_error)
                }
            }


        }
    },

})