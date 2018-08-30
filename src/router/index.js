import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers = {
    router:[{
        path: '/wx/wxDemo',
        name: 'demo',
        meta: {
            title: "demo"
        },
        component: resolve => require(["../views/demo"], resolve)
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
