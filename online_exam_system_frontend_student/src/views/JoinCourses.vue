
<template>
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">


            <div class="card">

                <div class="card-body ">
                    <div class="text-center mb-4"><h5>{{ get_one_study_class.study_class_title }}</h5>
                    <p>{{ get_one_study_class.study_class_describe }}
                    Khóa học vể môn Công nghệ web, học phần này sẽ giúp các em tìm hiểu sâu về web động</p>
                    <p>Giáo viên: {{get_one_teacher.username }}</p></div>

                    <div class="text-center"> <button type="button" class="btn btn-primary">Ghi danh tôi</button>
                    </div>


                </div>

                <!-- </div> -->

            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
import { useTeacherStore } from "../stores/teacher.js"
const { get_one_teacher } = storeToRefs(useTeacherStore());
const { action_one_teacher } = useTeacherStore();

import { useStudy_classStore } from "../stores/study_class.js"
const { get_one_study_class, study_classs, one_study_class, lenght, state_study_class } = storeToRefs(useStudy_classStore());
const { action_one_study_class, action_all_study_class, reset_state_study_class, action_delete_study_class } = useStudy_classStore();



function auto_close_toast() {
    const myTimeout = setTimeout(reset_state_exam_submit_code, 5000);
}

function close_toast() {
    reset_state_exam_submit_code();
}


onMounted(async() => {
    await action_one_study_class(route.params.id_courses);
    console.log(get_one_study_class.value)
    await action_one_teacher(get_one_study_class.value.teacher_id);
    console.log(get_one_teacher.value)
 //   action_one_teacher();

})
</script>  

