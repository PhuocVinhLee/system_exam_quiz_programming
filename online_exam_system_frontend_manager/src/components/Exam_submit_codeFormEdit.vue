<template>
    <Form @submit="submit()" class="row  " id="" :validation-schema="productFormSchema"
        v-slot="{ errors }">

        <div class="col-md-12 mb-3">
            <label for="validationServer" class="form-label">Tên kỳ thi</label>
            <Field type="text" class="form-control"
                :class="{ ' is-valid': !errors.exam_submit_code_title && exam_submit_code_local.exam_submit_code_title }"
                v-bind:class="{ 'is-invalid': errors.exam_submit_code_title }" name="exam_submit_code_title"
                v-model="exam_submit_code_local.exam_submit_code_title" />
            <ErrorMessage name="exam_submit_code_title" class="error-feedback" />
            <span> {{ errors.exam_submit_code_title }} </span>

        </div>
        <!-- <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Môn thi </label>
            <Field class="form-select" as="select" :class="{ ' is-valid': !errors.subject_id && exam_submit_code_local.subject_id }"
                v-bind:class="{ 'is-invalid': errors.subject_id }" name="subject_id" aria-label="select exam_submit_codeple"
                v-model="exam_submit_code_local.subject_id">
                <option v-show="false" value="" disabled>Vui lòng chọn môn thi</option>
                <option v-for="subject in subjects.get_all_subjects" :key="subject._id" :value="subject._id"> {{
                    subject.subject_title }}</option>

            </Field>
            <ErrorMessage name="subject_id" class="error-feedback" />
        </div> -->
        <!-- <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Lớp học </label>
            <Field class="form-select "
                :class="{ ' is-valid': !errors.study_class_id && exam_submit_code_local.study_class_id }"
                v-bind:class="{ 'is-invalid': errors.study_class_id }" as="select" name="study_class_id" required
                aria-label="select exam_submit_codeple" v-model="exam_submit_code_local.study_class_id">
                <option v-show="false" disabled value="">Vui lòng chọn lớp học</option>
                <option v-for="study_class in get_all_study_class" :key="study_class._id" :value="study_class._id">{{
                    study_class.study_class_name }}</option>
            </Field>
            <ErrorMessage name="study_class_id" class="error-feedback" />
        </div> -->
        <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Mật khẩu </label>
            <Field name="password" type="text"
                :class="{ ' is-valid': !errors.password && exam_submit_code_local.password, 'is-invalid': errors.password }"
                class="form-control" v-model="exam_submit_code_local.password" />
            <ErrorMessage name="password" class="error-feedback" />

        </div>
        <!-- <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Tổng số câu hỏi </label>
            <Field name="total_question" type="number"
                :class="{ ' is-valid': !errors.total_question && exam_submit_code_local.total_question, 'is-invalid': errors.total_question }"
                class="form-control" v-model="exam_submit_code_local.total_question" />
            <ErrorMessage name="total_question" class="error-feedback" />

        </div> -->
        <!-- <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Điểm tối đa</label>
            <Field name="max_marks" type=number step=0.05 min="   "
                :class="{ ' is-valid': !errors.max_marks && exam_submit_code_local.max_marks, 'is-invalid': errors.max_marks }"
                class="form-control" v-model="exam_submit_code_local.max_marks" />
            <ErrorMessage name="max_marks" class="error-feedback" />

        </div> -->
        <!-- <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Điểm trừ tối đa / câu hỏi </label>
            <Field name="max_percent_marks" type=number step=0.05 max="0" class="form-control"
                :class="{ ' is-valid': !errors.max_percent_marks && exam_submit_code_local.max_percent_marks, 'is-invalid': errors.max_percent_marks }"
                v-model="exam_submit_code_local.max_percent_marks" />
            <ErrorMessage name="max_percent_marks" class="error-feedback" />

        </div> -->
        <div class="col-md-6 mb-3">
            <label for="validation1Server" class="form-label">Thời gian làm bài </label>
            <Field name="exam_submit_code_duration" id="" step="1" type=number
                :class="{ ' is-valid': !errors.exam_submit_code_duration && exam_submit_code_local.exam_submit_code_duration, 'is-invalid': errors.exam_submit_code_duration }"
                class="form-control" min="0" v-model="exam_submit_code_local.exam_submit_code_duration" />
            <ErrorMessage name="exam_submit_code_duration" class="error-feedback" />

        </div>
        <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Thời gian bắt đầu </label>
            <Field type=datetime-local name="exam_submit_code_datetime_start" id="" class="form-control"
                :class="{ ' is-valid': !errors.exam_submit_code_datetime_start && exam_submit_code_local.exam_submit_code_datetime_start, 'is-invalid': errors.exam_submit_code_datetime_start }"
                v-model="exam_submit_code_local.exam_submit_code_datetime_start" />
            <ErrorMessage name="exam_submit_code_datetime_start" class="error-feedback" />

        </div>
        <div class="col-md-6 mb-3">
            <label for="validationServer" class="form-label">Thời gian kết thúc </label>
            <Field type=datetime-local name="exam_submit_code_datetime_end" id="" class="form-control"
                :class="{ ' is-valid': !errors.exam_submit_code_datetime_end && exam_submit_code_local.exam_submit_code_datetime_end, 'is-invalid': errors.exam_submit_code_datetime_end }"
                v-model="exam_submit_code_local.exam_submit_code_datetime_end" />
            <ErrorMessage name="exam_submit_code_datetime_end" class="error-feedback" />

        </div>

        <!-- <div class="col-md-6">
                    <label for="validationServer" class="form-label">Hình thức thi </label>
                    <Field class="form-select" as="select"
                        :class="{ ' is-valid': !errors.exam_submit_code_type && exam_submit_code_local.exam_submit_code_type }"
                        v-bind:class="{ 'is-invalid': errors.exam_submit_code_type }" name="exam_submit_code_type" aria-label="select exam_submit_codeple"
                        v-model="exam_submit_code_local.exam_submit_code_type">
                        <option v-show="false" value="" disabled>Vui lòng chọn hình thức thi</option>
                        <option value="tracnghiem">Trắc nghiệm</option>
                        <option value="submitcode">Submit code</option>

                    </Field>
                    <ErrorMessage name="exam_submit_code_type" class="error-feedback" />
                </div> -->


        <!-- <div class="col-md-6  ">
            <label for="validationServer" class="form-label">Ngôn ngữ</label>
            <div>
                <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="lang" id="inlineRadio1" value="Java" />
                    <label class="form-check-label mt-0" for="inlineRadio1">Java</label>
                </div>
                <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="lang" id="inlineRadio2" value="Python" />
                    <label class="form-check-label mt-0" for="inlineRadio2">Python</label>
                </div>
                <div class="form-check form-check-inline">
                    <Field class="form-check-input" v-model="exam_submit_code_local.lang" type="radio" name="lang"
                        id="inlineRadio4" value="C/C++" />
                    <label class="form-check-label mt-0" for="inlineRadio4">C/C++</label>
                </div>
                <div></div>
                <ErrorMessage name="lang" class="error-feedback" />
            </div>

        </div> -->

        <div class="">
            <button class="btn btn-primary" type="submit">Lưu thay đổi</button>

        </div>

    </Form>
