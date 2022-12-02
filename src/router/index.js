import Vue from 'vue';
import VueRouter from "vue-router";

import Index from "../components/index/index";
import Login from "../components/login/Index";


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
		component: require('../components/index/Detail.vue').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '详情'
		}
	},
	{
		path: "/user",
		name: "User",
		component: require('../components/user/Index.vue').default,
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
	},
	{
		path: "/search",
		name: "Search",
		component: require('../components/index/search').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '聚合搜索'
		}
	},
	{
		path: "/article",
		name: "Article",
		component: require('../components/article/index').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '文章'
		}
	},
	{
		path: "/photo",
		name: "photo",
		component: require('../components/photo/index').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '图片'
		}
	},
	{
		path: "/video",
		name: "video",
		component: require('../components/video/index').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '视频'
		}
	},
	{
		path: "/code",
		name: "Code",
		component: require('../components/app/code/index').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '活码'
		}
	},
	{
		path: "/player",
		name: "player",
		component: require('../components/app/player/index').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '视频解析'
		}
	},
	{
		path: "/m3u8",
		name: "m3u8",
		component: require('../components/app/m3u8/index').default,
		meta: {
			keepAlive: false,
			required: false,
			title: 'm3u8播放器'
		}
	},

	{
		path: "/templet",
		component: require('../components/templet/index.vue').default,
		meta: {
			keepAlive: false,
			required: false,
			title: '模板'
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
