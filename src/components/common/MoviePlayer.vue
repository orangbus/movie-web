<template>
    <div>
       <v-container>
           <v-row>
               <!--播放器-->
               <v-col cols="12">
                   <Player
                       v-if="url !== ''"
                       :url="url"
                       :player_type="player_type"
                       :poster="movie.vod_pic"
                   ></Player>
               </v-col>
               <!--<v-col cols="12" >-->
               <!--      <v-row class="d-flex justify-space-between align-baseline">-->
               <!--                <v-col cols="12" v-bind="grid">正在播放：{{ name }}</v-col>-->
               <!--                <v-col cols="12" v-bind="grid" :class="`${isMobile === true ? 'text-center':'text-right'}`">-->
               <!--                    <v-btn color="primary" text @click="addWait">-->
               <!--                        <v-icon class="mr-1">-->
               <!--                            mdi-playlist-plus-->
               <!--                        </v-icon>-->
               <!--                        <span class="subheading mr-2">{{ hasWait == null ? "稍后观看":"已加入稍后观看"}}</span>-->
               <!--                    </v-btn>-->
               <!--                    <v-btn color="primary" text @click="collect">-->
               <!--                        <v-icon class="mr-1">-->
               <!--                            mdi-heart-->
               <!--                        </v-icon>-->
               <!--                        <span class="subheading mr-2">{{ hasCollect == null ? "收藏":"已收藏"}}</span>-->
               <!--                    </v-btn>-->
               <!--                    <v-btn color="primary" text @click="addUpdate">-->
               <!--                        <v-icon class="mr-1">-->
               <!--                            mdi-movie-open-plus-->
               <!--                        </v-icon>-->
               <!--                        <span class="subheading mr-2">{{ hasUpdate == null ? "追更":"已追更"}}</span>-->
               <!--                    </v-btn>-->
               <!--                </v-col>-->
               <!--            </v-row>-->
               <!--</v-col>-->

               <!--介绍-->
               <v-col cols="12">
                   <v-card>
                       <v-row class="d-flex justify-space-between align-baseline">
                           <v-col cols="12" v-bind="grid" ><span class="px-4">正在播放：{{ name }}</span></v-col>
                           <v-col cols="12" v-bind="grid" :class="`${isMobile === true ? 'text-center':'text-right'}`">
                               <v-btn color="primary" text @click="addWait">
                                   <v-icon class="mr-1">
                                       mdi-playlist-plus
                                   </v-icon>
                                   <span class="subheading mr-2">{{ hasWait == null ? "稍后观看":"已加入稍后观看"}}</span>
                               </v-btn>
                               <v-btn color="primary" text @click="collect">
                                   <v-icon class="mr-1">
                                       mdi-heart
                                   </v-icon>
                                   <span class="subheading mr-2">{{ hasCollect == null ? "收藏":"已收藏"}}</span>
                               </v-btn>
                               <v-btn color="primary" text @click="addUpdate">
                                   <v-icon class="mr-1">
                                       mdi-movie-open-plus
                                   </v-icon>
                                   <span class="subheading mr-2">{{ hasUpdate == null ? "追更":"已追更"}}</span>
                               </v-btn>
                           </v-col>
                       </v-row>
                       <!--<v-card-title>{{ movie.vod_name }}</v-card-title>-->
                       <v-card-subtitle>{{ movie.vod_year }} {{ movie.type_name }} {{ movie.vod_remarks }}</v-card-subtitle>
                       <v-card-text class="pt-0 px-4">
                           <p v-if="movie.vod_director" class="mb-0">主演：{{ movie.vod_director}}</p>
                           <p  v-if="movie.vod_actor" class="mb-0">演员：{{ movie.vod_actor}}</p>
                           <div class="text-three-line" v-html="movie.vod_content"></div>
                       </v-card-text>
                   </v-card>

                   <!--选集-->
                   <v-tabs>
                       <v-tab
                           v-for="(cate,cateIndex) in cateList"
                           :key="cateIndex"
                           @click="changeType(cateIndex)"
                       >{{ cate.name }}</v-tab>
                   </v-tabs>
                   <v-list-item class="pt-0" >
                       <div class="d-flex  flex-wrap justify-start">
                           <v-btn
                               v-for="(item,index) in playerList"
                               :key="index"
                               :class="item.selected === true ? 'primary ma-2':' ma-2'"
                               @click="playMovie(item.url,index)"
                           >
                               {{ item.name }}
                           </v-btn>
                       </div>
                   </v-list-item>
               </v-col>
           </v-row>
       </v-container>
    </div>
