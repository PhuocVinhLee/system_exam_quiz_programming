
<template>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
            <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalToggle">
                          Launch modal
                        </button> -->

            <!-- <Form @submit="submit()" class="row  " id="courses_add" :validation-schema="study_classFormSchema"
                    v-slot="{ errors }">

                    <div class="col-md-5 mb-3">
                        <label for="validationServer" class="form-label">Ngan hang cau hoi</label>
                        <Field class="form-select" as="select" name="subject_id" aria-label="select coursesple"
                            v-model="question_bank_local._id">
                            <option v-show="false" value="" disabled>Vui lòng chọn môn thi</option>
                            <option value="all">Ngân hàng hệ thống</option>
                            <option v-for="question_bank in get_all_question_quiz_banks" :key="question_bank._id"
                                :value="question_bank._id"> {{
                                    question_bank.question_quiz_bank_title }}</option>

                        </Field>
                        <ErrorMessage name="subject_id" class="error-feedback" />
                    </div>
                </Form> -->
          
                <h5 class=""><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#modalToggle">
                        <i class='bx bxs-plus-circle'></i> Thêm Câu hỏi
                    </button></h5>
      
            <div class="table-responsive text-nowrap">
                <QuestionQuizBankDetailDashboardTable></QuestionQuizBankDetailDashboardTable>
                <Pagination :lenght="get_lenght_question_quiz" @page="emit_page"></Pagination> <!-- chan trang -->
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




    <!-- <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Exam/</span> Exam_submit_code</h4> -->
    <!-- list exam_submit_code -->


    <div class="mt-3">
        <!-- Button trigger modal -->
        <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTop">
            Launch modal
        </button> -->

        <!-- Modal -->
        <!-- <div class="modal modal-top fade" id="modalTop" tabindex="-1">
                    <div class="modal-dialog">
                        <form class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalTopTitle">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col mb-3">
                                        <p>Bạn có chắc chắn nuốn xóa <span class="badge bg-label-dark">{{
}} </span>? </p>
                                    </div>
                                </div>
                                <div class="row g-2">

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" id="btn-close-delete"
                                    data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" class="btn btn-primary"
                                    @click="delete_exam_submit_code(get_one_exam_submit_code._id, $event)">Save</button>
                            </div>
                        </form>
                    </div>
                </div> -->
    </div>
    <div class="mt-3">


        <!-- Modal 1-->
        <div class="modal fade" id="modalToggle" aria-labelledby="modalToggleLabel" tabindex="-1" style="display: none;"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalToggleLabel">Chọn một hình thức thêm câu hỏi</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <router-link :to="{
                            name: 'QuestionQuizBankAddDetail',
                            params:{id_subject: route.params.id_subject, id_question_bank: route.params.id_question_bank, id_question_bank2: route.params.id_question_bank},
                             query: { page: 1}
                        }">
                            <h5  class=""><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#modalToggle">
                                    <i class='bx bxs-plus-circle'></i> Ngân hàng câu hỏi
                                </button></h5>
                        </router-link>
                        <router-link :to="{

                            name: 'QuestionQuizAdd',
                            // query: { id: route.query.id }
                            params: { id_subject: route.params.id_subject,id_question_bank: route.params.id_question_bank }
                        }">
                            <h5 class=""><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#modalToggle">
                                    <i class='bx bxs-plus-circle'></i> Thêm một câu hỏi mới
                                </button></h5>
                        </router-link>
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
        <!-- Modal 2-->
        <div class="modal fade" id="modalToggle2" aria-labelledby="modalToggleLabel2" tabindex="-1" style="display: none;"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalToggleLabel2">Chọn một thể loại thi</h5>
                        <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="demo-inline-spacing">

                            <button @click=" push_examsubmitcode_add()" type="button" class="btn btn-outline-primary">
                                Submit code </button>

                            <button type="button" class="btn btn-outline-secondary">Trắc nghiệm</button>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#modalToggle" data-bs-toggle="modal"
                            data-bs-dismiss="modal">
                            Back to first
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, watchEffect, watch, ref, computed , onBeforeMount} from 'vue';
// import Exam_submit_codeFormAdd from "@/components/Exam_submit_codeFormAdd.vue";
// import Exam_submit_codeFormEdit from "@/components/Exam_submit_codeFormEdit.vue";
//import CoursesCardDetail from "@/components/CoursesCardDetail.vue";
import Pagination from "@/components/Pagination.vue";
import QuestionQuizBankDetailDashboardTable from "@/components/QuestionQuizBankDetailDashboardTable.vue";
import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();

import { useQuestion_quiz_bankStore } from "../stores/question_quiz_bank.js"
const { get_one_question_quiz_bank,get_all_question_quiz_banks, state_question_quiz_bank } = storeToRefs(useQuestion_quiz_bankStore());
const { action_one_question_quiz_bank, action_all_question_quiz_banks, reset_state_question_quiz_bank, action_delete_question_quiz_bank } = useQuestion_quiz_bankStore();
import { useQuestion_quizStore } from "../stores/question_quiz.js"
const { get_all_question_quizs,get_lenght_question_quiz } = storeToRefs(useQuestion_quizStore());
const { action_all_question_quizs_by_teacher, action_list_question_quiz_by_question_bank } = useQuestion_quizStore();




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



function emit_page(page) {
    router.push({
        params: { id_question_bank: route.params.id_question_bank },
        query: { page: page }
    }
    );
}
const list_question = ref([]);//12

watch(route, async () => {

        await action_one_question_quiz_bank(route.params.id_question_bank);
        
        if (get_one_question_quiz_bank.value.list_question) {
    
            list_question.value = await get_one_question_quiz_bank.value.list_question.filter((question_id, index) => {
                if (index + 1 <= route.query.page * 9 && index + 1 > (route.query.page - 1) * 9) {// 28 // 7 .7.7.7 14.. 21
                    return question_id;
                }// sai cho map
            });
        }
        else {
            list_question.value = []
        }
    
        await action_list_question_quiz_by_question_bank(list_question.value,get_one_question_quiz_bank.value.list_question);

})

onBeforeMount(() => {
    action_all_question_quiz_banks(route.params.id_subject);
})

onMounted(async () => {

   
        await action_one_question_quiz_bank(route.params.id_question_bank);// get arr question
        console.log(get_one_question_quiz_bank.value)
        if (get_one_question_quiz_bank.value.list_question) {
         //   lenght_list_question.value = get_one_question_quiz_bank.value.list_question.length;// lenght arr question
            list_question.value = await get_one_question_quiz_bank.value.list_question.filter((question_id, index) => {// get arr question on a page
                if (index + 1 <= route.query.page * 9 && index + 1 > (route.query.page - 1) * 9) {// 28 // 7 .7.7.7 14.. 21
                    return question_id;
                }
            });
        }
        else {
     
            list_question.value = []
        }
        //console.log(list_question.value)
        await action_list_question_quiz_by_question_bank(list_question.value,get_one_question_quiz_bank.value.list_question);// get detail a question in arr question
   console.log(get_all_question_quizs.value);
})
</script>  

