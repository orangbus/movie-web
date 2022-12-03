<template>
    <div>
        <AppHeader
            :tab="tab"
            :tabs="tabs"
            placeholder="支持全文搜索，电影，演员，类型"
            @changeTab="changeTab"
            @search="search"
            @clear="clear"
        ></AppHeader>

        <v-app-bar
            v-if="false"
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
            <v-app-bar-title>{{ title }}</v-app-bar-title>

            <!--搜索-->
            <v-text-field
                class=" mt-10 ml-15"
                flat
                clearable
                label="支持全文搜索，电影，演员，类型"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keywords"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>

            <v-spacer></v-spacer>

            <!--历史记录-->
            <v-btn icon>
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <!--个人中心-->
            <v-btn icon @click="toUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--导航标签-->
            <template v-slot:extension>
                <!--centered-->
                <v-tabs align-with-title>
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-container style="margin-top: 110px">
            <!--分类标签-->
            <div class="text-center" v-if="cateList.length > 0">
                <v-chip
                    class="ma-2"
                    :color="item.cid === cate.cid ? 'primary':''"
                    v-for="(item,index) in cateList"
                    :key="index"
                    @click="changeCate(item)"
                >
                    {{ item.name }}
                </v-chip>
            </div>

            <!--视频列表-->
            <VideoList :list="list"></VideoList>
            <!--分页-->
            <Page :loading="loading" :total="total" @changePage="changePage"></Page>
        </v-container>
    </div>
</template>

<script>
import Page from "@/components/common/Page";
import {apiList, videoList} from "@/api/video";
import VideoList from "./VideoList";
import {mapState} from "vuex";
import AppHeader from "@/components/layout/AppHeader.vue";

export default {
    name: "search",
    components: {
        Page, VideoList, AppHeader
    },
    data() {
        return {
            drawer: false,
            title: "聚合搜索",

            tab: 0,
            tabs: [],

            cate: {}, //当前选中分类
            cateList: [], // 视频分类

            keywords: "",
            page: 1,
            total: 0,
            loading: true,
            list: [],
        }
    },
    created() {
        this.getApi();
        this.getData();
    },
    methods: {
        // 切换视频源
        changeTab(item) {
            this.cate = {};
            this.tab = item.id;
            this.cateList = item.cate;
            this.search();
        },
        // 切换分类
        changeCate(cate) {
            this.cate = cate;
            this.search();
        },

        search(keywords) {
            this.keywords = keywords;
            this.page = 1;
            this.total = 0;
            this.list = [];
            this.getData();
        },
        clear() {
            this.keywords = "";
            this.search();
        },

        changePage(page) {
            this.page = page;
            this.list = [];
            this.getData();
        },
        getData() {
            this.loading = true;
            videoList({
                page: this.page,
                limit: this.setting.limit,
                keywords: this.keywords,
                api_id: this.tab,
                cid: this.cate ? this.cate.cid : 0
            }).then(res => {
                this.loading = false;
                let {total, data} = res;
                this.total = total;
                this.list = data;
            });
        },
        getApi(){
            this.tabs.push( {id:0,name:"推荐"});
            apiList().then(res=>{
                this.tabs.push(...res.data);
            });
        },

    },
    computed: {
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
