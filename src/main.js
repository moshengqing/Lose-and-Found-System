// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import router from './router'
import flex from 'raziel-flex'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VCharts from 'v-charts'
Vue.use(VCharts)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts


//解决手机端promiss问题
import 'babel-polyfill';
import Promise from 'es6-promise'
Promise.polyfill()
Vue.use(ViewUI);
Vue.use(Vuex)
flex(600);
Vue.prototype.$axios = axios 

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
