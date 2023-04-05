<template>
    <div class="xyScrollBar" @scroll="loadMore" id="backTop">
        <AppHeader
            :tab="tab"
            :tabs="tabs"
            @search="search"
            @clear="clear"
            @changeTab="changeTab"
        ></AppHeader>

        <v-main>
            <!--手机端搜索-->
            <v-text-field
                v-if="isMobile"
                v-model="keywords"
                label="请输入你的关键词，支持全文搜索"
                @keyup.enter="resetData"
            ></v-text-field>

            <!--内容-->
            <MovieList :list="list"></MovieList>

            <!--分页-->
            <Page :loading="loading" :total="total" @changePage="changePage"></Page>

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
        </v-main>
    </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/common/Page";
import MovieList from "./MovieList";
import {movieSearch} from "@/api/movie";
import {mapState} from "vuex";

export default {
    name: "search",
    components: {
        AppHeader, Page, MovieList
    },
    data() {
        return {
            showTop: false,
            drawer: false,
            isEnd: false,
            title: "聚合搜索",

            tab: 0,
            tabs: [
                {type: 1, name: "免费"},
                {type: 2, name: "会员"},
            ],

            loading: true,
            keywords: "",
            page: 1,
            total: 0,
            list: []
        }
    },
    created() {
        this.getData();
    },
    methods: {
        changeTab(item) {
            this.tab = item.type === 1 ? 0 : 1;
            this.resetData();
        },

        search(keywords = "") {
            this.keywords = keywords;
            this.page = 1;
            this.list = [];
            this.getData();
        },
        clear() {
            this.keywords = "";
            this.resetData();
        },
        changePage(page) {
            this.page = page;
            this.getData();
        },
        resetData(){
            this.page = 1;
            this.total = 0;
            this.list = [];
            this.getData();
        },
        getData() {
            this.loading = true;
            movieSearch({
                type: this.tab,
                page: this.page,
                limit: this.setting.limit,
                keywords: this.keywords
            }).then(res => {
                this.loading = false;
                let {data, total} = res;
                this.total = total;
                this.setting.showPage === true ? this.list= data : this.list.push(...data);
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
        },

        // 打开菜单
        openMenu() {
            if (this.authorization) {
                this.drawer = !this.drawer;
            } else {
                this.$router.push({
                    path: "login"
                })
            }
        },
        // 个人中心
        toUser() {
            this.$router.push({
                path: this.authorization ? "user" : "login"
            })
        },
    },
    computed: {
        ...mapState(["setting","isMobile"])
    }
}
</script>

<style scoped>

</style>
