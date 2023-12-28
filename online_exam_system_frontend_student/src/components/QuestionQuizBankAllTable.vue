<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();
import { storeToRefs } from 'pinia'
import { useQuestion_quiz_bankStore } from "../stores/question_quiz_bank.js"
import { useSubjectStore } from "../stores/subject.js"
import { RouterLink } from "vue-router";
const question_quiz_bankStore = useQuestion_quiz_bankStore();
const subjectStore = useSubjectStore();
const { get_one_question_quiz_bank, question_quiz_banks, one_question_quiz_bank, lenght, get_all_question_quiz_banks } = storeToRefs(useQuestion_quiz_bankStore());

function get_delete_question_quiz_bank(id) {
    question_quiz_bankStore.action_one_question_quiz_bank(id);// lay du lieu cho model delete
}




</script>
<template>
    <div class="table-responsive text-nowrap">
        <div v-if="question_quiz_bankStore.isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <table v-else class="table table-bordered">

            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <!-- <th>Môn học</th> -->
                    <th>Chủ sỡ hữu</th>
                    <th>Hành động</th>
                  
                </tr>
            </thead>

            <tbody>

                <tr v-for="(question_quiz_bank, index) in get_all_question_quiz_banks"
                    :key="question_quiz_bank._id">

                    <td>{{ index + 1 }}</td>
                    <td> <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{
                        question_quiz_bank.question_quiz_bank_title }} </strong></td>

                    <!-- <td>{{ question_quiz_bank.subject_id }}</td> -->

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
                    <!-- <td>  <span class="badge bg-label-primary me-1">{{question_quiz_bank.question_quiz_bank_authorization}}</span> <span class="badge bg-label-warning me-1">write</span>
                       
                        </td> -->

                    <!-- <td>{{ question_quiz_bank.question_quiz_bank_type }} </td> -->



                    <td>
                        <routerLink :to="{
                            name: 'QuestionQuizBankDetailDashboard',
                            params: { id_subject: route.params.id_subject,id_question_bank: question_quiz_bank._id },
                            query:{page: 1}
                        }" type="button" class="btn btn-primary">
                           
                            <span>View</span>
                        </routerLink>
                    </td>
                    <!-- <td>
                        <button :to="{
                            name: 'QuestionSubmitcodeBankDetailDashboard',
                            params: { id_question_bank: question_quiz_bank._id }
                        }" type="button" class="btn rounded-pill btn-icon btn-outline-secondary">
                            <span class="tf-icons bx bx-bell"></span>
                        </button>
                    </td> -->
                </tr>


            </tbody>
        </table>
    </div>
</template>
<style scoped></style>