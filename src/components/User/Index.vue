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
import UserHeader from "@/components/Layout/UserHeader";
import InviteList from "@/components/User/InviteList.vue";


export default {
    name: "Index",
    components:{
        UserHeader,My,History,Collect,Wait,InviteList
    },
    data(){
        return{
            title: "个人中心",
            tab: 0,
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
