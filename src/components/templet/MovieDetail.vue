<template>
    <div>
        <v-container>
            <v-row>
                <v-col v-bind="left_grid">
                    <v-col style="padding: 0px">
                        <Player
                            v-if="url !== ''"
                            :url="url"
                            :player_type="player_type"
                            :poster="movie.vod_pic"
                        ></Player>
                    </v-col>
                </v-col>
                <v-col v-bind="right_grid">
                    <v-row>
                        <v-col >
                            <v-list-item class="pt-0" >
                                <v-list-item-avatar color="grey darken-3">
                                    <v-img
                                        class="elevation-6"
                                        alt=""
                                        :src="movie.vod_pic"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content style="padding: 0px;">
                                    <v-card-title>{{ movie.vod_name }}</v-card-title>
                                    <v-card-subtitle>{{ movie.vod_year }} {{ movie.type_name }} {{ movie.vod_remarks }}</v-card-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item-content class="pt-0">
                                <p v-if="movie.vod_director" class="mb-0">主演：{{ movie.vod_director}}</p>
                                <p  v-if="movie.vod_actor" class="mb-0">演员：{{ movie.vod_actor}}</p>
                                <div class="text-three-line" v-html="movie.vod_content"></div>
                            </v-list-item-content>

                            <!--<v-tabs>-->
                            <!--    <v-tab-->
                            <!--        v-for="(cate,cateIndex) in cateList"-->
                            <!--        :key="cateIndex"-->
                            <!--        @click="changeType(cateIndex)"-->
                            <!--    >{{ cate.name }}</v-tab>-->
                            <!--</v-tabs>-->
                            <!--<div class="d-flex justify-start flex-wrap">-->
                            <!--    <v-btn-->
                            <!--        :class="item.selected === true ? 'primary ma-2':' ma-2'"-->
                            <!--        v-for="(item,index) in playerList"-->
                            <!--        :key="index"-->
                            <!--        @click="playMovie(item.url,index)"-->
                            <!--    >-->
                            <!--        {{ item.name }}-->
                            <!--    </v-btn>-->
                            <!--</div>-->

                            <!--选集-->
                            <v-tabs>
                                <v-tab
                                    v-for="(cate,cateIndex) in cateList"
                                    :key="cateIndex"
                                    @click="changeType(cateIndex)"
                                >{{ cate.name }}</v-tab>
                            </v-tabs>
                            <v-list-item class="pt-0" >
                                <v-virtual-scroll
                                    :benched="0"
                                    height="300"
                                    item-height="64"
                                    :items="playerList"
                                >
                                    <template v-slot:default="{item}">
                                        <div class="d-flex justify-start flex-wrap">
                                            <v-btn
                                                :class="item.selected === true ? 'primary ma-2':' ma-2'"
                                                :key="item.name"
                                                @click="playMovie(item.url,index)"
                                            >
                                                {{ item.name }}
                                            </v-btn>
                                        </div>
                                    </template>
                                </v-virtual-scroll>
                            </v-list-item>

                            <v-list-item class="pt-0" >
                                <v-row
                                    align="center"
                                    justify="start"
                                >
                                    <v-btn color="primary" >
                                        <v-icon class="mr-1">
                                            mdi-heart
                                        </v-icon>
                                        <span class="subheading mr-2">256</span>
                                    </v-btn>

                                    <v-btn class="ml-3" color="pink">
                                        <v-icon class="mr-1">
                                            mdi-share-variant
                                        </v-icon>
                                        <span class="subheading">45</span>
                                    </v-btn>

                                </v-row>
                            </v-list-item>
                        </v-col>

                        <v-list v-if="false" three-line class="ml-0 ">
                            <template v-for="(item, index) in list">
                                <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                                    v-text="item.header"
                                ></v-subheader>

                                <v-divider
                                    v-else-if="item.divider"
                                    :key="index"
                                    :inset="item.inset"
                                ></v-divider>

                                <v-list-item
                                    v-else
                                    :key="item.vod_name"
                                    class="pl-0"
                                >
                                    <v-avatar
                                        class="ma-3"
                                        size="125"
                                        tile
                                    >
                                        <v-img style="border-radius: 5px" :src="item.vod_pic"></v-img>
                                    </v-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.vod_name"></v-list-item-title>
                                        <v-list-item-subtitle v-html="item.vod_type"></v-list-item-subtitle>
                                        <v-list-item-content>
                                            <p class="text-three-line" v-html="item.vod_content"></p>
                                        </v-list-item-content>
                                        <v-list-item-subtitle class="d-flex justify-start">
                                            <div>{{ item.type_name}}</div>
                                            <div class="ml-2">{{ movie.vod_remarks }}</div>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Player from "../common/Player/Player";
import {movieDetail} from "@/api/index";
import TransformUrl from "@/util/TransformUrl";
import mdui from "mdui";
import Clipboard from "clipboard";
export default {
    name: "MovieDetail",
    components:{
        Player
    },
    props:{
        item:{
            type:Object,
            default:()=>{}
        }
    },
    mounted() {
        this.movie = this.item;
        this.getData();
    },
    data() {
        return{
            grid: {
                xl: 3,
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
            },
            left_grid: {
                xl: 9,
                lg: 9,
                md: 9,
                sm: 12,
                xs: 12
            },
            right_grid: {
                xl: 3,
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
            },


            movie:{},
            name: "",
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
    methods:{
        getData(){
            movieDetail(this.item.id).then(res => {
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
    }
}
</script>

<style scoped>

</style>
