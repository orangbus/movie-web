<template>
    <div>
        <v-list three-line v-for="(item, index) in list" :key="index">
            <v-list-item
                :key="item.name"
            >
                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.created_at"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    {{ item.phone }}
                </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
        </v-list>
        <v-row class="my-2">
            <v-col cols="12">
                <v-pagination
                    v-model="page"
                    :length="Math.trunc(total/(limit === 0 ? 20:limit))"
                    :total-visible="10"
                    @input="changePage"
                ></v-pagination>
            </v-col>
        </v-row>
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
            list:[],
        }
    },
    mounted() {
        this.getData();
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
            this.page = item;
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
