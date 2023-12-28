
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">

            <!-- <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> Basic Tables</h4> -->

            <!-- add courses-->

            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">

                </div>
                <div class="card-body">



                    <div class="text-center">
                        <div class="mb-3">
                            <h4>{{ get_one_study_class.study_class_title }}</h4>
                            <span>Giáo viên: <strong>Lê Phước Vinh</strong> </span>



                        </div>

                        <h5>Bạn chưa là thành viên khóa học này</h5>

                        <div class="">
                            <span>Nhấn nút vào </span>
                            <button @click="attend()" class="btn btn-primary py-1 px-2" type="submit">Tham gia</button>
                            <span> để tham dự khóa học này.</span>
                        </div>
                    </div>




                </div>

            </div>

        </div>
    </div>
</template>
<script setup>
import * as yup from "yup";
import { Form, Field, ErrorMessage, } from "vee-validate";



import { ref, reactive, onMounted, watchEffect, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter();// 


import { useSubjectStore } from "../stores/subject.js"
const { get_all_subjects, get_all_subjects_peroid_teacher } = storeToRefs(useSubjectStore());
const { action_all_subjects, action_all_subjects_by_period_teacher } = useSubjectStore();


import { usePeriodStore } from "../stores/period.js"
const { get_all_periods } = storeToRefs(usePeriodStore());
const { action_all_periods } = usePeriodStore();

import { useStudy_classStore } from "../stores/study_class.js"
const { get_all_study_class, get_one_study_class } = storeToRefs(useStudy_classStore());
const { action_add_study_class, action_one_study_class, action_update_study_class, reset_state_study_class } = useStudy_classStore();


import { useStudentStore } from "../stores/student.js"
const { get_all_students, get_list_students, state_student, get_one_student } = storeToRefs(useStudentStore());
const { action_search_student, action_one_student, action_login, action_list_student_by_question_bank, action_update_student, action_one_acccout_student } = useStudentStore();


watchEffect(async () => {


})

function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_study_class, 5000);// thong bao se tu tat sau 5s khi submit
}




async function attend() {
    let list_student = get_one_study_class.value.list_student;
    if (!get_one_study_class.value.list_student) {
        list_student = [];
    }
    list_student.push(get_one_student.value._id);
    console.log(list_student)
    const course = get_one_study_class.value;
    course.list_student = list_student;
    await action_update_study_class(route.params.id_courses, course); // them courses vao csdl
    auto_close_toast();// tu tat thong bao
    router.push({
        name: "CoursesDetailDashboard",  
        params: {id_courses: route.params.id_courses}
    }
    );
  
}


onMounted(() => {
    action_one_study_class(route.params.id_courses);
    action_one_acccout_student();
})


// onMounted(() => {
//     action_all_coursess(1);// chu yeu de lay leght cua courses

// })
</script>  

