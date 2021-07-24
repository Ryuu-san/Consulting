import Vue from 'vue'
import Vuex from 'vuex';
import App from './app.vue'

import storage from './components/store/store'

Vue.use(Vuex);

Vue.component('patient', require('./components/entities/patient/patient.vue').default);
Vue.component('consultation', require('./components/entities/consultation/consultation.vue').default);

const store = new Vuex.Store(storage);

Vue.config.productionTip = false

const app = new Vue({
    store,
    render: h => h(App),
}).$mount('#app')