
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">

            <div class="">


                <!-- <h4 v-if="1" class="fw-bold py-3 "><span>{{  }}</span> {{ get_one_question_submit_code_bank.question_submit_code_bank_title }}
                    <span v-show="route.name == 'TopicAdd'">/ Thêm chủ đề</span>
                    <span v-show="route.name == 'TopicEdit'">/ {{  }} </span>
                </h4> -->

                <div class="nav-align-top mb-4">

                    <div class="d-flex mb-4">
                        <div class="me-3 ">
                            <router-link class="d-block" :to="{
                                name: 'PeriodAdd'
                            }">
                                <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
                                <label class="btn btn-primary" for="btn-check">Thêm học kỳ</label>
                            </router-link>

                        </div>
                        <div class=" ">
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">

                                    <div class="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button"
                                            class="btn btn-outline-primary  dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            All
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="">

                                            <a class="dropdown-item" href="javascript:void(0);">Dropdown link</a>
                                            <a class="dropdown-item" href="javascript:void(0);">Dropdown link</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
                            <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalToggle">
                          Launch modal
                        </button> -->

                            <!-- <Form @submit="submit()" class="row  " id="courses_add" :validation-schema="study_classFormSchema"
                    v-slot="{ errors }">

                    <div class="col-md-5 mb-3">
                        <label for="validationServer" class="form-label">Ngan hang cau hoi</label>
                        <Field class="form-select" as="select" name="period_id" aria-label="select coursesple"
                            v-model="question_bank_local._id">
                            <option v-show="false" value="" disabled>Vui lòng chọn môn thi</option>
                            <option value="all">Ngân hàng hệ thống</option>
                            <option v-for="question_bank in get_all_question_submit_code_banks" :key="question_bank._id"
                                :value="question_bank._id"> {{
                                    question_bank.question_submit_code_bank_title }}</option>

                        </Field>
                        <ErrorMessage name="period_id" class="error-feedback" />
                    </div>
                </Form> -->


                            <div class="table-responsive text-nowrap">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Stt</th>
                                            <th>Tên môn học kỳ</th>
                                            <th>Năm học</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-border-bottom-0">
                                        <tr v-for=" period, index in get_all_periods" :key="period._id">

                                            <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>
                                                    {{ index + 1 }}</strong>
                                            </td>
                                            <td>{{ period.semester }}</td>

                                            <td>{{ period.school_year }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bx bx-dots-vertical-rounded"></i>
                                                    </button>
                                                    <div class="dropdown-menu">
                                                        <router-link class="dropdown-item" :to="{
                                                            name: 'PeriodEdit',
                                                            params: { period_id: period._id }
                                                        }">
                                                            <i class="bx bx-edit-alt me-1"></i> Edit
                                                        </router-link>

                                                        <a class="dropdown-item" href="javascript:void(0);"><i
                                                                class="bx bx-trash me-1"></i> Delete</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>


                            <div class="toast-container position-fixed bottom-0 end-0 me-4" v-show="state_period">
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
    </div>
</template>

<script setup>
import { onMounted, watchEffect, watch, ref, computed, reactive } from 'vue';
// import Exam_submit_codeFormAdd from "@/components/Exam_submit_codeFormAdd.vue";
// import Exam_submit_codeFormEdit from "@/components/Exam_submit_codeFormEdit.vue";
//import CoursesCardDetail from "@/components/CoursesCardDetail.vue";

import * as yup from "yup";
import { Form, Field, ErrorMessage, } from "vee-validate";
import Pagination from "@/components/Pagination.vue";
import QuestionSubmitcodeBankDetailDashboardTable from "@/components/QuestionSubmitcodeBankAddDetailDashboardTable.vue";
import { useExam_submit_codeStore } from "../stores/exam_submit_code.js"
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();

import { usePeriodStore } from "../stores/period.js"
const { get_all_periods, get_all_periods_peroid_teacher, state_period } = storeToRefs(usePeriodStore());
const { action_all_periods, action_all_periods_by_period_teacher } = usePeriodStore();

onMounted(async () => {
    await action_all_periods();
    console.log(get_all_periods.value);
})

</script>  

