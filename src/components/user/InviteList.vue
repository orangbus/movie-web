<template>
    <div>
        <v-list three-line v-for="(item, index) in list" :key="index">
            <v-list-item
                :key="item.name"
            >
                <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.time"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                    <v-icon
                        color="yellow darken-3"
                    >
                        mdi-star
                    </v-icon>
                </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
        </v-list>
    </div>
</template>

<script>
import {inviteList} from "@/api/user";
import Tool from "@/util/Tool";

export default {
    name: "InviteList",
    data() {
        return {
            loading:true,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: '用户名', value: 'name' },
                { text: '手机号', value: 'phone' },
                { text: '是否是会员', value: 'vip_status' },
                { text: '到期时间', value: 'vip_etime_string',align: 'center' },
                { text: '登录ip', value: 'login_ip' },
                { text: '登录地址', value: 'addr' },
            ],
            page: 1,
            limit: 10,
            total:0,
            list:[
                {
                    name: "orangbus",
                    avatar: "http://dummyimage.com/101x160.png/42127e/12650c",
                    time: "2023-10-01"
                },
            ],
        }
    },
    mounted() {
        // this.getData();
    },
    methods:{
        getData(){
            this.loading = true;
            inviteList({
                page: this.page,
                limit: this.limit
            }).then(res=>{
                this.loading = false;
                let {code,data,total} = res;
                if (code === 200){
                    this.total = total;
                    let list = [];
                    data.forEach(item=>{
                        item.vip_status = item.vip ? "vip用户":"普通用户";
                        item.vip_etime_string = Tool.transformTimestamp(item.vip_etime);
                        item.addr = Tool.transformAddr(item.country,item.region,item.city)
                        list.push(item)
                    })
                    this.list = list;
                }
            });
        },
        changePage(item){
            this.page = item.page;
            this.getData();
        },
        changeLimit(limit){
            this.limit = limit;
            this.getData();
        }
    }
}
</script>

<style scoped>

</style>
