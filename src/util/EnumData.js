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

	articleHistoryCate: "articleHistoryCate",
	// 会员解析
	jiexiList:"jiexiList",
	// m3u8 解析列表
	m3u8List:"m3u8List",

	// 加载中的样式
	loadingCircle:0,
	loadingLine:1,
	loadingStyleList:[
		{type:0,name:"圆形"},
		{type:1,name:"进度条"},
	],
	// 默认设置
	defaultSetting:{
		showPage: true, // 是否显示分页，false:滚动加载
		limit:24, // 视频条数
		page:true, // 开启本地分页,缓存记录起始加载页
		loadingStyle: 0, // 加载样式
		jiexi: {
			id:0,
			name : "请选择"
		}, // 默认解析列表
		parse: {
			id:0,
			name: "请选择"
		}, // m3u8 默认解析接口
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

	playerByLocal: 0, // 本地直接播放
	playerByParseUrl: 1, // 解析播放


}
