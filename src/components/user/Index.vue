<template>
    <div>
        <AppHeader
            :tab="tab"
            :tabs="tabs"
            @changeTab="changeTab"
        ></AppHeader>

        <v-container style="margin-top: 110px">
            <My v-if="tab === 0"></My>
            <Collect v-if="tab === 1"></Collect>
            <History v-if="tab === 2"></History>
            <Wait v-if="tab === 3"></Wait>
            <InviteList v-if="tab === 4"></InviteList>
        </v-container>
    </div>
</template>

<script>
import {mapState} from "vuex";
import My from "./My";
import History from "./History";
import Collect from "./Collect";
import Wait from "./Wait";
import InviteList from "@/components/user/InviteList";
import AppHeader from "@/components/layout/AppHeader.vue";


export default {
    name: "Index",
    components:{
        AppHeader,My,History,Collect,Wait,InviteList
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
                {type: 4, name: '邀请列表'},
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
