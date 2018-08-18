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
      path: '/login',
      name: 'ចូលប្រើប្រាស់',
      component: () => import(
        `@/pages/Login/Login.vue`
      )
    },

    // {
    //   path: '/',
    //   redirect: {
    //     name: "login"
    //   }
    // },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import(
    //     `@/pages/Login/Login.vue`
    //   )
    // },

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
      path: '/exam',
      name: 'ពត៌មានការប្រឡង',
      component: () => import(`@/pages/Exam.vue`)
    },
    {
      path: '/examPaper',
      name: 'វិញ្ញាសារប្រឡង',
      component: () => import(`@/pages/ExamPaper/ExamPaper.vue`)
    },
    {
      path: '/examScore',
      name: 'បញ្ជូលពិន្ទុ',
      component: () => import(`@/pages/ExamScore/ExamScore.vue`)
    },
    {
      path: '/examResult',
      name: 'លទ្ធផលប្រឡង',
      component: () => import(`@/pages/ExamResult/ExamResult.vue`)
    },
    {
      path: '/certificate',
      name: 'ចេញវិញ្ញាបនបត្រ',
      component: () => import(`@/pages/Certificate/Certificate.vue`)
    },
    {
      path: '/report',
      name: 'របាយការណ៍',
      component: () => import(`@/pages/Report.vue`)
    },
    {
      path: '/coursesReport',
      name: 'របាយការណ៍ ពត៌មានវគ្គសិក្សា',
      component: () => import(`@/pages/Report/CoursesReport.vue`)
    },
    {
      path: '/teacherReport',
      name: 'របាយការណ៍ ពត៌មានគ្រូបង្គោល',
      component: () => import(`@/pages/Report/TeacherReport.vue`)
    },
    {
      path: '/studentReport',
      name: 'របាយការណ៍ ពត៌មានសិស្ស',
      component: () => import(`@/pages/Report/StudentReport.vue`)
    },
    {
      path: '/teacherAttendanceReport',
      name: 'របាយការណ៍ អវត្តមានគ្រូបង្គោល',
      component: () => import(`@/pages/Report/TeacherAttendanceReport.vue`)
    },
    {
      path: '/studentAttendanceReport',
      name: 'របាយការណ៍ អវត្តមានសិស្ស',
      component: () => import(`@/pages/Report/StudentAttendanceReport.vue`)
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
