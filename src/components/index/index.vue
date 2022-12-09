<template>
    <div>
        <AppHeader
            :tab="tab"
            :tabs="tabs"
            :placeholder="'支持全文搜索，电影，演员，类型'"
        @changeTab="changeTab"
        @search="search"
        @clear="clear"
        @getData="getData"
        @changeApi="changeApi"
        ></AppHeader>

        <v-container style="margin-top: 100px" >
            <!--电影分类-->
            <div class="text-center" v-if="cateList.length > 0">
                <v-chip
                    class="ma-2"
                    :color="item.type_id === cate_id ? 'primary':''"
                    v-for="(item,index) in cateList"
                    :key="index"
                    @click="changeCate(item)"
                >
                    {{ item.type_name }}
                </v-chip>
            </div>
            <!--搜索-->
            <v-text-field
                v-if="isMobile"
                v-model="keywords"
                label="请输入你的关键词，支持全文搜索"
                @keyup.enter="resetData"
            ></v-text-field>

            <div class="xyScrollBar" @scroll="loadMore">
                <MovieList :list="list" :to-detail="false"></MovieList>
                <!--分页-->
                <Page :page="page" :loading="loading" :total="total" @changePage="changePage"></Page>
            </div>
            <!--到顶部-->
            <v-btn
                v-if="list.length > 20 && false"
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
    </div>
</template>
<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import MovieList from "./MovieList";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import {mapActions, mapMutations, mapState} from "vuex";
import {movieCate, movieList} from "@/api/movie";
import Page from "@/components/common/Page";
import {freeMovieCate, freeMovieList} from "@/api";

export default {
    components: {
        MovieList,AppHeader,Page
    },
    data: () => ({
        EnumData,
        page: 1,
        total: 0,
        keywords: "",
        list:[],
        loading : true,

        // 底部加载
        isEnd : false,

        cate_id: 0, // 分类id
        cateData: [], // 分类列表元数据
        cateList: [], // 分类列表

        tab: 0,
        tabs: [
            {type: 0, name: '推荐'},
            {type: 1, name: '电影'},
            {type: 2, name: '电视剧'},
            {type: 3, name: '综艺'},
            {type: 4, name: '动漫'},
        ],
    }),

    created() {
        this.getMenus();
        this.getCate();
        this.getData();
    },

    methods: {
        ...mapMutations(["setMovieType", "setMovieCate","setMovieApi","setMovieHistoryCate"]),
        ...mapActions(["getMovieApiList"]),

        // 获取接口列表
        getMenus(){
            if (this.authorization){
                let movieApiList = LocalStorage.get(EnumData.movieApiList);
                if (movieApiList === null){
                    this.getMovieApiList();
                }else{
                    this.menus = movieApiList;
                }
            }
        },
        // 切换数据源
        changeApi(item){
            this.tab = 0;
            this.cate_id = 0;
            this.cateList = [];
            // 重新获取列表
            this.getCate();
            this.setMovieApi(item);
        },

        // 获取分类
        getCate() {
            if (this.authorization){
                movieCate({api_id:this.movieApi.id}).then(res=>{
                    this.cateData = res.data;
                });
            }else{
                freeMovieCate({api_id:this.movieApi.id}).then(res=>{
                    this.cateData = res.data;
                });
            }

        },
        // 切换电影分类
        changeCate(item) {
            this.setMovieHistoryCate(item);
            this.cate_id = item.type_id;
            this.search();
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
        clear(){
          this.page = 1;
          this.list = [];
          this.keywords = "";
          this.getData();
        },
        // 切换页码
        changePage(page){
            this.page = page;
            this.list = [];
            this.getData();
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        // 获取列表数据
        getData() {
            this.loading = true;
            if (this.authorization){
                // 是否选择了一个源
                if (!this.movieApi.id){
                    this.$toast.success("请点击右上角选择一个数据源");
                    this.loading = false;
                    return;
                }
                movieList({
                    page:this.page,
                    limit:this.setting.limit,
                    api_id: this.movieApi.id,
                    type:this.tab,
                    type_id:this.cate_id,
                    keywords: this.keywords
                }).then(res=>{
                    this.loading = false;
                    let {data,total} = res;
                    this.total= total;
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
            }else{
                freeMovieList({
                    page:this.page,
                    limit:this.setting.limit,
                    api_id: this.movieApi.id,
                    type:this.tab,
                    type_id:this.cate_id,
                    keywords: this.keywords
                }).then(res=>{
                    this.loading = false;
                    let {data,total} = res;
                    this.list= data;
                    this.total= total;

                    // 简单提示
                    if (this.page === 1 && this.keywords === "" && res.data.length === 0){
                        this.$toast.info("暂无数据，登录后可选择不用的源进行搜索哦！");
                    }
                });
            }
        },
        loadMore(event) {
            if (this.setting.showPage){
                return false;
            }
            //vue中获取滚动条到底部的距离
            let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight
            //以下三个条件不执行数据加载：1.数据正在加载的状态，2.已经到底了，3.滚动条距离底部的距离小于100px
            if (!this.loading && !this.isEnd && scrollBottom < 100) {
                this.loading = true;
                this.page +=1;
                this.getData();
            }
        },

        // 切换电影类型
        changeType(item) {
            this.title = item.name;
            this.setMovieType(item);
            LocalStorage.set(EnumData.movieType, item);
            this.search();
        },

        changeTab(item) {
            this.cate_id = 0; // 重置分类id

            if (this.tab === item.type){
                return;
            }

            this.tab = item.type;
            if (this.cateData.length === 0){
                this.search();
                return;
            }

            switch (item.type) {
                case 1: // 电影
                    this.cateList = this.cateData.movie;
                    break;
                case 2: //电视剧
                    this.cateList = this.cateData.tv_play;
                    break;
                case 3: // 综艺
                    this.cateList = this.cateData.variety;
                    break;
                case 4: // 动漫
                    this.cateList = this.cateData.cartoon;
                    break;
                default:
                    this.cateList = this.movieHistoryCate || [];
                    break;
            }
            this.search();
        },

        toTop(){
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }
    },
    computed: {
        ...mapState(["movieType","user","authorization","movieApi","setting","movieHistoryCate","isMobile"]),
    }
}
</script>
<style scoped>

</style>
