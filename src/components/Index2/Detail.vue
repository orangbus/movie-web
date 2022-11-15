<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" md="9">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <Player
                                v-if="url !== ''"
                                :url="url"
                                :player_type="player_type"
                                :poster="movie.vod_pic"
                            ></Player>
                        </v-col>

                        <!--视频介绍-->
                        <v-col  cols="12" class="mt-3">
                            <v-card>
                                <v-card-subtitle><strong>正在播放：{{ name }}</strong></v-card-subtitle>
                                <!--上下集 + 分享-->
                                <div>
                                    <div class="d-flex justify-space-between">
                                        <div>
                                            <v-btn class="ma-2" @click="nextPlayer(false)">上一集</v-btn>
                                            <v-btn class="ma-2" @click="nextPlayer(true)">下一集</v-btn>
                                        </div>
                                        <div>
                                            <v-btn class="ma-2 copy" color="primary" :data-clipboard-text="url" @click="copyUrl">
                                                复制地址
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>

                                <v-card-title>
                                    {{ movie.vod_name }}
                                </v-card-title>
                                <v-card-subtitle>{{ movie.vod_year }} {{ movie.type_name }} {{ movie.vod_remarks }}</v-card-subtitle>
                                <v-card-text >
                                    <p v-if="movie.vod_director" class="mb-0">主演：{{ movie.vod_director}}</p>
                                    <p  v-if="movie.vod_actor" class="mb-0">演员：{{ movie.vod_actor}}</p>
                                    <div class="d-flex">
                                        <div class="text-two-line" v-html="movie.vod_content"></div>
                                        <div> <v-btn
                                            icon
                                            @click="show = !show"
                                        >
                                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                        </v-btn></div>
                                    </div>
                                    <p></p>
                                </v-card-text>

                                <!--介绍-->
                                <v-expand-transition>
                                    <div v-show="show">
                                        <v-card-text v-html="movie.vod_content">
                                        </v-card-text>
                                    </div>
                                </v-expand-transition>

                                <!--选集 + 介绍-->
                                <div>
                                    <v-tabs>
                                        <v-tab
                                            v-for="(cate,cateIndex) in cateList"
                                            :key="cateIndex"
                                            @click="changeType(cateIndex)"
                                        >{{ cate.name }}</v-tab>
                                    </v-tabs>
                                    <div class="d-flex justify-start flex-wrap">
                                        <v-btn
                                            :class="item.selected === true ? 'primary ma-2':' ma-2'"
                                            v-for="(item,index) in playerList"
                                            :key="index"
                                            @click="playMovie(item.url,index)"
                                        >
                                            {{ item.name }}
                                        </v-btn>
                                    </div>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <!--右侧推荐-->
                <v-col cols="12" md="3">
                    <v-row
                        no-gutters
                        v-for="(item,index) in list"
                        :key="index"
                        class="mb-2"
                    >
                        <v-col md="12">
                            <v-card class="d-flex justify-start " @click="getResult(item.id)" >
                                <div style="width: 30%;">
                                    <img :src="item.vod_pic" alt="" style="width:120px;height: 100%;">
                                </div>
                                <div>
                                    <v-card-title>
                                        <span class="text-two-line">{{ item.vod_name }}</span>
                                    </v-card-title>
                                    <v-card-subtitle>
                                         {{ item.vod_director }}
                                    </v-card-subtitle>
                                    <v-card-text> <span class="text-one-line">{{ item.vod_actor}}</span></v-card-text>
                                    <v-card-text> {{ item.vod_year }}  {{ item.type_name }} {{ item.vod_remarks }}</v-card-text>
                                </div>
                            </v-card>
                        </v-col>

                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import {movieDetail} from "@/api";
import TransformUrl from "@/util/TransformUrl";
import mdui from "mdui";
import Clipboard from "clipboard";
import Player from "../common/Player/Player";

export default {
    name: "Detail",
    components: {
        Player
    },
    data() {
        return {
            show:false,
            id: 0,
            list: [], // 推荐电影列表
            grid: {
                xl: 2,
                lg: 2,
                md: 2,
                sm: 6,
                xs: 6
            },
            name: "",
            movie: {},
            url: "", // 播放地址
            poster: "", // 封面图
            cateList: [],
            index: 0,
            typeIndex: 0,
            player_type: 0,
            playerList: [], // 播放列表
            api: {}, // 接口配置
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getData()
    },
    methods: {
        getData() {
            movieDetail(this.id).then(res => {
                if (res.code == 200) {
                    let {info, list, api} = res.data;
                    this.movie = info;
                    this.list = list;
                    this.api = api;

                    this.poster = info.vod_pic;
                    // 播放地址转化
                    this.cateList = TransformUrl(info)
                    if (this.cateList.length > 0) {
                        let typeIndex = this.typeIndex; // 类型 m3u8 还是网页直接播放
                        let index = this.index; // 默认集数
                        // 判断播放地址，如果不是 m3u8就直接播放
                        let url = this.cateList[typeIndex].list[index].url;
                        this.resetPlayer(url,api);

                        // 默认播放最新的视频
                        this.name = this.cateList[typeIndex].list[index].name;
                        this.cateList[typeIndex].list[index].selected = true;
                        this.playerList = this.cateList[this.typeIndex].list;
                    }
                } else {
                    mdui.snackbar(res.msg)
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
            this.resetPlayer(url,this.api);

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
            this.resetPlayer(url,this.api);
            this.typeIndex = index;
            this.cateList[index].list[0].selected = true;
            this.playerList = this.cateList[index].list;
        },

        // 重置播放
        resetPlayer(url,api){
            if (this.player != null) {
                this.player.destroy(false);
            }

            if (!url.includes("m3u8")) {
                this.player_type = 0;
            }
            // 判断是否要使用接口解析
            if (api.is_open && api.parse_url != null) {
                // 判断是否需要用解析
                if (this.player_type === 0 && url.includes("m3u8")) {
                    this.url = api.parse_url + url;
                }else{
                    this.url = url;
                }
            } else {
                this.url = url;
            }
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
            var clipboard = new Clipboard('.copy')
            clipboard.on('success', () => {
                mdui.snackbar("已复制播放链接")
                //  释放内存
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                // 不支持复制
                mdui.alert('该浏览器不支持复制', '错误提示！')
                // 释放内存
                clipboard.destroy()
            })
        },

    },

}
</script>

<style scoped>

</style>
