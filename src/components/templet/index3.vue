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
               <v-col>
                   <div class="d-flex justify-space-between align-baseline">
                       <v-row>
                          <v-col v-bind="grid">正在播放：{{ movie.vod_name }}</v-col>
                          <v-col v-bind="grid" class="text-right">
                              <v-btn color="primary" text>
                                  <v-icon class="mr-1">
                                      mdi-playlist-plus
                                  </v-icon>
                                  <span class="subheading mr-2">稍后观看</span>
                              </v-btn>
                              <v-btn color="primary" text>
                                  <v-icon class="mr-1">
                                      mdi-heart
                                  </v-icon>
                                  <span class="subheading mr-2">收藏</span>
                              </v-btn>
                              <v-btn color="primary" text>
                                  <v-icon class="mr-1">
                                      mdi-movie-open-plus
                                  </v-icon>
                                  <span class="subheading mr-2">追更</span>
                              </v-btn>
                          </v-col>
                       </v-row>
                   </div>
               </v-col>

               <!--介绍-->
               <v-col cols="12">
                   <v-card class="pb-10">
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
                       <v-list-item-content class="pt-0 px-4">
                           <p v-if="movie.vod_director" class="mb-0">主演：{{ movie.vod_director}}</p>
                           <p  v-if="movie.vod_actor" class="mb-0">演员：{{ movie.vod_actor}}</p>
                           <div class="text-three-line" v-html="movie.vod_content"></div>
                       </v-list-item-content>

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
                   </v-card>
               </v-col>
           </v-row>
       </v-container>

    <!--播放设置-->

    </div>
