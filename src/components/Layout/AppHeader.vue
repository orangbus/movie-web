<template>
    <div>
        <v-app-bar
            absolute
            color="#2196F3"
            dark
        >
            <!--背景渐变-->
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <!--首页图标-->
            <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
            <!--标题-->
            <v-app-bar-title><span @click="toHome">{{ website.name }}</span></v-app-bar-title>

            <v-spacer></v-spacer>
            <!--右侧按钮-->
            <v-btn icon to="/search">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <!--个人中心-->
            <v-btn icon @click="toUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

        </v-app-bar>

        <!--侧边栏-->
        <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary
        >
            <v-list
                nav
                dense
            >
                <div class="text-center py-2 text-h5" @click="toHome">
                    {{ website.name }}
                </div>

                <v-list-item-group
                    color="primary"
                    active-class="deep-purple--text text--accent-4"
                >
                    <!--公共导航-->
                    <v-list-item link to="/video" v-if="user.vip">
                        <v-list-item-icon>
                            <v-icon>mdi-video-image</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >视频</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/article">
                        <v-list-item-icon>
                            <v-icon>mdi-list-box-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >文章</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/photo">
                        <v-list-item-icon>
                            <v-icon>mdi-image-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >图片</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>


                    <v-list-item link to="/todayhistory">
                        <v-list-item-icon>
                            <v-icon>mdi-chart-timeline-variant-shimmer</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >历史上的今天</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--分割线-->
                    <v-divider class="my-1" />
                    <v-list-item link to="/code">
                        <v-list-item-icon>
                            <v-icon>mdi-qrcode-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >活码</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/player">
                        <v-list-item-icon>
                            <v-icon>mdi-movie-play-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >视频解析</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/m3u8">
                        <v-list-item-icon>
                            <v-icon>mdi-movie-open-play-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >m3u8播放器</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--分割线-->
                    <v-divider class="my-1" />

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapState} from "vuex";

export default {
    name: "Header",

    data() {
        return {
            drawer: false,
        }
    },
    methods: {
        // 打开菜单
        openMenu(){
            if (this.authorization){
                this.drawer = !this.drawer;
            }else{
                this.$router.push({
                    path: "login"
                })
            }
        },
        // 个人中心
        toUser(){
            this.$router.push({
                path: this.authorization ? "user":"login"
            })
        },

        // 返回首页
        toHome(){
            this.$router.push({
                path: "/"
            })
        },

        toPage(path){
            this.$router.push({
                path
            })
        },
    },
    computed: {
        ...mapState(["user","authorization","website"]),
    }
}
</script>

<style scoped>

</style>
