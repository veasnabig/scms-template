import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    routeHistorys: []
  },
  getters: {
    getRoute(state) {
      return state.routeHistorys;
    }
  },
  mutations: {
    addRouteHistory(state, route) {
      const existRoute  = state.routeHistorys.filter(o => o.name === route.name)
      if(existRoute.length === 0){
        state.routeHistorys.push(route);
      }
    },
    removeRouteHistory(state,route){
        const routeHistory = state.routeHistorys.find(o=>o.name===route.name);
        state.routeHistorys.splice(state.routeHistorys.indexOf(routeHistory), 1);
    },
    removeAllRouteHistory(state){
      state.routeHistorys=[];
    }
  }
})
