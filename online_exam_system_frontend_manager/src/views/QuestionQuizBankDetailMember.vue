
<template>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">

            <div class="mb-3">
                <!-- Button trigger modal -->
                <button v-on:click.self="list_teacher = false , list_teacher2.data=''" type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#modalCenter">
                    Thêm người dùng
                </button>

                <!-- Modal -->

            </div>


            <div class="table-responsive text-nowrap">
                <div v-if="get_isLoading" class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <table v-else class="table ">

                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Mã số giáo viên</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>

                        </tr>
                    </thead>

                    <tbody>


                        <tr v-for="(teacher, index) in get_list_teachers" :key="teacher._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ teacher.username }}</td>
                            <td>{{ teacher.teacher_id }}</td>

                            <td>
                                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Lilian Fuller">
                                        <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
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

                            <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                        data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <router-link :to="{ name: '', }">
                                            <a class="dropdown-item" href="javascript:void(0);"><i
                                                    class="bx bx-edit-alt me-1"></i>
                                                Edit</a>
                                        </router-link>


                                        <a @click="get_delete_study_class(study_class._id)" class="dropdown-item "
                                            href="javascript:void(0); " data-bs-toggle="modal" data-bs-target="#modalTop"><i
                                                class="bx bx-trash me-1"></i> Delete</a>
                                    </div>
                                </div>
                            </td>

                        </tr>


                    </tbody>
                </table>
            </div>



            <div class="toast-container position-fixed bottom-0 end-0 me-4" v-show="state_question_quiz_bank">
                <div id="liveToast" class="bs-toast toast fade show bg-primary" role="alert" aria-live="assertive"
                    aria-atomic="true">
                    <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">Bootstrap</div>
                        <small>11 mins ago</small>
                        <button type="button" class="btn-close" @click="close_toast()" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Bạn đã cập nhật dữ liệu thành công
                    </div>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 me-4" v-show="state_active">
                <div id="liveToast" class="bs-toast toast fade show bg-primary" role="alert" aria-live="assertive"
                    aria-atomic="true">
                    <div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">Bootstrap</div>
                        <small>11 mins ago</small>
                        <button type="button" class="btn-close" @click="close_toast()" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Bạn đã thêm thành công HD
                    </div>
                </div>
            </div>



        </div>





    </div>
    <div class="modal fade" id="modalCenter" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">

                    <span>Đã chọn {{ list_teacher_local.length }} thành viên</span>

                    <!-- <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Lilian Fuller">
                                        <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                    </li>
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Sophia Wilkerson">
                                        <img src="../assets/img/avatars/6.png" alt="Avatar" class="rounded-circle">
                                    </li>
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Christina Parker">
                                        <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle">
                                    </li>
                                </ul> -->
                </div>
                <div class="modal-body">

                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center"
                            v-for="teacher in list_teacher_local">
                            <span>
                                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Lilian Fuller">
                                        <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                    </li>
                                    <span> {{ teacher }}</span>
                                </ul>
                            </span>

                            <span @click="delete_teacher_id(teacher._id)" class="badge bg-danger"><i
                                    class='bx bx-x'></i></span>
                        </li>


                    </ul>


                    <div class="mt-3" @click.self="list_teacher = true">
                        <label for="validationServer" class="form-label">Mã số hoặc tên giáo viên</label>
                        <Field type="text" class="form-control" v-on:keyup.self="search_teacher()" name="list_teacher_id"
                            v-model="list_teacher2.data" />
                        <!-- <ErrorMessage name="list_teacher_id" class="error-feedback" />
                <span> {{ errors.list_teacher_id }} </span> -->

                        <ul v-show="list_teacher" class="list-group w-100 p-0 "
                            style="background-color: #e8eaed; width: 47.1%;">
                            <li class="list-group-item d-flex align-items-center"
                                v-for="teacher in get_all_teachers_filltered" :key="teacher._id">
                                <span @click="add_teacher_id(teacher._id)">
                                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                            class="avatar avatar-xs pull-up" title=""
                                            data-bs-original-title="Lilian Fuller">
                                            <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                        </li>
                                        <span> {{ teacher.username }}</span> <span> </span> | <span> {{
                                            teacher.teacher_id }}</span>
                                    </ul>
                                </span>
                            </li>


                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn-close" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button @click="add_list_teacher()" type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, watchEffect, watch, ref, computed, reactive } from 'vue';
// import Exam_submit_codeFormAdd from "@/components/Exam_submit_codeFormAdd.vue";
// import Exam_submit_codeFormEdit from "@/components/Exam_submit_codeFormEdit.vue";
//import CoursesCardDetail from "@/components/CoursesCardDetail.vue";
import Pagination from "@/components/Pagination.vue";
import QuestionSubmitcodeBankDetailDashboardTable from "@/components/QuestionSubmitcodeBankDetailDashboardTable.vue";
import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"


import * as yup from "yup";
import { Form, Field, ErrorMessage, } from "vee-validate";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();

