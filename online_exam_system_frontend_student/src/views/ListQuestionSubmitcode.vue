
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 v-if="1" class="fw-bold py-3 ">
                    <router-link :to="{
                        name: 'ExamSubmitcodeQuestion',
                        params: {id_exam: route.params.id_exam, id_courses: route.params.id_courses }
                    }" class="fw-bold py-3"> 
                    {{ get_one_exam_submit_code.exam_submit_code_title }}
                    </router-link> 
                    
                </h4>

            <div class="nav-align-top ">
                <Form @submit="submit()" class="row  " id="courses_add" :validation-schema="study_classFormSchema"
                    v-slot="{ errors }">

                    <div class="col-md-5 mb-3">
                        <!-- <label for="validationServer" class="form-label">Ngan hang cau hoi</label> -->
                        <Field class="form-select" as="select" name="subject_id" aria-label="select coursesple"
                            v-model="question_bank_local._id">
                            <option v-show="false" value="" disabled>Vui lòng chọn môn thi</option>
                            <option value="all">Ngân hàng hệ thống</option>
                            <option v-for="question_bank in get_all_question_submit_code_banks" :key="question_bank._id"
                                :value="question_bank._id"> {{
                                    question_bank.question_submit_code_bank_title }}</option>

                        </Field>
                        <ErrorMessage name="subject_id" class="error-feedback" />
                    </div>
                </Form>
                <div class="tab-content">

                    <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">


                        <div class="table-responsive text-nowrap">
                            <div v-if="isLoading" class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div v-else-if="get_lenght_question_submit_code <= 0"> Khong co cau hoi</div>
                            <table v-else class="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Nội dung</th>
                                        <!-- <th>Môn học</th> -->
                                        <th>Chủ sỡ hữu</th>
                                        <th>Mức độ</th>
                                        <th>Hành động</th>



                                    </tr>
                                </thead>

                                <tbody>


                                    <tr v-for="(question_submit_code_bank, index) in get_all_question_submit_codes"
                                        :key="question_submit_code_bank._id">
                                        <td>{{ index + 1 }}</td>
                                        <td> <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{
                                            question_submit_code_bank.question_submit_code_title }} </strong></td>

                                        <!-- <td>{{ question_submit_code_bank.subject_id }}</td> -->
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-secondary dropdown-toggle"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    Chi tiết
                                                </button>
                                                <div class="dropdown-menu p-2 " style="width: 500px;">
                                                    <span
                                                        v-html="question_submit_code_bank.question_submit_code_describe"></span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom"
                                                    data-bs-placement="top" class="avatar avatar-xs pull-up" title=""
                                                    data-bs-original-title="Lilian Fuller">
                                                    <img src="../assets/img/avatars/5.png" alt="Avatar"
                                                        class="rounded-circle">
                                                </li>
                                                <!-- <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Sophia Wilkerson">
                                        <img src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle">
                                    </li>
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                                        <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                                    </li> -->
                                            </ul>
                                        </td>
                                        <!-- <td>  <span class="badge bg-label-primary me-1">{{question_submit_code_bank.question_submit_code_bank_authorization}}</span> <span class="badge bg-label-warning me-1">write</span>
                       
                        </td> -->

                                        <!-- <td>{{ question_submit_code_bank.question_submit_code_bank_type }} </td> -->

                                        <td>{{ question_submit_code_bank.question_submit_code_level }}</td>
                                        <td>

                                            <button @click="add_one_question(question_submit_code_bank._id)" type="button" class="btn btn-icon btn-outline-primary">
                                                <i class='bx bx-plus-circle'></i>
                                            </button>

                                        </td>

                                    </tr>


                                </tbody>
                            </table>
                            <Pagination :lenght="get_lenght_question_submit_code" @page="emit_page"></Pagination> <!-- chan trang -->
                        </div>

                        <div class="toast-container position-fixed bottom-0 end-0 me-4"
                            v-show="state_question_submit_code_bank">
                            <div id="liveToast" class="bs-toast toast fade show bg-primary" role="alert"
                                aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <i class="bx bx-bell me-2"></i>
                                    <div class="me-auto fw-semibold">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" class="btn-close" @click="close_toast()"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Bạn đã cập nhật dữ liệu thành công
                                </div>
                            </div>
                        </div>

                        <div class="toast-container position-fixed bottom-0 end-0 me-4" v-show="state_active">
                            <div id="liveToast" class="bs-toast toast fade show bg-primary" role="alert"
                                aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <i class="bx bx-bell me-2"></i>
                                    <div class="me-auto fw-semibold">Bootstrap</div>
                                    <small>11 mins ago</small>
                                    <button type="button" class="btn-close" @click="close_toast()"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Bạn đã thêm thành công HD
                                </div>
                            </div>
                        </div>



                    </div>





                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, watchEffect, watch, ref, reactive } from 'vue';
// import Exam_submit_codeFormAdd from "@/components/Exam_submit_codeFormAdd.vue";
// import Exam_submit_codeFormEdit from "@/components/Exam_submit_codeFormEdit.vue";
//import CoursesCardDetail from "@/components/CoursesCardDetail.vue";
import Pagination from "@/components/Pagination.vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage, } from "vee-validate";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();

