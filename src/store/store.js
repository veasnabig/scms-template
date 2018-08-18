import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import {
  courses,
  subject,
  teacher,
  student,
  register,
  teacherAttendance,
  studentAttendance,
  examPaper,
  examScore,
  examResult,
  certificate,
  user
} from './data/index';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    routeHistorys: [],
    courses,
    subject,
    teacher,  
    student,
    register,
    teacherAttendance,
    studentAttendance,
    examPaper,
    examScore,
    examResult,
    certificate,
    user, 
    coursesSubject: [],
    temp: [],
    loginStatus:false
  },
  getters,
  mutations,
  actions
})
