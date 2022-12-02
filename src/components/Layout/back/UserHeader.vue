<template>
    <div>
        <v-app-bar
            absolute
            color="#2196F3"
            dark
            fixed
            src="https://picsum.photos/1920/1080?random"
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
            <v-app-bar-title>{{ movieType.name }}</v-app-bar-title>

            <v-spacer></v-spacer>
            <!--首页-->
            <v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <!--用户激活码-->
            <Coupon></Coupon>
            <!--推广码-->
            <ShareQr></ShareQr>
            <!--个人资料-->
            <Profile></Profile>
            <!--退出登录-->
            <Logout></Logout>

            <!--导航标签-->
            <template v-slot:extension>
                <v-tabs align-with-title v-model="tab">
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
                <div class="text-center py-2 text-h5">
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
import MenuCommon from "@/components/Layout/MenuCommon";
import Logout from "@/components/common/Logout";
import Coupon from "@/components/common/Coupon";
import ShareQr from "@/components/common/ShareQr";
import Profile from "@/components/user/Profile";

export default {
    name: "Header",
    props:{
        tab:{
            type: Number,
            default:()=>0
        }
    },
    components:{
        MenuCommon,Logout,Coupon,ShareQr,Profile
    },
    data() {
        return {
            drawer: false,
            setting:{},
            title: "个人中心",
            tabs: [
                {type: 0, name: '我的'},
                {type: 1, name: '收藏'},
                {type: 2, name: '历史记录'},
                {type: 3, name: '稍后观看'},
                {type: 4, name: '邀请列表'},
            ],
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
        ...mapState(["movieType","user","authorization","movieApi","website"]),
    }
}
</script>

<style scoped>

</style>
