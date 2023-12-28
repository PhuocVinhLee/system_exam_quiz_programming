
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">


            <!-- list courses -->
            <div class="card">

                <div class="card-body">

                    <Form @submit="submit()" class="row  " id="courses_add" :validation-schema="periodFormSchema"
                        v-slot="{ errors }">

                        <div class="col-md-6 mb-3">
                            <label for="validationServer" class="form-label">Học kỳ</label>
                            <Field type="text" class="form-control"
                                :class="{ ' is-valid': !errors.semester && period_local.semester }"
                                v-bind:class="{ 'is-invalid': errors.semester }" name="semester"
                                v-model="period_local.semester" />
                            <ErrorMessage name="semester" class="error-feedback" />
                            <span> {{ errors.semester }} </span>

                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="validationServer" class="form-label">Năm học</label>
                            <Field type="text" class="form-control"
                                :class="{ ' is-valid': !errors.school_year && period_local.school_year }"
                                v-bind:class="{ 'is-invalid': errors.school_year }" name="school_year"
                                v-model="period_local.school_year" />
                            <ErrorMessage name="school_year" class="error-feedback" />
                            <span> {{ errors.school_year }} </span>

                        </div>
                       
                      
                      


                        <div class="">
                            <button class="btn btn-primary" type="submit">Lưu thay đổi</button>

                        </div>

                    </Form>



                </div>

            </div>

        </div>
    </div>
</template>
<script setup>
import * as yup from "yup";
import { Form, Field, ErrorMessage, } from "vee-validate";



import { ref, reactive, onMounted, watchEffect, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();// 


import { usePeriodStore } from "../stores/period.js"
const { get_all_periods,get_all_periods_peroid_teacher } = storeToRefs(usePeriodStore());
const { action_all_periods,action_add_period,state_period, reset_state_period} = usePeriodStore();

//const courses_local = reactive({});

const period_local = reactive({
    school_year: "2023-2024",
    semester: "Hk2"
  

});

const periodFormSchema = yup.object().shape({
    school_year: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(5, "Tên phải ít nhất 5 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),

        semester: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),


});


function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_period, 5000);// thong bao se tu tat sau 5s khi submit
}

async function submit() {
    console.log(period_local);
    await action_add_period(period_local); // them courses vao csdl
    auto_close_toast();// tu tat thong bao
    router.push({
        name: "PeriodDashboard"
    }
    );
    // window.history.back();
}


onMounted(() => {

})



</script>

