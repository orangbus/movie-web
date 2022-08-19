import Vue from 'vue'
import App from './App.vue'

import vuetify from '@/plugins/vuetify'
const app_key = process.env.VUE_APP_KEY;

// 滚动加载
import infiniteScroll from "vue-infinite-scroll"
import LocalStorage from "@/util/LocalStorage";

Vue.config.productionTip = false;

Vue.use(infiniteScroll)

// 路由
import Vuex from "vuex";
import VuexAxios from "vue-axios"
import axios from "axios"
import router from "./router/index";
import store from "./vuex/index"


// 请求拦截
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 更新token值
	config.headers.common['Authorization'] = 'Bearer ' + LocalStorage.get("access_token");
	// 加密字符串
	config.headers.common['App_key'] = app_key;
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	let status = response.data.code;
	switch (status) {
		case 200:
			return response.data;
			// eslint-disable-next-line no-unreachable
			break;
		case 202:
			return response.data;
			// eslint-disable-next-line no-unreachable
			break;
		case 419:
			return router.push({path: '/login'});
			// eslint-disable-next-line no-unreachable
			break;
	}
	return response;
}, function (error) {
	// Message.closeAll();
	const code = error.response.status;
	// 对响应错误做点什么
	console.log("请求出错了")
	console.log(error.response)
	switch (code) {
		case 419:
			router.push({path: "/"})
			break;
		default:
			router.push({path: "/"})
	}
	return Promise.reject(error);
});

Vue.use(Vuex, VuexAxios, axios)

// mdui
import "mdui/dist/css/mdui.min.css"

// 图片放大
import "viewerjs/dist/viewer.css"
import VueViewer from 'v-viewer'

Vue.use(VueViewer);

// 自定义样式
import "./assets/css/orangbus.css"


new Vue({
	vuetify,
	router,
	store,
	render: h => h(App),
}).$mount('#app')
