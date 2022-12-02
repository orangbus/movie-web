<template>
    <div>
        <!--@page-count="changePage"-->

        <v-data-table
            :headers="headers"
            :items="list"
            :page="page"
            :loading="loading"
            :items-per-page="limit"
            class="elevation-1"
            @update:items-per-page="changeLimit"
            :page-count="page"
            :server-items-length=total
            @pagination="changePage"
        ></v-data-table>
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