import { useQuestion_submit_code_bankStore } from "../stores/question_submit_code_bank.js"
const { get_one_question_submit_code_bank, get_all_question_submit_code_banks, state_question_submit_code_bank } = storeToRefs(useQuestion_submit_code_bankStore());
const { action_one_question_submit_code_bank, action_add_id_question_submit_code_bank, action_all_question_submit_code_banks, reset_state_question_submit_code_bank, action_delete_question_submit_code_bank } = useQuestion_submit_code_bankStore();


import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"
const { get_one_exam_submit_code, exam_submit_codes, one_exam_submit_code, state_exam_submit_code } = storeToRefs(useExam_submit_codeStore());
const { action_add_id_question_exam_submitcode, action_one_exam_submit_code,action_all_exam_submit_codes, reset_state_exam_submit_code, action_delete_exam_submit_code } = useExam_submit_codeStore();

import { useQuestion_submit_codeStore } from "../stores/question_submit_code.js"
const { get_all_question_submit_codes,get_lenght_question_submit_code } = storeToRefs(useQuestion_submit_codeStore());
const { action_all_question_submit_codes_by_teacher, action_list_question_submit_code_by_question_bank } = useQuestion_submit_codeStore();



const question_bank_local = reactive({
    _id: route.params.id_question_bank
});
const study_classFormSchema = yup.object().shape({
    study_class_title: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(5, "Tên phải ít nhất 5 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),
    study_class_describe: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(1, "Tên phải ít nhất 5 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),

});



function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_question_submit_code_bank, 5000);
}

function close_toast() {
    reset_state_question_submit_code_bank();
}
async function delete_exam_submit_code(id, event) {
    event.preventDefault()
    await action_delete_exam_submit_code(id);
    await action_all_exam_submit_codes(route.query.id, route.query.page);
    auto_close_toast();// auto dong thong bao
    const myModalEl = document.getElementById('btn-close-delete');
    myModalEl.click();// close model

}

const topic_id = ref();
function get_topic_id(id) {
    topic_id.value = id;
    console.log(topic_id.value);
}
function push_page_notification() {
    console.log("pusu gae")
    console.log(topic_id.value);
}
function push_page_exam() {
    console.log("pusu gae")
    console.log(topic_id.value);
}


async function push_examsubmitcode_add() {
    console.log(topic_id.value);
    const modal_close = document.getElementById('btn-close');
    modal_close.click();
    router.push({
        name: "",
        params: { id_topic: topic_id.value }
        // query: { id_course: route.query.id, id_topic: topic_id.value }
    }
    );
}

async function add_one_question(question_id){
    action_add_id_question_exam_submitcode(route.params.id_exam, {question_id: question_id});
}
function emit_page(page) {
    router.push({
        params: { id_question_bank: route.params.id_question_bank },
        query: { page: page }
    }
    );
}

watch(question_bank_local,()=>{
    router.push({
        params: {id_question_bank: question_bank_local._id },
        query:{page: 1}
    }
    );
}) 
const list_question = ref([]);//12

watch(route, async () => {


    if (route.params.id_question_bank == 'all') {
        await action_all_question_submit_codes_by_teacher(route.params.id_subject, route.query.page);
   
    } else {
        await action_one_question_submit_code_bank(route.params.id_question_bank);
        
        if (get_one_question_submit_code_bank.value.list_question) {
    
            list_question.value = await get_one_question_submit_code_bank.value.list_question.filter((question_id, index) => {
                if (index + 1 <= route.query.page * 9 && index + 1 > (route.query.page - 1) * 9) {// 28 // 7 .7.7.7 14.. 21
                    return question_id;
                }// sai cho map
            });
        }
        else {
            list_question.value = []
        }
    
        await action_list_question_submit_code_by_question_bank(list_question.value,get_one_question_submit_code_bank.value.list_question);
    }

})

onMounted(async () => {
    await  action_all_question_submit_code_banks(route.params.id_subject);
    await action_one_exam_submit_code(route.params.id_exam)

if (route.params.id_question_bank == 'all') {
    await action_all_question_submit_codes_by_teacher(route.params.id_subject, route.query.page);

} else {
    await action_one_question_submit_code_bank(route.params.id_question_bank);// get arr question
    
    if (get_one_question_submit_code_bank.value.list_question) {
     //   lenght_list_question.value = get_one_question_submit_code_bank.value.list_question.length;// lenght arr question
        list_question.value = await get_one_question_submit_code_bank.value.list_question.filter((question_id, index) => {// get arr question on a page
            if (index + 1 <= route.query.page * 9 && index + 1 > (route.query.page - 1) * 9) {// 28 // 7 .7.7.7 14.. 21
                return question_id;
            }
        });
    }
    else {
 
        list_question.value = []
    }
   
    await action_list_question_submit_code_by_question_bank(list_question.value,get_one_question_submit_code_bank.value.list_question);// get detail a question in arr question
}
})




</script>  

