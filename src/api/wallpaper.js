import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url) {
	if (app_debug){
		return "/api/wallpaper/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 壁纸列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function wallpaperList(params = {}) {
	return axios.get(baseUrl("list"), {params});
}





