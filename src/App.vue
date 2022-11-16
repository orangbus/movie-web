<template>
    <div>
        <v-app>
            <router-view ></router-view>
            <!--头部-->
            <!--<Header></Header>-->
            <!--主体-->
            <!--<v-main>-->
            <!--    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
            <!--    <keep-alive>-->
            <!--        <router-view v-if="$route.meta.keepAlive"></router-view>-->
            <!--    </keep-alive>-->
            <!--</v-main>-->
            <!--到顶部-->
            <!--<button class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-pink" @click="toTop">-->
            <!--    <i class="mdui-icon material-icons">vertical_align_top</i>-->
            <!--</button>-->
            <!--<Footer></Footer>-->
        </v-app>
    </div>

</template>
<script>
// import Header from "./components/Layout/Header"
// import Footer from "@/components/Layout/Footer";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";

export default {
    components:{
        // Footer
    //     Header
    },
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

        let movieApi = LocalStorage.get(EnumData.movieApi)
        if (movieApi != null) {
            this.$store.commit("setMovieApi", movieApi);
        }

        let movieApiList = LocalStorage.get(EnumData.movieApiList)
        if (movieApiList != null) {
            this.$store.commit("setMovieApiList", movieApiList);
        }

        let movieHistoryCate = LocalStorage.get(EnumData.movieHistoryCate)
        if (movieApiList != null) {
            this.$store.commit("setHistoryCate", movieHistoryCate);
        }

        let setting = LocalStorage.get(EnumData.setting)
        if (setting != null) {
            this.$store.commit("setSetting", setting);
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
