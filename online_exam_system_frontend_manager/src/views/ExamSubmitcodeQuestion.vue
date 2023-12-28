
<template>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">

            <router-link :to="{

                name: '',
                // query: { id: route.query.id }
            }">
                <h5 class=""><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#modalToggle">
                        <i class='bx bxs-plus-circle'></i> Thêm Câu hỏi
                    </button></h5>
            </router-link>
            <div class="table-responsive text-nowrap">
                <div v-if="isLoading" class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <table v-else class="table table-bordered " style="">

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


                        <tr v-for="(one_exam_submit_code, index) in get_one_exam_submit_code.list_question"
                      
                            :key="one_exam_submit_code._id">
                           
                            <td>{{ index + 1 }}</td>
                            <td> <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{
                                one_exam_submit_code.question_submit_code_title }} </strong></td>

                            <!-- <td>{{ question_submit_code_bank.subject_id }}</td> -->
                            <td>
                                <div class="btn-group">
                                    <span class="badge bg-label-primary  dropdown-toggle" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        xem
                                    </span>
                                    <div class="dropdown-menu p-2 " style="width: 500px;">
                                        <span v-html="one_exam_submit_code.question_submit_code_describe"></span>
                                    </div>
                                </div>
                                
                            </td>

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
                            <!-- <td>  <span class="badge bg-label-primary me-1">{{question_submit_code_bank.question_submit_code_bank_authorization}}</span> <span class="badge bg-label-warning me-1">write</span>
                       
                        </td> -->

                            <!-- <td>{{ question_submit_code_bank.question_submit_code_bank_type }} </td> -->

                            <td>  <span class="badge " :class="{
                                    'bg-danger': one_exam_submit_code.question_submit_code_level == 'Hard',
                                    'bg-warning': one_exam_submit_code.question_submit_code_level == 'Medium',
                                    'bg-success': one_exam_submit_code.question_submit_code_level == 'Easy'
                                }">{{ one_exam_submit_code.question_submit_code_level }}</span>
                                </td>
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

                    <h5 class=""><button @click="add_question()" type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#modalToggle">
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
import { onMounted, onBeforeMount } from 'vue';

import Pagination from "@/components/Pagination.vue";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();// 
import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"
const { get_one_exam_submit_code, exam_submit_codes, one_exam_submit_code, lenght, state_exam_submit_code_add } = storeToRefs(useExam_submit_codeStore());
const { action_question_from_one_exam_submit_code, action_all_exam_submit_codes, reset_state_exam_submit_code, action_delete_exam_submit_code } = useExam_submit_codeStore();

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


function add_question() {
    router.push({
        name: 'ListQuestionSubmitcode',
        query: { page: 1 },
        params: { id_exam: route.params.id_exam, id_courses: route.params.id_courses, id_subject: get_one_study_class.value.subject_id, id_question_bank: 'all' }
    }
    );
}

onBeforeMount(async () => {
    await action_one_study_class(route.params.id_courses);
})

onMounted(() => {
    action_question_from_one_exam_submit_code(route.params.id_exam)


})
</script>  
  
  