import { useQuestion_quiz_bankStore } from "../stores/question_quiz_bank.js"
const { get_one_question_quiz_bank, state_question_quiz_bank } = storeToRefs(useQuestion_quiz_bankStore());
const { action_one_question_quiz_bank, action_add_id_teacher_submit_code_bank, action_all_question_quiz_banks, reset_state_question_quiz_bank, action_delete_question_quiz_bank } = useQuestion_quiz_bankStore();
import { useQuestion_quizStore } from "../stores/question_quiz.js"
const { get_all_question_quizs, get_lenght_question_quiz } = storeToRefs(useQuestion_quizStore());
const { action_all_question_quizs_by_teacher, action_list_question_quiz_by_question_bank } = useQuestion_quizStore();


import { useTeacherStore } from "../stores/teacher.js"
const { get_all_teachers, get_list_teachers } = storeToRefs(useTeacherStore());
const { action_search_teacher, action_list_teacher_by_question_bank } = useTeacherStore();





const question_quiz_bank = reactive({
    question_quiz_bank_title: " Môn công nghệ web AA",
    // question_quiz_bank_authorization: 'use',
    // question_quiz_bank_type: 'private',
    subject_id: route.query.id,
    // list_teacher_id: "",
   
});





const Form_submitcode = reactive({
    question_quiz_bank_title: yup
        .string()
        .required("Vui lòng điền trường này")
        .min(5, "Tên phải ít nhất 5 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),
    // question_quiz_bank_authorization: yup
    //     .string()
    //     .required("Vui lòng điền trường này")
    //     .min(1, "Tên phải ít nhất 5 ký tự.")
    //     .max(1200, "Tên có nhiều nhất 100 ký tự."),
    // question_quiz_bank_type: yup
    //     .string()
    //     .required("Vui lòng điền trường này")
    //     .min(1, "Tên phải ít nhất 5 ký tự.")
    //     .max(100, "Tên có nhiều nhất 100 ký tự."),






})



var productFormSchema = ref(yup.object().shape(Form_submitcode));

const list_teacher = ref(false);

const list_teacher_local = ref([]);
const list_teacher2 = reactive(
    { data: null }
)
const get_all_teachers_filltered = ref([]);
async function search_teacher() {
    list_teacher.value = true;
    console.log(list_teacher2);
    await action_search_teacher(list_teacher2.data);
    await get_all_teachers_fillter();

}
async function get_all_teachers_fillter() {
    console.log(get_all_teachers.value)
    console.log(get_list_teachers.value);
    get_all_teachers_filltered.value = get_all_teachers.value.filter((teacher) => {

        return !get_list_teachers.value.some((e) => {
            return (e._id == teacher._id)
        })
    })

}
async function add_list_teacher() {

    for (const teacher of list_teacher_local.value) {
        const teacher_id = { teacher_id_of_list: teacher._id }
        await action_add_id_teacher_submit_code_bank(route.params.id_question_bank, teacher_id)
    }
    await action_one_question_quiz_bank(route.params.id_question_bank);

    if (get_one_question_quiz_bank.value.list_teacher) {
        list_teacher_from_question_bank.value = get_one_question_quiz_bank.value.list_teacher;
    }
    else {
        list_teacher_from_question_bank.value = []
    }
    auto_close_toast();

    await action_list_teacher_by_question_bank(list_teacher_from_question_bank.value);
    var btn_close = document.getElementById('btn-close');
    btn_close.click();

}
async function delete_teacher_id(teacher_id) {
    console.log(teacher_id)

    list_teacher_local.value = list_teacher_local.value.filter((elem) => {
        return teacher_id != elem._id;
    })
    alert("Ban da xoa thanh cong")
}

async function add_teacher_id(id) {

    if (list_teacher_local.value.length != 0) {
        var check_same = false;
        list_teacher_local.value.forEach((elem) => {
            if (elem._id == id) {
                alert("Nguoi nay da ton tai")
                check_same = true;
                return
            }
        });
        if (!check_same) {
            list_teacher_local.value.push({ _id: id });
        }
    }
    else {
        console.log("c2222")
        list_teacher_local.value.push({ _id: id });
        console.log(list_teacher_local.value)
    }

}







function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_question_quiz_bank, 5000);
}

function close_toast() {
    reset_state_question_quiz_bank();
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
        name: "ExamSubmitcodeAdd",
        params: { id_topic: topic_id.value }
        // query: { id_course: route.query.id, id_topic: topic_id.value }
    }
    );
}
function emit_page(page) {
    router.push({
        params: { id_question_bank: route.params.id_question_bank },
        query: { page: page }
    }
    );
}
const list_teacher_from_question_bank = ref([]);//12

watch(route, async () => {

    
        await action_one_question_quiz_bank(route.params.id_question_bank);

        if (get_one_question_quiz_bank.value.list_teacher) {
            list_teacher_from_question_bank.value = get_one_question_quiz_bank.value.list_teacher;
        }
        else {
            list_teacher_from_question_bank.value = []
        }


        await action_list_teacher_by_question_bank(list_teacher_from_question_bank.value);
    
})



onMounted(async () => {

        await action_one_question_quiz_bank(route.params.id_question_bank);

        if (get_one_question_quiz_bank.value.list_teacher) {
            console.log(get_one_question_quiz_bank.value)
            list_teacher_from_question_bank.value = get_one_question_quiz_bank.value.list_teacher;
        } else {
            list_teacher_from_question_bank.value = []
        }

        await action_list_teacher_by_question_bank(list_teacher_from_question_bank.value);
    

})
</script>  

