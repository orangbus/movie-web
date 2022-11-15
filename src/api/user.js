import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url="") {
	if (app_debug){
		return "/api/user/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 用户信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userInfo() {
	return axios.get(baseUrl());
}

/**
 * 修改用户信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function userStore(params = {}) {
	return axios.post(baseUrl("store"), params);
}



