import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";

let mutations = {
    setUser(state, user) {
        state.user = user;
        state.authorization = true;

        LocalStorage.set(EnumData.user,user);
        LocalStorage.set(EnumData.authorization,true);
    },

    /**
     * 退出的呢牢固
     * @param state
     */
    logout(state) {
        state.user = {};
        state.authorization = false;

        LocalStorage.remove(EnumData.user);
        LocalStorage.remove(EnumData.token);

        LocalStorage.remove(EnumData.movieApiList);
        LocalStorage.remove(EnumData.movieApi);
        LocalStorage.remove(EnumData.movieHistory);
        LocalStorage.remove(EnumData.movieHistoryCate);
    },
    /**
     * 清理缓存
     */
    clearCache(state){
        state.setting = {};
        state.movieApi = {};
        state.movieCateList = [];
        state.movieHistory = [];
        state.movieType = {};

        LocalStorage.remove(EnumData.movieApiList);
        LocalStorage.remove(EnumData.movieApi);
        LocalStorage.remove(EnumData.movieHistory);
        LocalStorage.remove(EnumData.movieHistoryCate);
    },

    /**
     * 电影分类
     *  需要对电影进行处理
     */
    setMovieCateList(state,data){
        state.movieCateList[0].list = data.movie;
        state.movieCateList[1].list = data.tv_play;
        state.movieCateList[2].list = data.variety;
        state.movieCateList[3].list = data.cartoon;
    },

    /**
     * 切换电影小分类
     */
    setMovieCate(state,data){
      state.movieCate = data;
    },

    /**
     * 设置电影大分类
     */
    setMovieType(state,data){
        state.movieType = data;
    },

    /**
     * 设置接口数据源
     */
    setMovieApi(state,data){
        LocalStorage.set(EnumData.movieApi,data);
        state.movieApi = data;
    },

    /**
     * 设置接口数据源列表
     */
    setMovieApiList(state,data){
        LocalStorage.set(EnumData.movieApiList,data);
        state.movieApiList = data;
    },

    /**
     * 设置历史点击分类
     */
    setMovieHistoryCate(state,data){
        let cate = state.movieHistoryCate;
        if (cate.length === 0){
            return;
        }
        // 删除一个分类
        if (cate.length >= 8){
            cate.splice(cate.length-1,1);
        }
        cate.push(data);
        state.movieHistoryCate = cate;
        LocalStorage.set(EnumData.movieHistoryCate,cate);
    },

    /**
     * 缓存网站
     * @param state
     * @param data
     */
    setWebsite(state, data) {
        state.website = data;
    },

    /**
     * 缓存历史记录
     * @param state
     * @param data
     */
    setMovieHistory(state, data) {
        state.movieHistory = data;
        LocalStorage.set(EnumData.movieHistory,data)
    },

    /**
     * 设置子标题
     * @param state
     * @param title
     */
    setSubtitle(state, title) {
        state.subtitle = title;
    },

    setSetting(state, data) {
        state.setting = data;
        LocalStorage.set(EnumData.setting,data);
    },

}
export default mutations;
