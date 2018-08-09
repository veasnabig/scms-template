import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import {courses,subject} from './data/index';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    routeHistorys: [],
    courses,
    subject, 
    coursesSubject:[],
    temp:[]
  },
  getters,
  mutations,
  actions
})
