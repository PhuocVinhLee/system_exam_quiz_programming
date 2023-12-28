
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 v-if="1" class="fw-bold py-3 ">
                    <router-link :to="{
                        name: 'CoursesDetailDashboard',
                        params: { id_courses: route.params.id_courses }
                    }" class="fw-bold py-3"> {{ get_one_study_class.study_class_title }}
                    </router-link> / {{
                        get_one_exam_submit_code.exam_submit_code_title }}
                    <!-- <span v-show="route.name == 'ExamSubmitcodeEdit'">/ Thêm chủ đề</span>
                    <span v-show="route.name == 'TopicEdit'">/ {{ get_one_topic.topic_title }} </span> -->
                </h4>
            <div class="nav-align-top mb-4">
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
                        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
                            <div class="mb-2"> <span>Bắt đầu:</span> <span class="badge bg-label-primary fs-6">{{
                                currentDate(get_one_exam_submit_code.exam_submit_code_datetime_start)
                            }}</span></div>
                            <div class="mb-2"> <span>Kêt thúc:</span> <span class="badge bg-label-primary fs-6">{{
                                currentDate(get_one_exam_submit_code.exam_submit_code_datetime_end)
                            }}</span></div>
                            <div class="mb-2"> <span>Số lần làm tối đa :</span> <span class="badge bg-label-primary fs-6">{{
                                get_one_exam_submit_code.number_attempts }}</span></div>
                            <div class="mb-2"> <span>Thời gian làm bài:</span> <span class="badge bg-label-primary fs-6">{{
                                get_one_exam_submit_code.exam_submit_code_duration }} phút</span></div>
                            <!-- <div>{{ get_one_exam_quiz.exam_quiz_datetime_end }}</div>
            <div>{{ get_one_exam_quiz.exam_quiz_duration }}</div>
            <div>{{ get_one_exam_quiz.number_attempts }}</div> -->

                            <!-- <button @click="push_exam()" type="button" class="btn btn-primary">
                Thi
            </button> -->



                        </div>
                        <router-link :to="{
                            name: 'TestQuestionSubmitCode',
                            params: { id_courses: route.params.id_courses, id_exam: route.params.id_exam, question: 1 }
                        }">
                            <button type="button" class="btn btn-primary">
                                Thi
                            </button>
                        </router-link>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import Exam_submit_codeFormAdd from "@/components/Exam_submit_codeFormAdd.vue";
import Exam_submit_codeFormEdit from "@/components/Exam_submit_codeFormEdit.vue";
import ListExam_submit_code from "@/components/Exam_submit_codeTable.vue";
import Pagination from "@/components/Pagination.vue";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 

import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"
const { get_one_exam_submit_code, exam_submit_codes, one_exam_submit_code, lenght, state_exam_submit_code_add } = storeToRefs(useExam_submit_codeStore());
const { action_one_exam_submit_code, action_all_exam_submit_codes, reset_state_exam_submit_code, action_delete_exam_submit_code } = useExam_submit_codeStore();


import { useStudy_classStore } from "../stores/study_class"
const { get_one_study_class } = storeToRefs(useStudy_classStore());
const { action_one_study_class } = useStudy_classStore();

function emit_page(page) {
    console.log(page);
    action_all_exam_submit_codes(page);// click vao page o duoi 
}

function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_exam_submit_code, 5000);
}

function close_toast() {
    reset_state_exam_submit_code();
}
async function delete_exam_submit_code(id, event) {
    console.log(event);
    event.preventDefault()
    await action_delete_exam_submit_code(id);
    await action_all_exam_submit_codes(route.query.page);
    auto_close_toast();// auto dong thong bao
    const myModalEl = document.getElementById('btn-close-delete');
    myModalEl.click();// close model

}

const props = defineProps(['id'])// url/prop

function currentDate(date_time) {
    const current = new Date(date_time);
    const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} - ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return date;
}

onMounted(() => {
    action_one_exam_submit_code(route.params.id_exam)
    action_one_study_class(route.params.id_courses);

})
</script>  
  
  