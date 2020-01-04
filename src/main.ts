import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/quasar'
import './plugins/resource'

// User authorization token
const token = sessionStorage.getItem('token')
// @ts-ignore
Vue.http.headers.common['Authorization'] = token

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
