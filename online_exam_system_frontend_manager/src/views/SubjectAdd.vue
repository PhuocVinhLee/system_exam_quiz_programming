
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">


            <!-- list courses -->
            <div class="card">

                <div class="card-body">

                    <Form @submit="submit()" class="row  " id="courses_add" :validation-schema="subjectFormSchema"
                        v-slot="{ errors }">

                        <div class="col-md-12 mb-3">
                            <label for="validationServer" class="form-label">Tên Lớp học</label>
                            <Field type="text" class="form-control"
                                :class="{ ' is-valid': !errors.subject_title && subject_local.subject_title }"
                                v-bind:class="{ 'is-invalid': errors.subject_title }" name="subject_title"
                                v-model="subject_local.subject_title" />
                            <ErrorMessage name="subject_title" class="error-feedback" />
                            <span> {{ errors.subject_title }} </span>

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


import { useSubjectStore } from "../stores/subject.js"
const { get_all_subjects,get_all_subjects_peroid_teacher } = storeToRefs(useSubjectStore());
const { action_all_subjects,action_add_subject,state_subject, reset_state_subject} = useSubjectStore();

//const courses_local = reactive({});

const subject_local = reactive({
    subject_title: "Công nghệ web",
  

});

const subjectFormSchema = yup.object().shape({
    subject_title: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(5, "Tên phải ít nhất 5 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),


});


function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_subject, 5000);// thong bao se tu tat sau 5s khi submit
}

async function submit() {
    console.log(subject_local);
    await action_add_subject(subject_local); // them courses vao csdl
    auto_close_toast();// tu tat thong bao
    router.push({
        name: "SubjectDashboard"
    }
    );
    // window.history.back();
}


onMounted(() => {

})



</script>

