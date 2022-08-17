import LocalStorage from "@/util/LocalStorage";
import {website} from "../api/index";

let actions = {
	// 获取用户信息
	// getUserInfo({commit}) {
	// 	userInfo().then(res => {
	// 		LocalStorage.set("user", res.data);
	// 		commit("setUser", res.data)
	// 	});
	// },
	// 获取网站配置
	getWebSite({commit}) {
		website().then(res => {
			if (res.data != null) {
				LocalStorage.set("website", res.data);
				commit("setWebsite", res.data)
			}
		});
	},

	/**
	 * 刷新缓存
	 * 1、刷新网站配置
	 * 2、刷新视频接口
	 * @param state
	 * @param commit
	 */
	refreshCache({commit}) {
		// 网站配置
		website().then(res => {
			if (res.data != null) {
				LocalStorage.set("website", res.data);
				commit("setWebsite", res.data)
			}
		});
		// 清除搜索记录
		commit("setMovieHistory", []);
		LocalStorage.remove("movieHistory");

		// 网站公告
		LocalStorage.remove("know");

		// 清除友情链接
		LocalStorage.remove("frendlink")
	},
}

export default actions;
