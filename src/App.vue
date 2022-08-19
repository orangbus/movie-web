<template>
    <v-app>
        <!--头部-->
        <Header></Header>
        <!--主体-->
        <v-main>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </v-main>
        <!--到顶部-->
        <button class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-pink" @click="toTop">
            <i class="mdui-icon material-icons">vertical_align_top</i>
        </button>
    </v-app>
</template>
<script>
import Header from "./components/Layout/Header"
import LocalStorage from "@/util/LocalStorage";

export default {
    components:{
        Header
    },
    created() {
        // 获取网站配置
        let website = LocalStorage.get("website");
        if (website == null) {
            this.$store.dispatch("getWebSite");
        } else {
            this.$store.commit("setWebsite", website);
        }

        // 记载电影搜索记录
        let movieHistory = LocalStorage.get("movieHistory")
        if (movieHistory != null) {
            this.$store.commit("setMovieHistory", movieHistory);
        }
    },
    methods:{
        toTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    }
}
</script>
