let state = {
    subtitle: '', // 子标题
    website: {},
    user: {},
    authorization: false,
    movieApiList: [], // 视频数据源接口
    movieCateList: [], // 视频分类
    Hitokoto: {
        Api: 'https://international.v1.hitokoto.cn',
        text: '发现生活，改变自己，保持勇敢，坚持有趣!',
        auther: 'OrangBus',
    },
    apiinfo: {},
    // 轮播图
    banner: [],
    // 解析列表
    jiexiList: [],
    // 电影搜索记录
    movieHistory: [],
    // 友情链接
    frendlink: []
}

export default state;
