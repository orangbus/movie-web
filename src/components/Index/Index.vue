<template>
    <div>
        <!--导航-->
        <v-container>
            <v-row no-gutters>
                <!--    搜索-->
                <v-col cols="12" class="d-flex align-baseline">
                    <v-text-field
                        clearable
                        :autofocus="true"
                        v-model="keywords"
                        label="本站支持全文搜索（标题，演员，类型）"
                        @keyup.enter="search"
                    >
                    </v-text-field>
                    <v-btn depressed tile class="pa-3 ml-3" color="primary" @click="search">搜索</v-btn>
                </v-col>
                <!--推荐标签，历史记录-->
                <v-col cols="12" class="text-center" v-if="movieHistory.length > 0">
                    <v-chip
                        class="ma-1"
                        v-for="(item,index) in movieHistory"
                        :key="index"
                        @click="changeTag(item)"
                    >
                        {{ item }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>


        <!--内容-->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <MovieList :list="list" :grid="grid"></MovieList>
        </div>
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
import { movieList} from "@/api";
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
                xl: 2,
                lg: 2,
                md: 2,
                sm: 6,
                xs: 6
            },

            keywords: "",
            placeholder: "",
            hits: 0,
            cate: [], //分类列表
            cate_id: 0, //数据源id
            movie_type: 1, // 电影类型
            page: 1,
            limit: 20,
            total: 0,
            list: [], // 列表数据

            busy: true,
            is_end: false,
        }
    },
    created() {
        this.getData();
    },
    watch:{
        // 切换电影分类
        movieCate(cate){
            console.log("电影分类切换",cate)
            this.search();
        },
        // 切换电影排名

        // 电影推荐

    },
    methods: {
        getData() {
            let _this = this;
            movieList({
                page: this.page,
                limit: this.limit,
                keywords: this.keywords,
                type_id: this.movieCate.type_id,
                hits: this.hits, // 排名
                type: this.movie_type // 大份额里
            }).then(res => {
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
        changeTag(tag){
            this.keywords = tag;
            this.search();
        },

        // 加载更多
        loadMore() {
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
            if (!this.movieHistory.includes(this.keywords)) {
                let data = cloneDeep(this.movieHistory)
                data.unshift(this.keywords)
                this.$store.commit("setMovieHistory", data);
            }
        },

        // 详情
        toDetail(item) {
            this.$router.push({
                path: "/detail/" + item.id
            })
        }
    },
    computed:{
        ...mapState({
            movieCate: state => state.movieCate,
            movieHistory: state => state.movieHistory
        })
    }

}
</script>

<style scoped>

</style>
