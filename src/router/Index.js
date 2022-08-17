import Vue from 'vue';
import VueRouter from "vue-router";

import Index from "../components/Index/Index";
import Login from "../components/Login/Index";


import store from "../vuex/index";
import LocalStorage from "@/util/LocalStorage";


const routes = [
	{
		path: '',
		name: "Index",
		component: Index,
		meta: {
			keepAlive: true,
			required: false,
			title: ''
		}
	},
	{
		path: '/detail/:id',
		name: "Detail",
		component: require('../components/Index/Detail.vue').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '详情'
		}
	},
	{
		path: "/user",
		name: "User",
		component: require('../components/User/Index.vue').default,
		meta: {
			keepAlive: false,
			required: true,
			title: '个人中心'
		}
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: {
			keepAlive: false,
			required: false,
			title: '登录'
		}
	}
];
Vue.use(VueRouter);

const router = new VueRouter({
	// mode:'history',
	routes
});

router.beforeEach((to, from, next) => {
	let from_url = from.fullPath;
	if (to.meta.required) {
		let token = LocalStorage.get("access_token");
		if (!token) {
			return next("/login?redirect=" + encodeURI(from_url));
		}
	}
	// 设置子标题
	store.commit("setSubtitle", to.meta.title)

	return next();
})

export default router;
