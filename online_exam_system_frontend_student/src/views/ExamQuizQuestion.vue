
<template>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel" >
            <div class="flex-grow-1 row ">
                <div class="col-9  ">
                    <router-link v-show="!show_sort_question" :to="{

                        name: '',
                        // query: { id: route.query.id }
                    }">
                        <h5 class="m-0"><button type="button" class="btn btn-primary " data-bs-toggle="modal"
                                data-bs-target="#modalToggle">
                                <i class='bx bxs-plus-circle'></i> Thêm Câu hỏi
                            </button></h5>

                    </router-link>
                </div>
                <div class="col-3 text-end fs-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input float-end" type="checkbox" role="switch"
                            @click="show_sort_question = !show_sort_question" v-model="show_sort_question">
                    </div>
                </div>
            </div>

            <div class="table-responsive text-nowrap mt-2" style="min-height: 400px;" > 

                <table v-if="!show_sort_question" class="table table-bordered " style="">

                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Nội dung</th>
                            <td>Đán áp</td>
                            <td>Đáp án đúng</td>
                            <!-- <th>Môn học</th> -->
                            <th>Chủ sỡ hữu</th>
                            <th>Mức độ</th>
                            <th>Hành động</th>



                        </tr>
                    </thead>

                    <tbody>


                        <tr v-for="(one_exam_quiz, index) in get_one_exam_quiz.list_question" :key="one_exam_quiz._id">

                            <td>{{ index + 1 }}</td>
                            <td> <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{
                                one_exam_quiz.question_quiz_title }} </strong></td>

                            <!-- <td>{{ question_quiz_bank.subject_id }}</td> -->
                            <td>
                                <div class="btn-group">
                                    <span class="badge bg-label-primary  dropdown-toggle" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        xem
                                    </span>
                                    <div class="dropdown-menu p-2 " style="width: 500px;">
                                        <span v-html="one_exam_quiz.question_quiz_describe"></span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group">
                                    <span class="badge bg-label-primary dropdown-toggle  " data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <span class="fs-7"> xem</span>
                                    </span>
                                    <div class="dropdown-menu p-2 " style="width: 500px;">
                                        <div class="p-2" v-for="answer, index in one_exam_quiz.answer" :key="index">
                                            <div class="border-bottom">
                                                <span
                                                    :class="{ 'bg-success': index == one_exam_quiz.right_answer, 'bg-primary': index != one_exam_quiz.right_answer }"
                                                    class="badge">Đáp án: {{ index + 1 }}</span>
                                                <div class="mt-2"><span v-html="answer.input"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </td>
                            <td><span class="badge bg-label-success"> Đáp án {{ parseInt(one_exam_quiz.right_answer) + 1
                            }}</span></td>
                            <td>
                                <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                    <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                        class="avatar avatar-xs pull-up" title="" data-bs-original-title="Lilian Fuller">
                                        <img src="../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                    </li>
                                    <span class="ms-1"> <strong>B1901756</strong></span>
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
                            <!-- <td>  <span class="badge bg-label-primary me-1">{{question_quiz_bank.question_quiz_bank_authorization}}</span> <span class="badge bg-label-warning me-1">write</span>
                       
                        </td> -->

                            <!-- <td>{{ question_quiz_bank.question_quiz_bank_type }} </td> -->

                            <td> <span class="badge " :class="{
                                    'bg-danger': one_exam_quiz.question_quiz_level == 'Hard',
                                    'bg-warning': one_exam_quiz.question_quiz_level == 'Medium',
                                    'bg-success': one_exam_quiz.question_quiz_level == 'Easy'
                                }">{{ one_exam_quiz.question_quiz_level
    }}</span></td>

                            <td>
                                <div class="dropdown">
                                    <button class="btn p-0" type="button" id="cardOpt4" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                        <router-link class="dropdown-item" :to="{
                                                name: '',

                                            }"> Edit</router-link>
                                        <router-link class="dropdown-item" :to="{
                                            name: '',

                                        }"> Delete</router-link>
                                        <!-- // <a class="dropdown-item" href="javascript:void(0);">View More</a>
                        // <a class="dropdown-item" href="javascript:void(0);">Delete</a> -->
                                    </div>
                                </div>
                            </td>

                        </tr>


                    </tbody>
                </table>

                <table v-else class="table table-bordered " style="">

                    <thead>
                        <tr>
                            <th>STT</th>

                            <th>Tên</th>
                            <th>Nội dung</th>
                            <th>Đán áp</th>
                            <th>Đán áp đúng</th>
                            <!-- <th>Môn học</th> -->
                            <th>Chủ sỡ hữu</th>
                            <th>Mức độ</th>
                        </tr>
                    </thead>

                    <VueDraggableNext v-model="list_question" tag="tbody" @start="drag = true" @end="drag = false">
                        <tr v-for="item in list_question" :key="item._id" >
                            <!-- <td scope="row">{{ item.id }}</td> -->
                            <td>{{ item.index + 1 }}</td>

                            <td>{{ item.question_quiz_title }}</td>
                            <td>
                                <div class="btn-group">
                                    <span class="badge bg-label-primary  dropdown-toggle" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        xem
                                    </span>
                                    <div class="dropdown-menu p-2 " style="width: 500px;">
                                        <span v-html="item.question_quiz_describe"></span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group">
                                    <span class="badge bg-label-primary dropdown-toggle  " data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <span class="fs-7"> xem</span>
                                    </span>
                                    <div class="dropdown-menu p-2 " style="width: 500px;">
                                        <div class="p-2" v-for="answer, index in item.answer" :key="index">
                                            <div class="border-bottom">
                                                <span
                                                    :class="{ 'bg-success': index == item.right_answer, 'bg-primary': index != item.right_answer }"
                                                    class="badge">Đáp án: {{ index + 1 }}</span>
                                                <div class="mt-2"><span v-html="answer.input"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </td>
                            <td><span class="badge bg-label-success"> Đáp án {{ parseInt(item.right_answer) + 1
                            }}</span></td>
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
                            <td> <span class="badge " :class="{
                                    'bg-danger': item.question_quiz_level == 'Hard',
                                    'bg-warning': item.question_quiz_level == 'Medium',
                                    'bg-success': item.question_quiz_level == 'Easy'
                                }">{{ item.question_quiz_level }}</span></td>
                        </tr>
                    </VueDraggableNext>
                </table>
                <button v-show="show_sort_question" @click="sort_question()" type="button" class="btn btn-primary">Lưu thay
                    đổi</button>

            </div>

            <div class="toast-container position-fixed bottom-0 end-0 me-4" v-show="state_exam_quiz">
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
        </div>
    </div>
    <div class="modal fade" id="modalToggle" aria-labelledby="modalToggleLabel" tabindex="-1" style="display: none;"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalToggleLabel">Chọn một hình thức thêm câu hỏi</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <h5 class=""><button @click="add_question()" type="button" class="btn btn-primary"
                            data-bs-toggle="modal" data-bs-target="#modalToggle">
                            <i class='bx bxs-plus-circle'></i> Ngân hành câu hỏi hệ thống
                        </button></h5>


                </div>
                <!-- <div class="modal-footer">
                <button class="btn btn-primary" data-bs-target="#modalToggle2" data-bs-toggle="modal"
                    data-bs-dismiss="modal">
                    Open second modal
                </button>
            </div> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onBeforeMount, ref, watchEffect } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'
