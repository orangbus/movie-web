export default {
	setting: "setting",
	movieHistoryCate:"movieHistoryCate",
	movieApi: "movieApi",
	movieApiList:"movieApiList",
	movieHistory:"movieHistory",
	website:"website",
	token: "access_token",
	authorization:"authorization",
	user:"user",

	defaultSetting:{
		showPage: false,
		limit:20,
		page:true,
	},
	defaultTabs: [
		{id: 1, name: '推荐'},
		{id: 2, name: '今日排名'},
		{id: 3, name: '本周排名'},
		{id: 4, name: '累计排名'},
		{id: 5, name: '今日更新'},
		{id: 6, name: '我的收藏'},
		{id: 7, name: '历史记录'},
	],
	menus:[
		{type: 1, name: '电影',list:[], icon: 'mdi-movie-filter-outline'},
		{type: 2, name: '电视剧',list:[], icon: 'mdi-movie-roll'},
		{type: 2, name: '综艺',list:[], icon: 'mdi-star'},
		{type: 4, name: '动漫',list:[], icon: 'mdi-check-circle'},
	],

}
