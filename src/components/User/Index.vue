<template>
    <div>
        <UserHeader></UserHeader>
        <v-app-bar
            v-if="false"
            absolute
            color="#2196F3"
            dark
            fixed
            src="https://picsum.photos/1920/1080?random"
            scroll-target="#movie-content"
        >
            <!--背景渐变-->
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <!--首页图标-->
            <v-app-bar-nav-icon @click="toHome"></v-app-bar-nav-icon>
            <!--标题-->
            <v-app-bar-title>{{ user.name }}</v-app-bar-title>

            <v-spacer></v-spacer>

            <!--用户省份-->
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

        <v-container style="margin-top: 110px">
            <My v-if="tab === 0"></My>
            <Collect v-if="tab === 1"></Collect>
            <History v-if="tab === 2"></History>
            <Wait v-if="tab === 3"></Wait>
        </v-container>
    </div>
</template>

<script>
import {mapState} from "vuex";
import Profile from "@/components/User/Profile";
import My from "./My";
import History from "./History";
import Collect from "./Collect";
import Wait from "./Wait";
import Logout from "@/components/common/Logout";
import Coupon from "@/components/common/Coupon";
import ShareQr from "@/components/common/ShareQr";
import UserHeader from "@/components/Layout/UserHeader";


export default {
    name: "Index",
    components:{
        UserHeader,Profile,My,History,Collect,Logout,Coupon,ShareQr,Wait
    },
    created() {
        let type = this.$route.query.type;
        if (type){
            this.tab  = type;
        }
    },
    data(){
        return{
            title: "个人中心",
            tab: 0,
            tabs: [
                {type: 0, name: '我的'},
                {type: 1, name: '收藏'},
                {type: 2, name: '历史记录'},
                {type: 3, name: '稍后观看'},
            ],
        }
    },
    methods:{
        changeTab(item){
            this.tab = item.type;
        },
        // 去首页
        toHome(){
            this.$router.push({
                path: "/"
            });
        },
    },
    computed:{
        ...mapState(["user"])
    }
}
</script>

<style scoped>

</style>
