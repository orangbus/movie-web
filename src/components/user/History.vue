<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-btn
                    small
                    color="primary"
                    @click="clearAll"
                >全部清空</v-btn>
                <v-btn
                    class="ml-2"
                    small
                    color="primary"
                    @click="clearExpire"
                >清除本页失效视频</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-for="(item,index) in list"
                :key="index"
                v-bind="grid">
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
                            <v-card-title class="pt-0"><span class="text-two-line">{{ item.movie? item.movie.vod_name: '' }}</span></v-card-title>

                            <v-card-subtitle class="py-0">
                                <p class="my-0 py-0">{{ item.movie ? item.movie.type_name: '' }}</p>
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
                                    删除
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <Page :loading="loading" :total="total" @changePage="changePage"></Page>

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
import {movieHistoryClear, movieHistoryDelete, movieHistoryList} from "@/api/movie";
import {mapState} from "vuex";
import MoviePlayer from "@/components/common/MoviePlayer"

export default {
    components:{
        Page,MoviePlayer
    },
    data() {
        return{
            dialog:false,
            movie: {},

            page:1,
            total:0,
            loading:true,
            list:[],
            grid: {
                xl: 3,
                lg: 3,
                md: 6,
                sm: 6,
                xs: 12
            },
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        changePage(page){
            this.page = page;
            this.list = [];
            this.getData();
        },
        getData(){
            this.loading = true;
            movieHistoryList({
                page:this.page,
                limit: this.setting.limit,
            }).then(res=>{
                this.loading = false;
                let {data,total}  =res;
                this.list = data;
                this.total = total;
                if (data.length === 0){
                    this.$toast.info("暂无数据");
                }
            });
        },
        playerMovie(item){
            if (item.movie === null){
                this.$toast.error("视频可能已经失效");
                return false;
            }
            this.movie = item.movie;
            this.dialog = true;
        },
        unCollect(item){
            movieHistoryDelete({
                id:item.id
            }).then(res=>{
                if (res.code === 200){
                    this.$toast.success(res.msg)
                }else{
                    this.$toast.error(res.msg)
                }
            })
        },
        // 清空收藏
        clearAll(){
            movieHistoryClear().then(res=>{
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        clearExpire(){
            let ids = [];
            this.list.forEach(item=>{
                if (item.movie === null){
                    ids.push(item.id);
                }
            });
            movieHistoryDelete({ids}).then(res=>{
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                    this.getData();
                } else {
                    this.$toast.error(res.msg);
                }
            });
        }
    },
    computed:{
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
