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
      component: () => import(`@/pages/Student.vue`)
    },
    {
      path: '/courses',
      name: 'វគ្គបណ្តុះបណ្តាល',
      component: () => import(`@/pages/Courses/Courses.vue`)
    },
    {
      path:'/setting',
      name:'ការកំណត់',
      component:()=>import(`@/pages/Setting.vue`)
    }
  ]
})
