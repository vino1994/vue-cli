import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers = {
    router:[{
        path: '/wx/',
        name: 'home',
        meta: {
            title: "wxsdk demo"
        },
        component: resolve => require(["../views/home"], resolve)
    },{
        path: '/wx/image',
        name: 'image',
        meta: {
            title: "imageDemo"
        },
        component: resolve => require(["../views/imageDemo"], resolve)
    },{
        path: '/wx/voice',
        name: 'voice',
        meta: {
            title: "voiceDemo"
        },
        component: resolve => require(["../views/voiceDemo"], resolve)
    },{
        path: '/wx/device',
        name: 'device',
        meta: {
            title: "deviceDemo"
        },
        component: resolve => require(["../views/deviceDemo"], resolve)
    },{
        path: '/wx/pay',
        name: 'pay',
        meta: {
            title: "payDemo"
        },
        component: resolve => require(["../views/payDemo"], resolve)
    }],

    createRouter(){
        var _this = this;
        var router = new Router({
            routes: _this.router,
			mode: 'history',
			base: __dirname,
			linkActiveClass: "router-link-active"
        });
        router.beforeEach((to, from, next) => _this.beforeEach(to, from, next));
        return router;
    },
    //访问之前的函数
	beforeEach(to, from, next) {
		// 如果页面有自己的标题就不要加上默认标题
        if(!!to.meta.title){
            document.title = to.meta.title;
        }
		next();
	},
}
export default routers.createRouter();
