<template>
    <!-- Content wrapper -->
    <div class="content-wrapper">
        <!-- Content -->

        <div class="container-xxl flex-grow-1 container-p-y">
           

            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6 col-12 mb-4" v-for="study_class in list_study_class">

                    <router-link class="card" :to="{
                        name: 'CoursesDetailDashboard',
                        params: { id_courses: study_class._id }

                    }">


                        <div class="card-body">
                            <div class="card-title d-flex align-items-start justify-content-between">
                                <div class="avatar flex-shrink-0">
                                    <img src="../assets/img/icons/unicons/wallet-info.png" alt="Credit Card"
                                        class="rounded" />
                                </div>
                                <div class="dropdown">
                                    <button class="btn p-0" type="button" id="cardOpt6" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    
                                </div>
                            </div>
                            <span class="d-block mb-1">{{ study_class.study_class_title }}</span>
                            <!-- <h3 class="card-title text-nowrap mb-2">$2,456</h3>
                            <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> -14.82%</small> -->
                        </div>
                    </router-link>
                </div>




            </div>

            <div class="toast-container position-fixed bottom-0 end-0 me-4" v-show="state_study_class">
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


        <!-- Footer -->
        <footer class="content-footer footer bg-footer-theme">
            <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div class="mb-2 mb-md-0">
                    ©

                    , made with ❤️ by
                    <a  target="_blank" class="footer-link fw-bolder">Phuoc Vinh Lee</a>
                </div>
                <div>
                    <!-- <a href="https://themeselection.com/license/" class="footer-link me-4" target="_blank">License</a>
                    <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">More Themes</a>

                    <a href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                        target="_blank" class="footer-link me-4">Documentation</a>

                    <a href="https://github.com/themeselection/sneat-html-admin-template-free/issues" target="_blank"
                        class="footer-link me-4">Support</a> -->
                </div>
            </div>
        </footer>
        <!-- / Footer -->

        <div class="content-backdrop fade"></div>
    </div>
    <!-- Content wrapper -->
</template>


<script setup>

import { onMounted, watchEffect, watch, ref } from 'vue';
// import Exam_submit_codeFormAdd from "@/components/Exam_submit_codeFormAdd.vue";
// import Exam_submit_codeFormEdit from "@/components/Exam_submit_codeFormEdit.vue";
import CoursesTable from "@/components/CoursesTable.vue";
import Pagination from "@/components/Pagination.vue";

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'

import dashboards from '../assets/js/dashboards-analytics';

import { usePeriodStore } from "../stores/period.js"
const { get_all_periods } = storeToRefs(usePeriodStore());
const { action_all_periods } = usePeriodStore();

onMounted(() => {
    dashboards();

})

const route = useRoute();// 
import { useStudy_classStore } from "../stores/study_class.js"
const { get_one_study_class, study_classs, one_study_class, lenght, state_study_class, get_all_study_class } = storeToRefs(useStudy_classStore());
const { action_one_study_class, action_all_study_class, reset_state_study_class, action_delete_study_class } = useStudy_classStore();



import { useStudentStore } from "../stores/student.js"
const { get_all_students, get_list_students, state_student, get_one_student } = storeToRefs(useStudentStore());
const { action_search_student, action_one_student, action_login, action_list_student_by_question_bank, action_update_student, action_one_acccout_student } = useStudentStore();


function emit_page(page) {
    console.log(page);
    // action_all_study_classs(page);// click vao page o duoi 
}

function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_study_class, 5000);
}

function close_toast() {
    reset_state_study_class();
}
async function delete_study_class(id, event) {
    console.log(event);
    event.preventDefault()
    await action_delete_study_class(id);
    await action_all_study_classs(route.query.page);
    auto_close_toast();// auto dong thong bao
    const myModalEl = document.getElementById('btn-close-delete');
    myModalEl.click();// close model

}

const list_study_class = ref([]);
watch(route, async () => {

    await action_all_study_class(route.query.id);
})
onMounted(async () => {
    await action_all_study_class(route.query.id);
    console.log(get_all_study_class.value)
    await action_one_acccout_student();
   // console.log()
    list_study_class.value = get_all_study_class.value.filter((study_class) => {
        console.log("pKEee")
        let check = false;
        if(study_class.list_student){
            for (const student_id of study_class.list_student) {
            console.log(student_id)
            console.log("oke")
            if (student_id == get_one_student.value._id) {
                check = true;
            }
        }
        }
        return check;

    })
});

</script>  
<style scoped>
.bg-fff {
    background-color: #fff;
}
</style>
