// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
// import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(VueRouter)
const router = new VueRouter({
  routes // short for routes: routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
