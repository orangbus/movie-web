import LocalStorage from "@/util/LocalStorage";
import {jiexiList, m3u8List, visitCount, website} from "../api/index";
import EnumData from "@/util/EnumData";
import {userInfo} from "@/api/user";
import {apiList, movieCate} from "@/api/movie"

let actions = {
	// 访问统计
	userVisit(){
		visitCount().then(res=>{
			console.log(res)
		});
	},
	// 获取网站配置
	getWebSite({commit}) {
		website().then(res => {
			if (res.data != null) {
				LocalStorage.set(EnumData.website, res.data);
				commit("setWebsite", res.data)
			}
		});
	},

	// 获取接口列表
	getMovieApiList({commit}){
		apiList().then(res=>{
			commit("setMovieApiList",res.data);
		});
	},

	// 获取分类
	getMovieCate({commit}){
		movieCate().then(res=>{
			commit("setMovieCateList",res.data);
		})
	},
	// 获取用户信息
	getUserInfo({commit}){
		userInfo().then(res=>{
			if (res.code === 200){
				commit("setUser",res.data);
			}
		});
	},
	// 会员解析
	getJiexiList({commit}){
		jiexiList().then(res=>{
			if (res.code === 200){
				commit("setJiexiList",res.data);
			}
		});
	},
	// m3u8 解析
	getM3u8List({commit}){
		m3u8List().then(res=>{
			if (res.code === 200){
				commit("setM3u8List",res.data);
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
	},
}

export default actions;
