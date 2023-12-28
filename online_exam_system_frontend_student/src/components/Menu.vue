<template>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="index.html" class="app-brand-link">
        <span class="app-brand-logo demo">
          <img
            src="data:image/png;base64,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" />
        </span>

        <span class="app-brand-text demo menu-text fw-bolder ">nline Exam</span>
      </a>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
        <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- Dashboard -->
      <li class="menu-item ">
        <span @click="push_dashbroard()" class="menu-link" >

          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </span>
        <!-- <a href="index.html" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </a> -->
      </li>


      <li class="menu-item ">
        <span @click="push_coures()" class="menu-link" >

          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Khóa học của tôi</div>
        </span>
        <!-- <a href="index.html" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </a> -->
      </li>




    </ul>
  </aside>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import main_nav from '../assets/js/main.js';

import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();// 
const router = useRouter()
import { usePeriodStore } from "../stores/period.js"
const { get_all_periods } = storeToRefs(usePeriodStore());
const { action_all_periods } = usePeriodStore();



import { useSubjectStore } from "../stores/subject.js"
const { get_all_subjects, get_all_subjects_peroid_teacher } = storeToRefs(useSubjectStore());
const { action_all_subjects, action_all_subjects_by_period_teacher } = useSubjectStore();

function push_coures(){
  router.push({
        name: "Courses",
        query:{id: get_all_periods.value[0]._id}
    }
    );
}
function push_dashbroard(){
  router.push({
        name: "Dashboard",
        params:{id_semester: get_all_periods.value[0]._id}
    }
    );
}


onMounted(() => {
  main_nav()
  action_all_periods();
  action_all_subjects_by_period_teacher();

})

</script>
