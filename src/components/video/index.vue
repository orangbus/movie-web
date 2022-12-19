<template>
    <div class="xyScrollBar" @scroll="loadMore" id="backTop" >
        <AppHeader
            :tab="tab"
            :tabs="tabs"
            placeholder="支持全文搜索，电影，演员，类型"
            @changeTab="changeTab"
            @search="search"
            @clear="clear"
        ></AppHeader>

        <v-main >
            <v-container>
                <!--分类标签-->
                <div  v-if="cateList.length > 0">
                    <v-chip
                        :label="true"
                        class="ma-2"
                        :color="item.cid === cate.cid ? 'primary':''"
                        v-for="(item,index) in cateList"
                        :key="index"
                        @click="changeCate(item)"
                    >
                        {{ item.name }}
                    </v-chip>
                </div>

                <!--搜索-->
                <v-text-field
                    v-if="isMobile"
                    v-model="keywords"
                    label="请输入你的关键词，支持全文搜索"
                    @keyup.enter="resetData"
                ></v-text-field>

                <!--视频列表-->
                <VideoList :list="list"></VideoList>
                <!--分页-->
                <Page :page="page" :loading="loading" :total="total" @changePage="changePage"></Page>

                <!--到顶部-->
                <v-btn
                    v-if="showTop"
                    class="mx-3"
                    fab
                    fixed
                    right
                    dark
                    large
                    :bottom="true"
                    color="primary"
                    @click="toTop"
                >
                    <v-icon dark>
                        mdi-format-vertical-align-top
                    </v-icon>
                </v-btn>
            </v-container>
        </v-main>
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
            showTop:false,
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
            isEnd: false,
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
        getApi(){
            this.tabs.push( {id:0,name:"推荐"});
            apiList().then(res=>{
                this.tabs.push(...res.data);
            });
        },

        // 搜索
        search(keywords) {
            this.keywords = keywords;
            this.resetData();
        },
        resetData(){
            this.page = 1;
            this.list = [];
            this.total = 0;
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
                this.setting.showPage ? this.list= data : this.list.push(...data);

                // 简单提示
                if (this.page === 1 && this.keywords === "" && res.data.length === 0){
                    this.$toast.info("暂无数据，可点击右上角切换一个数据源！");
                }

                // 到底了提示
                if (data.length === 0){
                    this.isEnd = true;
                    this.$toast.success("到底啦！");
                }else{
                    this.isEnd = false;
                }
            });
        },
        loadMore(event) {
            if (this.setting.showPage){
                return false;
            }
            //vue中获取滚动条到底部的距离
            let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
            // 显示到顶部
            this.showTop = event.target.scrollTop > 1000;

            //以下三个条件不执行数据加载：1.数据正在加载的状态，2.已经到底了，3.滚动条距离底部的距离小于100px
            if (!this.loading && !this.isEnd && scrollBottom < 100) {
                this.loading = true;
                this.page +=1;
                this.getData();
            }
        },
        toTop(){
            document.getElementById("backTop").scrollTop = -100;
        }
    },
    computed: {
        ...mapState(["setting","isMobile"])
    }
}
</script>

<style scoped>

</style>
