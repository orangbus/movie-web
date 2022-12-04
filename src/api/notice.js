import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url="") {
	if (app_debug){
		return "/api/notice/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 消息列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function noticeTop(params = {}) {
	return axios.get(baseUrl(""), {params});
}

/**
 * 消息列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function noticeList(params = {}) {
	return axios.get(baseUrl("list"), {params});
}