</template>
<script>
import Player from "../common/Player/Player";
import EnumData from "@/util/EnumData";
import TransformUrl from "@/util/TransformUrl";
import Clipboard from "clipboard";
import {mapState} from "vuex";
import {movieCollectStore, movieStatus, movieToday, movieWaitStore} from "@/api/movie";
export default {
    props:{
      movie:{
          type:Object,
          default:()=>{}
      },
        // 当前视频未使用解析的时候，优先使用自定义解析
        userParse:{
          type:Boolean,
            default:()=>false
        }
    },
    components:{
        Player
    },

    data: () => ({
         grid: {
             xl: 6,
             lg: 6,
             md: 6,
             sm: 12,
             xs: 12
         },

        name: "",
        url:"",
        player_type: EnumData.playerByLocal,
        cateList: [],
        index: 0,
        typeIndex: 0,
        playerList: [], // 播放列表

        hasCollect: null, // 是否收藏
        hasUpdate: null, // 是否追根
        hasWait: null, // 是否加入稍后观看
    }),

    mounted() {
        this.initPlayer();
        this.getMovieStatus();
    },

    methods: {
        initPlayer(){
            // 播放地址转化
            this.cateList = TransformUrl(this.movie)
            if (this.cateList.length > 0) {
                let typeIndex = this.typeIndex; // 类型 m3u8 还是网页直接播放
                let index = this.index; // 默认集数
                // 判断播放地址，如果不是 m3u8就直接播放
                let url = this.cateList[typeIndex].list[index].url;
                this.resetPlayer(url,this.movieApi);

                // 默认播放最新的视频
                this.name = this.cateList[typeIndex].list[index].name;
                this.cateList[typeIndex].list[index].selected = true;
                this.playerList = this.cateList[this.typeIndex].list;
            }
        },
        getMovieStatus(){
            movieStatus(this.movie.id).then(res=>{
                if (res.code === 200){
                    let {
                        hasCollect,
                        hasUpdate,
                        hasWait
                    } = res.data;
                    this.hasCollect = hasCollect;
                    this.hasUpdate = hasUpdate;
                    this.hasWait = hasWait;
                }
            });
        },

        // 点击播放集数
        playMovie(url, index) {
            this.url = "";
            this.playerList.forEach(item => {
                item.selected = false;
            })
            this.playerList[index].selected = true;
            if (this.player != null) {
                this.player.destroy(false);
            }
            // 判断是否要使用接口解析
            this.resetPlayer(url,this.movieApi);

            this.name = this.playerList[index].name;
            this.playerList[index].selected = true;
        },

        /**
         * 切换视频播放类型
         * @param index
         */
        changeType(index) {
            this.url = "";
            let url = this.cateList[index].list[0].url; // 原播放地址
            this.resetPlayer(url,this.movieApi);
            this.typeIndex = index;
            this.cateList[index].list[0].selected = true;
            this.playerList = this.cateList[index].list;
        },

        // 重置播放
        resetPlayer(url,api){
            console.log("form_url",url)
            if (this.player != null) {
                this.player.destroy(false);
            }

            if (!url.includes("m3u8")) {
                this.player_type = EnumData.playerByLocal;
            }
            // 判断是否要使用接口解析
            if (api.is_open && api.parse_url != null) {
                // 判断是否需要用解析
                if (this.player_type === 0 && url.includes("m3u8")) {
                    this.url = api.parse_url + url;
                }
            } else if (this.userParse && this.setting.parse){
                this.url = this.setting.parse.url + url;
            }else{
                this.url = url;
            }


            console.log("url:"+this.url)
        },

        // 当页切换数据
        getResult(movie_id) {
            this.url = "";
            this.player_type = 0;
            this.id = movie_id;
            if (this.player != null) {
                this.player.destroy(false);
            }
            this.getData();
        },

        addWait(){
            movieWaitStore({vid:this.movie.id}).then(res=>{
                if (res.code === 200) {
                    this.hasWait = this.hasWait === null;
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            })
        },
        collect(){
             movieCollectStore({api_id:this.movieApi.id,id:this.movie.id}).then(res=>{
                if (res.code === 200) {
                    this.hasCollect = this.hasCollect === null ? {id:0} : null;
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            })
        },
        addUpdate(){
            movieToday({id:this.movie.id}).then(res=>{
                if (res.code === 200) {
                    this.hasUpdate = this.hasUpdate === null ? {id:0} : null;
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            })
        },

        // 上下集
        nextPlayer(type) {
            // 下一集
            if (type) {
                if (this.index === 0) {
                    // mdui.snackbar("没有下一集啦！");
                    return;
                }
                this.url = "";
                let url = this.cateList[this.typeIndex].list[this.index - 1].url;
                this.index = this.index - 1;
                this.playMovie(url, this.index);
            } else {
                // 上一集
                if (this.index >= this.playerList.length) {
                    // mdui.snackbar("没有上一集啦！");
                    return;
                }
                this.url = "";
                let url = this.cateList[this.typeIndex].list[this.index + 1].url;
                this.index = this.index + 1;
                this.playMovie(url, this.index);
            }
        },
        // 复制地址
        copyUrl() {
            let that = this;
            var clipboard = new Clipboard('.copy')
            clipboard.on('success', () => {
                this.$toast.success("已复制播放链接");
                //  释放内存
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                // 不支持复制
                that.$toast.success("该浏览器不支持复制");
                // 释放内存
                clipboard.destroy()
            })
        },

    },
    computed: {
        ...mapState(["movieApi","setting","isMobile"])
    }
}
</script>
