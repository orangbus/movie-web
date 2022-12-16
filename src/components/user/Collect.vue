<template>
    <div class="xyScrollBar" @scroll="loadMore" id="backTop">
        <v-row>
            <v-col cols="12" class="d-flex">
                <v-btn
                    small
                    color="primary"
                    @click="clearAll"
                >全部清空
                </v-btn>
                <v-btn
                    class="ml-2"
                    small
                    color="primary"
                    @click="clearExpire"
                >清除本页失效视频
                </v-btn>
                <div class="ml-3">
                    <DownloadList :movie-list="downloadList"></DownloadList>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col
                v-for="(item,index) in list"
                :key="index"
                cols="12"
                v-bind="grid" >
                <v-card hover>
                    <div class="d-flex justify-start">
                        <v-avatar
                            class="ma-0"
                            size="155"
                            tile
                            rounded
                        >
                            <v-img class="border-radius" :src="item.movie ? item.movie.vod_pic: ''"></v-img>
                        </v-avatar>

                        <div class="w-full">
                            <v-card-title class="pt-0"><span
                                class="text-two-line">{{ item.movie ? item.movie.vod_name : '' }}</span>
                            </v-card-title>

                            <v-card-subtitle class="py-0">
                                <p class="my-0 py-0">{{ item.movie ? item.movie.type_name : '' }}</p>
                                <p class="my-0 py-0">{{ item.updated_at }}</p>
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn
                                    class="ml-2"
                                    small
                                    color="primary"
                                    @click="playerMovie(item)"
                                >
                                    立即观看
                                </v-btn>
                                <v-btn
                                    class="ml-2"
                                    outlined
                                    small
                                    color="error"
                                    @click="unCollect(item)"
                                >
                                    取消收藏
                                </v-btn>
                                <v-spacer></v-spacer>
                                <Download :movie="item.movie"></Download>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" class="text-center">
                <Page :loading="loading" :total="total" @changePage="changePage"></Page>
            </v-col>
        </v-row>

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


        <!--播放器-->
        <v-row>
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-toolbar
                        dark
                        color="primary"
                    >
                        <v-toolbar-title>{{ movie.vod_name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                icon
                                dark
                                @click="dialog = false"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <!--播放视频-->
                    <MoviePlayer :movie="movie" :user-parse="true" v-if="dialog"></MoviePlayer>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import Page from "@/components/common/Page";
import {movieCollectClear, movieCollectDelete, movieCollectList} from "@/api/movie";
import {mapState} from "vuex";
import MoviePlayer from "@/components/common/MoviePlayer";
import Download from "@/components/common/movie/Download.vue";
import DownloadList from "@/components/common/movie/DownloadList.vue";

export default {
    components: {
        Page, MoviePlayer, Download, DownloadList
    },
    data() {
        return {
            showTop:false,
            dialog: false,
            movie: {},

            page: 1,
            total: 0,
            loading: true,
            list: [],
            isEnd : false, // 底部加载
            grid: {
                xl: 3,
                lg: 3,
                md: 6,
                sm: 6,
                xs: 12
            },
            downloadList: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.list = [];
            this.getData();
        },
        getData() {
            this.loading = true;
            if (this.setting.showPage) {
                this.list = [];
                this.downloadList = []
            }
            movieCollectList({
                page: this.page,
                limit: this.setting.limit,
            }).then(res => {
                this.loading = false;
                let {data, total} = res;
                this.list.push(...data);
                res.data.forEach(item => {
                    this.downloadList.push(item.movie);
                })
                this.total = total;

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
            if (this.setting.showPage) {
                return false;
            }
            //vue中获取滚动条到底部的距离
            let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
            // 显示到顶部
            this.showTop = event.target.scrollTop > 1000;
            //以下三个条件不执行数据加载：1.数据正在加载的状态，2.已经到底了，3.滚动条距离底部的距离小于100px
            if (!this.loading && !this.isEnd && scrollBottom < 100) {
                this.loading = true;
                this.page += 1;
                this.getData();
            }
        },
        toTop(){
            document.getElementById("backTop").scrollTop = -100;
        },

        playerMovie(item) {
            if (item.movie === null) {
                this.$toast.error("视频可能已经失效");
                return false;
            }
            this.movie = item.movie;
            this.dialog = true;
        },
        unCollect(item) {
            movieCollectDelete({
                id: item.id
            }).then(res => {
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg)
                }
            })
        },
        // 清空收藏
        clearAll() {
            movieCollectClear().then(res => {
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        clearExpire() {
            let ids = [];
            this.list.forEach(item => {
                if (item.movie === null) {
                    ids.push(item.id);
                }
            });
            movieCollectDelete({ids}).then(res => {
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                    this.getData();
                } else {
                    this.$toast.error(res.msg);
                }
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
