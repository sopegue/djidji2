import Vue from 'vue'
import VueProgressBar from 'vue-progressbar';
import App from './App.vue'
import router from './router'

import store from './store'
import Vuesax from 'vuesax'
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})
import {func} from './myfunction.js'
Vue.prototype.$func = func
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import EasySlider from 'vue-easy-slider'
import ZoomBox from 'vue-zoombox'
import Axios from 'axios'
import Notifications from 'vue-notification'
Vue.prototype.$http = Axios;
const  accessToken  =  localStorage.getItem('access_token')
Vue.use(Notifications)

if (accessToken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] =  accessToken
}

import Vuetify from 'vuetify'
Vue.use(Vuetify)
Vue.use(EasySlider)
Vue.config.productionTip = false
const options = {
  color: '#004E66', //normal color for progress bar
  failedColor: 'red', //color for failed progress bar
  height: '40px', //height of progress bar can be changed here
}
Vue.use(VueProgressBar, options);
Vue.use(ZoomBox);
new Vue({
  router,
  store,
  render: h => h(App),
  vuetify: new Vuetify(),
}).$mount('#app')