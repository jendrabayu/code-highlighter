import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import validation from './validation'
import 'bulma/css/bulma.min.css'
import './assets/css/main.css'

Vue.config.productionTip = false
validation()

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
