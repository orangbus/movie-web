<template>
    <v-app>
        <!--头部-->
        <Header></Header>
        <!--主体-->
        <v-main>
            <router-view></router-view>
        </v-main>
        <!-- 底部-->
        <v-bottom-navigation v-if="false">
            <v-btn value="recent">
                <span>Recent</span>

                <v-icon>mdi-history</v-icon>
            </v-btn>

            <v-btn value="favorites">
                <span>Favorites</span>

                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn value="nearby">
                <span>Nearby</span>

                <v-icon>mdi-map-marker</v-icon>
            </v-btn>
        </v-bottom-navigation>
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
}
</script>
