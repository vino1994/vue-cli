import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import wxSDK from 'weixin-js-sdk';
import WxConfig from "./js/wx-sdk";
import config from './js/config';
import ajax from './js/services/ajax';
import api from "./js/services/api";
// import animate from 'animate.css';
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import 'lib-flexible/flexible.js'

import 'weui';
import weui from 'weui.js';


Es6Promise.polyfill()
// Vue.use(animate)
Vue.use(Vuex);

window.app = Object.assign({ config: config, wx: WxConfig, ajax: ajax(), api: api ,wxSDK:wxSDK,weui:weui});
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
