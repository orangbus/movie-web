<template>
    <div>
        <v-app>
            <!--<router-view ></router-view>-->
            <v-main>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";

export default {
    created() {
        // 获取网站配置
        let website = LocalStorage.get("website");
        if (website == null) {
            this.$store.dispatch("getWebSite");
        } else {
            this.$store.commit("setWebsite", website);
        }

        // 用户
        let user = LocalStorage.get(EnumData.user)
        if (user != null) {
            this.$store.commit("setUser", user);
        }

        // 当前选择接口
        let movieApi = LocalStorage.get(EnumData.movieApi)
        if (movieApi != null) {
            this.$store.commit("setMovieApi", movieApi);
        }

        // 接口列表
        let movieApiList = LocalStorage.get(EnumData.movieApiList)
        if (movieApiList != null) {
            this.$store.commit("setMovieApiList", movieApiList);
        }

        // 用户点击历史电影分类
        let movieHistoryCate = LocalStorage.get(EnumData.movieHistoryCate);
        if (movieApiList != null) {
            this.$store.commit("setMovieHistoryCate", movieHistoryCate);
        }

        // 加载用户设置
        let setting = LocalStorage.get(EnumData.setting)
        if (setting != null) {
            this.$store.commit("setSetting", setting);
        }else{
            this.$store.commit("setSetting", EnumData.defaultSetting);
        }

        // 记载电影搜索记录
        let movieHistory = LocalStorage.get("movieHistory")
        if (movieHistory != null) {
            this.$store.commit("setMovieHistory", movieHistory);
        }
    }
}
</script>
