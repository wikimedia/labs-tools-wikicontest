import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import interceptor from "./api/interceptor";

import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'

Vue.component('datetime', Datetime);

interceptor();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
