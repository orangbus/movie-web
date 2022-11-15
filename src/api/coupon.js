import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url="") {
	if (app_debug){
		return "/api/coupon/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 激活码
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function couponStore(params = {}) {
	return axios.post(baseUrl(), params);
}

/**
 * 激活码使用记录
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function couponLog(params = {}) {
	return axios.get(baseUrl("log"), {params});
}



