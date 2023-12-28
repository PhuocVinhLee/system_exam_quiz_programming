
<template>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
            <div class="flex-grow-1 row ">
                <div class="col-9  ">

                </div>
                <!-- <div class="col-3 text-end fs-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input float-end" type="checkbox" role="switch"
                            @click="show_sort_question = !show_sort_question" v-model="show_sort_question">
                    </div>
                </div> -->
            </div>

            <div class="table-responsive text-nowrap mt-2" style="min-height: 300px;">

                <table class="table table-bordered ">

                    <thead>
                        <tr>
                            <th>STT</th>
                          
                            <th>Trạng thái</th>
                            <td>Thời gian bắt đầu</td>
                            <td>Thời gian kết thúc</td>
                            <!-- <th>Môn học</th> -->
                            <th>Thời gian làm bài</th>
                            <th>Tổng Điểm</th>
                            <th>Hành động</th>



                        </tr>
                    </thead>

                    <tbody>


                        <tr v-for="(one_exam_quiz, index) in all_result_exam_quizs_local" :key="one_exam_quiz._id">

                            <td>{{ index + 1 }}</td>
                           
                            <td>

                                <span v-if="one_exam_quiz.completed == true || one_exam_quiz.datetime_completed"
                                    class="badge bg-success">Hoàn thành</span>
                                <span v-else class="badge bg-warning">Đang diễn ra</span>
                            </td>

                            <td>{{ currentDate(one_exam_quiz.datetime_attempts) }}</td>
                            <td>{{ currentDate(one_exam_quiz.datetime_completed) }} </td>
                            <td>{{ Number((time_distance(one_exam_quiz.datetime_completed, one_exam_quiz.datetime_attempts
                            ))).toLocaleString() }} phút</td>
                            <td>{{ one_exam_quiz.mark_all }} </td>
                            <td>
                                <router-link class="btn-group" :to="{
                                    name: 'ExamQuizResultDetail',
                                   params: {id_result: one_exam_quiz._id,id_exam: route.params.id_exam, id_courses: route.params.id_courses}
                                }" >
                                    
                                    <span  class="badge bg-label-primary  " >
                                        xem lại
                                    </span>
                                     

                                </router-link>
                            </td>



                        </tr>


                    </tbody>
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
import { onMounted, onBeforeMount, ref, reactive, watchEffect, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'
import Pagination from "@/components/Pagination.vue";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();// 
import { useExam_quizStore } from "../stores/exam_quiz.js"
const { get_one_exam_quiz, exam_quizs, one_exam_quiz, lenght, state_exam_quiz_add, state_exam_quiz } = storeToRefs(useExam_quizStore());
const { action_question_from_one_exam_quiz, action_all_exam_quizs, action_update_exam_quiz, reset_state_exam_quiz, action_delete_exam_quiz } = useExam_quizStore();

import { useResult_exam_quizStore } from "../stores/result_exam_quiz.js"
const { get_all_result_exam_quizs, state_result_exam_quizs } = storeToRefs(useResult_exam_quizStore());
const { action_all_result_exam_quizs, action_all_result_exam_quizs_by_teacher, action_update_result_exam_quizs, action_one_result_exam_quizs, action_add_result_exam_quizs } = useResult_exam_quizStore();


import { useStudy_classStore } from "../stores/study_class"
const { get_one_study_class } = storeToRefs(useStudy_classStore());
const { action_one_study_class } = useStudy_classStore();

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
onBeforeMount(() => {

})
const data_chart = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const check_chart = ref(false);






function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_exam_quiz, 5000);
}

function close_toast() {
    reset_state_exam_quiz();
}
function time_distance(end_time, start_time) {// end > start
    console.log(start_time)
    console.log(end_time)
    let s = new Date(start_time);
    let e = new Date(end_time);

    console.log((e - s) / 1000 / 60);
    return ((e - s) / 1000 / 60);// minue

}
function currentDate(date_time) {
    const current = new Date(date_time);
    const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} - ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return date;
}

onBeforeMount(async () => {
    await action_one_study_class(route.params.id_courses);

})

//list_result = ref([]);
const all_result_exam_quizs_local = ref([]);
const one_exam_quiz_local = ref({});
async function map_result() {

    all_result_exam_quizs_local.value = get_all_result_exam_quizs.value.map((ele) => {


        let list_answer = [];


        for (const question of get_one_exam_quiz.value.list_question) {
            let check_question = false;
            for (const answer of ele.list_answer) {
                if (question._id == answer.question_id) {
                    check_question = true;
                    break;
                }
            }

            if (check_question == false) {
                ele.list_answer.push({
                    question_id: question._id,
                    question_title: question.question_quiz_title,
                    mark: 0
                });
            }
        }

        let mark_local = 0;
        ele.list_answer.map((a) => {
            if (a.mark == 1) {
                mark_local++;
            }



            return a;
        })
        ele.mark_all = mark_local;
        return ele;
    });

}
onMounted(async () => {
    await action_question_from_one_exam_quiz(route.params.id_exam)
    console.log(get_one_exam_quiz.value);
    await action_all_result_exam_quizs_by_teacher(route.params.id_exam)
    await map_result();
   




})
</script>  

<style scoped>
tr:hover {
    background-color: #ddd;
}
</style>
  
  