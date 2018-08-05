// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Vuelidate from 'vuelidate';
import "vue-snotify/styles/material.css";

// scms icon
// import "./icons/icon.css";

// font-family
import "./styles/fonts.css";

// scss file
import "./styles/index.scss";

import Snotify, { SnotifyPosition } from 'vue-snotify'
import {
  store
} from '../src/store/store.js';

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(Snotify, options);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
