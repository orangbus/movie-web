<template>
    <div>
        <v-app>
            <!--<v-main>-->
                <router-view v-if="!$route.meta.keepAlive"></router-view>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            <!--</v-main>-->

            <!--全局公告-->
            <v-dialog
                v-model="dialog"
                max-width="500"
                scrollable
            >
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        入站须知
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text class="py-2" style="max-height: 500px">
                        <p>本站资源来自互联网，无法保证内容的广告真实信，请100%不要相信.</p>
                        <p>如果本站资源侵犯了你的权益，请联系站长尽快删除</p>
                        <p>建议注册一个账号，获取更好的体验</p>
                    </v-card-text>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue blue-1"
                            text
                            @click="confirm"
                        >
                            朕已阅读
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app>
    </div>
</template>

<script>
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import {mapMutations} from "vuex";

export default {
    data(){
        return{
            isMobile: false,
            dialog: false,
        }
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize, { passive: true })
    },
    watch:{
        isMobile(result){
            this.setIsMobile(result);
        }
    },
    created() {
        // 本站须知
        if (LocalStorage.get("know") === null){
            this.dialog = true;
        }
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
    },
    methods:{
        ...mapMutations(["setIsMobile"]),
        onResize () {
            this.isMobile = window.innerWidth < 600
        },
        confirm(){
            LocalStorage.set("know",true);
            this.dialog = false;
        }
    },
}
</script>
