import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import element from 'element-ui'
import router from './router/index'
Vue.config.productionTip = false
Vue.use(element)
require('@/api/mock.js')
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
