import Vue from 'vue'
import App from './App.vue'
import { initialize } from './helpers/db'
import router from './router'

Vue.config.productionTip = false
initialize()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
