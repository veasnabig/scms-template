import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/404',
      name: 'រកមិនឃើញ',
      component: () => import(
        `@/pages/NotFound.vue`
      )
    },
    {
      path: '/',
      name: 'ផ្ទាំងគ្រប់គ្រង',
      component: () => import(`@/pages/Dashboard.vue`)
    },
    {
      path: '/student',
      name: 'សិស្ស',
      component: () => import(`@/pages/Student/Student.vue`)
    },
    {
      path: '/courses',
      name: 'វគ្គបណ្តុះបណ្តាល',
      component: () => import(`@/pages/Courses/Courses.vue`)
    },
    {
      path: '/subject',
      name: 'មុខវិជ្ជា',
      component: () => import(`@/pages/Subject/Subject.vue`)
    },
    {
      path: '/register',
      name: 'ចុះឈ្មោះ',
      component: () => import(`@/pages/Register/Register.vue`)
    },
    {
      path: '/teacher',
      name: 'គ្រូបង្គោល',
      component: () => import(`@/pages/Teacher/Teacher.vue`)
    },
    {
      path: '/attendance',
      name: 'អវត្តមាន',
      component: () => import(`@/pages/Attendance.vue`)
    },
    {
      path: '/teacherAttendance',
      name: 'អវត្តមាន គ្រូបង្គោល',
      component: () => import(`@/pages/TeacherAttendance/TeacherAttendance.vue`)
    },
    {
      path: '/studentAttendance',
      name: 'អវត្តមាន សិស្ស',
      component: () => import(`@/pages/StudentAttendance/StudentAttendance.vue`)
    },
    {
      path: '/user',
      name: 'អ្នកប្រើប្រាស់',
      component: () => import(`@/pages/User/User.vue`)
    },
    {
      path: '/company',
      name: 'ក្រុមហ៊ុន',
      component: () => import(`@/pages/Company/Company.vue`)
    },
    {
      path: '/setting',
      name: 'ការកំណត់',
      component: () => import(`@/pages/Setting.vue`)
    }
  ]
})
