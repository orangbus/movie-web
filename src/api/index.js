import axios from "axios";

function baseUrl(url) {
	return "/api/" + url;
}

/**
 * 电影分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieCate(params = {}) {
	return axios.get(baseUrl("movie/cate"), {params});
}

/**
 * 电影分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieList(params = {}) {
	return axios.get(baseUrl("movie/list"), {params});
}

/**
 * 电影列表
 * @param id 电影id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function movieDetail(id) {
	return axios.get(baseUrl("movie/detail/"+id));
}

/**
 * 网站配置
 * @returns {Promise<AxiosResponse<any>>}
 */
export function website() {
	return axios.get(baseUrl("website"));
}