</template>
<script>
import Player from "../common/Player/Player";
import EnumData from "@/util/EnumData";
import TransformUrl from "@/util/TransformUrl";
import Clipboard from "clipboard";
import {mapState} from "vuex";
export default {
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

        url:"",
        player_type: EnumData.playerByLocal,
        movie:{
            "id": 2426698,
            "api_id": 70,
            "status": 1,
            "vod_id": 15843,
            "vod_name": "吞噬星空 第二季",
            "type_id": 44,
            "vod_tag": "吞噬星空 第二季,RR,罗峰,季某,18,大涅,武者",
            "type_name": "国产动漫",
            "vod_pic": "https://ikg1.ingzkzy.com/upload/vod/20221019-1/7c63b8f8aa7b235b7f4ed2e96e8c7bb0.jpg",
            "vod_area": "大陆",
            "vod_lang": "国语",
            "vod_year": "2021",
            "vod_actor": "赵乾景,谢莹,杨超然,刘英杰,桑毓泽,吴磊,张欣,李婵妃,朱亚文",
            "vod_director": "沈乐平",
            "vod_remarks": "更新至35集",
            "vod_content": "某一天，地球上出现了不明来由的RR病毒，将世界卷入灾难之中。受到感染的动物变异成为可怕的怪兽，大举入侵，人类面临毁灭之际筑起了围墙，成立基地市作为人类最后的堡垒。人类在这一段时间经历的磨难，被称为“大涅槃时期”。在极端的生存环境下，人类的体能也在逐渐地进步发展，尚武之风兴起，人类的身体素质相比以前有了质的飞越。而这其中的佼佼者，被称为“武者”。18岁的罗峰也梦想着成为其中的一员。此时的他即将高考，正面临着人生十字路口的抉择，却不料怪兽的一次袭击影响了他的人生轨迹。在强大怪兽的威胁之下，市内居民面临危险，军方却束手无策。唯有一名武者挺身而出，保卫了基地市的安全。罗峰被武者的强大所感染，暗自立下成为武者以保护所爱之人的决心。这是一切的开始，罗峰武者之路的起点，也拉开了他传奇人生的序幕。罗峰立志成为武者，前路却并不平坦，他首先要面对的便是外部环境无形中对他施加的影响。罗峰家庭条件不佳，生活拮据，父母无法给予他更多帮助，只能依靠自己的努力。最终，在不断的艰苦磨砺下，罗峰不断发掘自身潜能，得到了能力提升和自我价值的认可。不仅如此，罗峰不仅扛起了供养家庭的重担，还为了守护人类家园、为了人类更好的生存与发展，与其他正义的武者们一起，联手对付凶恶怪兽。在末日绝境之下，罗峰与其他武者们能否击退怪兽、成功守护人类世界？",
            "vod_play_from": "'zkzym3u8'",
            "vod_play_note": "",
            "vod_play_url": "'1$https://bsn2.jkzy0.com/20221019/YwcOkPeJ/index.m3u8#2$https://bsn2.jkzy0.com/20221019/PLzrEicF/index.m3u8#3$https://bsn2.jkzy0.com/20221019/zydtSM0i/index.m3u8#4$https://bsn2.jkzy0.com/20221019/DXF1Pm9f/index.m3u8#5$https://bsn2.jkzy0.com/20221019/EWmTWwkB/index.m3u8#6$https://bsn2.jkzy0.com/20221019/FB5R9omw/index.m3u8#7$https://bsn2.jkzy0.com/20221019/mepVrHZG/index.m3u8#8$https://bsn2.jkzy0.com/20221019/qs96IBVq/index.m3u8#9$https://bsn2.jkzy0.com/20221019/2j0otX1s/index.m3u8#10$https://bsn2.jkzy0.com/20221019/ayr4ZISk/index.m3u8#11$https://bsn2.jkzy0.com/20221019/CvBxB2NI/index.m3u8#12$https://bsn2.jkzy0.com/20221019/dwdZwCRG/index.m3u8#13$https://bsn2.jkzy0.com/20221019/xoiO0OiZ/index.m3u8#14$https://bsn2.jkzy0.com/20221019/1wOObLmY/index.m3u8#15$https://bsn2.jkzy0.com/20221019/Yl9OJEHe/index.m3u8#16$https://bsn2.jkzy0.com/20221019/DCYppL2r/index.m3u8#17$https://bsn2.jkzy0.com/20221019/TtAEtTW0/index.m3u8#18$https://bsn2.jkzy0.com/20221019/cv3D5ORN/index.m3u8#19$https://bsn2.jkzy0.com/20221019/SJbo8rhJ/index.m3u8#20$https://bsn2.jkzy0.com/20221019/hORZl4Sa/index.m3u8#21$https://bsn2.jkzy0.com/20221019/5hEWrgNs/index.m3u8#22$https://bsn2.jkzy0.com/20221019/Y7AGid3L/index.m3u8#23$https://bsn2.jkzy0.com/20221019/MMW4vbCs/index.m3u8#24$https://bsn2.jkzy0.com/20221019/O2wspr1h/index.m3u8#25$https://bsn2.jkzy0.com/20221019/pG7Opt2p/index.m3u8#26$https://bsn2.jkzy0.com/20221019/sdk7tHuH/index.m3u8#27$https://bsn2.jkzy0.com/20221019/vDi0he0p/index.m3u8#28$https://bsn2.jkzy0.com/20221019/f84J33Es/index.m3u8#29$https://bsn2.jkzy0.com/20221019/KgCQZDpF/index.m3u8#30$https://bsn2.jkzy0.com/20221019/a5LOEMZ3/index.m3u8#31$https://bsn2.jkzy0.com/20221019/m8wxElzL/index.m3u8#32$https://bsn2.jkzy0.com/20221019/o8w34HfE/index.m3u8#33$https://bsn3.jkzy0.com/20221114/WB4IikWt/index.m3u8#34$https://bsn3.jkzy0.com/20221114/tWYru4SJ/index.m3u8#35$https://bsn2.jkzy0.com/20221109/HFyPoIn5/index.m3u8'",
            "vod_down_note": "",
            "vod_down_url": "",
            "vod_hits": 56,
            "vod_hits_day": 354,
            "vod_hits_week": 559,
            "vod_hits_month": 312,
            "created_at": "2022-11-15 20:06:34",
            "updated_at": "2022-11-15 20:06:34",
            "collect": null,
            "share": null,
            "today": null
        },
        cateList: [],
        index: 0,
        typeIndex: 0,
        playerList: [], // 播放列表

    }),

    mounted() {
        this.initPlayer();
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

                console.log(this.url)
                console.log(this.cateList);
                console.log(this.playerList);
            }
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
        ...mapState(["movieApi"])
    }
}
</script>
