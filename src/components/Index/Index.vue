<template>
    <div>
        <div class="text-center mt-2">
            <v-chip
                class="ma-1"
                v-for="(item,index) in 10"
                :key="index"
                @click="changeType(item)"
            >
                动作皮娜 {{ index }}
            </v-chip>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <v-container>
                <v-row>
                    <MovieList :list="list" :grid="grid"></MovieList>
                </v-row>

                <!--加载中 -->
                <v-row>
                    <v-col v-if="busy && !is_end" >
                        <v-progress-linear
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
    </div>
</template>

<script>
import MovieList from "@/components/common/MovieList";
import {movieList} from "@/api";

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
            hits:0,
            cate_id: 0, //数据源id
            movie_type: 1, // 电影类型
            page: 1,
            limit: 20,
            total: 0,
            list: [],

            busy: true,
            is_end: false,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let _this = this;
            movieList({
                page:this.page,
                limit:this.limit,
                keyword: this.keywords,
                hits: this.hits,
                vod_name: this.keywords,
                type_id: this.cate_id,
                type: this.movie_type
            }).then(res => {
                let {data,total} = res;
                if (res.code === 200 && res.data !=null){
                    this.list.push(...data);
                    this.total = total;
                    setTimeout(function () {
                        _this.busy = false;
                        if (data.length === 0) {
                            _this.is_end = true;
                        }
                    }, 300);
                }
            });
        },
        // 切换小分类
        changeType(item) {
            switch (item.type) {
                case 2: // 刷新
                    console.log("refresh")
                    break;
                default:
                    this.$router.push({
                        path: item.path
                    })
                    break
            }
            console.log(item)
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
        },
        // 详情
        toDetail(item) {
            this.$router.push({
                path: "/detail/" + item.vod_id
            })
        }
    }
}
</script>

<style scoped>

</style>
