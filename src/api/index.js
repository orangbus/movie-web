import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url) {
	if (app_debug){
		return "/merchant/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 电影分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieCate(params = {}) {
	return axios.get(baseUrl("cate"), {params});
}

/**
 * 电影分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieList(params = {}) {
	return axios.get(baseUrl("movie"), {params});
}

/**
 * 电影列表
 * @param id 电影id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieDetail(id) {
	return axios.get(baseUrl("detail/"+id));
}

/**
 * 网站配置
 * @returns {Promise<AxiosResponse<any>>}
 */
export function website() {
	return axios.get(baseUrl("website"));
}


