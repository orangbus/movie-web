import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url) {
	if (app_debug){
		return "/api/video/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 视频接口
 */
export function apiList(params = {}) {
	return axios.get(baseUrl("api"), {params});
}

/**
 * 视频列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function videoList(params = {}) {
	return axios.get(baseUrl("list"), {params});
}

