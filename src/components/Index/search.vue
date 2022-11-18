<template>
    <div>
        <SearchHeader
            @search="search"
            @click="clear"
            @changeTab="changeTab"
        ></SearchHeader>

        <v-container style="margin-top: 100px">
            <!--手机端搜索-->

            <!--内容-->
            <MovieList :list="list"></MovieList>

            <!--分页-->
            <Page :loading="loading" :total="total" @changePage="changePage"></Page>
        </v-container>
    </div>
</template>

<script>
import SearchHeader from "@/components/Layout/SearchHeader";
import Page from "@/components/common/Page";
import MovieList from "./MovieList";
import {movieSearch} from "@/api/movie";
import {mapState} from "vuex";

export default {
    name: "search",
    components: {
        SearchHeader, Page, MovieList
    },
    data() {
        return {
            drawer: false,
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
            this.search();
        },

        search(keywords = "") {
            this.keywords = keywords;
            this.type = this.tab;
            this.page = 1;
            this.list = [];
            this.getData();
        },
        clear() {
            this.keywords = "";
            this.search();
        },
        changePage(page) {
            this.page = page;
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
                this.list = data;
                this.total = total;
            });
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
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
