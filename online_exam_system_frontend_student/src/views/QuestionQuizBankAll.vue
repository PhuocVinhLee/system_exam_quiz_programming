
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">

            <div class="">

                <div class="nav-align-top mb-4">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item ">
                            <router-link type="button" class="nav-link"
                                :class="{ active: route.name == 'QuestionSubmitCodeBankAll' }" :to="{
                                    name: 'QuestionSubmitCodeBankAll',
                                 
                                    params: {id_subject: route.params.id_subject}
                                }">

                                Submitcode
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link type="button" class="nav-link " :class="{ active: route.name == 'QuestionQuizBankAll' }" :to="{
                                name: 'QuestionQuizBankAll',
                                params: {id_subject: route.params.id_subject}
                            }">
                                Trắc nghiệm
                            </router-link>
                        </li>
                    </ul>

                    <div class="tab-content ">

                        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">

                            <div class="">
                                <router-link :to="{
                                    name: 'QuestionQuizBankAdd',
                                    query: { id: route.params.id_subject }
                                }">
                                    <h5 class="card-header"><button type="button" class="btn btn-primary">
                                            <i class='bx bxs-plus-circle'></i> Thêm Ngân Hảng Câu Hỏi TN
                                        </button></h5>
                                </router-link>

                                <QuestionQuizBankAllTable style="min-height: 450px;"></QuestionQuizBankAllTable>
                                <!-- edit exam_submit_code-->
                            </div>





                            <Pagination :lenght="lenght" @page="emit_page"></Pagination> <!-- chan trang -->

                            <div class="toast-container position-fixed bottom-0 end-0 me-4"
                                v-show="state_question_quiz_bank">
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
                <div class="modal modal-top fade" id="modalTop" tabindex="-1">
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
                                            get_one_question_quiz_bank.question_quiz_bank_title }}
                                            </span>? </p>
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
                                    @click="delete_question_quiz_bank(get_one_question_quiz_bank._id, $event)">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>
<script setup>
import { onMounted, watchEffect } from 'vue';

// import ExamFormEdit from "@/components/ExamFormEdit.vue";
import QuestionQuizBankAllTable from "@/components/QuestionQuizBankAllTable.vue";
import Pagination from "@/components/Pagination.vue";
import { useQuestion_quiz_bankStore } from "../stores/question_quiz_bank.js"
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();

import { VCodeMirror } from 'vue3-code-mirror'
import 'codemirror/mode/python/python.js'
import 'codemirror/lib/codemirror.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/closebrackets.js'
import "codemirror/theme/dracula.css";

const { get_one_question_quiz_bank, question_quiz_banks, one_question_quiz_bank, lenght, state_question_quiz_bank } = storeToRefs(useQuestion_quiz_bankStore());
const { action_one_question_quiz_bank, action_all_question_quiz_banks, reset_state_question_quiz_bank, action_delete_question_quiz_bank } = useQuestion_quiz_bankStore();


function emit_page(page) {
    router.push({
        name: "QuestionSubmitCodeBank", query: { id: route.query.id, page: page }
    }
    );
}

function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_question_quiz_bank, 5000);
}

function close_toast() {
    reset_state_question_quiz_bank();
}
async function delete_question_quiz_bank(id, event) {

    event.preventDefault()
    await action_delete_question_quiz_bank(id);
    await action_all_question_quiz_banks(route.query.id, route.query.page);
    auto_close_toast();// auto dong thong bao
    const myModalEl = document.getElementById('btn-close-delete');
    myModalEl.click();// close model

}

watchEffect(() => {
    action_all_question_quiz_banks(route.params.id_subject);
})
onMounted(()=>{
    action_all_question_quiz_banks(route.params.id_subject);
})
</script>  
