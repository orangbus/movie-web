import axios from "axios";

function baseUrl(url) {
	return "/api/" + url;
}

export function movieCate(params = {}) {
	return axios.get(baseUrl("movie/cate"), {params});
}

export function movieList(params = {}) {
	return axios.get(baseUrl("movie/list"), {params});
}


export function website() {
	return axios.get(baseUrl("website"));
}


