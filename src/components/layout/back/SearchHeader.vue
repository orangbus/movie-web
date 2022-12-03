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
            <v-app-bar-title><span class="text-pointer" @click="toHome">{{ movieType.name }}</span></v-app-bar-title>

            <!--搜索-->
            <v-text-field
                v-if="!isMobile"
                class=" mt-10 ml-15"
                flat
                clearable
                label="聚合搜索，支持全文搜索，电影，演员，类型"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keywords"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>

            <v-spacer></v-spacer>
            <!--首页-->
            <!--右侧按钮-->
            <v-btn icon to="/search" v-if="false">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <!--首页-->
            <v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <!--接口选择-->
            <MovieApi v-if="false" @getResult="search"></MovieApi>

            <!--历史记录-->
            <v-btn icon to="/user" v-if="user.vip">
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <!--个人中心-->
            <v-btn icon @click="toUser" v-if="user.vip">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--    设置-->
            <Setting @getResult="search"  v-if="user.vip"></Setting>

            <!--导航标签-->
            <template v-slot:extension  v-if="user.vip">
                <!--centered-->
                <v-tabs align-with-title >
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}</v-tab>
                </v-tabs>
            </template>
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
                <div class="text-center py-2 text-h5 text-pointer" @click="toHome">
                    {{ website.name }}
                </div>

                <v-list-item-group
                    v-model="movieApi.id"
                    color="primary"
                    active-class="deep-purple--text text--accent-4"
                >
                    <!--公共导航-->
                    <MenuCommon></MenuCommon>

                    <!--分割线-->
                    <v-divider class="my-1" />

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import MovieApi from "@/components/common/MovieApi";
import Setting from "@/components/common/Setting";
import MenuCommon from "@/components/Layout/MenuCommon";

export default {
    name: "Header",
    components:{
        Setting,MovieApi,MenuCommon
    },
    data() {
        return {
            drawer: false,
            setting:{},
            tab: 0,
            tabs:[
                {type:1,name:"免费"},
                {type:2,name:"会员"},
            ],
            keywords: "",
        }
    },
    methods: {
        ...mapMutations(["setMovieType", "setMovieCate","setMovieApi","setSetting"]),
        ...mapActions(["getMovieApiList"]),

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
        // 切换分类
        changeTab(item) {
            this.$emit("changeTab",item);
        },
        // 搜索
        search() {
            this.$emit("search",this.keywords);
        },
        clear(){
            this.keywords = "";
            this.$emit("clear");
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
        ...mapState(["movieType","user","authorization","movieApi","website","isMobile"]),
    }
}
</script>

<style scoped>

</style>
