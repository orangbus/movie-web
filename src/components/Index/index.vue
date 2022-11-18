<template>
    <div>
        <MovieHeader
        @changeTab="changeTab"
        @search="search"
        @clear="clear"
        @getData="getData"
        @changeApi="changeApi"
        ></MovieHeader>

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

            <MovieList :list="list" :to-detail="false"></MovieList>

            <!--分页-->
            <Page :loading="loading" :total="total" @changePage="changePage"></Page>
        </v-container>
    </div>
</template>
<script>
import MovieList from "./MovieList";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import {mapActions, mapMutations, mapState} from "vuex";
import {movieCate, movieList} from "@/api/movie";
import Page from "@/components/common/Page";
import MovieHeader from "@/components/Layout/MovieHeader";
import {freeMovieCate, freeMovieList} from "@/api";

export default {
    components: {
        MovieList,MovieHeader,Page
    },
    data: () => ({
        page: 1,
        total: 0,
        keywords: "",
        list:[],
        loading : true,

        cate_id: 0, // 分类id
        cateData: [], // 分类列表元数据
        cateList: [], // 分类列表
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
                    this.list= data;
                    this.total= total;

                    // 简单提示
                    if (this.page === 1 && this.keywords === "" && res.data.length === 0){
                        this.$toast.info("暂无数据，可点击右上角切换一个数据源！");
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
    },
    computed: {
        ...mapState(["movieType","user","authorization","movieApi","setting","movieHistoryCate"]),
    }
}
</script>
