import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url) {
	if (app_debug){
		return "/api/live/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 免费电影列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function liveCodeList(params = {}) {
	return axios.get(baseUrl("live/list"), {params});
}


