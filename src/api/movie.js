import axios from "axios";

const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url) {
	if (app_debug){
		return "/api/movie/" + url;
	}else{
		return "/" + url;
	}
}

/**
 * 视频接口
 */
export function apiList(params = {}) {
	return axios.get(baseUrl("apiList"), {params});
}

/**
 * 视频列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieList(params = {}) {
	return axios.get(baseUrl("list"), {params});
}

/**
 * 视频详情
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieDetail(id =0) {
	return axios.get(baseUrl("detail/"+id));
}

/**
 * 视频搜索
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieSearch(params={}) {
	return axios.get(baseUrl("search"),{params});
}

/**
 * 视频列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieCate(params = {}) {
	return axios.get(baseUrl("cate"), {params});
}

/**
 * 历史记录
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieHistory(params = {}) {
	return axios.get(baseUrl("history"), {params});
}

/**
 * 清空历史记录
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieHistoryClear(params = {}) {
	return axios.post(baseUrl("history/delete"), {params});
}

/**
 * [分类]收藏
 */
export function movieFavorite(params = {}) {
	return axios.get(baseUrl("favorite/list"), {params});
}
export function movieFavoriteStore(params = {}) {
	return axios.post(baseUrl("favorite/store"), {params});
}
export function movieFavoriteDelete(params = {}) {
	return axios.post(baseUrl("favorite/delete"), {params});
}
export function movieFavoriteClear(params = {}) {
	return axios.post(baseUrl("favorite/clear"), {params});
}

/**
 * 追番
 */
export function movieToday(params = {}) {
	return axios.post(baseUrl("today"), {params});
}
export function movieTodayList(params = {}) {
	return axios.get(baseUrl("today/list"), {params});
}

/**
 * 视频收藏
 */
export function movieCollect(params = {}) {
	return axios.get(baseUrl("collect/list"), {params});
}
export function movieCollectStore(params = {}) {
	return axios.post(baseUrl("collect/store"), {params});
}
export function movieCollectDelete(params = {}) {
	return axios.post(baseUrl("collect/delete"), {params});
}
export function movieCollectClear(params = {}) {
	return axios.post(baseUrl("collect/clear"), {params});
}

/**
 * 用户周更
 */
export function movieHobby(params = {}) {
	return axios.get(baseUrl("hobby/list"), {params});
}
export function movieHobbyStore(params = {}) {
	return axios.post(baseUrl("hobby/store"), {params});
}
export function movieHobbyDelete(params = {}) {
	return axios.post(baseUrl("hobby/delete"), {params});
}
