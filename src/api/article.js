import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url="") {
	if (app_debug){
		return "/api/article/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 文章列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function articleList(params = {}) {
	return axios.get(baseUrl("list"), params);
}

/**
 * 分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function articleCate(params = {}) {
	return axios.get(baseUrl("cate"), params);
}



