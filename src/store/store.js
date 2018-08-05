import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';
import {courses} from './data/index';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    routeHistorys: [],
    courses
  },
  getters,
  mutations
})
