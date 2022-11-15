<template>
    <div>
        <!--导航-->
        <v-container>
            <v-tabs
                v-model="tab"

            >
                <v-tabs-slider color="primary"></v-tabs-slider>

                <v-tab
                    v-for="item in items"
                    :key="item"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item"
                >
                    <v-card flat>

                    </v-card>
                </v-tab-item>
            </v-tabs-items>

            <v-row no-gutters>
                <v-col v-bind="grid">
                    <v-btn-toggle
                        v-model="hits"
                        tile
                        color="deep-purple accent-3"
                        group
                    >
                        <v-btn
                            v-for="(item,index) in hitsList"
                            :key="index"
                            @click="sortHit(index)"
                            :value="index">
                            {{ item.name }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <!--    搜索-->
                <v-col v-bind="right-grid" class="d-flex align-baseline">
                    <v-text-field
                        clearable
                        :autofocus="true"
                        v-model="keywords"
                        :label="`当前分类${movieCate.type_name || '推荐'}`"
                        hint="本站支持全文搜索（标题，演员，类型）"
                        @keyup.enter="search"
                        @click:clear="clearKeyword"
                    >
                    </v-text-field>
                    <v-btn depressed tile class="pa-3 ml-3" color="primary" @click="search">搜索</v-btn>
                </v-col>
                <!--推荐标签，历史记录-->
                <v-col cols="12" class="text-center d-flex justify-space-between ">
                    <div v-if="movieHistory.length > 0">
                        <v-chip
                            class="mr-1 mb-1 hidden-xs-only"
                            v-for="(item,index) in movieHistory"
                            :key="index"
                            @click="changeTag(item)"
                        >
                            {{ item }}
                        </v-chip>
                    </div>
                    <div class="hidden-xs-only">
                        第{{ page }}页/{{ total }} 条数据
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <MovieList :list="list" :to-detail="false" :grid="grid"></MovieList>


        <!--内容-->
        <!--<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">-->
        <!--    <MovieList :list="list" :to-detail="false" :grid="grid"></MovieList>-->
        <!--</div>-->
        <v-container>
            <!--加载中 -->
            <v-row>
                <v-col v-if="busy && !is_end">
                    <v-progress-linear
                        class="mb-5"
                        indeterminate
                        color="cyan darken-2"
                    ></v-progress-linear>
                </v-col>
                <v-col v-if="!busy && list.length === 0">
                    到底啦。。。
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MovieList from "@/components/common/MovieList";
import {movieCate, movieList} from "@/api";
import {mapState} from "vuex";
import {cloneDeep} from "lodash";
import mdui from "mdui";

export default {
    name: "Index",
    components: {
        MovieList
    },
    data() {
        return {
            grid: {
                xl: 9,
                lg: 9,
                md: 9,
                sm: 12,
                xs: 12
            },
            right_grid: {
                xl: 9,
                lg: 9,
                md: 9,
                sm: 12,
                xs: 12
            },
            keywords: "",
            placeholder: "",
            hits: 0,
            cate: [], //分类列表
            cate_id: 0, //数据源id
            movie_type: 1, // 电影类型
            type_id: 0,
            page: 1,
            limit: 20,
            total: 0,
            list: [], // 列表数据

            busy: true,
            is_end: false,

            tab: null,
            items: [
                '电影', '电视剧', 'videos', 'images', 'news', '电影', '电视剧', '电影', '电影', '电视剧', '电影', '电影', '电视剧', '电影', '电视剧', '电影', '电视剧', '电影', '电视剧', '电影', '电视剧', '电影', '电视剧',
            ],

        }
    },
    created() {
        this.type_id = this.$route.query.type_id;
        this.getCate();
        this.getData();
    },
    watch: {
        // 切换电影分类
        movieCate(cate) {
            console.log("电影分类切换", cate)
            if (this.$route.path === "/") {
                this.hits = 0;
                this.search();
            }
        },

        //切换电影大分类
        movieType(item) {
            this.movie_type = item.type;
            if (this.$route.path === "/") {
                this.hits = 0;
                this.search();
            }
        },
    },
    methods: {
        openPlayer() {

        },

        // 视频分类
        getCate(){
          movieCate().then(res=>{
              console.log(res)
          });
        },
        getData() {
            let params = {
                page: this.page,
                limit: this.limit,
                hits: this.hits, // 排名
                type: this.movie_type // 大分类
            }
            // 设置分类
            let type_id = this.type_id ? this.type_id : this.movieCate.type_id;
            // 当搜索的时候忽略分类
            if (this.keywords != "") {
                params.keywords = this.keywords;
            } else {
                params.type_id = type_id; // 小分类
            }

            let _this = this;
            movieList(params).then(res => {
                let {data, total} = res;
                if (res.code === 200 && res.data != null) {
                    this.list.push(...data);
                    this.total = total;
                    setTimeout(function () {
                        _this.busy = false;
                        if (data.length === 0 || data.length < 10) {
                            _this.is_end = true;
                            mdui.snackbar("到底啦")
                        }
                    }, 300);
                }
            });
        },

        // 切换标签
        changeTag(tag) {
            this.keywords = tag;
            this.search();
        },

        // 加载更多
        loadMore() {
            console.log(this.$route.path)
            if (this.$route.path !== "/") {
                return;
            }
            if (this.busy) {
                return;
            }

            if (this.is_end) {
                return;
            }
            this.busy = true;
            this.page += 1;
            this.getData();
        },

        // 搜索
        search() {
            this.list = [];
            this.page = 1;
            this.busy = true;
            this.getData();

            // 加入历史记录
            if (this.keywords != "" && !this.movieHistory.includes(this.keywords)) {
                let data = cloneDeep(this.movieHistory)
                data.unshift(this.keywords)
                if (data.length > 10) {
                    data.splice(10, 1)
                }
                this.$store.commit("setMovieHistory", data);
            }
        },
        // 请求搜索
        clearKeyword() {
            this.list = [];
            this.keywords = "";
            this.page = 1;
            this.busy = true;
            this.getData();
        },

        sortHit(index) {
            this.hits = index;
            this.list = [];
            this.page = 1;
            this.is_end = false;
            this.busy = true;
            this.getData();
        },

        // 详情
        toDetail(item) {
            this.$router.push({
                path: "/detail/" + item.id
            })
        },

        // 刷新缓存
        refresh() {
            this.$store.dispatch("refreshCache");
            mdui.snackbar("缓存已清理");
        }
    },
    computed: {
        ...mapState({
            movieCate: state => state.movieCate,
            movieCateList: state => state.movieCateList,
            movieHistory: state => state.movieHistory,
            movieType: state => state.movieType,
            hitsList: state => state.hitsList
        })
    }

}
</script>

<style scoped>

</style>
