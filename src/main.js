import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import router from './router';
import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueRouter)
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')