// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import store from './store'
import App from './App'
import router from './router'

import axios from 'axios'
axios.defaults.baseURL = "http://192.168.0.2:8000/api";
window.axios = axios;
if(localStorage.getItem("access_token",null) !=null){
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');
}

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
