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
    // 电影搜索记录
    movieHistory: [],

    // 左侧菜单
    menus: [
        {type: 1, name: '电影', icon: 'mdi-movie-filter-outline'},
        {type: 2, name: '电视剧', icon: 'mdi-movie-roll'},
        {type: 2, name: '综艺', icon: 'mdi-star'},
        {type: 3, name: '电视剧', icon: 'mdi-motion-play-outline'},
        {type: 4, name: '动漫', icon: 'mdi-check-circle'},
        {type: 5, name: '今日更新', icon: 'mdi-upload'},
        {type: 6, name: '我的追番', icon: 'mdi-cloud-upload'},
    ],

}

export default state;
