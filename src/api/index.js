import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url) {
	if (app_debug){
		return "/api/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 免费电影列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function freeMovieList(params = {}) {
	return axios.get(baseUrl("free/list"), {params});
}

/**
 * 电影分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function freeMovieCate(params = {}) {
	return axios.get(baseUrl("free/cate"), {params});
}

/**
 * 会员解析解析
 */
export function jiexiList(params = {}) {
	return axios.get(baseUrl("jiexi"), {params});
}

/**
 * m3u8 解析列表
 */
export function m3u8List(params = {}) {
	return axios.get(baseUrl("m3u8List"), {params});
}

//
// /**
//  * 电影列表
//  * @param id 电影id
//  * @returns {Promise<AxiosResponse<any>>}
//  */
// export function movieDetail(id) {
// 	return axios.get(baseUrl("detail/"+id));
// }
//
// /**
//  * 电影接口
//  * @returns {Promise<AxiosResponse<any>>}
//  */
// export function movieApiList() {
// 	return axios.get(baseUrl("apiList"));
// }

/**
 * 网站配置
 * @returns {Promise<AxiosResponse<any>>}
 */
export function website() {
	return axios.get(baseUrl("website"));
}

/**
 * 登录注册
 */
export function login(data={}) {
	return axios.post(baseUrl("login"),data);
}
export function register(data={}) {
	return axios.post(baseUrl("register"),data);
}


