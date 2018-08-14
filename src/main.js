import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import 'lib-flexible/flexible.js'
import WxConfig from "./js/wx-sdk";
import config from './js/config';
import ajax from './js/services/ajax';
import api from "./js/services/api";
import animate from 'animate.css';
import 'babel-polyfill'
import Es6Promise from 'es6-promise'


Es6Promise.polyfill()
Vue.use(animate)
Vue.use(Vuex);
Vue.use(Toast, {
    type: 'center',
    duration: 2000,
    wordWrap: true
});

window.app = Object.assign({ config: config, wx: WxConfig, ajax: ajax(), api: api });
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
