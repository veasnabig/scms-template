import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      meta: {
        // public: true,
      },
      redirect: {
        path: '/404'
      }
    },  
    {
      path: '/404',
      meta: {
        // public: true,
      },
      name: 'NotFound',
      component: () => import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/NotFound.vue`
      )
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import(`@/pages/Dashboard.vue`)
    },
    {
      path: '/student',
      name: 'Student',
      component: () => import(`@/pages/Student.vue`)
    },
    {
      path: '/courses',
      name: 'Courses',
      component: () => import(`@/pages/Courses/Courses.vue`)
    },
    {
      path:'/setting',
      name:'Setting',
      component:()=>import(`@/pages/Setting.vue`)
    }
  ]
})