import Pagination from "@/components/Pagination.vue";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();// 
import { useExam_quizStore } from "../stores/exam_quiz.js"
const { get_one_exam_quiz, exam_quizs, one_exam_quiz, lenght, state_exam_quiz_add, state_exam_quiz } = storeToRefs(useExam_quizStore());
const { action_question_from_one_exam_quiz, action_all_exam_quizs, action_update_exam_quiz, reset_state_exam_quiz, action_delete_exam_quiz } = useExam_quizStore();

import { useStudy_classStore } from "../stores/study_class"
const { get_one_study_class } = storeToRefs(useStudy_classStore());
const { action_one_study_class } = useStudy_classStore();
function emit_page(page) {
    console.log(page);
    action_all_exam_quizs(page);// click vao page o duoi 
}

function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_exam_quiz, 5000);
}

function close_toast() {
    reset_state_exam_quiz();
}
async function delete_exam_quiz(id, event) {
    console.log(event);
    event.preventDefault()
    await action_delete_exam_quiz(id);
    await action_all_exam_quizs(route.query.page);
    auto_close_toast();// auto dong thong bao
    const myModalEl = document.getElementById('btn-close-delete');
    myModalEl.click();// close model

}




function add_question() {
    router.push({
        name: 'ListQuestionQuiz',
        query: { page: 1 },
        params: { id_exam: route.params.id_exam, id_courses: route.params.id_courses, id_subject: get_one_study_class.value.subject_id, id_question_bank: 'all' }
    }
    );
}

const list_question = ref([]);
const exam_quiz = ref([])
const show_sort_question = ref(false);
async function sort_question() {
    exam_quiz.value.list_question = await list_question.value.map((question) => {
        return (question._id)
    })
    await action_update_exam_quiz(route.params.id_exam, exam_quiz.value);
    console.log(state_exam_quiz.value)
    show_sort_question.value = false;
    auto_close_toast()
    await action_question_from_one_exam_quiz(route.params.id_exam)
    exam_quiz.value = get_one_exam_quiz.value;
    list_question.value = get_one_exam_quiz.value.list_question.map((question, index) => {
        question.index = index;
        return question;
    })
}

onBeforeMount(async () => {
    await action_one_study_class(route.params.id_courses);

})

onMounted(async () => {
    await action_question_from_one_exam_quiz(route.params.id_exam)
    exam_quiz.value = get_one_exam_quiz.value;
    console.log(get_one_exam_quiz.value.list_question)
    if (get_one_exam_quiz.value.list_question) {
        list_question.value = get_one_exam_quiz.value.list_question.map((question, index) => {
            question.index = index;
            return question;
        })
    }

})
</script>  

<style scoped>
tr:hover {background-color: #ddd;}
</style>
  
  