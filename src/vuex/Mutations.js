import LocalStorage from "@/util/LocalStorage";

let mutations = {
    setUser(state, user) {
        state.user = user;
        state.authorization = true;
    },

    /**
     * 退出的呢牢固
     * @param state
     */
    logout(state) {
        state.user = {};
        state.authorization = false;
        LocalStorage.remove('user');
        LocalStorage.remove("access_token");
        LocalStorage.remove("refresh_token");
        LocalStorage.remove("movieApiList");
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
        LocalStorage.set("movieHistory",data)
    },

    /**
     * 设置子标题
     * @param state
     * @param title
     */
    setSubtitle(state, title) {
        state.subtitle = title;
    },
}
export default mutations;
