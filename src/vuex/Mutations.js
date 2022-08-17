import LocalStorage from "@/util/LocalStorage";

let mutations = {
    setUser(state, user) {
        state.user = user;
        state.authorization = true;
    },

    logout(state) {
        state.user = {};
        state.authorization = false;
        LocalStorage.remove('user');
        LocalStorage.remove("access_token");
        LocalStorage.remove("refresh_token");
        LocalStorage.remove("movieApiList");
    },

    setWebsite(state, data) {
        state.website = data;
    },

    // 设置子标题
    setSubtitle(state, title) {
        state.subtitle = title;
    },
}
export default mutations;
