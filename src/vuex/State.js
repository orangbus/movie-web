let state = {
    subtitle: '', // 子标题
    website: {
        name: "聚合影视"
    },
    user: {},
    authorization: false,
    Hitokoto: {
        Api: 'https://international.v1.hitokoto.cn',
        text: '发现生活，改变自己，保持勇敢，坚持有趣!',
        auther: 'OrangBus',
    },
    // 轮播图
    banner: [],
    movieCate:{}, // 电影小分类
    movieCateList:[
        {type: 1, name: '电影',list:[], icon: 'mdi-movie-filter-outline'},
        {type: 2, name: '电视剧',list:[], icon: 'mdi-movie-roll'},
        {type: 2, name: '综艺',list:[], icon: 'mdi-star'},
        {type: 4, name: '动漫',list:[], icon: 'mdi-check-circle'},
    ],
    movieType:{}, // 电影大分类

    hitsList: [
        {name: "最新", selected: true},
        {name: "今日", selected: false},
        {name: "本周", selected: false},
        {name: "本月", selected: false},
        {name: "累计", selected: false},
    ], // false
    // 电影搜索记录
    movieHistory: [],

    // 左侧菜单
    menus: [
        {type: 1, name: "搜索", icon: "mdi-magnify", path: "/search"},
        {type: 2, name: "刷新缓存", icon: "mdi-refresh", path: "#"},
        {type: 3, name: "历史记录", icon: "mdi-history", path: "/history"},
        {type: 4, name: "个人中心", icon: "mdi-account", path: "/user"},
        {type: 5, name: '今日更新', icon: 'mdi-upload'},
        {type: 6, name: '我的追番', icon: 'mdi-cloud-upload'},
    ],

}

export default state;