</template>
<script setup>
import * as yup from "yup";
import { Form, Field, ErrorMessage, } from "vee-validate";
import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"
import { useSubjectStore } from "../stores/subject.js"
import { useStudy_classStore } from "../stores/study_class.js"
import { ref, reactive, onMounted, watchEffect, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();// 

const exam_submit_code = useExam_submit_codeStore();/////
const { get_one_exam_submit_code, exam_submit_codes, one_exam_submit_code, lenght, state_exam_submit_code, } = storeToRefs(useExam_submit_codeStore());
const { action_one_exam_submit_code, action_all_exam_submit_codes, action_update_exam_submit_code, reset_state_exam_submit_code } = useExam_submit_codeStore();

const { get_all_study_class } = storeToRefs(useStudy_classStore());
const { action_all_study_class } = useStudy_classStore();

const subjects = useSubjectStore();
const study_class = useStudy_classStore();

import { usePeriodStore } from "../stores/period.js"
const { get_all_periods } = storeToRefs(usePeriodStore());
const { action_all_periods } = usePeriodStore();

//const exam_submit_code_local = reactive({});
watchEffect(async () => {
   // await action_all_study_class();;
   // await action_all_periods();
    //exam_submit_code_local.study_class_id = get_all_study_class.value[0]._id;
    // exam_submit_code_local.value = {
    //     // subject_id: "647058a9c434b9468888a30d",//647057da2a8296117ff62cfd
    //     study_class_id: get_all_study_class.value[0]._id,
    //     total_question: 34,
    //     marks_right: 0.5,
    //     marks_wrong: - 0.5,
    //     exam_submit_code_duration: 45,
    //     exam_submit_code_datetime: "2023-08-08T18:39",
    //     exam_submit_code_title: " thi cong nghe web",
    //     lang: "Java",
    //     period_id: get_all_periods.value[0]._id
    // };

})


function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_exam_submit_code, 5000);// thong bao se tu tat sau 5s khi submit
}

const exam_submit_code_local = ref(one_exam_submit_code);
 action_all_study_class();

async function submit() {
    await action_update_exam_submit_code(one_exam_submit_code.value._id, exam_submit_code_local.value);//  them data vao csdl // 
    const myModalEl = document.getElementById('btn-close-edit'); // myModalEl.click();// dong model
     auto_close_toast();// auto dong thong bao //   
     
}
const productFormSchema = yup.object().shape({
    exam_submit_code_title: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(5, "Tên phải ít nhất 5 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),
    // password: yup
    //     .string()
       
    //     .required("Vui lòng điền trường này")
    //    ,
    // exam_submit_code_type: yup
    //     .string()
    //     .optional()
    //     .required("Vui lòng điền trường này")
    //     .min(1, "Tên phải ít nhất 5 ký tự.")
    //     .max(100, "Tên có nhiều nhất 100 ký tự."),
    exam_submit_code_duration: yup
        .number().typeError("Vui lòng điền vào số")
        .required("Vui lòng điền trường này")
        .min(1, "Thời gian thi tối thiểu 1 phút.")
        .max(180, "Thời gian thi tối đa 180 phút."),
        exam_submit_code_datetime_start: yup
        .string()
        .required("Vui lòng điền trường này"),
    exam_submit_code_datetime_end: yup
        .string()
        .required("Vui lòng điền trường này"),
    // lang: yup
    //     .string().
    //     when("exam_submit_code_type", (val, schema) => {
    //         if (val == "submitcode") {  //if exam_submit_code_type exist then apply required else not
    //             return yup.string().required("Vui lòng chọn ngôn ngữ");
    //         } else {
    //             return yup.string().notRequired();
    //         }
    //     }),  
    //   password: yup .string().notRequired(),
    //   exam_submit_code_wait: yup.number().typeError("Vui lòng điền vào số").notRequired()

});


onMounted(() => {
    //exxam.action_one_exam_submit_code("649ab26e090127292b6a5a6e");
    // subjects.action_all_subjects();
    // action_all_study_class();;
    // // console.log(exam_submit_code_local.exam_submit_code_title)
    // action_all_periods();
    // console.log(get_all_study_class.value);
})



</script>
<!-- <style scoped>@import "@/assets/form.css";</style> -->