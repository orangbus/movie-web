<template>
    <div>
        <UserHeader
            :tab="tab"
        @changeTab="changeTab"
        ></UserHeader>

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
import My from "./My";
import History from "./History";
import Collect from "./Collect";
import Wait from "./Wait";
import UserHeader from "@/components/Layout/UserHeader";


export default {
    name: "Index",
    components:{
        UserHeader,My,History,Collect,Wait
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
