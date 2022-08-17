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
                    <v-col v-if="busy || is_end">
                        <v-progress-linear
                            indeterminate
                            color="cyan darken-2"
                        ></v-progress-linear>
                    </v-col>
                    <v-col v-if="is_end">
                        到底啦。。。
                    </v-col>
                </v-row>

            </v-container>
        </div>
    </div>
</template>

<script>
import MovieList from "@/components/common/MovieList";
// import {movieList} from "@/api";

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
            page: 1,
            limit: 20,
            total: 0,
            list: [],

            busy: true,
            is_end: false,
        }
    },
    created() {
        // this.getData();
    },
    methods: {
        getData() {
            // movieList().then(res => {
            //     console.log(res)
            // });
            for (let i = 0; i < 10; i++) {
                let temp = {};
                temp.vod_id = i + 1;
                temp.vod_pic = "https://picsum.photos/id/11/10/6";
                temp.vod_title = "斗罗大陆" + i;
                temp.vod_tag = "宫漫";
                temp.vod_type = "更新至200集";
                temp.updated_at = "2022-01-20 10:01:01";
                this.list.push(temp);
            }
            this.busy = false;
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
            this.busy = true;
            this.page += 1;
            let that = this;
            setTimeout(function () {
                that.getData();
            }, 500)
        },
        // 搜索
        search() {
            this.list = [];
            this.page = 1;
            this.busy = false;
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
