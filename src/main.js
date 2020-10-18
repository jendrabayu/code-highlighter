import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import validation from './validation'
import toast from 'cxlt-vue2-toastr'
import 'bulma/css/bulma.min.css'
import './assets/css/main.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'


Vue.config.productionTip = false
validation()

var toastrConfigs = {
  position: 'top right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true
}
Vue.use(toast, toastrConfigs)

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
