<template>
    <div>
            <!--顶部导航-->
            <v-app-bar
                clipped-left
                color="primary"
            >
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                <v-toolbar-title>Title</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="drawer = true">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>

            <!--侧边导航-->
            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
            >
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>John Leider</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item
                        v-for="(item,index) in 10"
                        :key="index"
                        link
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>斗罗大陆</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <!--主体内容-->
            <v-main>
                <v-container>
                    <v-row>
                        <v-col v-bind="grid" cols="6" v-for="(item,index) in list"
                               :key="index">
                            <v-hover v-if="true" v-slot="{ hover }" >
                                <v-card
                                    @click="dialog = true"
                                    :elevation="hover ? 12 : 2"
                                    :class="{ 'on-hover': hover }">
                                    <v-img
                                        max-height="310"
                                        min-height="310"
                                        class="white--text text-pointer align-end movie-img-border"
                                        :src="item.vod_pic"
                                    >
                                        <div class="fill-height bottom-gradient"></div>
                                    </v-img>

                                    <div>
                                        <v-card-title class="m-0">{{ item.vod_name}}</v-card-title>
                                        <v-card-subtitle>{{ item.vod_actor}}</v-card-subtitle>
                                        <v-card-text v-html="item.vod_remarks"></v-card-text>
                                        <v-card-actions>
                                            <MovieDownload :movie="item"></MovieDownload>
                                            <!--<v-btn text color="primary" @click="showDownload(item)">下载</v-btn>-->
                                        </v-card-actions>
                                    </div>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>

        <div class="text-center">
            <v-dialog
                scrollable
                :fullscreen="setting.playerWay === EnumData.playerWayFullscreen"
                v-model="dialog"
                width="800"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                        Click Me
                    </v-btn>
                </template>

                <v-card>
                    <v-toolbar
                       short
                    >
                        <v-toolbar-title>{{ movie.vod_name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                icon
                                dark
                                color="primary"
                                @click="dialog = false"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <!--<v-card-title>-->
                    <!--    {{ movie.vod_name }}-->
                    <!--</v-card-title>-->
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-btn-->
                    <!--    icon-->
                    <!--    dark-->
                    <!--    @click="dialog = false"-->
                    <!--&gt;-->
                    <!--    <v-icon>mdi-close</v-icon>-->
                    <!--</v-btn>-->


                    <v-card-text>
                        <iframe  width="100%"
                                 :style="`margin-top:10px; border-radius: 6px;max-height:${isMobile === true ? 600: 450}px;min-height: ${isMobile === true ? 600: 450}px;`"
                                 :src="url" frameborder="0"
                                 allowfullscreen></iframe>
                        <div class="">
                            <div>正在播放第一集 {{ EnumData.playerWayFullscreen}}</div>
                            <div v-html="movie.vod_content"></div>

                        </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions v-if="isMobile">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            关闭
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<script>

import {mapState} from "vuex";
import EnumData from "@/util/EnumData";
import axios from "axios";
import TransformUrl from "@/util/TransformUrl";
import MovieDownload from "@/components/common/movie/Download.vue"

export default {
    components:{
        MovieDownload
    },
    data() {
        return {
            EnumData,
            drawer: false,
            grid: {
                xl: 2, // 4K 和超宽屏幕
                lg: 2, // 桌面端
                md: 4, // 大型号平板到手提电脑
                sm: 4, // 小型号到中型号的平板
                xs: 12 // 小型号到大型号的手机
            },
            dialog : false,
            url:"https://www.zy018.com/player/?url=https://player.cdn008.com//20221127/oJZeZEB8/index.m3u8",
            movie:{
                "id": 2601282,
                "api_id": 74,
                "status": 1,
                "vod_id": 21245,
                "vod_name": "酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断",
                "type_id": 22,
                "vod_tag": "",
                "type_name": "国产精品",
                "vod_pic": "https://www.zy018.com/upload/vod/20221127-1/064451e30694ab03000292ea292fe699.jpg",
                "vod_area": "",
                "vod_lang": "",
                "vod_year": "2022",
                "vod_actor": "",
                "vod_director": "",
                "vod_remarks": "",
                "vod_content": "酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断酒店开房爆操白嫩小美女，身材完美极品爆草呻吟不断",
                "vod_play_from": "'hgm3u8'",
                "vod_play_note": "",
                "vod_play_url": "'高清$https://player.cdn008.com//20221127/oJZeZEB8/index.m3u8'",
                "vod_down_note": "",
                "vod_down_url": "",
                "vod_hits": 564,
                "vod_hits_day": 65,
                "vod_hits_week": 908,
                "vod_hits_month": 144,
                "created_at": "2022-11-27 20:00:57",
                "updated_at": "2022-11-27 20:00:57"
            },
            movie2:{
                "id": 898260,
                "api_id": 30,
                "status": 1,
                "vod_id": 59961,
                "vod_name": "全能高手",
                "type_id": 3,
                "vod_tag": "",
                "type_name": "动漫",
                "vod_pic": "https://soutre.com/upload/vod/20220604-1/acaacd102c6c2ee38dee311191a9ac9e.jpg",
                "vod_area": "内地",
                "vod_lang": "国语",
                "vod_year": "2022",
                "vod_actor": "秦墨",
                "vod_director": "心虎",
                "vod_remarks": "第50集",
                "vod_content": "<p>少年秦墨为寻双亲被害真相，踏出间荒禁地，誓要成为全能高手，争做这天地霸主！ 一人一狗，坑蒙拐骗，一路逆袭，注定要掀起一场腥风血雨……</p>",
                "vod_play_from": "'xlyun$$$xlm3u8'",
                "vod_play_note": "$$$",
                "vod_play_url": "'第01话$https://s.xlzys.com/play/qaQW667d#第02话$https://s.xlzys.com/play/BeXDrrke#第03话$https://s.xlzys.com/play/rb2k77Jd#第04话$https://s.xlzys.com/play/9b68BB7e#第05话$https://s.xlzys.com/play/Xe0R007b#第06话$https://s.xlzys.com/play/nelY22la#第07话$https://s.xlzys.com/play/mepYkk1a#第08话$https://s.xlzys.com/play/DdwpKKJe#第09话$https://s.xlzys.com/play/nelY22Ja#第10话$https://s.xlzys.com/play/mepYkkra#第11集$https://s.xlzys.com/play/BeXDPx8e#第12集$https://s.xlzys.com/play/rb2kX4jd#第13集$https://s.xlzys.com/play/9b68MoLe#第14集$https://s.xlzys.com/play/rb2kAzAd#第15集$https://s.xlzys.com/play/DdwjrpJb#第16集$https://s.xlzys.com/play/DdwpYqme#第17集$https://s.xlzys.com/play/1aMjQLmb#第18集$https://s.xlzys.com/play/qaQ10PGa#第19集$https://s.xlzys.com/play/9b66YL7b#第20集$https://s.xlzys.com/play/Xe0gAv7d#第21集$https://s.xlzys.com/play/1aMjX8Ob#第22集$https://s.xlzys.com/play/RdGZA6Lb#第23集$https://s.xlzys.com/play/nelOovVd#第24集$https://s.xlzys.com/play/mepgvRmd#第25集$https://s.xlzys.com/play/rb2RKyKb#第26集$https://s.xlzys.com/play/Xe0gGwvd#第27集$https://s.xlzys.com/play/9b66rm9b#第28集$https://s.xlzys.com/play/Xe0gl2Xd#第29集$https://s.xlzys.com/play/Xe0V0nKb#第30集$https://s.xlzys.com/play/nel52yra#第31集$https://s.xlzys.com/play/9b6RNm9b#第32集$https://s.xlzys.com/play/Xe0V72Xb#第33集$https://s.xlzys.com/play/mepQMMma#第34集$https://s.xlzys.com/play/DdwmWWza#第35集$https://s.xlzys.com/play/mep8YAQe#第36集$https://s.xlzys.com/play/DdwVpLrb#第37集$https://s.xlzys.com/play/1aMwpWPd#第38集$https://s.xlzys.com/play/qaQnwgMb#第39集$https://s.xlzys.com/play/nelxZ1ge#第40集$https://s.xlzys.com/play/mep84N1e#第41集$https://s.xlzys.com/play/BeXQrLAa#第42集$https://s.xlzys.com/play/rb287xNe#第43集$https://s.xlzys.com/play/rb2873je#第44集$https://s.xlzys.com/play/nelR7gVb#第45集$https://s.xlzys.com/play/nelR7z6b#第46集$https://s.xlzys.com/play/mepZzLpb#第47集$https://s.xlzys.com/play/rb28g4Ke#第48集$https://s.xlzys.com/play/RdGRY2Lb#第49集$https://s.xlzys.com/play/RdGRwv8b#第50集$https://s.xlzys.com/play/1aMZgmmb$$$第01话$https://s.xlzys.com/play/qaQW667d/index.m3u8#第02话$https://s.xlzys.com/play/BeXDrrke/index.m3u8#第03话$https://s.xlzys.com/play/rb2k77Jd/index.m3u8#第04话$https://s.xlzys.com/play/9b68BB7e/index.m3u8#第05话$https://s.xlzys.com/play/Xe0R007b/index.m3u8#第06话$https://s.xlzys.com/play/nelY22la/index.m3u8#第07话$https://s.xlzys.com/play/mepYkk1a/index.m3u8#第08话$https://s.xlzys.com/play/DdwpKKJe/index.m3u8#第09话$https://s.xlzys.com/play/nelY22Ja/index.m3u8#第10话$https://s.xlzys.com/play/mepYkkra/index.m3u8#第11集$https://s.xlzys.com/play/BeXDPx8e/index.m3u8#第12集$https://s.xlzys.com/play/rb2kX4jd/index.m3u8#第13集$https://s.xlzys.com/play/9b68MoLe/index.m3u8#第14集$https://s.xlzys.com/play/rb2kAzAd/index.m3u8#第15集$https://s.xlzys.com/play/DdwjrpJb/index.m3u8#第16集$https://s.xlzys.com/play/DdwpYqme/index.m3u8#第17集$https://s.xlzys.com/play/1aMjQLmb/index.m3u8#第18集$https://s.xlzys.com/play/qaQ10PGa/index.m3u8#第19集$https://s.xlzys.com/play/9b66YL7b/index.m3u8#第20集$https://s.xlzys.com/play/Xe0gAv7d/index.m3u8#第21集$https://s.xlzys.com/play/1aMjX8Ob/index.m3u8#第22集$https://s.xlzys.com/play/RdGZA6Lb/index.m3u8#第23集$https://s.xlzys.com/play/nelOovVd/index.m3u8#第24集$https://s.xlzys.com/play/mepgvRmd/index.m3u8#第25集$https://s.xlzys.com/play/rb2RKyKb/index.m3u8#第26集$https://s.xlzys.com/play/Xe0gGwvd/index.m3u8#第27集$https://s.xlzys.com/play/9b66rm9b/index.m3u8#第28集$https://s.xlzys.com/play/Xe0gl2Xd/index.m3u8#第29集$https://s.xlzys.com/play/Xe0V0nKb/index.m3u8#第30集$https://s.xlzys.com/play/nel52yra/index.m3u8#第31集$https://s.xlzys.com/play/9b6RNm9b/index.m3u8#第32集$https://s.xlzys.com/play/Xe0V72Xb/index.m3u8#第33集$https://s.xlzys.com/play/mepQMMma/index.m3u8#第34集$https://s.xlzys.com/play/DdwmWWza/index.m3u8#第35集$https://s.xlzys.com/play/mep8YAQe/index.m3u8#第36集$https://s.xlzys.com/play/DdwVpLrb/index.m3u8#第37集$https://s.xlzys.com/play/1aMwpWPd/index.m3u8#第38集$https://s.xlzys.com/play/qaQnwgMb/index.m3u8#第39集$https://s.xlzys.com/play/nelxZ1ge/index.m3u8#第40集$https://s.xlzys.com/play/mep84N1e/index.m3u8#第41集$https://s.xlzys.com/play/BeXQrLAa/index.m3u8#第42集$https://s.xlzys.com/play/rb287xNe/index.m3u8#第43集$https://s.xlzys.com/play/rb2873je/index.m3u8#第44集$https://s.xlzys.com/play/nelR7gVb/index.m3u8#第45集$https://s.xlzys.com/play/nelR7z6b/index.m3u8#第46集$https://s.xlzys.com/play/mepZzLpb/index.m3u8#第47集$https://s.xlzys.com/play/rb28g4Ke/index.m3u8#第48集$https://s.xlzys.com/play/RdGRY2Lb/index.m3u8#第49集$https://s.xlzys.com/play/RdGRwv8b/index.m3u8#第50集$https://s.xlzys.com/play/1aMZgmmb/index.m3u8'",
                "vod_down_note": "",
                "vod_down_url": "",
                "vod_hits": 378,
                "vod_hits_day": 545,
                "vod_hits_week": 841,
                "vod_hits_month": 935,
                "created_at": "2022-10-15 20:00:49",
                "updated_at": "2022-10-15 20:00:49"
            },
            list2:[
                {
                    "id": 898260,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 59961,
                    "vod_name": "全能高手",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220604-1/acaacd102c6c2ee38dee311191a9ac9e.jpg",
                    "vod_area": "内地",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "秦墨",
                    "vod_director": "心虎",
                    "vod_remarks": "第50集",
                    "vod_content": "<p>少年秦墨为寻双亲被害真相，踏出间荒禁地，誓要成为全能高手，争做这天地霸主！ 一人一狗，坑蒙拐骗，一路逆袭，注定要掀起一场腥风血雨……</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01话$https://s.xlzys.com/play/qaQW667d#第02话$https://s.xlzys.com/play/BeXDrrke#第03话$https://s.xlzys.com/play/rb2k77Jd#第04话$https://s.xlzys.com/play/9b68BB7e#第05话$https://s.xlzys.com/play/Xe0R007b#第06话$https://s.xlzys.com/play/nelY22la#第07话$https://s.xlzys.com/play/mepYkk1a#第08话$https://s.xlzys.com/play/DdwpKKJe#第09话$https://s.xlzys.com/play/nelY22Ja#第10话$https://s.xlzys.com/play/mepYkkra#第11集$https://s.xlzys.com/play/BeXDPx8e#第12集$https://s.xlzys.com/play/rb2kX4jd#第13集$https://s.xlzys.com/play/9b68MoLe#第14集$https://s.xlzys.com/play/rb2kAzAd#第15集$https://s.xlzys.com/play/DdwjrpJb#第16集$https://s.xlzys.com/play/DdwpYqme#第17集$https://s.xlzys.com/play/1aMjQLmb#第18集$https://s.xlzys.com/play/qaQ10PGa#第19集$https://s.xlzys.com/play/9b66YL7b#第20集$https://s.xlzys.com/play/Xe0gAv7d#第21集$https://s.xlzys.com/play/1aMjX8Ob#第22集$https://s.xlzys.com/play/RdGZA6Lb#第23集$https://s.xlzys.com/play/nelOovVd#第24集$https://s.xlzys.com/play/mepgvRmd#第25集$https://s.xlzys.com/play/rb2RKyKb#第26集$https://s.xlzys.com/play/Xe0gGwvd#第27集$https://s.xlzys.com/play/9b66rm9b#第28集$https://s.xlzys.com/play/Xe0gl2Xd#第29集$https://s.xlzys.com/play/Xe0V0nKb#第30集$https://s.xlzys.com/play/nel52yra#第31集$https://s.xlzys.com/play/9b6RNm9b#第32集$https://s.xlzys.com/play/Xe0V72Xb#第33集$https://s.xlzys.com/play/mepQMMma#第34集$https://s.xlzys.com/play/DdwmWWza#第35集$https://s.xlzys.com/play/mep8YAQe#第36集$https://s.xlzys.com/play/DdwVpLrb#第37集$https://s.xlzys.com/play/1aMwpWPd#第38集$https://s.xlzys.com/play/qaQnwgMb#第39集$https://s.xlzys.com/play/nelxZ1ge#第40集$https://s.xlzys.com/play/mep84N1e#第41集$https://s.xlzys.com/play/BeXQrLAa#第42集$https://s.xlzys.com/play/rb287xNe#第43集$https://s.xlzys.com/play/rb2873je#第44集$https://s.xlzys.com/play/nelR7gVb#第45集$https://s.xlzys.com/play/nelR7z6b#第46集$https://s.xlzys.com/play/mepZzLpb#第47集$https://s.xlzys.com/play/rb28g4Ke#第48集$https://s.xlzys.com/play/RdGRY2Lb#第49集$https://s.xlzys.com/play/RdGRwv8b#第50集$https://s.xlzys.com/play/1aMZgmmb$$$第01话$https://s.xlzys.com/play/qaQW667d/index.m3u8#第02话$https://s.xlzys.com/play/BeXDrrke/index.m3u8#第03话$https://s.xlzys.com/play/rb2k77Jd/index.m3u8#第04话$https://s.xlzys.com/play/9b68BB7e/index.m3u8#第05话$https://s.xlzys.com/play/Xe0R007b/index.m3u8#第06话$https://s.xlzys.com/play/nelY22la/index.m3u8#第07话$https://s.xlzys.com/play/mepYkk1a/index.m3u8#第08话$https://s.xlzys.com/play/DdwpKKJe/index.m3u8#第09话$https://s.xlzys.com/play/nelY22Ja/index.m3u8#第10话$https://s.xlzys.com/play/mepYkkra/index.m3u8#第11集$https://s.xlzys.com/play/BeXDPx8e/index.m3u8#第12集$https://s.xlzys.com/play/rb2kX4jd/index.m3u8#第13集$https://s.xlzys.com/play/9b68MoLe/index.m3u8#第14集$https://s.xlzys.com/play/rb2kAzAd/index.m3u8#第15集$https://s.xlzys.com/play/DdwjrpJb/index.m3u8#第16集$https://s.xlzys.com/play/DdwpYqme/index.m3u8#第17集$https://s.xlzys.com/play/1aMjQLmb/index.m3u8#第18集$https://s.xlzys.com/play/qaQ10PGa/index.m3u8#第19集$https://s.xlzys.com/play/9b66YL7b/index.m3u8#第20集$https://s.xlzys.com/play/Xe0gAv7d/index.m3u8#第21集$https://s.xlzys.com/play/1aMjX8Ob/index.m3u8#第22集$https://s.xlzys.com/play/RdGZA6Lb/index.m3u8#第23集$https://s.xlzys.com/play/nelOovVd/index.m3u8#第24集$https://s.xlzys.com/play/mepgvRmd/index.m3u8#第25集$https://s.xlzys.com/play/rb2RKyKb/index.m3u8#第26集$https://s.xlzys.com/play/Xe0gGwvd/index.m3u8#第27集$https://s.xlzys.com/play/9b66rm9b/index.m3u8#第28集$https://s.xlzys.com/play/Xe0gl2Xd/index.m3u8#第29集$https://s.xlzys.com/play/Xe0V0nKb/index.m3u8#第30集$https://s.xlzys.com/play/nel52yra/index.m3u8#第31集$https://s.xlzys.com/play/9b6RNm9b/index.m3u8#第32集$https://s.xlzys.com/play/Xe0V72Xb/index.m3u8#第33集$https://s.xlzys.com/play/mepQMMma/index.m3u8#第34集$https://s.xlzys.com/play/DdwmWWza/index.m3u8#第35集$https://s.xlzys.com/play/mep8YAQe/index.m3u8#第36集$https://s.xlzys.com/play/DdwVpLrb/index.m3u8#第37集$https://s.xlzys.com/play/1aMwpWPd/index.m3u8#第38集$https://s.xlzys.com/play/qaQnwgMb/index.m3u8#第39集$https://s.xlzys.com/play/nelxZ1ge/index.m3u8#第40集$https://s.xlzys.com/play/mep84N1e/index.m3u8#第41集$https://s.xlzys.com/play/BeXQrLAa/index.m3u8#第42集$https://s.xlzys.com/play/rb287xNe/index.m3u8#第43集$https://s.xlzys.com/play/rb2873je/index.m3u8#第44集$https://s.xlzys.com/play/nelR7gVb/index.m3u8#第45集$https://s.xlzys.com/play/nelR7z6b/index.m3u8#第46集$https://s.xlzys.com/play/mepZzLpb/index.m3u8#第47集$https://s.xlzys.com/play/rb28g4Ke/index.m3u8#第48集$https://s.xlzys.com/play/RdGRY2Lb/index.m3u8#第49集$https://s.xlzys.com/play/RdGRwv8b/index.m3u8#第50集$https://s.xlzys.com/play/1aMZgmmb/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 378,
                    "vod_hits_day": 545,
                    "vod_hits_week": 841,
                    "vod_hits_month": 935,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
            ],
            list:[
                {
                    "id": 898260,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 59961,
                    "vod_name": "全能高手",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220604-1/acaacd102c6c2ee38dee311191a9ac9e.jpg",
                    "vod_area": "内地",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "秦墨",
                    "vod_director": "心虎",
                    "vod_remarks": "第50集",
                    "vod_content": "<p>少年秦墨为寻双亲被害真相，踏出间荒禁地，誓要成为全能高手，争做这天地霸主！ 一人一狗，坑蒙拐骗，一路逆袭，注定要掀起一场腥风血雨……</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01话$https://s.xlzys.com/play/qaQW667d#第02话$https://s.xlzys.com/play/BeXDrrke#第03话$https://s.xlzys.com/play/rb2k77Jd#第04话$https://s.xlzys.com/play/9b68BB7e#第05话$https://s.xlzys.com/play/Xe0R007b#第06话$https://s.xlzys.com/play/nelY22la#第07话$https://s.xlzys.com/play/mepYkk1a#第08话$https://s.xlzys.com/play/DdwpKKJe#第09话$https://s.xlzys.com/play/nelY22Ja#第10话$https://s.xlzys.com/play/mepYkkra#第11集$https://s.xlzys.com/play/BeXDPx8e#第12集$https://s.xlzys.com/play/rb2kX4jd#第13集$https://s.xlzys.com/play/9b68MoLe#第14集$https://s.xlzys.com/play/rb2kAzAd#第15集$https://s.xlzys.com/play/DdwjrpJb#第16集$https://s.xlzys.com/play/DdwpYqme#第17集$https://s.xlzys.com/play/1aMjQLmb#第18集$https://s.xlzys.com/play/qaQ10PGa#第19集$https://s.xlzys.com/play/9b66YL7b#第20集$https://s.xlzys.com/play/Xe0gAv7d#第21集$https://s.xlzys.com/play/1aMjX8Ob#第22集$https://s.xlzys.com/play/RdGZA6Lb#第23集$https://s.xlzys.com/play/nelOovVd#第24集$https://s.xlzys.com/play/mepgvRmd#第25集$https://s.xlzys.com/play/rb2RKyKb#第26集$https://s.xlzys.com/play/Xe0gGwvd#第27集$https://s.xlzys.com/play/9b66rm9b#第28集$https://s.xlzys.com/play/Xe0gl2Xd#第29集$https://s.xlzys.com/play/Xe0V0nKb#第30集$https://s.xlzys.com/play/nel52yra#第31集$https://s.xlzys.com/play/9b6RNm9b#第32集$https://s.xlzys.com/play/Xe0V72Xb#第33集$https://s.xlzys.com/play/mepQMMma#第34集$https://s.xlzys.com/play/DdwmWWza#第35集$https://s.xlzys.com/play/mep8YAQe#第36集$https://s.xlzys.com/play/DdwVpLrb#第37集$https://s.xlzys.com/play/1aMwpWPd#第38集$https://s.xlzys.com/play/qaQnwgMb#第39集$https://s.xlzys.com/play/nelxZ1ge#第40集$https://s.xlzys.com/play/mep84N1e#第41集$https://s.xlzys.com/play/BeXQrLAa#第42集$https://s.xlzys.com/play/rb287xNe#第43集$https://s.xlzys.com/play/rb2873je#第44集$https://s.xlzys.com/play/nelR7gVb#第45集$https://s.xlzys.com/play/nelR7z6b#第46集$https://s.xlzys.com/play/mepZzLpb#第47集$https://s.xlzys.com/play/rb28g4Ke#第48集$https://s.xlzys.com/play/RdGRY2Lb#第49集$https://s.xlzys.com/play/RdGRwv8b#第50集$https://s.xlzys.com/play/1aMZgmmb$$$第01话$https://s.xlzys.com/play/qaQW667d/index.m3u8#第02话$https://s.xlzys.com/play/BeXDrrke/index.m3u8#第03话$https://s.xlzys.com/play/rb2k77Jd/index.m3u8#第04话$https://s.xlzys.com/play/9b68BB7e/index.m3u8#第05话$https://s.xlzys.com/play/Xe0R007b/index.m3u8#第06话$https://s.xlzys.com/play/nelY22la/index.m3u8#第07话$https://s.xlzys.com/play/mepYkk1a/index.m3u8#第08话$https://s.xlzys.com/play/DdwpKKJe/index.m3u8#第09话$https://s.xlzys.com/play/nelY22Ja/index.m3u8#第10话$https://s.xlzys.com/play/mepYkkra/index.m3u8#第11集$https://s.xlzys.com/play/BeXDPx8e/index.m3u8#第12集$https://s.xlzys.com/play/rb2kX4jd/index.m3u8#第13集$https://s.xlzys.com/play/9b68MoLe/index.m3u8#第14集$https://s.xlzys.com/play/rb2kAzAd/index.m3u8#第15集$https://s.xlzys.com/play/DdwjrpJb/index.m3u8#第16集$https://s.xlzys.com/play/DdwpYqme/index.m3u8#第17集$https://s.xlzys.com/play/1aMjQLmb/index.m3u8#第18集$https://s.xlzys.com/play/qaQ10PGa/index.m3u8#第19集$https://s.xlzys.com/play/9b66YL7b/index.m3u8#第20集$https://s.xlzys.com/play/Xe0gAv7d/index.m3u8#第21集$https://s.xlzys.com/play/1aMjX8Ob/index.m3u8#第22集$https://s.xlzys.com/play/RdGZA6Lb/index.m3u8#第23集$https://s.xlzys.com/play/nelOovVd/index.m3u8#第24集$https://s.xlzys.com/play/mepgvRmd/index.m3u8#第25集$https://s.xlzys.com/play/rb2RKyKb/index.m3u8#第26集$https://s.xlzys.com/play/Xe0gGwvd/index.m3u8#第27集$https://s.xlzys.com/play/9b66rm9b/index.m3u8#第28集$https://s.xlzys.com/play/Xe0gl2Xd/index.m3u8#第29集$https://s.xlzys.com/play/Xe0V0nKb/index.m3u8#第30集$https://s.xlzys.com/play/nel52yra/index.m3u8#第31集$https://s.xlzys.com/play/9b6RNm9b/index.m3u8#第32集$https://s.xlzys.com/play/Xe0V72Xb/index.m3u8#第33集$https://s.xlzys.com/play/mepQMMma/index.m3u8#第34集$https://s.xlzys.com/play/DdwmWWza/index.m3u8#第35集$https://s.xlzys.com/play/mep8YAQe/index.m3u8#第36集$https://s.xlzys.com/play/DdwVpLrb/index.m3u8#第37集$https://s.xlzys.com/play/1aMwpWPd/index.m3u8#第38集$https://s.xlzys.com/play/qaQnwgMb/index.m3u8#第39集$https://s.xlzys.com/play/nelxZ1ge/index.m3u8#第40集$https://s.xlzys.com/play/mep84N1e/index.m3u8#第41集$https://s.xlzys.com/play/BeXQrLAa/index.m3u8#第42集$https://s.xlzys.com/play/rb287xNe/index.m3u8#第43集$https://s.xlzys.com/play/rb2873je/index.m3u8#第44集$https://s.xlzys.com/play/nelR7gVb/index.m3u8#第45集$https://s.xlzys.com/play/nelR7z6b/index.m3u8#第46集$https://s.xlzys.com/play/mepZzLpb/index.m3u8#第47集$https://s.xlzys.com/play/rb28g4Ke/index.m3u8#第48集$https://s.xlzys.com/play/RdGRY2Lb/index.m3u8#第49集$https://s.xlzys.com/play/RdGRwv8b/index.m3u8#第50集$https://s.xlzys.com/play/1aMZgmmb/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 378,
                    "vod_hits_day": 545,
                    "vod_hits_week": 841,
                    "vod_hits_month": 935,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 894533,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 62575,
                    "vod_name": "惑星公主蜥蜴骑士",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220709-1/64bc824f9e0388ceb0bf840e33411302.jpg",
                    "vod_area": "日本",
                    "vod_lang": "日语",
                    "vod_year": "2022",
                    "vod_actor": "榎木淳弥,大空直美,津田健次郎,田所梓,橘龙丸,市道真央,岩濑周平,石毛翔也,佐藤元,稻田彻,熊谷健太郎,洲崎绫,松冈祯丞,掛川渚",
                    "vod_director": "中西伸彰",
                    "vod_remarks": "第14集",
                    "vod_content": "<p>故事讲述平凡的大学生雨宫夕日，某日一只会说话的蜥蜴宣告他被选为拯救世界的骑士。正当夕日对此半信半疑时受到敌人的袭击，并被他应守护的公主朝日奈五月雨拯救，没想到公主却是企图征服世界的魔王。夕日受到五月雨...</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/qaQ1ARqa#第02集$https://s.xlzys.com/play/1aMj76Bb#第03集$https://s.xlzys.com/play/DdwjylMb#第04集$https://s.xlzys.com/play/1aMjPrmb#第05集$https://s.xlzys.com/play/1aMj4v5b#第06集$https://s.xlzys.com/play/mepgOgpd#第07集$https://s.xlzys.com/play/Xe0V0PLb#第08集$https://s.xlzys.com/play/RdG5oz5a#第09集$https://s.xlzys.com/play/rb2vV9Wb#第10集$https://s.xlzys.com/play/9aANDg7b#第11集$https://s.xlzys.com/play/RdGvmL0b#第12.5集$https://s.xlzys.com/play/RdGRxrLb#第12集$https://s.xlzys.com/play/BeXQw95a#第13集$https://s.xlzys.com/play/9b6WyAVd#第14集$https://s.xlzys.com/play/RdGRxVLb$$$第01集$https://s.xlzys.com/play/qaQ1ARqa/index.m3u8#第02集$https://s.xlzys.com/play/1aMj76Bb/index.m3u8#第03集$https://s.xlzys.com/play/DdwjylMb/index.m3u8#第04集$https://s.xlzys.com/play/1aMjPrmb/index.m3u8#第05集$https://s.xlzys.com/play/1aMj4v5b/index.m3u8#第06集$https://s.xlzys.com/play/mepgOgpd/index.m3u8#第07集$https://s.xlzys.com/play/Xe0V0PLb/index.m3u8#第08集$https://s.xlzys.com/play/RdG5oz5a/index.m3u8#第09集$https://s.xlzys.com/play/rb2vV9Wb/index.m3u8#第10集$https://s.xlzys.com/play/9aANDg7b/index.m3u8#第11集$https://s.xlzys.com/play/RdGvmL0b/index.m3u8#第12.5集$https://s.xlzys.com/play/RdGRxrLb/index.m3u8#第12集$https://s.xlzys.com/play/BeXQw95a/index.m3u8#第13集$https://s.xlzys.com/play/9b6WyAVd/index.m3u8#第14集$https://s.xlzys.com/play/RdGRxVLb/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 162,
                    "vod_hits_day": 208,
                    "vod_hits_week": 919,
                    "vod_hits_month": 736,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 847639,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 62350,
                    "vod_name": "我靠充值当武帝",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220705-1/ed286d28e5c98135cec7b383ad66f77e.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2022",
                    "vod_actor": "李亮",
                    "vod_director": "李亮",
                    "vod_remarks": "第38集",
                    "vod_content": "<p>地球能源枯竭，林一为改变命运，参加《灵神大陆》游戏内测，却因系统故障丧失记忆，受困游戏，在与奸商系统蛤蟆白驹的讨价还价中，林一多了个极其凶残的外挂，莫名其妙踏上修炼路，唯一美中不足的，是这系统有点费灵石。</p><p>　　修炼进度太慢？功法不够给力？武器威力太小？简单，只要灵石管够，任何问题都能解决！</p><p>　　就这样，林一靠着逆天的系统加持，一路势如破竹地碾压，数度危难，救下神秘少女墨白雪，勘破盔甲士兵的万军阵，击败凝练出寒玉的巨大boss—守墓兽，通过心魔考验……这片大陆看似祥和，实则危机四伏，林一更在险难中结识了死皮赖脸要当他小弟的周不正、和不打不相识的冰块脸季云宇，还以两只烤鸡拜得高深莫测的神秘老头上官鸿为师，前路漫漫，在林一靠着系统纵横四海所向披靡时，却被美貌御姐吴恬绑架，深入地下墓陵探险……</p><p><br/></p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/nelYKW7a#第02集$https://s.xlzys.com/play/mepYOWXa#第03集$https://s.xlzys.com/play/DdwpY6ge#第04集$https://s.xlzys.com/play/9aADJE7e#第05集$https://s.xlzys.com/play/RdG6PNrb#第06集$https://s.xlzys.com/play/9aADj61e#第07集$https://s.xlzys.com/play/RdGZnO7b#第08集$https://s.xlzys.com/play/9b668kQb#第09集$https://s.xlzys.com/play/DdwjjgRb#第10集$https://s.xlzys.com/play/RdGZ51Kb#第11集$https://s.xlzys.com/play/9b6690zb#第12集$https://s.xlzys.com/play/nelO88rd#第13集$https://s.xlzys.com/play/nelODpJd#第14集$https://s.xlzys.com/play/BeX6XXvb#第15集$https://s.xlzys.com/play/nelOP15d#第16集$https://s.xlzys.com/play/mepgpgmd#第17集$https://s.xlzys.com/play/DdwjLERb#第18集$https://s.xlzys.com/play/mepgMlyd#第19集$https://s.xlzys.com/play/rb2RYlKb#第20集$https://s.xlzys.com/play/mepgGLyd#第21集$https://s.xlzys.com/play/Ddwm971a#第22集$https://s.xlzys.com/play/qaQ0kZ0e#第23集$https://s.xlzys.com/play/mepQ9WNa#第24集$https://s.xlzys.com/play/Xe0VBr7b#第25集$https://s.xlzys.com/play/RdG5JO8a#第26集$https://s.xlzys.com/play/mepQ0NNa#第27集$https://s.xlzys.com/play/mepQNxXa#第28集$https://s.xlzys.com/play/9b6X82ne#第29集$https://s.xlzys.com/play/rb2xrkWe#第30集$https://s.xlzys.com/play/rb2xlAWe#第31集$https://s.xlzys.com/play/qaQn3B5b#第32集$https://s.xlzys.com/play/9aA6ND1b#第33集$https://s.xlzys.com/play/RdGRv6Qb#第34集$https://s.xlzys.com/play/RdGRRV8b#第35集$https://s.xlzys.com/play/RdGR8V3b#第36集$https://s.xlzys.com/play/qaQkNLGd#第37集$https://s.xlzys.com/play/nelRD21b#第38集$https://s.xlzys.com/play/Ddw057ze$$$第01集$https://s.xlzys.com/play/nelYKW7a/index.m3u8#第02集$https://s.xlzys.com/play/mepYOWXa/index.m3u8#第03集$https://s.xlzys.com/play/DdwpY6ge/index.m3u8#第04集$https://s.xlzys.com/play/9aADJE7e/index.m3u8#第05集$https://s.xlzys.com/play/RdG6PNrb/index.m3u8#第06集$https://s.xlzys.com/play/9aADj61e/index.m3u8#第07集$https://s.xlzys.com/play/RdGZnO7b/index.m3u8#第08集$https://s.xlzys.com/play/9b668kQb/index.m3u8#第09集$https://s.xlzys.com/play/DdwjjgRb/index.m3u8#第10集$https://s.xlzys.com/play/RdGZ51Kb/index.m3u8#第11集$https://s.xlzys.com/play/9b6690zb/index.m3u8#第12集$https://s.xlzys.com/play/nelO88rd/index.m3u8#第13集$https://s.xlzys.com/play/nelODpJd/index.m3u8#第14集$https://s.xlzys.com/play/BeX6XXvb/index.m3u8#第15集$https://s.xlzys.com/play/nelOP15d/index.m3u8#第16集$https://s.xlzys.com/play/mepgpgmd/index.m3u8#第17集$https://s.xlzys.com/play/DdwjLERb/index.m3u8#第18集$https://s.xlzys.com/play/mepgMlyd/index.m3u8#第19集$https://s.xlzys.com/play/rb2RYlKb/index.m3u8#第20集$https://s.xlzys.com/play/mepgGLyd/index.m3u8#第21集$https://s.xlzys.com/play/Ddwm971a/index.m3u8#第22集$https://s.xlzys.com/play/qaQ0kZ0e/index.m3u8#第23集$https://s.xlzys.com/play/mepQ9WNa/index.m3u8#第24集$https://s.xlzys.com/play/Xe0VBr7b/index.m3u8#第25集$https://s.xlzys.com/play/RdG5JO8a/index.m3u8#第26集$https://s.xlzys.com/play/mepQ0NNa/index.m3u8#第27集$https://s.xlzys.com/play/mepQNxXa/index.m3u8#第28集$https://s.xlzys.com/play/9b6X82ne/index.m3u8#第29集$https://s.xlzys.com/play/rb2xrkWe/index.m3u8#第30集$https://s.xlzys.com/play/rb2xlAWe/index.m3u8#第31集$https://s.xlzys.com/play/qaQn3B5b/index.m3u8#第32集$https://s.xlzys.com/play/9aA6ND1b/index.m3u8#第33集$https://s.xlzys.com/play/RdGRv6Qb/index.m3u8#第34集$https://s.xlzys.com/play/RdGRRV8b/index.m3u8#第35集$https://s.xlzys.com/play/RdGR8V3b/index.m3u8#第36集$https://s.xlzys.com/play/qaQkNLGd/index.m3u8#第37集$https://s.xlzys.com/play/nelRD21b/index.m3u8#第38集$https://s.xlzys.com/play/Ddw057ze/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 676,
                    "vod_hits_day": 925,
                    "vod_hits_week": 367,
                    "vod_hits_month": 760,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 831178,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 60671,
                    "vod_name": "一等家丁 第二季",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220621-1/f149c311174bcdb413b712c440d374a2.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "枫茗",
                    "vod_director": "",
                    "vod_remarks": "第18集",
                    "vod_content": "<p>见过比贵族还猖狂的家丁吗？见过比纨绔还嚣张的家丁吗？见过比帝王还霸气的家丁吗？见过勾搭自家小姐的家丁吗？见过坐拥倾城祸水的家丁吗？许枫作为现代男人，一向醉情风月，声色犬马，却因为意外重生异界，混迹异界成为家丁的他纨绔、斗贵族、杀强者。调戏调戏萧家小姐，勾搭勾搭豪门淑女，祸害万千。成就一代家丁！</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/BeXDJ0Ve#第02集$https://s.xlzys.com/play/rb2k0oAd#第03集$https://s.xlzys.com/play/9b68EvNe#第4集$https://s.xlzys.com/play/BeX6YnAb#第5集$https://s.xlzys.com/play/qaQ1AvLa#第06集$https://s.xlzys.com/play/nelOWLjd#第07集$https://s.xlzys.com/play/rb2RPvWb#第08集$https://s.xlzys.com/play/mepgMjQd#第09集$https://s.xlzys.com/play/nelOK8ld#第10集$https://s.xlzys.com/play/nel52rJa#第11集$https://s.xlzys.com/play/Xe0V7X7b#第12集$https://s.xlzys.com/play/qaQ0wVle#第13集$https://s.xlzys.com/play/nelxYE5e#第14集$https://s.xlzys.com/play/BeXLy9Ve#第15集$https://s.xlzys.com/play/nelRR7Jb#第16集$https://s.xlzys.com/play/1aMZXKGb#第17集$https://s.xlzys.com/play/RdGRAXJb#第18集$https://s.xlzys.com/play/9aA6rr3b$$$第01集$https://s.xlzys.com/play/BeXDJ0Ve/index.m3u8#第02集$https://s.xlzys.com/play/rb2k0oAd/index.m3u8#第03集$https://s.xlzys.com/play/9b68EvNe/index.m3u8#第4集$https://s.xlzys.com/play/BeX6YnAb/index.m3u8#第5集$https://s.xlzys.com/play/qaQ1AvLa/index.m3u8#第06集$https://s.xlzys.com/play/nelOWLjd/index.m3u8#第07集$https://s.xlzys.com/play/rb2RPvWb/index.m3u8#第08集$https://s.xlzys.com/play/mepgMjQd/index.m3u8#第09集$https://s.xlzys.com/play/nelOK8ld/index.m3u8#第10集$https://s.xlzys.com/play/nel52rJa/index.m3u8#第11集$https://s.xlzys.com/play/Xe0V7X7b/index.m3u8#第12集$https://s.xlzys.com/play/qaQ0wVle/index.m3u8#第13集$https://s.xlzys.com/play/nelxYE5e/index.m3u8#第14集$https://s.xlzys.com/play/BeXLy9Ve/index.m3u8#第15集$https://s.xlzys.com/play/nelRR7Jb/index.m3u8#第16集$https://s.xlzys.com/play/1aMZXKGb/index.m3u8#第17集$https://s.xlzys.com/play/RdGRAXJb/index.m3u8#第18集$https://s.xlzys.com/play/9aA6rr3b/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 679,
                    "vod_hits_day": 622,
                    "vod_hits_week": 720,
                    "vod_hits_month": 860,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 831175,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 31448,
                    "vod_name": "传闻中的白月光",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220403-1/5741c487813b7d2f840e645c89cee635.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "兰桂玮",
                    "vod_director": "兰桂玮",
                    "vod_remarks": "第42集",
                    "vod_content": "<p>现代孤女穿进一本龙傲天男频小说中，成为女扮男装的炮灰反派，在系统逼迫下，女主被迫维持恶毒人设，却不小心成为了病娇男主心中的白月光。</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/mepYnYXa#第02集$https://s.xlzys.com/play/Ddwpxpge#第03集$https://s.xlzys.com/play/9aADrD7e#第04集$https://s.xlzys.com/play/RdG6A6rb#第05集$https://s.xlzys.com/play/1aM8X8Pe#第06集$https://s.xlzys.com/play/qaQWXWMd#第07集$https://s.xlzys.com/play/rb2kXkjd#第08集$https://s.xlzys.com/play/9b68M8Le#第09集$https://s.xlzys.com/play/Xe0RMgVb#第10集$https://s.xlzys.com/play/nelY0O7a#第11集$https://s.xlzys.com/play/mepYngXa#第12集$https://s.xlzys.com/play/Ddwpxjge#第13集$https://s.xlzys.com/play/nelY0OVa#第14集$https://s.xlzys.com/play/mepYngma#第15集$https://s.xlzys.com/play/Ddwpxjze#第16集$https://s.xlzys.com/play/9aADrnpe#第17集$https://s.xlzys.com/play/RdG6AZ3b#第18集$https://s.xlzys.com/play/1aM8XjRe#第19集$https://s.xlzys.com/play/qaQWX1Zd#第20集$https://s.xlzys.com/play/BeXDPooe#第21集$https://s.xlzys.com/play/rb2kXvWd#第22集$https://s.xlzys.com/play/9b68MRze#第23集$https://s.xlzys.com/play/Ddwprxge#第24集$https://s.xlzys.com/play/nelY05Va#第25集$https://s.xlzys.com/play/mepYnQma#第26集$https://s.xlzys.com/play/Xe0RxEGb#第27集$https://s.xlzys.com/play/Xe0ggOyd#第15集$https://s.xlzys.com/play/9b66YGnb#第29集$https://s.xlzys.com/play/BeX6XpVb#第30集$https://s.xlzys.com/play/9b66wrQb#第31集$https://s.xlzys.com/play/nelOGmVd#第32集$https://s.xlzys.com/play/BeX63nob#第33集$https://s.xlzys.com/play/1aMQZkma#第34集$https://s.xlzys.com/play/Ddwmllwa#第35集$https://s.xlzys.com/play/9aAP503e#第36集$https://s.xlzys.com/play/Xe0YR9ya#第37集$https://s.xlzys.com/play/qaQnr25b#第38集$https://s.xlzys.com/play/rb2xyZ1e#第39集$https://s.xlzys.com/play/BeXQQBWa#第40集$https://s.xlzys.com/play/Ddw0KPge#第41集$https://s.xlzys.com/play/nelRvmgb#第42集$https://s.xlzys.com/play/Ddw05w1e$$$第01集$https://s.xlzys.com/play/mepYnYXa/index.m3u8#第02集$https://s.xlzys.com/play/Ddwpxpge/index.m3u8#第03集$https://s.xlzys.com/play/9aADrD7e/index.m3u8#第04集$https://s.xlzys.com/play/RdG6A6rb/index.m3u8#第05集$https://s.xlzys.com/play/1aM8X8Pe/index.m3u8#第06集$https://s.xlzys.com/play/qaQWXWMd/index.m3u8#第07集$https://s.xlzys.com/play/rb2kXkjd/index.m3u8#第08集$https://s.xlzys.com/play/9b68M8Le/index.m3u8#第09集$https://s.xlzys.com/play/Xe0RMgVb/index.m3u8#第10集$https://s.xlzys.com/play/nelY0O7a/index.m3u8#第11集$https://s.xlzys.com/play/mepYngXa/index.m3u8#第12集$https://s.xlzys.com/play/Ddwpxjge/index.m3u8#第13集$https://s.xlzys.com/play/nelY0OVa/index.m3u8#第14集$https://s.xlzys.com/play/mepYngma/index.m3u8#第15集$https://s.xlzys.com/play/Ddwpxjze/index.m3u8#第16集$https://s.xlzys.com/play/9aADrnpe/index.m3u8#第17集$https://s.xlzys.com/play/RdG6AZ3b/index.m3u8#第18集$https://s.xlzys.com/play/1aM8XjRe/index.m3u8#第19集$https://s.xlzys.com/play/qaQWX1Zd/index.m3u8#第20集$https://s.xlzys.com/play/BeXDPooe/index.m3u8#第21集$https://s.xlzys.com/play/rb2kXvWd/index.m3u8#第22集$https://s.xlzys.com/play/9b68MRze/index.m3u8#第23集$https://s.xlzys.com/play/Ddwprxge/index.m3u8#第24集$https://s.xlzys.com/play/nelY05Va/index.m3u8#第25集$https://s.xlzys.com/play/mepYnQma/index.m3u8#第26集$https://s.xlzys.com/play/Xe0RxEGb/index.m3u8#第27集$https://s.xlzys.com/play/Xe0ggOyd/index.m3u8#第15集$https://s.xlzys.com/play/9b66YGnb/index.m3u8#第29集$https://s.xlzys.com/play/BeX6XpVb/index.m3u8#第30集$https://s.xlzys.com/play/9b66wrQb/index.m3u8#第31集$https://s.xlzys.com/play/nelOGmVd/index.m3u8#第32集$https://s.xlzys.com/play/BeX63nob/index.m3u8#第33集$https://s.xlzys.com/play/1aMQZkma/index.m3u8#第34集$https://s.xlzys.com/play/Ddwmllwa/index.m3u8#第35集$https://s.xlzys.com/play/9aAP503e/index.m3u8#第36集$https://s.xlzys.com/play/Xe0YR9ya/index.m3u8#第37集$https://s.xlzys.com/play/qaQnr25b/index.m3u8#第38集$https://s.xlzys.com/play/rb2xyZ1e/index.m3u8#第39集$https://s.xlzys.com/play/BeXQQBWa/index.m3u8#第40集$https://s.xlzys.com/play/Ddw0KPge/index.m3u8#第41集$https://s.xlzys.com/play/nelRvmgb/index.m3u8#第42集$https://s.xlzys.com/play/Ddw05w1e/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 624,
                    "vod_hits_day": 410,
                    "vod_hits_week": 730,
                    "vod_hits_month": 21,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 831157,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 61742,
                    "vod_name": "徒弟个个是大佬",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220702-1/9e49e475c5c13b730a117359f18d7fab.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "陈夜",
                    "vod_director": "浩克",
                    "vod_remarks": "第22集",
                    "vod_content": "<p>收服十万年前的诸天大佬们为徒，并拯救她们，修复崩坏的时间线。高冷道尊带女徒弟们的冒险旅程~</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/nelY367a#第02集$https://s.xlzys.com/play/mepY3VXa#第03集$https://s.xlzys.com/play/mepgQ4Qd#第04集$https://s.xlzys.com/play/Ddwjmorb#第05集$https://s.xlzys.com/play/nelOMg6d#第06集$https://s.xlzys.com/play/9b66zN9b#第07集$https://s.xlzys.com/play/Xe0go35d#第08集$https://s.xlzys.com/play/nelOk6jd#第09集$https://s.xlzys.com/play/9aAnzDpb#第10集$https://s.xlzys.com/play/rb2RVQAb#第11集$https://s.xlzys.com/play/9aAnyWjb#第12集$https://s.xlzys.com/play/9b6RWkRb#第13集$https://s.xlzys.com/play/rb2vENJb#第14集$https://s.xlzys.com/play/mepQ04Na#第15集$https://s.xlzys.com/play/9aANDAOb#第16集$https://s.xlzys.com/play/rb2xBOPe#第17集$https://s.xlzys.com/play/RdGv1j8b#第18集$https://s.xlzys.com/play/mepZkNrb#第19集$https://s.xlzys.com/play/Ddw0KOme#第20集$https://s.xlzys.com/play/nelR2z7b#第21集$https://s.xlzys.com/play/BeXQ7R5a#第22集$https://s.xlzys.com/play/nelRLVjb$$$第01集$https://s.xlzys.com/play/nelY367a/index.m3u8#第02集$https://s.xlzys.com/play/mepY3VXa/index.m3u8#第03集$https://s.xlzys.com/play/mepgQ4Qd/index.m3u8#第04集$https://s.xlzys.com/play/Ddwjmorb/index.m3u8#第05集$https://s.xlzys.com/play/nelOMg6d/index.m3u8#第06集$https://s.xlzys.com/play/9b66zN9b/index.m3u8#第07集$https://s.xlzys.com/play/Xe0go35d/index.m3u8#第08集$https://s.xlzys.com/play/nelOk6jd/index.m3u8#第09集$https://s.xlzys.com/play/9aAnzDpb/index.m3u8#第10集$https://s.xlzys.com/play/rb2RVQAb/index.m3u8#第11集$https://s.xlzys.com/play/9aAnyWjb/index.m3u8#第12集$https://s.xlzys.com/play/9b6RWkRb/index.m3u8#第13集$https://s.xlzys.com/play/rb2vENJb/index.m3u8#第14集$https://s.xlzys.com/play/mepQ04Na/index.m3u8#第15集$https://s.xlzys.com/play/9aANDAOb/index.m3u8#第16集$https://s.xlzys.com/play/rb2xBOPe/index.m3u8#第17集$https://s.xlzys.com/play/RdGv1j8b/index.m3u8#第18集$https://s.xlzys.com/play/mepZkNrb/index.m3u8#第19集$https://s.xlzys.com/play/Ddw0KOme/index.m3u8#第20集$https://s.xlzys.com/play/nelR2z7b/index.m3u8#第21集$https://s.xlzys.com/play/BeXQ7R5a/index.m3u8#第22集$https://s.xlzys.com/play/nelRLVjb/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 80,
                    "vod_hits_day": 667,
                    "vod_hits_week": 153,
                    "vod_hits_month": 597,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 595959,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 60438,
                    "vod_name": "从姑获鸟开始：龙城争霸",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220616-1/94627cfaae302826370f751e94d3369e.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "李阎",
                    "vod_director": "双鱼紫默",
                    "vod_remarks": "第52集",
                    "vod_content": "<p>身患绝症的李阎，机缘巧合之下进入光怪陆离的阎浮世界，凭借着一身硬功夫一步步成为强者。而在行走于一个个阎浮世界的过程中，他也开始发现这个世界真正的秘密。</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/DdwpRjMe#第02集$https://s.xlzys.com/play/9aAD9PPe#第03集$https://s.xlzys.com/play/RdG6Q58b#第04集$https://s.xlzys.com/play/1aM85Q5e#第05集$https://s.xlzys.com/play/qaQW50Ld#第06集$https://s.xlzys.com/play/BeXDkoAe#第07集$https://s.xlzys.com/play/rb2k1vNd#第08集$https://s.xlzys.com/play/9b68zRle#第09集$https://s.xlzys.com/play/Xe0RMmXb#第10集$https://s.xlzys.com/play/BeXD2NVe#第11集$https://s.xlzys.com/play/RdG6Om8b#第12集$https://s.xlzys.com/play/BeXDj2ke#第13集$https://s.xlzys.com/play/rb2knQJd#第14集$https://s.xlzys.com/play/DdwjpoJb#第15集$https://s.xlzys.com/play/DdwjKYwb#第16集$https://s.xlzys.com/play/9aAnMJzb#第17集$https://s.xlzys.com/play/DdwjLRwb#第18集$https://s.xlzys.com/play/1aMjv53b#第19集$https://s.xlzys.com/play/nelOwM6d#第20集$https://s.xlzys.com/play/BeX6Kkmb#第21集$https://s.xlzys.com/play/RdGZmQ0b#第22集$https://s.xlzys.com/play/rb2RZOvb#第23集$https://s.xlzys.com/play/qaQ1z5Ya#第24集$https://s.xlzys.com/play/9aAnZ9zb#第25集$https://s.xlzys.com/play/mepgAX6d#第26集$https://s.xlzys.com/play/DdwjJoRb#第27集$https://s.xlzys.com/play/mepgxnNd#第28集$https://s.xlzys.com/play/nelOB46d#第29集$https://s.xlzys.com/play/qaQ1Z5la#第30集$https://s.xlzys.com/play/qaQ0Jj0e#第31集$https://s.xlzys.com/play/DdwmrD8a#第32集$https://s.xlzys.com/play/9aAP1Gle#第33集$https://s.xlzys.com/play/nel58Nga#第34集$https://s.xlzys.com/play/qaQ0vE5e#第35集$https://s.xlzys.com/play/mepQDg1a#第36集$https://s.xlzys.com/play/9aAPzE3e#第37集$https://s.xlzys.com/play/Xe0VzP7b#第38集$https://s.xlzys.com/play/DdwmQr8a#第39集$https://s.xlzys.com/play/qaQ0YQ5e#第40集$https://s.xlzys.com/play/nelxYpge#第41集$https://s.xlzys.com/play/9aANoM9b#第42集$https://s.xlzys.com/play/nelx4v6e#第43集$https://s.xlzys.com/play/qaQn32Zb#第44集$https://s.xlzys.com/play/mepZ9ryb#第45集$https://s.xlzys.com/play/Ddw0nMXe#第46集$https://s.xlzys.com/play/9aA68jjb#第47集$https://s.xlzys.com/play/RdGRQn5b#第48集$https://s.xlzys.com/play/1aMZ5D1b#第49集$https://s.xlzys.com/play/qaQk5J5d#第50集$https://s.xlzys.com/play/BeXQkxVa#第51集$https://s.xlzys.com/play/rb28OWAe#第52集$https://s.xlzys.com/play/rb28rQze$$$第01集$https://s.xlzys.com/play/DdwpRjMe/index.m3u8#第02集$https://s.xlzys.com/play/9aAD9PPe/index.m3u8#第03集$https://s.xlzys.com/play/RdG6Q58b/index.m3u8#第04集$https://s.xlzys.com/play/1aM85Q5e/index.m3u8#第05集$https://s.xlzys.com/play/qaQW50Ld/index.m3u8#第06集$https://s.xlzys.com/play/BeXDkoAe/index.m3u8#第07集$https://s.xlzys.com/play/rb2k1vNd/index.m3u8#第08集$https://s.xlzys.com/play/9b68zRle/index.m3u8#第09集$https://s.xlzys.com/play/Xe0RMmXb/index.m3u8#第10集$https://s.xlzys.com/play/BeXD2NVe/index.m3u8#第11集$https://s.xlzys.com/play/RdG6Om8b/index.m3u8#第12集$https://s.xlzys.com/play/BeXDj2ke/index.m3u8#第13集$https://s.xlzys.com/play/rb2knQJd/index.m3u8#第14集$https://s.xlzys.com/play/DdwjpoJb/index.m3u8#第15集$https://s.xlzys.com/play/DdwjKYwb/index.m3u8#第16集$https://s.xlzys.com/play/9aAnMJzb/index.m3u8#第17集$https://s.xlzys.com/play/DdwjLRwb/index.m3u8#第18集$https://s.xlzys.com/play/1aMjv53b/index.m3u8#第19集$https://s.xlzys.com/play/nelOwM6d/index.m3u8#第20集$https://s.xlzys.com/play/BeX6Kkmb/index.m3u8#第21集$https://s.xlzys.com/play/RdGZmQ0b/index.m3u8#第22集$https://s.xlzys.com/play/rb2RZOvb/index.m3u8#第23集$https://s.xlzys.com/play/qaQ1z5Ya/index.m3u8#第24集$https://s.xlzys.com/play/9aAnZ9zb/index.m3u8#第25集$https://s.xlzys.com/play/mepgAX6d/index.m3u8#第26集$https://s.xlzys.com/play/DdwjJoRb/index.m3u8#第27集$https://s.xlzys.com/play/mepgxnNd/index.m3u8#第28集$https://s.xlzys.com/play/nelOB46d/index.m3u8#第29集$https://s.xlzys.com/play/qaQ1Z5la/index.m3u8#第30集$https://s.xlzys.com/play/qaQ0Jj0e/index.m3u8#第31集$https://s.xlzys.com/play/DdwmrD8a/index.m3u8#第32集$https://s.xlzys.com/play/9aAP1Gle/index.m3u8#第33集$https://s.xlzys.com/play/nel58Nga/index.m3u8#第34集$https://s.xlzys.com/play/qaQ0vE5e/index.m3u8#第35集$https://s.xlzys.com/play/mepQDg1a/index.m3u8#第36集$https://s.xlzys.com/play/9aAPzE3e/index.m3u8#第37集$https://s.xlzys.com/play/Xe0VzP7b/index.m3u8#第38集$https://s.xlzys.com/play/DdwmQr8a/index.m3u8#第39集$https://s.xlzys.com/play/qaQ0YQ5e/index.m3u8#第40集$https://s.xlzys.com/play/nelxYpge/index.m3u8#第41集$https://s.xlzys.com/play/9aANoM9b/index.m3u8#第42集$https://s.xlzys.com/play/nelx4v6e/index.m3u8#第43集$https://s.xlzys.com/play/qaQn32Zb/index.m3u8#第44集$https://s.xlzys.com/play/mepZ9ryb/index.m3u8#第45集$https://s.xlzys.com/play/Ddw0nMXe/index.m3u8#第46集$https://s.xlzys.com/play/9aA68jjb/index.m3u8#第47集$https://s.xlzys.com/play/RdGRQn5b/index.m3u8#第48集$https://s.xlzys.com/play/1aMZ5D1b/index.m3u8#第49集$https://s.xlzys.com/play/qaQk5J5d/index.m3u8#第50集$https://s.xlzys.com/play/BeXQkxVa/index.m3u8#第51集$https://s.xlzys.com/play/rb28OWAe/index.m3u8#第52集$https://s.xlzys.com/play/rb28rQze/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 790,
                    "vod_hits_day": 116,
                    "vod_hits_week": 821,
                    "vod_hits_month": 655,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 595958,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 59321,
                    "vod_name": "我家师父超凶哒",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220525-1/db90e9fcf24bb07d86ee8f22f511e1cb.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "陆尘",
                    "vod_director": "",
                    "vod_remarks": "第44集",
                    "vod_content": "<p>陆国国君身中剧毒，性命危在旦夕，消失5年的儿子陆尘强势归来，一改以往废柴的人设，摇身一变成为实力强横又多金的存在，只见他不费吹灰之力，拯救陆国于水火之中</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/9aADrPpe#第02集$https://s.xlzys.com/play/RdG6A53b#第03集$https://s.xlzys.com/play/1aM8XQRe#第04集$https://s.xlzys.com/play/BeXDPLoe#第05集$https://s.xlzys.com/play/rb2kXxWd#第6集$https://s.xlzys.com/play/DdwpkpXe#第7集$https://s.xlzys.com/play/9aADmDje#第8集$https://s.xlzys.com/play/RdG69Z5b#第9集$https://s.xlzys.com/play/1aM89j1e#第10集$https://s.xlzys.com/play/1aM870me#第11集$https://s.xlzys.com/play/qaQWAVGd#第12集$https://s.xlzys.com/play/9b68MXze#第13集$https://s.xlzys.com/play/RdG6O30b#第14集$https://s.xlzys.com/play/BeXDJV8e#第15集$https://s.xlzys.com/play/9aAnqGOb#第16集$https://s.xlzys.com/play/mepggV2d#第17集$https://s.xlzys.com/play/nelOv5gd#第18集$https://s.xlzys.com/play/nelO8X5d#第19集$https://s.xlzys.com/play/nelOELld#第20集$https://s.xlzys.com/play/qaQ1KKGa#第21集$https://s.xlzys.com/play/9b66A89b#第22集$https://s.xlzys.com/play/nelOlOVd#第23集$https://s.xlzys.com/play/Ddwj1G1b#第24集$https://s.xlzys.com/play/RdGZ4rKb#第25集$https://s.xlzys.com/play/mepgNN2d#第26集$https://s.xlzys.com/play/nelOAE1d#第27集$https://s.xlzys.com/play/9aAPnGPe#第28集$https://s.xlzys.com/play/1aMQZYOa#第29集$https://s.xlzys.com/play/nel5kpga#第30集$https://s.xlzys.com/play/9b6RjA7b#第31集$https://s.xlzys.com/play/9aAPZyle#第32集$https://s.xlzys.com/play/Xe0V65Kb#第33集$https://s.xlzys.com/play/9b6XooRe#第34集$https://s.xlzys.com/play/rb2xkOKe#第35集$https://s.xlzys.com/play/nelx2o7e#第36集$https://s.xlzys.com/play/mep8Wqye#第37集$https://s.xlzys.com/play/9aANRZ3b#第38集$https://s.xlzys.com/play/RdGv1mLb#第39集$https://s.xlzys.com/play/nelRxGjb#第40集$https://s.xlzys.com/play/qaQkkrld#第41集$https://s.xlzys.com/play/RdGR9WLb#第42集$https://s.xlzys.com/play/mepZRPpb#第43集$https://s.xlzys.com/play/mepZV6Xb#第44集$https://s.xlzys.com/play/rb28rrAe$$$第01集$https://s.xlzys.com/play/9aADrPpe/index.m3u8#第02集$https://s.xlzys.com/play/RdG6A53b/index.m3u8#第03集$https://s.xlzys.com/play/1aM8XQRe/index.m3u8#第04集$https://s.xlzys.com/play/BeXDPLoe/index.m3u8#第05集$https://s.xlzys.com/play/rb2kXxWd/index.m3u8#第6集$https://s.xlzys.com/play/DdwpkpXe/index.m3u8#第7集$https://s.xlzys.com/play/9aADmDje/index.m3u8#第8集$https://s.xlzys.com/play/RdG69Z5b/index.m3u8#第9集$https://s.xlzys.com/play/1aM89j1e/index.m3u8#第10集$https://s.xlzys.com/play/1aM870me/index.m3u8#第11集$https://s.xlzys.com/play/qaQWAVGd/index.m3u8#第12集$https://s.xlzys.com/play/9b68MXze/index.m3u8#第13集$https://s.xlzys.com/play/RdG6O30b/index.m3u8#第14集$https://s.xlzys.com/play/BeXDJV8e/index.m3u8#第15集$https://s.xlzys.com/play/9aAnqGOb/index.m3u8#第16集$https://s.xlzys.com/play/mepggV2d/index.m3u8#第17集$https://s.xlzys.com/play/nelOv5gd/index.m3u8#第18集$https://s.xlzys.com/play/nelO8X5d/index.m3u8#第19集$https://s.xlzys.com/play/nelOELld/index.m3u8#第20集$https://s.xlzys.com/play/qaQ1KKGa/index.m3u8#第21集$https://s.xlzys.com/play/9b66A89b/index.m3u8#第22集$https://s.xlzys.com/play/nelOlOVd/index.m3u8#第23集$https://s.xlzys.com/play/Ddwj1G1b/index.m3u8#第24集$https://s.xlzys.com/play/RdGZ4rKb/index.m3u8#第25集$https://s.xlzys.com/play/mepgNN2d/index.m3u8#第26集$https://s.xlzys.com/play/nelOAE1d/index.m3u8#第27集$https://s.xlzys.com/play/9aAPnGPe/index.m3u8#第28集$https://s.xlzys.com/play/1aMQZYOa/index.m3u8#第29集$https://s.xlzys.com/play/nel5kpga/index.m3u8#第30集$https://s.xlzys.com/play/9b6RjA7b/index.m3u8#第31集$https://s.xlzys.com/play/9aAPZyle/index.m3u8#第32集$https://s.xlzys.com/play/Xe0V65Kb/index.m3u8#第33集$https://s.xlzys.com/play/9b6XooRe/index.m3u8#第34集$https://s.xlzys.com/play/rb2xkOKe/index.m3u8#第35集$https://s.xlzys.com/play/nelx2o7e/index.m3u8#第36集$https://s.xlzys.com/play/mep8Wqye/index.m3u8#第37集$https://s.xlzys.com/play/9aANRZ3b/index.m3u8#第38集$https://s.xlzys.com/play/RdGv1mLb/index.m3u8#第39集$https://s.xlzys.com/play/nelRxGjb/index.m3u8#第40集$https://s.xlzys.com/play/qaQkkrld/index.m3u8#第41集$https://s.xlzys.com/play/RdGR9WLb/index.m3u8#第42集$https://s.xlzys.com/play/mepZRPpb/index.m3u8#第43集$https://s.xlzys.com/play/mepZV6Xb/index.m3u8#第44集$https://s.xlzys.com/play/rb28rrAe/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 725,
                    "vod_hits_day": 339,
                    "vod_hits_week": 795,
                    "vod_hits_month": 997,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 595952,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 60672,
                    "vod_name": "你马甲掉了，幽皇陛下",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220621-1/6c45bf145bc4ca7bf8352bc36f525881.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "苏离离",
                    "vod_director": "",
                    "vod_remarks": "第44集",
                    "vod_content": "<p>高中生女孩苏离离，因为落水，不幸穿越成为废柴公主，被迫替妹妹嫁给世间最可怕的疯皇——幽皇伊祁渊！为了活下去，苏离离靠着自己的聪明机智与幽皇展开了激烈的斗争</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/9b68zBne#第02集$https://s.xlzys.com/play/Xe0RX0vb#第03集$https://s.xlzys.com/play/nelYM75a#第04集$https://s.xlzys.com/play/mepYX22a#第05集$https://s.xlzys.com/play/DdwpRrRe#第06集$https://s.xlzys.com/play/nelYM76a#第07集$https://s.xlzys.com/play/mepYX26a#第08集$https://s.xlzys.com/play/DdwpRrwe#第09集$https://s.xlzys.com/play/9aAD91ze#第10集$https://s.xlzys.com/play/RdG6Q80b#第11集$https://s.xlzys.com/play/1aM8513e#第12集$https://s.xlzys.com/play/qaQW57Yd#第13集$https://s.xlzys.com/play/mepYoN6a#第14集$https://s.xlzys.com/play/1aM8lpAe#第15集$https://s.xlzys.com/play/9aAnEKpb#第16集$https://s.xlzys.com/play/RdGZNW3b#第17集$https://s.xlzys.com/play/1aMjnWRb#第18集$https://s.xlzys.com/play/qaQ1rgZa#第19集$https://s.xlzys.com/play/BeX6BVob#第20集$https://s.xlzys.com/play/rb2RlJWb#第21集$https://s.xlzys.com/play/9b66pVzb#第22集$https://s.xlzys.com/play/Xe0gj33d#第23集$https://s.xlzys.com/play/BeX6vx8b#第24集$https://s.xlzys.com/play/Xe0gKGyd#第25集$https://s.xlzys.com/play/Xe0gQBNd#第26集$https://s.xlzys.com/play/mepgNxNd#第27集$https://s.xlzys.com/play/qaQ1Vj5a#第28集$https://s.xlzys.com/play/9aAPnzPe#第29集$https://s.xlzys.com/play/9b6RBZ7b#第30集$https://s.xlzys.com/play/mepQo2Va#第31集$https://s.xlzys.com/play/nel5PNla#第32集$https://s.xlzys.com/play/qaQ0zYGe#第33集$https://s.xlzys.com/play/rb2v5yNb#第34集$https://s.xlzys.com/play/mepQrrQa#第35集$https://s.xlzys.com/play/BeXLDkAe#第36集$https://s.xlzys.com/play/9b6X7XLe#第37集$https://s.xlzys.com/play/1aMwzoBd#第38集$https://s.xlzys.com/play/9aANRE9b#第39集$https://s.xlzys.com/play/RdGv147b#第40集$https://s.xlzys.com/play/mepZZkrb#第41集$https://s.xlzys.com/play/rb289J1e#第42集$https://s.xlzys.com/play/qaQkOL0d#第43集$https://s.xlzys.com/play/9aA6Q23b#第44集$https://s.xlzys.com/play/BeXQPBma$$$第01集$https://s.xlzys.com/play/9b68zBne/index.m3u8#第02集$https://s.xlzys.com/play/Xe0RX0vb/index.m3u8#第03集$https://s.xlzys.com/play/nelYM75a/index.m3u8#第04集$https://s.xlzys.com/play/mepYX22a/index.m3u8#第05集$https://s.xlzys.com/play/DdwpRrRe/index.m3u8#第06集$https://s.xlzys.com/play/nelYM76a/index.m3u8#第07集$https://s.xlzys.com/play/mepYX26a/index.m3u8#第08集$https://s.xlzys.com/play/DdwpRrwe/index.m3u8#第09集$https://s.xlzys.com/play/9aAD91ze/index.m3u8#第10集$https://s.xlzys.com/play/RdG6Q80b/index.m3u8#第11集$https://s.xlzys.com/play/1aM8513e/index.m3u8#第12集$https://s.xlzys.com/play/qaQW57Yd/index.m3u8#第13集$https://s.xlzys.com/play/mepYoN6a/index.m3u8#第14集$https://s.xlzys.com/play/1aM8lpAe/index.m3u8#第15集$https://s.xlzys.com/play/9aAnEKpb/index.m3u8#第16集$https://s.xlzys.com/play/RdGZNW3b/index.m3u8#第17集$https://s.xlzys.com/play/1aMjnWRb/index.m3u8#第18集$https://s.xlzys.com/play/qaQ1rgZa/index.m3u8#第19集$https://s.xlzys.com/play/BeX6BVob/index.m3u8#第20集$https://s.xlzys.com/play/rb2RlJWb/index.m3u8#第21集$https://s.xlzys.com/play/9b66pVzb/index.m3u8#第22集$https://s.xlzys.com/play/Xe0gj33d/index.m3u8#第23集$https://s.xlzys.com/play/BeX6vx8b/index.m3u8#第24集$https://s.xlzys.com/play/Xe0gKGyd/index.m3u8#第25集$https://s.xlzys.com/play/Xe0gQBNd/index.m3u8#第26集$https://s.xlzys.com/play/mepgNxNd/index.m3u8#第27集$https://s.xlzys.com/play/qaQ1Vj5a/index.m3u8#第28集$https://s.xlzys.com/play/9aAPnzPe/index.m3u8#第29集$https://s.xlzys.com/play/9b6RBZ7b/index.m3u8#第30集$https://s.xlzys.com/play/mepQo2Va/index.m3u8#第31集$https://s.xlzys.com/play/nel5PNla/index.m3u8#第32集$https://s.xlzys.com/play/qaQ0zYGe/index.m3u8#第33集$https://s.xlzys.com/play/rb2v5yNb/index.m3u8#第34集$https://s.xlzys.com/play/mepQrrQa/index.m3u8#第35集$https://s.xlzys.com/play/BeXLDkAe/index.m3u8#第36集$https://s.xlzys.com/play/9b6X7XLe/index.m3u8#第37集$https://s.xlzys.com/play/1aMwzoBd/index.m3u8#第38集$https://s.xlzys.com/play/9aANRE9b/index.m3u8#第39集$https://s.xlzys.com/play/RdGv147b/index.m3u8#第40集$https://s.xlzys.com/play/mepZZkrb/index.m3u8#第41集$https://s.xlzys.com/play/rb289J1e/index.m3u8#第42集$https://s.xlzys.com/play/qaQkOL0d/index.m3u8#第43集$https://s.xlzys.com/play/9aA6Q23b/index.m3u8#第44集$https://s.xlzys.com/play/BeXQPBma/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 337,
                    "vod_hits_day": 47,
                    "vod_hits_week": 433,
                    "vod_hits_month": 126,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 499151,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 61041,
                    "vod_name": "宦妃天下",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220629-1/4d790c7eb7d8780641a0d13f4e37d7b7.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "西凉茉",
                    "vod_director": "苹果你个大梨",
                    "vod_remarks": "第34集",
                    "vod_content": "<p>前世，她被背叛而死，一朝穿越，孤魂落在了命运相似的少女西凉茉身上，她誓要让伤害她的人付出代价。 步步为营，算计所有人，搅得满城风雨，她终爬到了高处</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/Ddwp6QMe#第02集$https://s.xlzys.com/play/9aADERPe#第03集$https://s.xlzys.com/play/RdG6N18b#第04集$https://s.xlzys.com/play/1aM8nk5e#第05集$https://s.xlzys.com/play/9aADGpPe#第06集$https://s.xlzys.com/play/9aADJ03e#第07集$https://s.xlzys.com/play/RdG6PpLb#第08集$https://s.xlzys.com/play/1aM8YyOe#第09集$https://s.xlzys.com/play/nelO7w7d#第10集$https://s.xlzys.com/play/mepg2AXd#第11集$https://s.xlzys.com/play/RdGZzwyb#第12集$https://s.xlzys.com/play/1aMjN5Qb#第13集$https://s.xlzys.com/play/nelOg5Vd#第14集$https://s.xlzys.com/play/mepgmQmd#第15集$https://s.xlzys.com/play/mepg1V2d#第16集$https://s.xlzys.com/play/Ddwj1gRb#第17集$https://s.xlzys.com/play/DdwjoBRb#第18集$https://s.xlzys.com/play/nelOZn6d#第19集$https://s.xlzys.com/play/qaQ0WMqe#第20集$https://s.xlzys.com/play/BeXoDWld#第21集$https://s.xlzys.com/play/BeXonWvd#第22集$https://s.xlzys.com/play/rb2vOMMb#第23集$https://s.xlzys.com/play/9aAPkl1e#第24集$https://s.xlzys.com/play/RdG5qrQa#第25集$https://s.xlzys.com/play/qaQ0VYle#第26集$https://s.xlzys.com/play/BeXo3gWd#第27集$https://s.xlzys.com/play/DdwVAxrb#第28集$https://s.xlzys.com/play/qaQn2XGb#第29集$https://s.xlzys.com/play/qaQnYVlb#第30集$https://s.xlzys.com/play/BeXLBZke#第31集$https://s.xlzys.com/play/9b6XDQVe#第33集$https://s.xlzys.com/play/Xe08LQye#第34集$https://s.xlzys.com/play/9aA6orjb$$$第01集$https://s.xlzys.com/play/Ddwp6QMe/index.m3u8#第02集$https://s.xlzys.com/play/9aADERPe/index.m3u8#第03集$https://s.xlzys.com/play/RdG6N18b/index.m3u8#第04集$https://s.xlzys.com/play/1aM8nk5e/index.m3u8#第05集$https://s.xlzys.com/play/9aADGpPe/index.m3u8#第06集$https://s.xlzys.com/play/9aADJ03e/index.m3u8#第07集$https://s.xlzys.com/play/RdG6PpLb/index.m3u8#第08集$https://s.xlzys.com/play/1aM8YyOe/index.m3u8#第09集$https://s.xlzys.com/play/nelO7w7d/index.m3u8#第10集$https://s.xlzys.com/play/mepg2AXd/index.m3u8#第11集$https://s.xlzys.com/play/RdGZzwyb/index.m3u8#第12集$https://s.xlzys.com/play/1aMjN5Qb/index.m3u8#第13集$https://s.xlzys.com/play/nelOg5Vd/index.m3u8#第14集$https://s.xlzys.com/play/mepgmQmd/index.m3u8#第15集$https://s.xlzys.com/play/mepg1V2d/index.m3u8#第16集$https://s.xlzys.com/play/Ddwj1gRb/index.m3u8#第17集$https://s.xlzys.com/play/DdwjoBRb/index.m3u8#第18集$https://s.xlzys.com/play/nelOZn6d/index.m3u8#第19集$https://s.xlzys.com/play/qaQ0WMqe/index.m3u8#第20集$https://s.xlzys.com/play/BeXoDWld/index.m3u8#第21集$https://s.xlzys.com/play/BeXonWvd/index.m3u8#第22集$https://s.xlzys.com/play/rb2vOMMb/index.m3u8#第23集$https://s.xlzys.com/play/9aAPkl1e/index.m3u8#第24集$https://s.xlzys.com/play/RdG5qrQa/index.m3u8#第25集$https://s.xlzys.com/play/qaQ0VYle/index.m3u8#第26集$https://s.xlzys.com/play/BeXo3gWd/index.m3u8#第27集$https://s.xlzys.com/play/DdwVAxrb/index.m3u8#第28集$https://s.xlzys.com/play/qaQn2XGb/index.m3u8#第29集$https://s.xlzys.com/play/qaQnYVlb/index.m3u8#第30集$https://s.xlzys.com/play/BeXLBZke/index.m3u8#第31集$https://s.xlzys.com/play/9b6XDQVe/index.m3u8#第33集$https://s.xlzys.com/play/Xe08LQye/index.m3u8#第34集$https://s.xlzys.com/play/9aA6orjb/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 705,
                    "vod_hits_day": 945,
                    "vod_hits_week": 473,
                    "vod_hits_month": 104,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 499149,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 49576,
                    "vod_name": "炼气练了三千年 第二季",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220501-1/b128fa8ae40a46462d63b680481a6b9c.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "谢必安",
                    "vod_director": "",
                    "vod_remarks": "第30集",
                    "vod_content": "<p>三千年前，天资绝顶的白秋然被青冥剑宗创始人青冥道人收为门徒，开始修仙之路。三千年后，白秋然的师尊青冥道人飞升成仙，大师兄渡劫失败身死道消，就连最小的小师妹的六世孙都筑基成功，学会了御剑乘风而行。而白秋然经历三千年的苦修还只是停留在炼气期，虽然经常被人嘲笑一直无法突破，但其实白秋然炼气期已达第六万六千六百六十四层的境界，个人实力非常强大，无论对手是仙神还是魔怪都能轻松取胜。白秋然一直没有放弃继续努力寻求突破，在这个过程中结识了不同类型的几位女主，最终找到突破境界之法，得偿所愿、成功筑基。</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第1集$https://s.xlzys.com/play/1aMjXKRb#第2集$https://s.xlzys.com/play/qaQ1XKZa#第3集$https://s.xlzys.com/play/BeX6PPob#第4集$https://s.xlzys.com/play/rb2RXXWb#第5集$https://s.xlzys.com/play/9b66MMzb#第6集$https://s.xlzys.com/play/Xe0gMM3d#第7集$https://s.xlzys.com/play/nelO00Vd#第8集$https://s.xlzys.com/play/mepgnnmd#第9集$https://s.xlzys.com/play/Ddwjxxzb#第10集$https://s.xlzys.com/play/qaQWrw9d#第11集$https://s.xlzys.com/play/BeXDBEge#第12集$https://s.xlzys.com/play/rb2kl5zd#第13集$https://s.xlzys.com/play/Xe0RjQLb#第15集$https://s.xlzys.com/play/1aMjJL5b#第16集$https://s.xlzys.com/play/RdGZg9Qb#第17集$https://s.xlzys.com/play/9aAnxE3b#第18集$https://s.xlzys.com/play/mepgvzmd#第19集$https://s.xlzys.com/play/9b66EJLb#第20集$https://s.xlzys.com/play/mepgEjrd#第21集$https://s.xlzys.com/play/DdwmV6ga#第22集$https://s.xlzys.com/play/9b6Rypnb#第23集$https://s.xlzys.com/play/mepQM3Xa#第24集$https://s.xlzys.com/play/RdGvnNJb#第25集$https://s.xlzys.com/play/Xe0YygGa#第26集$https://s.xlzys.com/play/RdGv1NKb#第27集$https://s.xlzys.com/play/nelRR2lb#第28集$https://s.xlzys.com/play/mepZkOmb#第29集$https://s.xlzys.com/play/RdGRY60b#第30集$https://s.xlzys.com/play/9b6WMvld$$$第1集$https://s.xlzys.com/play/1aMjXKRb/index.m3u8#第2集$https://s.xlzys.com/play/qaQ1XKZa/index.m3u8#第3集$https://s.xlzys.com/play/BeX6PPob/index.m3u8#第4集$https://s.xlzys.com/play/rb2RXXWb/index.m3u8#第5集$https://s.xlzys.com/play/9b66MMzb/index.m3u8#第6集$https://s.xlzys.com/play/Xe0gMM3d/index.m3u8#第7集$https://s.xlzys.com/play/nelO00Vd/index.m3u8#第8集$https://s.xlzys.com/play/mepgnnmd/index.m3u8#第9集$https://s.xlzys.com/play/Ddwjxxzb/index.m3u8#第10集$https://s.xlzys.com/play/qaQWrw9d/index.m3u8#第11集$https://s.xlzys.com/play/BeXDBEge/index.m3u8#第12集$https://s.xlzys.com/play/rb2kl5zd/index.m3u8#第13集$https://s.xlzys.com/play/Xe0RjQLb/index.m3u8#第15集$https://s.xlzys.com/play/1aMjJL5b/index.m3u8#第16集$https://s.xlzys.com/play/RdGZg9Qb/index.m3u8#第17集$https://s.xlzys.com/play/9aAnxE3b/index.m3u8#第18集$https://s.xlzys.com/play/mepgvzmd/index.m3u8#第19集$https://s.xlzys.com/play/9b66EJLb/index.m3u8#第20集$https://s.xlzys.com/play/mepgEjrd/index.m3u8#第21集$https://s.xlzys.com/play/DdwmV6ga/index.m3u8#第22集$https://s.xlzys.com/play/9b6Rypnb/index.m3u8#第23集$https://s.xlzys.com/play/mepQM3Xa/index.m3u8#第24集$https://s.xlzys.com/play/RdGvnNJb/index.m3u8#第25集$https://s.xlzys.com/play/Xe0YygGa/index.m3u8#第26集$https://s.xlzys.com/play/RdGv1NKb/index.m3u8#第27集$https://s.xlzys.com/play/nelRR2lb/index.m3u8#第28集$https://s.xlzys.com/play/mepZkOmb/index.m3u8#第29集$https://s.xlzys.com/play/RdGRY60b/index.m3u8#第30集$https://s.xlzys.com/play/9b6WMvld/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 317,
                    "vod_hits_day": 901,
                    "vod_hits_week": 296,
                    "vod_hits_month": 705,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 496629,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 31007,
                    "vod_name": "万界神主",
                    "type_id": 3,
                    "vod_tag": "万界神主,万界,界神,神主,身为,古神,的叶,叶辰,辰从,从神,神境",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220326-1/b548616217e4f39ff5f7619ac57016e0.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2019",
                    "vod_actor": "徐翔,柳知萧,季骜杰,冷泉夜月,烈之流星",
                    "vod_director": "",
                    "vod_remarks": "第276集",
                    "vod_content": "<p>身为古神的叶辰从神境世界陨落到了苍蓝世界，这里百州千国林立，豪强争霸，叶辰在这个苍蓝世界呆了数百年，建立了庞大的势力。在百州千国，叶辰的存在一直都是一个传说。但是来自神境世界的力量慢慢地延伸到了苍蓝世界，一场残酷的龙争虎斗即将开展。南州都城，天北国第一战将洪旭与南州双月门门主武隆二人在花神宫外比武，却不料败在花神宫丫鬟组小组长苏小小的手中，众人震惊。北狄大军出现在了南州东部，欲破南州。守将不顾南州百姓安危与斩风的劝阻，打算打开城门投降。花神宫宫主澹台月及时出现，以将北狄灭国为威胁，逼退率领北狄大军的雷帅。苏小小让武隆和斩风前往花神宫外门打杂。为了阻止战争的爆发，叶辰孤身一人前往北狄的途中，遇到了圣女——慕清雪跟他的随从。数百之多的北狄狼骑突然出现，将他们的去路完全封死。叶辰出手，打败了北狄的将军和狼骑，救下了慕清雪一行人。漫山遍野的火焰将他们包围在了雪地之中。叶辰急忙逃离，顺便带走了慕清雪。北狄国主托尔克汗为了花神宫一事，前往神冢祭坛，寻求老国师的帮助。老国师令托尔克汗持他的信笺，前往昊天宗，请昊天宗宗主出山。慕清雪回到了自己的家园当中，却发现自己的家园已经被摧毁。叶辰将慕清雪带入了先祖古墓之中。叶辰与慕清雪二人在洞穴之内发现了一艘拥有智慧的远古飞船——若琪。安琪和若琪在穿梭暗域世界的时候，被噬灵偷袭，生死不明。只有找到七份生命契约，这样才能让安琪复活。叶辰使用空间神力救助了大祭司。昊天宗等人闯入月影山庄，将一众花神宫的子弟杀害。苏小小出手，将昊天宗的执事打倒在地。谛听与苏小小等人对战。苏小小打算带上门人后撤。一路追踪苏小小等人的谛听，遇上了叶辰，反被打败。昊天宗毁了叶辰的月影山庄之后，手下死伤惨重。澹台月展开反击，不惜动用炼魂碎魄大阵，叶辰出手，将昊天宗宗主严鸿击败。而后叶辰才得知，昊天宗的幕后黑手其实是风雪女神安雪。叶辰和他的朋友们跟安雪斗智斗勇，并最终拯救了整个世界。</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/DdwOAJd1#第02集$https://s.xlzys.com/play/RdGD2yeD#第03集$https://s.xlzys.com/play/1aMM6QaW#第04集$https://s.xlzys.com/play/BeX1Rkay#第05集$https://s.xlzys.com/play/9b6gj7dE#第06集$https://s.xlzys.com/play/nelzPlbK#第07集$https://s.xlzys.com/play/mepEP1aM#第08集$https://s.xlzys.com/play/mepEPraM#第09集$https://s.xlzys.com/play/DdwOvmd1#第10集$https://s.xlzys.com/play/RdGDoQeD#第11集$https://s.xlzys.com/play/qaQQBqan#第12集$https://s.xlzys.com/play/rb23QPdW#第13集$https://s.xlzys.com/play/9b6g4QdE#第14集$https://s.xlzys.com/play/nelzNJbK#第15集$https://s.xlzys.com/play/DdwOwmd1#第16集$https://s.xlzys.com/play/RdGDrQeD#第17集$https://s.xlzys.com/play/qaQQGqan#第18集$https://s.xlzys.com/play/rb23NPdW#第19集$https://s.xlzys.com/play/Xe017Gax#第20集$https://s.xlzys.com/play/mepEmraM#第21集$https://s.xlzys.com/play/DdwOqmd1#第22集$https://s.xlzys.com/play/mepEjXaM#第23集$https://s.xlzys.com/play/9aAwY7dv#第24集$https://s.xlzys.com/play/1aMMVPaW#第25集$https://s.xlzys.com/play/qaQQ8Man#第26集$https://s.xlzys.com/play/BeX198ay#第27集$https://s.xlzys.com/play/rb23wjdW#第28集$https://s.xlzys.com/play/9b6gALdE#第29集$https://s.xlzys.com/play/Xe01jVax#第30集$https://s.xlzys.com/play/nelzW7bK#第31集$https://s.xlzys.com/play/mepEWXaM#第32集$https://s.xlzys.com/play/DdwO6gd1#第33集$https://s.xlzys.com/play/9aAwE7dv#第34集$https://s.xlzys.com/play/RdGDNreD#第35集$https://s.xlzys.com/play/1aMMnPaW#第36集$https://s.xlzys.com/play/qaQQrMan#第37集$https://s.xlzys.com/play/BeX1B8ay#第38集$https://s.xlzys.com/play/rb23ljdW#第39集$https://s.xlzys.com/play/9b6gpLdE#第40集$https://s.xlzys.com/play/Xe01nVax#第41集$https://s.xlzys.com/play/nelzy7bK#第42集$https://s.xlzys.com/play/mepEDXaM#第43集$https://s.xlzys.com/play/DdwONgd1#第44集$https://s.xlzys.com/play/nelzyVbK#第45集$https://s.xlzys.com/play/mepEDmaM#第46集$https://s.xlzys.com/play/DdwONzd1#第47集$https://s.xlzys.com/play/9aAwLpdv#第48集$https://s.xlzys.com/play/RdGDk3eD#第49集$https://s.xlzys.com/play/1aMMqRaW#第50集$https://s.xlzys.com/play/qaQQxZan#第51集$https://s.xlzys.com/play/BeX1voay#第52集$https://s.xlzys.com/play/rb23PWdW#第53集$https://s.xlzys.com/play/9b6glzdE#第54集$https://s.xlzys.com/play/Xe01N3ax#第55集$https://s.xlzys.com/play/nelzlVbK#第56集$https://s.xlzys.com/play/mepEpmaM#第57集$https://s.xlzys.com/play/DdwOzzd1#第58集$https://s.xlzys.com/play/9aAwzpdv#第59集$https://s.xlzys.com/play/RdGDJ3eD#第60集$https://s.xlzys.com/play/1aMMPRaW#第61集$https://s.xlzys.com/play/qaQQlZan#第62集$https://s.xlzys.com/play/BeX1zoay#第63集$https://s.xlzys.com/play/rb23mWdW#第64集$https://s.xlzys.com/play/9b6gqzdE#第65集$https://s.xlzys.com/play/Xe01k3ax#第66集$https://s.xlzys.com/play/nelzoVbK#第67集$https://s.xlzys.com/play/mepEvmaM#第68集$https://s.xlzys.com/play/DdwODzd1#第69集$https://s.xlzys.com/play/nelzo1bK#第70集$https://s.xlzys.com/play/mepEvyaM#第71集$https://s.xlzys.com/play/DdwODXd1#第72集$https://s.xlzys.com/play/9aAwGjdv#第73集$https://s.xlzys.com/play/RdGDq5eD#第74集$https://s.xlzys.com/play/1aMMz1aW#第75集$https://s.xlzys.com/play/qaQQE5an#第76集$https://s.xlzys.com/play/BeX1OVay#第77集$https://s.xlzys.com/play/rb23BAdW#第78集$https://s.xlzys.com/play/9b6gJNdE#第79集$https://s.xlzys.com/play/Xe01zNax#第80集$https://s.xlzys.com/play/nelz41bK#第81集$https://s.xlzys.com/play/mepE5yaM#第82集$https://s.xlzys.com/play/DdwO4Xd1#第83集$https://s.xlzys.com/play/9aAwkjdv#第84集$https://s.xlzys.com/play/RdGDm5eD#第85集$https://s.xlzys.com/play/1aMMv1aW#第86集$https://s.xlzys.com/play/qaQQz5an#第87集$https://s.xlzys.com/play/BeX1KVay#第88集$https://s.xlzys.com/play/rb23ZAdW#第89集$https://s.xlzys.com/play/9b6g1NdE#第90集$https://s.xlzys.com/play/Xe01ZNax#第91集$https://s.xlzys.com/play/nelzw1bK#第92集$https://s.xlzys.com/play/mepEAyaM#第93集$https://s.xlzys.com/play/DdwOLXd1#第94集$https://s.xlzys.com/play/nelzwjbK#第95集$https://s.xlzys.com/play/mepE1QaM#第96集$https://s.xlzys.com/play/DdwO1rd1#第97集$https://s.xlzys.com/play/9aAwp9dv#第98集$https://s.xlzys.com/play/RdGD0KeD#第99集$https://s.xlzys.com/play/1aMMGmaW#第100集$https://s.xlzys.com/play/qaQQMGan#第101集$https://s.xlzys.com/play/BeX1Wvay#第102集$https://s.xlzys.com/play/rb23MMdW#第103集$https://s.xlzys.com/play/9b6gQOdE#第104集$https://s.xlzys.com/play/Xe01K5ax#第105集$https://s.xlzys.com/play/nelz1jbK#第106集$https://s.xlzys.com/play/mepE3QaM#第107集$https://s.xlzys.com/play/DdwO3rd1#第108集$https://s.xlzys.com/play/9aAwV9dv#第109集$https://s.xlzys.com/play/RdGDlKeD#第110集$https://s.xlzys.com/play/1aMMrmaW#第111集$https://s.xlzys.com/play/qaQQyGan#第112集$https://s.xlzys.com/play/BeX1Jvay#第113集$https://s.xlzys.com/play/rb230MdW#第114集$https://s.xlzys.com/play/9b6gEOdE#第115集$https://s.xlzys.com/play/Xe01x5ax#第116集$https://s.xlzys.com/play/nelz3jbK#第117集$https://s.xlzys.com/play/mepE0QaM#第118集$https://s.xlzys.com/play/DdwOBrd1#第119集$https://s.xlzys.com/play/nelznMbK#第120集$https://s.xlzys.com/play/mepE0VaM#第121集$https://s.xlzys.com/play/DdwOB8d1#第122集$https://s.xlzys.com/play/9aAw5ldv#第123集$https://s.xlzys.com/play/RdGDjJeD#第124集$https://s.xlzys.com/play/1aMMpGaW#第125集$https://s.xlzys.com/play/qaQQw9an#第126集$https://s.xlzys.com/play/BeX1Egay#第127集$https://s.xlzys.com/play/rb235zdW#第128集$https://s.xlzys.com/play/9b6gZRdE#第129集$https://s.xlzys.com/play/Xe01QLax#第130集$https://s.xlzys.com/play/nelzGMbK#第131集$https://s.xlzys.com/play/mepEMVaM#第132集$https://s.xlzys.com/play/DdwOW8d1#第133集$https://s.xlzys.com/play/9aAw4ldv#第134集$https://s.xlzys.com/play/RdGD4JeD#第135集$https://s.xlzys.com/play/1aMM4GaW#第136集$https://s.xlzys.com/play/qaQQ49an#第137集$https://s.xlzys.com/play/BeX14gay#第138集$https://s.xlzys.com/play/rb23VzdW#第139集$https://s.xlzys.com/play/9b6gORdE#第140集$https://s.xlzys.com/play/Xe01GLax#第141集$https://s.xlzys.com/play/nelzrMbK#第142集$https://s.xlzys.com/play/mepEyVaM#第143集$https://s.xlzys.com/play/DdwOJ8d1#第144集$https://s.xlzys.com/play/nelzrgbK#第145集$https://s.xlzys.com/play/mepEypaM#第146集$https://s.xlzys.com/play/DdwOJ1d1#第147集$https://s.xlzys.com/play/9aAw33dv#第148集$https://s.xlzys.com/play/RdGD3LeD#第149集$https://s.xlzys.com/play/1aMM3OaW#第150集$https://s.xlzys.com/play/qaQQD0an#第151集$https://s.xlzys.com/play/BeX1N5ay#第152集$https://s.xlzys.com/play/rb23L1dW#第153集$https://s.xlzys.com/play/9b6gPVdE#第154集$https://s.xlzys.com/play/Xe01Jyax#第155集$https://s.xlzys.com/play/nelzqgbK#第156集$https://s.xlzys.com/play/mepExpaM#第157集$https://s.xlzys.com/play/DdwOG1d1#第158集$https://s.xlzys.com/play/9aAw03dv#第159集$https://s.xlzys.com/play/RdGDpLeD#第160集$https://s.xlzys.com/play/1aMMyOaW#第161集$https://s.xlzys.com/play/qaQQP0an#第162集$https://s.xlzys.com/play/BeX1Z5ay#第163集$https://s.xlzys.com/play/rb23Y1dW#第164集$https://s.xlzys.com/play/9b6g3VdE#第165集$https://s.xlzys.com/play/Xe01Wyax#第166集$https://s.xlzys.com/play/nelzBgbK#第167集$https://s.xlzys.com/play/mepEJpaM#第168集$https://s.xlzys.com/play/DdwOQ1d1#第169集$https://s.xlzys.com/play/nelzBrbK#第170集$https://s.xlzys.com/play/mepEJNaM#第171集$https://s.xlzys.com/play/DdwOQMd1#第172集$https://s.xlzys.com/play/9aAwRPdv#第173集$https://s.xlzys.com/play/RdGD18eD#第174集$https://s.xlzys.com/play/1aMMk5aW#第175集$https://s.xlzys.com/play/qaQQoLan#第176集$https://s.xlzys.com/play/BeX1yAay#第177集$https://s.xlzys.com/play/rb23yNdW#第178集$https://s.xlzys.com/play/9b6gDldE#第179集$https://s.xlzys.com/play/Xe01wKax#第180集$https://s.xlzys.com/play/nelzZrbK#第181集$https://s.xlzys.com/play/mepE4NaM#第182集$https://s.xlzys.com/play/DdwOoMd1#第183集$https://s.xlzys.com/play/9aAwBPdv#第184集$https://s.xlzys.com/play/RdGDL8eD#第185集$https://s.xlzys.com/play/1aMMR5aW#第186集$https://s.xlzys.com/play/qaQQYLan#第187集$https://s.xlzys.com/play/BeX1gAay#第188集$https://s.xlzys.com/play/rb23jNdW#第189集$https://s.xlzys.com/play/9b6gnldE#第190集$https://s.xlzys.com/play/Xe015Kax#第191集$https://s.xlzys.com/play/nelzJrbK#第192集$https://s.xlzys.com/play/mepENNaM#第193集$https://s.xlzys.com/play/DdwOXMd1#第194集$https://s.xlzys.com/play/nelzz5bK#第195集$https://s.xlzys.com/play/mepEE2aM#第196集$https://s.xlzys.com/play/DdwOORd1#第197集$https://s.xlzys.com/play/9aAwwOdv#第198集$https://s.xlzys.com/play/RdGDD7eD#第199集$https://s.xlzys.com/play/1aMMMAaW#第200集$https://s.xlzys.com/play/qaQQQlan#第201集$https://s.xlzys.com/play/BeX11Way#第202集$https://s.xlzys.com/play/rb233KdW#第203集$https://s.xlzys.com/play/9b6ggndE#第204集$https://s.xlzys.com/play/Xe011vax#第205集$https://s.xlzys.com/play/nelzA5bK#第206集$https://s.xlzys.com/play/mepEG2aM#第207集$https://s.xlzys.com/play/DdwOPRd1#第208集$https://s.xlzys.com/play/9aAwyOdv#第209集$https://s.xlzys.com/play/RdGDG7eD#第210集$https://s.xlzys.com/play/1aMM0AaW#第211集$https://s.xlzys.com/play/qaQQVlan#第212集$https://s.xlzys.com/play/BeX13Way#第213集$https://s.xlzys.com/play/rb236KdW#第214集$https://s.xlzys.com/play/9b6gkndE#第215集$https://s.xlzys.com/play/Xe014vax#第216集$https://s.xlzys.com/play/nelzK5bK#第217集$https://s.xlzys.com/play/mepEO2aM#第218集$https://s.xlzys.com/play/DdwOYRd1#第219集$https://s.xlzys.com/play/nelzK6bK#第220集$https://s.xlzys.com/play/mepEO6aM#第221集$https://s.xlzys.com/play/DdwOYwd1#第222集$https://s.xlzys.com/play/9aAwJzdv#第223集$https://s.xlzys.com/play/RdGDP0eD#第224集$https://s.xlzys.com/play/1aMMY3aW#第225集$https://s.xlzys.com/play/qaQQ3Yan#第226集$https://s.xlzys.com/play/BeX1jmay#第227集$https://s.xlzys.com/play/rb23zvdW#第228集$https://s.xlzys.com/play/9b6gL9dE#第229集$https://s.xlzys.com/play/Xe01vXax#第230集$https://s.xlzys.com/play/nelzj6bK#第231集$https://s.xlzys.com/play/mepEr6aM#第232集$https://s.xlzys.com/play/DdwOMwd1#第233集$https://s.xlzys.com/play/9aAwjzdv#第234集$https://s.xlzys.com/play/RdGDy0eD#第235集$https://s.xlzys.com/play/9b68M47e#第236集$https://s.xlzys.com/play/nelY0Nla#第237集$https://s.xlzys.com/play/mepYnl1a#第238集$https://s.xlzys.com/play/DdwpxvJe#第239集$https://s.xlzys.com/play/9b689yze#第240集$https://s.xlzys.com/play/Xe0RLp3b#第241集$https://s.xlzys.com/play/nelY7LVa#第242集$https://s.xlzys.com/play/nelY0NJa#第243集$https://s.xlzys.com/play/mepYnlra#第244集$https://s.xlzys.com/play/9aADrl1e#第245集$https://s.xlzys.com/play/Ddwp3gge#第246集$https://s.xlzys.com/play/9aADVO7e#第247集$https://s.xlzys.com/play/BeXDm6ke#第248集$https://s.xlzys.com/play/Xe0ggDKd#第249集$https://s.xlzys.com/play/RdGZ803b#第250集$https://s.xlzys.com/play/DdwjnnMb#第251集$https://s.xlzys.com/play/Ddwj2ZJb#第252集$https://s.xlzys.com/play/mepgooQd#第253集$https://s.xlzys.com/play/rb2RN8Ab#第254集$https://s.xlzys.com/play/RdGZJ63b#第255集$https://s.xlzys.com/play/nelO1vMd#第256集$https://s.xlzys.com/play/Xe0gQPNd#第257集$https://s.xlzys.com/play/DdwjoJwb#第258集$https://s.xlzys.com/play/RdGZGW5b#第259集$https://s.xlzys.com/play/DdwmpBga#第260集$https://s.xlzys.com/play/Xe0V84Lb#第261集$https://s.xlzys.com/play/Xe0VOJyb#第262集$https://s.xlzys.com/play/Xe0VB77b#第263集$https://s.xlzys.com/play/qaQ0ExMe#第264集$https://s.xlzys.com/play/9aAP5BPe#第265集$https://s.xlzys.com/play/1aMQ003a#第266集$https://s.xlzys.com/play/qaQnWvlb#第267集$https://s.xlzys.com/play/9b6Xvlne#第268集$https://s.xlzys.com/play/1aMwngRd#第269集$https://s.xlzys.com/play/BeXLRMWe#第270集$https://s.xlzys.com/play/RdGRvZQb#第271集$https://s.xlzys.com/play/9aA6Nn1b#第272集$https://s.xlzys.com/play/9b6W9g9d#第273集$https://s.xlzys.com/play/BeXQ5gma#第274集$https://s.xlzys.com/play/1aMZEBmb#第275集$https://s.xlzys.com/play/9aA6WLzb#第276集$https://s.xlzys.com/play/Xe08pXGe$$$第01集$https://s.xlzys.com/play/DdwOAJd1/index.m3u8#第02集$https://s.xlzys.com/play/RdGD2yeD/index.m3u8#第03集$https://s.xlzys.com/play/1aMM6QaW/index.m3u8#第04集$https://s.xlzys.com/play/BeX1Rkay/index.m3u8#第05集$https://s.xlzys.com/play/9b6gj7dE/index.m3u8#第06集$https://s.xlzys.com/play/nelzPlbK/index.m3u8#第07集$https://s.xlzys.com/play/mepEP1aM/index.m3u8#第08集$https://s.xlzys.com/play/mepEPraM/index.m3u8#第09集$https://s.xlzys.com/play/DdwOvmd1/index.m3u8#第10集$https://s.xlzys.com/play/RdGDoQeD/index.m3u8#第11集$https://s.xlzys.com/play/qaQQBqan/index.m3u8#第12集$https://s.xlzys.com/play/rb23QPdW/index.m3u8#第13集$https://s.xlzys.com/play/9b6g4QdE/index.m3u8#第14集$https://s.xlzys.com/play/nelzNJbK/index.m3u8#第15集$https://s.xlzys.com/play/DdwOwmd1/index.m3u8#第16集$https://s.xlzys.com/play/RdGDrQeD/index.m3u8#第17集$https://s.xlzys.com/play/qaQQGqan/index.m3u8#第18集$https://s.xlzys.com/play/rb23NPdW/index.m3u8#第19集$https://s.xlzys.com/play/Xe017Gax/index.m3u8#第20集$https://s.xlzys.com/play/mepEmraM/index.m3u8#第21集$https://s.xlzys.com/play/DdwOqmd1/index.m3u8#第22集$https://s.xlzys.com/play/mepEjXaM/index.m3u8#第23集$https://s.xlzys.com/play/9aAwY7dv/index.m3u8#第24集$https://s.xlzys.com/play/1aMMVPaW/index.m3u8#第25集$https://s.xlzys.com/play/qaQQ8Man/index.m3u8#第26集$https://s.xlzys.com/play/BeX198ay/index.m3u8#第27集$https://s.xlzys.com/play/rb23wjdW/index.m3u8#第28集$https://s.xlzys.com/play/9b6gALdE/index.m3u8#第29集$https://s.xlzys.com/play/Xe01jVax/index.m3u8#第30集$https://s.xlzys.com/play/nelzW7bK/index.m3u8#第31集$https://s.xlzys.com/play/mepEWXaM/index.m3u8#第32集$https://s.xlzys.com/play/DdwO6gd1/index.m3u8#第33集$https://s.xlzys.com/play/9aAwE7dv/index.m3u8#第34集$https://s.xlzys.com/play/RdGDNreD/index.m3u8#第35集$https://s.xlzys.com/play/1aMMnPaW/index.m3u8#第36集$https://s.xlzys.com/play/qaQQrMan/index.m3u8#第37集$https://s.xlzys.com/play/BeX1B8ay/index.m3u8#第38集$https://s.xlzys.com/play/rb23ljdW/index.m3u8#第39集$https://s.xlzys.com/play/9b6gpLdE/index.m3u8#第40集$https://s.xlzys.com/play/Xe01nVax/index.m3u8#第41集$https://s.xlzys.com/play/nelzy7bK/index.m3u8#第42集$https://s.xlzys.com/play/mepEDXaM/index.m3u8#第43集$https://s.xlzys.com/play/DdwONgd1/index.m3u8#第44集$https://s.xlzys.com/play/nelzyVbK/index.m3u8#第45集$https://s.xlzys.com/play/mepEDmaM/index.m3u8#第46集$https://s.xlzys.com/play/DdwONzd1/index.m3u8#第47集$https://s.xlzys.com/play/9aAwLpdv/index.m3u8#第48集$https://s.xlzys.com/play/RdGDk3eD/index.m3u8#第49集$https://s.xlzys.com/play/1aMMqRaW/index.m3u8#第50集$https://s.xlzys.com/play/qaQQxZan/index.m3u8#第51集$https://s.xlzys.com/play/BeX1voay/index.m3u8#第52集$https://s.xlzys.com/play/rb23PWdW/index.m3u8#第53集$https://s.xlzys.com/play/9b6glzdE/index.m3u8#第54集$https://s.xlzys.com/play/Xe01N3ax/index.m3u8#第55集$https://s.xlzys.com/play/nelzlVbK/index.m3u8#第56集$https://s.xlzys.com/play/mepEpmaM/index.m3u8#第57集$https://s.xlzys.com/play/DdwOzzd1/index.m3u8#第58集$https://s.xlzys.com/play/9aAwzpdv/index.m3u8#第59集$https://s.xlzys.com/play/RdGDJ3eD/index.m3u8#第60集$https://s.xlzys.com/play/1aMMPRaW/index.m3u8#第61集$https://s.xlzys.com/play/qaQQlZan/index.m3u8#第62集$https://s.xlzys.com/play/BeX1zoay/index.m3u8#第63集$https://s.xlzys.com/play/rb23mWdW/index.m3u8#第64集$https://s.xlzys.com/play/9b6gqzdE/index.m3u8#第65集$https://s.xlzys.com/play/Xe01k3ax/index.m3u8#第66集$https://s.xlzys.com/play/nelzoVbK/index.m3u8#第67集$https://s.xlzys.com/play/mepEvmaM/index.m3u8#第68集$https://s.xlzys.com/play/DdwODzd1/index.m3u8#第69集$https://s.xlzys.com/play/nelzo1bK/index.m3u8#第70集$https://s.xlzys.com/play/mepEvyaM/index.m3u8#第71集$https://s.xlzys.com/play/DdwODXd1/index.m3u8#第72集$https://s.xlzys.com/play/9aAwGjdv/index.m3u8#第73集$https://s.xlzys.com/play/RdGDq5eD/index.m3u8#第74集$https://s.xlzys.com/play/1aMMz1aW/index.m3u8#第75集$https://s.xlzys.com/play/qaQQE5an/index.m3u8#第76集$https://s.xlzys.com/play/BeX1OVay/index.m3u8#第77集$https://s.xlzys.com/play/rb23BAdW/index.m3u8#第78集$https://s.xlzys.com/play/9b6gJNdE/index.m3u8#第79集$https://s.xlzys.com/play/Xe01zNax/index.m3u8#第80集$https://s.xlzys.com/play/nelz41bK/index.m3u8#第81集$https://s.xlzys.com/play/mepE5yaM/index.m3u8#第82集$https://s.xlzys.com/play/DdwO4Xd1/index.m3u8#第83集$https://s.xlzys.com/play/9aAwkjdv/index.m3u8#第84集$https://s.xlzys.com/play/RdGDm5eD/index.m3u8#第85集$https://s.xlzys.com/play/1aMMv1aW/index.m3u8#第86集$https://s.xlzys.com/play/qaQQz5an/index.m3u8#第87集$https://s.xlzys.com/play/BeX1KVay/index.m3u8#第88集$https://s.xlzys.com/play/rb23ZAdW/index.m3u8#第89集$https://s.xlzys.com/play/9b6g1NdE/index.m3u8#第90集$https://s.xlzys.com/play/Xe01ZNax/index.m3u8#第91集$https://s.xlzys.com/play/nelzw1bK/index.m3u8#第92集$https://s.xlzys.com/play/mepEAyaM/index.m3u8#第93集$https://s.xlzys.com/play/DdwOLXd1/index.m3u8#第94集$https://s.xlzys.com/play/nelzwjbK/index.m3u8#第95集$https://s.xlzys.com/play/mepE1QaM/index.m3u8#第96集$https://s.xlzys.com/play/DdwO1rd1/index.m3u8#第97集$https://s.xlzys.com/play/9aAwp9dv/index.m3u8#第98集$https://s.xlzys.com/play/RdGD0KeD/index.m3u8#第99集$https://s.xlzys.com/play/1aMMGmaW/index.m3u8#第100集$https://s.xlzys.com/play/qaQQMGan/index.m3u8#第101集$https://s.xlzys.com/play/BeX1Wvay/index.m3u8#第102集$https://s.xlzys.com/play/rb23MMdW/index.m3u8#第103集$https://s.xlzys.com/play/9b6gQOdE/index.m3u8#第104集$https://s.xlzys.com/play/Xe01K5ax/index.m3u8#第105集$https://s.xlzys.com/play/nelz1jbK/index.m3u8#第106集$https://s.xlzys.com/play/mepE3QaM/index.m3u8#第107集$https://s.xlzys.com/play/DdwO3rd1/index.m3u8#第108集$https://s.xlzys.com/play/9aAwV9dv/index.m3u8#第109集$https://s.xlzys.com/play/RdGDlKeD/index.m3u8#第110集$https://s.xlzys.com/play/1aMMrmaW/index.m3u8#第111集$https://s.xlzys.com/play/qaQQyGan/index.m3u8#第112集$https://s.xlzys.com/play/BeX1Jvay/index.m3u8#第113集$https://s.xlzys.com/play/rb230MdW/index.m3u8#第114集$https://s.xlzys.com/play/9b6gEOdE/index.m3u8#第115集$https://s.xlzys.com/play/Xe01x5ax/index.m3u8#第116集$https://s.xlzys.com/play/nelz3jbK/index.m3u8#第117集$https://s.xlzys.com/play/mepE0QaM/index.m3u8#第118集$https://s.xlzys.com/play/DdwOBrd1/index.m3u8#第119集$https://s.xlzys.com/play/nelznMbK/index.m3u8#第120集$https://s.xlzys.com/play/mepE0VaM/index.m3u8#第121集$https://s.xlzys.com/play/DdwOB8d1/index.m3u8#第122集$https://s.xlzys.com/play/9aAw5ldv/index.m3u8#第123集$https://s.xlzys.com/play/RdGDjJeD/index.m3u8#第124集$https://s.xlzys.com/play/1aMMpGaW/index.m3u8#第125集$https://s.xlzys.com/play/qaQQw9an/index.m3u8#第126集$https://s.xlzys.com/play/BeX1Egay/index.m3u8#第127集$https://s.xlzys.com/play/rb235zdW/index.m3u8#第128集$https://s.xlzys.com/play/9b6gZRdE/index.m3u8#第129集$https://s.xlzys.com/play/Xe01QLax/index.m3u8#第130集$https://s.xlzys.com/play/nelzGMbK/index.m3u8#第131集$https://s.xlzys.com/play/mepEMVaM/index.m3u8#第132集$https://s.xlzys.com/play/DdwOW8d1/index.m3u8#第133集$https://s.xlzys.com/play/9aAw4ldv/index.m3u8#第134集$https://s.xlzys.com/play/RdGD4JeD/index.m3u8#第135集$https://s.xlzys.com/play/1aMM4GaW/index.m3u8#第136集$https://s.xlzys.com/play/qaQQ49an/index.m3u8#第137集$https://s.xlzys.com/play/BeX14gay/index.m3u8#第138集$https://s.xlzys.com/play/rb23VzdW/index.m3u8#第139集$https://s.xlzys.com/play/9b6gORdE/index.m3u8#第140集$https://s.xlzys.com/play/Xe01GLax/index.m3u8#第141集$https://s.xlzys.com/play/nelzrMbK/index.m3u8#第142集$https://s.xlzys.com/play/mepEyVaM/index.m3u8#第143集$https://s.xlzys.com/play/DdwOJ8d1/index.m3u8#第144集$https://s.xlzys.com/play/nelzrgbK/index.m3u8#第145集$https://s.xlzys.com/play/mepEypaM/index.m3u8#第146集$https://s.xlzys.com/play/DdwOJ1d1/index.m3u8#第147集$https://s.xlzys.com/play/9aAw33dv/index.m3u8#第148集$https://s.xlzys.com/play/RdGD3LeD/index.m3u8#第149集$https://s.xlzys.com/play/1aMM3OaW/index.m3u8#第150集$https://s.xlzys.com/play/qaQQD0an/index.m3u8#第151集$https://s.xlzys.com/play/BeX1N5ay/index.m3u8#第152集$https://s.xlzys.com/play/rb23L1dW/index.m3u8#第153集$https://s.xlzys.com/play/9b6gPVdE/index.m3u8#第154集$https://s.xlzys.com/play/Xe01Jyax/index.m3u8#第155集$https://s.xlzys.com/play/nelzqgbK/index.m3u8#第156集$https://s.xlzys.com/play/mepExpaM/index.m3u8#第157集$https://s.xlzys.com/play/DdwOG1d1/index.m3u8#第158集$https://s.xlzys.com/play/9aAw03dv/index.m3u8#第159集$https://s.xlzys.com/play/RdGDpLeD/index.m3u8#第160集$https://s.xlzys.com/play/1aMMyOaW/index.m3u8#第161集$https://s.xlzys.com/play/qaQQP0an/index.m3u8#第162集$https://s.xlzys.com/play/BeX1Z5ay/index.m3u8#第163集$https://s.xlzys.com/play/rb23Y1dW/index.m3u8#第164集$https://s.xlzys.com/play/9b6g3VdE/index.m3u8#第165集$https://s.xlzys.com/play/Xe01Wyax/index.m3u8#第166集$https://s.xlzys.com/play/nelzBgbK/index.m3u8#第167集$https://s.xlzys.com/play/mepEJpaM/index.m3u8#第168集$https://s.xlzys.com/play/DdwOQ1d1/index.m3u8#第169集$https://s.xlzys.com/play/nelzBrbK/index.m3u8#第170集$https://s.xlzys.com/play/mepEJNaM/index.m3u8#第171集$https://s.xlzys.com/play/DdwOQMd1/index.m3u8#第172集$https://s.xlzys.com/play/9aAwRPdv/index.m3u8#第173集$https://s.xlzys.com/play/RdGD18eD/index.m3u8#第174集$https://s.xlzys.com/play/1aMMk5aW/index.m3u8#第175集$https://s.xlzys.com/play/qaQQoLan/index.m3u8#第176集$https://s.xlzys.com/play/BeX1yAay/index.m3u8#第177集$https://s.xlzys.com/play/rb23yNdW/index.m3u8#第178集$https://s.xlzys.com/play/9b6gDldE/index.m3u8#第179集$https://s.xlzys.com/play/Xe01wKax/index.m3u8#第180集$https://s.xlzys.com/play/nelzZrbK/index.m3u8#第181集$https://s.xlzys.com/play/mepE4NaM/index.m3u8#第182集$https://s.xlzys.com/play/DdwOoMd1/index.m3u8#第183集$https://s.xlzys.com/play/9aAwBPdv/index.m3u8#第184集$https://s.xlzys.com/play/RdGDL8eD/index.m3u8#第185集$https://s.xlzys.com/play/1aMMR5aW/index.m3u8#第186集$https://s.xlzys.com/play/qaQQYLan/index.m3u8#第187集$https://s.xlzys.com/play/BeX1gAay/index.m3u8#第188集$https://s.xlzys.com/play/rb23jNdW/index.m3u8#第189集$https://s.xlzys.com/play/9b6gnldE/index.m3u8#第190集$https://s.xlzys.com/play/Xe015Kax/index.m3u8#第191集$https://s.xlzys.com/play/nelzJrbK/index.m3u8#第192集$https://s.xlzys.com/play/mepENNaM/index.m3u8#第193集$https://s.xlzys.com/play/DdwOXMd1/index.m3u8#第194集$https://s.xlzys.com/play/nelzz5bK/index.m3u8#第195集$https://s.xlzys.com/play/mepEE2aM/index.m3u8#第196集$https://s.xlzys.com/play/DdwOORd1/index.m3u8#第197集$https://s.xlzys.com/play/9aAwwOdv/index.m3u8#第198集$https://s.xlzys.com/play/RdGDD7eD/index.m3u8#第199集$https://s.xlzys.com/play/1aMMMAaW/index.m3u8#第200集$https://s.xlzys.com/play/qaQQQlan/index.m3u8#第201集$https://s.xlzys.com/play/BeX11Way/index.m3u8#第202集$https://s.xlzys.com/play/rb233KdW/index.m3u8#第203集$https://s.xlzys.com/play/9b6ggndE/index.m3u8#第204集$https://s.xlzys.com/play/Xe011vax/index.m3u8#第205集$https://s.xlzys.com/play/nelzA5bK/index.m3u8#第206集$https://s.xlzys.com/play/mepEG2aM/index.m3u8#第207集$https://s.xlzys.com/play/DdwOPRd1/index.m3u8#第208集$https://s.xlzys.com/play/9aAwyOdv/index.m3u8#第209集$https://s.xlzys.com/play/RdGDG7eD/index.m3u8#第210集$https://s.xlzys.com/play/1aMM0AaW/index.m3u8#第211集$https://s.xlzys.com/play/qaQQVlan/index.m3u8#第212集$https://s.xlzys.com/play/BeX13Way/index.m3u8#第213集$https://s.xlzys.com/play/rb236KdW/index.m3u8#第214集$https://s.xlzys.com/play/9b6gkndE/index.m3u8#第215集$https://s.xlzys.com/play/Xe014vax/index.m3u8#第216集$https://s.xlzys.com/play/nelzK5bK/index.m3u8#第217集$https://s.xlzys.com/play/mepEO2aM/index.m3u8#第218集$https://s.xlzys.com/play/DdwOYRd1/index.m3u8#第219集$https://s.xlzys.com/play/nelzK6bK/index.m3u8#第220集$https://s.xlzys.com/play/mepEO6aM/index.m3u8#第221集$https://s.xlzys.com/play/DdwOYwd1/index.m3u8#第222集$https://s.xlzys.com/play/9aAwJzdv/index.m3u8#第223集$https://s.xlzys.com/play/RdGDP0eD/index.m3u8#第224集$https://s.xlzys.com/play/1aMMY3aW/index.m3u8#第225集$https://s.xlzys.com/play/qaQQ3Yan/index.m3u8#第226集$https://s.xlzys.com/play/BeX1jmay/index.m3u8#第227集$https://s.xlzys.com/play/rb23zvdW/index.m3u8#第228集$https://s.xlzys.com/play/9b6gL9dE/index.m3u8#第229集$https://s.xlzys.com/play/Xe01vXax/index.m3u8#第230集$https://s.xlzys.com/play/nelzj6bK/index.m3u8#第231集$https://s.xlzys.com/play/mepEr6aM/index.m3u8#第232集$https://s.xlzys.com/play/DdwOMwd1/index.m3u8#第233集$https://s.xlzys.com/play/9aAwjzdv/index.m3u8#第234集$https://s.xlzys.com/play/RdGDy0eD/index.m3u8#第235集$https://s.xlzys.com/play/9b68M47e/index.m3u8#第236集$https://s.xlzys.com/play/nelY0Nla/index.m3u8#第237集$https://s.xlzys.com/play/mepYnl1a/index.m3u8#第238集$https://s.xlzys.com/play/DdwpxvJe/index.m3u8#第239集$https://s.xlzys.com/play/9b689yze/index.m3u8#第240集$https://s.xlzys.com/play/Xe0RLp3b/index.m3u8#第241集$https://s.xlzys.com/play/nelY7LVa/index.m3u8#第242集$https://s.xlzys.com/play/nelY0NJa/index.m3u8#第243集$https://s.xlzys.com/play/mepYnlra/index.m3u8#第244集$https://s.xlzys.com/play/9aADrl1e/index.m3u8#第245集$https://s.xlzys.com/play/Ddwp3gge/index.m3u8#第246集$https://s.xlzys.com/play/9aADVO7e/index.m3u8#第247集$https://s.xlzys.com/play/BeXDm6ke/index.m3u8#第248集$https://s.xlzys.com/play/Xe0ggDKd/index.m3u8#第249集$https://s.xlzys.com/play/RdGZ803b/index.m3u8#第250集$https://s.xlzys.com/play/DdwjnnMb/index.m3u8#第251集$https://s.xlzys.com/play/Ddwj2ZJb/index.m3u8#第252集$https://s.xlzys.com/play/mepgooQd/index.m3u8#第253集$https://s.xlzys.com/play/rb2RN8Ab/index.m3u8#第254集$https://s.xlzys.com/play/RdGZJ63b/index.m3u8#第255集$https://s.xlzys.com/play/nelO1vMd/index.m3u8#第256集$https://s.xlzys.com/play/Xe0gQPNd/index.m3u8#第257集$https://s.xlzys.com/play/DdwjoJwb/index.m3u8#第258集$https://s.xlzys.com/play/RdGZGW5b/index.m3u8#第259集$https://s.xlzys.com/play/DdwmpBga/index.m3u8#第260集$https://s.xlzys.com/play/Xe0V84Lb/index.m3u8#第261集$https://s.xlzys.com/play/Xe0VOJyb/index.m3u8#第262集$https://s.xlzys.com/play/Xe0VB77b/index.m3u8#第263集$https://s.xlzys.com/play/qaQ0ExMe/index.m3u8#第264集$https://s.xlzys.com/play/9aAP5BPe/index.m3u8#第265集$https://s.xlzys.com/play/1aMQ003a/index.m3u8#第266集$https://s.xlzys.com/play/qaQnWvlb/index.m3u8#第267集$https://s.xlzys.com/play/9b6Xvlne/index.m3u8#第268集$https://s.xlzys.com/play/1aMwngRd/index.m3u8#第269集$https://s.xlzys.com/play/BeXLRMWe/index.m3u8#第270集$https://s.xlzys.com/play/RdGRvZQb/index.m3u8#第271集$https://s.xlzys.com/play/9aA6Nn1b/index.m3u8#第272集$https://s.xlzys.com/play/9b6W9g9d/index.m3u8#第273集$https://s.xlzys.com/play/BeXQ5gma/index.m3u8#第274集$https://s.xlzys.com/play/1aMZEBmb/index.m3u8#第275集$https://s.xlzys.com/play/9aA6WLzb/index.m3u8#第276集$https://s.xlzys.com/play/Xe08pXGe/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 915,
                    "vod_hits_day": 822,
                    "vod_hits_week": 825,
                    "vod_hits_month": 919,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 496587,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 60857,
                    "vod_name": "歪嘴战神",
                    "type_id": 3,
                    "vod_tag": "",
                    "type_name": "动漫",
                    "vod_pic": "https://soutre.com/upload/vod/20220625-1/cbc00aaf16a8dc10d7efae7ae99a3862.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2022",
                    "vod_actor": "江北辰",
                    "vod_director": "",
                    "vod_remarks": "第24集",
                    "vod_content": "<p>五年前还是富家少爷的江北辰，因为一场阴谋，家里一朝落败。亲人，女友避之不及，纷纷离他而去。经过五年的金戈铁马，江北辰荣耀归来！伪装赘婿，扮猪吃虎</p>",
                    "vod_play_from": "'xlyun$$$xlm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/9aADXwBe#第02集$https://s.xlzys.com/play/RdG6XDyb#第03集$https://s.xlzys.com/play/Xe0RyvNb#第04集.$https://s.xlzys.com/play/rb2koQWd#第05集$https://s.xlzys.com/play/nelYNAga#第06集$https://s.xlzys.com/play/1aM8l43e#第07集$https://s.xlzys.com/play/qaQWp4Yd#第08集$https://s.xlzys.com/play/rb2R1Nvb#第09集$https://s.xlzys.com/play/BeX6k2mb#第10集$https://s.xlzys.com/play/qaQ15BYa#第11集$https://s.xlzys.com/play/1aMj5x3b#第12集$https://s.xlzys.com/play/Xe0gMgyd#第13集$https://s.xlzys.com/play/rb2Rm1Ab#第14集$https://s.xlzys.com/play/DdwjW8zb#第15集$https://s.xlzys.com/play/9aAnjWzb#第16集$https://s.xlzys.com/play/mepQkpNa#第17集$https://s.xlzys.com/play/9aAPlQBe#第18集$https://s.xlzys.com/play/1aMQyJ5a#第19集$https://s.xlzys.com/play/RdGv6g7b#第20集$https://s.xlzys.com/play/RdGvqWrb#第21集$https://s.xlzys.com/play/9b6XDEle#第22集$https://s.xlzys.com/play/mepZRKVb#第23集$https://s.xlzys.com/play/mepZ9vNb#第24集$https://s.xlzys.com/play/mepZKqQb$$$第01集$https://s.xlzys.com/play/9aADXwBe/index.m3u8#第02集$https://s.xlzys.com/play/RdG6XDyb/index.m3u8#第03集$https://s.xlzys.com/play/Xe0RyvNb/index.m3u8#第04集.$https://s.xlzys.com/play/rb2koQWd/index.m3u8#第05集$https://s.xlzys.com/play/nelYNAga/index.m3u8#第06集$https://s.xlzys.com/play/1aM8l43e/index.m3u8#第07集$https://s.xlzys.com/play/qaQWp4Yd/index.m3u8#第08集$https://s.xlzys.com/play/rb2R1Nvb/index.m3u8#第09集$https://s.xlzys.com/play/BeX6k2mb/index.m3u8#第10集$https://s.xlzys.com/play/qaQ15BYa/index.m3u8#第11集$https://s.xlzys.com/play/1aMj5x3b/index.m3u8#第12集$https://s.xlzys.com/play/Xe0gMgyd/index.m3u8#第13集$https://s.xlzys.com/play/rb2Rm1Ab/index.m3u8#第14集$https://s.xlzys.com/play/DdwjW8zb/index.m3u8#第15集$https://s.xlzys.com/play/9aAnjWzb/index.m3u8#第16集$https://s.xlzys.com/play/mepQkpNa/index.m3u8#第17集$https://s.xlzys.com/play/9aAPlQBe/index.m3u8#第18集$https://s.xlzys.com/play/1aMQyJ5a/index.m3u8#第19集$https://s.xlzys.com/play/RdGv6g7b/index.m3u8#第20集$https://s.xlzys.com/play/RdGvqWrb/index.m3u8#第21集$https://s.xlzys.com/play/9b6XDEle/index.m3u8#第22集$https://s.xlzys.com/play/mepZRKVb/index.m3u8#第23集$https://s.xlzys.com/play/mepZ9vNb/index.m3u8#第24集$https://s.xlzys.com/play/mepZKqQb/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 486,
                    "vod_hits_day": 959,
                    "vod_hits_week": 64,
                    "vod_hits_month": 157,
                    "created_at": "2022-10-15 20:00:49",
                    "updated_at": "2022-10-15 20:00:49"
                },
                {
                    "id": 1939361,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85717,
                    "vod_name": "剑风传奇 黄金时代篇",
                    "type_id": 3,
                    "vod_tag": "动画",
                    "type_name": "动漫",
                    "vod_pic": "https://image.soutre.com/cover/bf3db48ad49a6cbe21fa3ec8b97c8b83.jpg",
                    "vod_area": "日本",
                    "vod_lang": "日语",
                    "vod_year": "2022",
                    "vod_actor": "岩永洋昭 , 樱井孝宏 , 行成桃姬 , 梶裕贵 , 寿美菜子 , 藤原贵弘 , 松本吉朗 , 矢尾一树 , 小林剑道",
                    "vod_director": "佐野雄太",
                    "vod_remarks": "第02集",
                    "vod_content": "已故漫画家#三浦建太郎#笔下作品《#剑风传奇#》曾于2012年～2013年被改编为剧场版《剑风传奇 黄金时代篇》3部曲，而Aniplex官方在昨天宣布将推出重新编辑的TV动画版《剑风传奇 黄金时代篇 MEMORIAL EDITION》，预计2022年于日本电视台播出。\n　　《剑风传奇》原作自1989年开始连载，目前全世界单行本销量突破5000万册，为日本黑暗奇幻作品代表。而粉丝间人气最高的「黄金时代篇」，于2012年～2013年间推出剧场版三部作，于全世界16个国家地区上映。",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/Xe08pjye/index.m3u8#第02集$https://s.xlzys.com/play/RdGRxk8b/index.m3u8$$$第01集$https://s.xlzys.com/play/Xe08pjye#第02集$https://s.xlzys.com/play/RdGRxk8b'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 555,
                    "vod_hits_day": 706,
                    "vod_hits_week": 764,
                    "vod_hits_month": 549,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939360,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85718,
                    "vod_name": "尹弟下山",
                    "type_id": 10,
                    "vod_tag": "剧情",
                    "type_name": "剧情片",
                    "vod_pic": "https://image.soutre.com/cover/c16a2e5d3f5c70f954488189c3b3fa44.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2021",
                    "vod_actor": "石春元 , 黄爱莲 , 李忠辉 , 黔爻 , 丁浩 , 周鸿佚 , 吕明洲 , 吴朝辉",
                    "vod_director": "黔爻",
                    "vod_remarks": "正片",
                    "vod_content": "一位热爱表演，但演技拙劣，不甘现状的农村中年男人为了实现自己的明星梦，一路历经坎坷到城市寻梦，在经历一系列的困难打击之后辗转回到自己的村庄开始自主创业。最后在政府的帮扶下创业成功，最后自己出资拍了这部电影。",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/nelRXJjb/index.m3u8$$$正片$https://s.xlzys.com/play/nelRXJjb'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 20,
                    "vod_hits_day": 590,
                    "vod_hits_week": 352,
                    "vod_hits_month": 493,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939357,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85719,
                    "vod_name": "某天早上变成人头麦克风的我君的人生",
                    "type_id": 3,
                    "vod_tag": "动画",
                    "type_name": "动漫",
                    "vod_pic": "https://image.soutre.com/cover/e4c9f7ec8caa4aca38efbbcae59b6472.jpg",
                    "vod_area": "日本",
                    "vod_lang": "日语",
                    "vod_year": "2022",
                    "vod_actor": "大西沙织,鬼头明里,相良茉优,Lynn,久保田未梦,水桥香织,杉田智和",
                    "vod_director": "葛西良信",
                    "vod_remarks": "第01集",
                    "vod_content": "讲述了转生为人头麦克风的“我君”和隶属于ASMR部、以“ASMR甲子园”为目标的女高中生百合们展开的闹剧故事。",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/BeXQwGAa/index.m3u8$$$第01集$https://s.xlzys.com/play/BeXQwGAa'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 954,
                    "vod_hits_day": 369,
                    "vod_hits_week": 935,
                    "vod_hits_month": 553,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939356,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85720,
                    "vod_name": "隐居",
                    "type_id": 10,
                    "vod_tag": "惊悚",
                    "type_name": "剧情片",
                    "vod_pic": "https://image.soutre.com/cover/26635479da1e7a417ff399ff9cbcec3c.jpg",
                    "vod_area": "英国",
                    "vod_lang": "英语",
                    "vod_year": "2011",
                    "vod_actor": "杰米·贝尔,基里安·墨菲,坦迪·牛顿",
                    "vod_director": "Carl Tibbetts",
                    "vod_remarks": "正片",
                    "vod_content": "故事讲述一对夫妇（希里安·墨菲与桑迪·牛顿）为了修补两人之间的婚姻，来到一座与世隔绝的小岛。一天，一个受伤的士兵的闯入却彻底打破了宁静，他告诉他们世界上的其他人都已经被泄露的病毒杀死了……",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/RdGRzDKb/index.m3u8$$$正片$https://s.xlzys.com/play/RdGRzDKb'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 548,
                    "vod_hits_day": 735,
                    "vod_hits_week": 551,
                    "vod_hits_month": 125,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939355,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85721,
                    "vod_name": "引擎",
                    "type_id": 10,
                    "vod_tag": "剧情",
                    "type_name": "剧情片",
                    "vod_pic": "https://image.soutre.com/cover/a1e7fb77550451d64aed45250cdcb04b.jpg",
                    "vod_area": "台湾",
                    "vod_lang": "国语",
                    "vod_year": "2010",
                    "vod_actor": "尹铸胜 , 苏丽",
                    "vod_director": "朱晓伟",
                    "vod_remarks": "正片",
                    "vod_content": "故事发生在祖国大陆南方的坡脊 小镇。1978年，当改革开放的春风吹 满神州大地的时候，主人公钟世通倾 尽全力购买了一辆二手卡车，......",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/mepZBEQb/index.m3u8$$$正片$https://s.xlzys.com/play/mepZBEQb'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 444,
                    "vod_hits_day": 262,
                    "vod_hits_week": 945,
                    "vod_hits_month": 617,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939354,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85722,
                    "vod_name": "隐私保险箱",
                    "type_id": 10,
                    "vod_tag": "悬疑",
                    "type_name": "剧情片",
                    "vod_pic": "https://image.soutre.com/cover/f0e6cbab5a5b7ea2821b2fe1c39d624a.jpg",
                    "vod_area": "大陆",
                    "vod_lang": "国语",
                    "vod_year": "2013",
                    "vod_actor": "古力娜扎 , 辜承 , 杨童舒 , 郭东文 , 王劲松 , 罗筐 , 陶玉玲",
                    "vod_director": "张杰勇",
                    "vod_remarks": "正片",
                    "vod_content": "银行新开了隐私保险箱业务，其中有三个箱子无人认领，银行派出职员调查三个箱子的主人，发现箱子里分别放着头发，身份证，书信，而且每个箱子藏着一段过往的秘密，最后秘密中的忏悔和愧疚在宽容里化解。",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/qaQkjQGd/index.m3u8$$$正片$https://s.xlzys.com/play/qaQkjQGd'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 939,
                    "vod_hits_day": 956,
                    "vod_hits_week": 97,
                    "vod_hits_month": 77,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939351,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85723,
                    "vod_name": "英雄诗篇",
                    "type_id": 10,
                    "vod_tag": "剧情,传记",
                    "type_name": "剧情片",
                    "vod_pic": "https://image.soutre.com/cover/41768754d777815578bfe2fa95da614d.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "1960",
                    "vod_actor": "张静,李长华,红冰,王为一,卢珏",
                    "vod_director": "卢珏,斯蒙,王为一,徐严",
                    "vod_remarks": "正片",
                    "vod_content": "根据广东英德县“马口事件”编写，粤北美丽的群山，英德县的马口，驻扎着一支民警部队。有一天傍晚，附近一个造纸厂突然失火．民警们在队长马德林的率领下，立即赶赴失火现场。到了现场，他们毫不犹豫地冲人火海，分头灭火和搬运物资设备。大火眼看就要给扑灭了，正当民警们冒险抢救最后一桶柴油时，油桶因受热、膨胀而冒烟，共青团员苏满基想把油桶推到水沟去，却不想油桶突然爆炸，苏满基、马德林和一部分民警陷入烈焰之中。县委杨书记赶到现场，组织灭火救人并把伤员送往医院。全县人民在县委的号召下，紧急行动起来，人们争相涌向医院，争着为英雄献血，抢救英雄们的生命。省委、地委派来最好的医生协助治疗。但马德林、苏满基终因伤势过重牺牲了。县医院设备不足，伤员情况仍在恶化。有人提议将重伤员送往广州，有人担心伤员在路上会遇到意外。省委书记告诉大家：党中央和毛主席非常关心受伤的同志。这一消息鼓舞...",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/Ddw02Pre/index.m3u8$$$正片$https://s.xlzys.com/play/Ddw02Pre'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 433,
                    "vod_hits_day": 746,
                    "vod_hits_week": 174,
                    "vod_hits_month": 192,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939349,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85724,
                    "vod_name": "英雄凌凌GO",
                    "type_id": 12,
                    "vod_tag": "喜剧",
                    "type_name": "喜剧片",
                    "vod_pic": "https://image.soutre.com/cover/cd57206be9022c27f6128ebdadabc8b4.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2017",
                    "vod_actor": "彭代豪,鲜炜,史耀中,周兴旺",
                    "vod_director": "彭代豪,熊开均",
                    "vod_remarks": "正片",
                    "vod_content": "民国战乱前夕，苦力张、猪肉庞、风水胡这三个各有所长的草根人物阴差阳错参与了“代号凌凌GO！”特工行动，并误打误撞完成了任务，对国家文物保护做出了巨大的贡献，也因此成了真正的王牌特工，成为一代传奇人物。",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/mepZBGQb/index.m3u8$$$正片$https://s.xlzys.com/play/mepZBGQb'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 802,
                    "vod_hits_day": 313,
                    "vod_hits_week": 9,
                    "vod_hits_month": 802,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939347,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85726,
                    "vod_name": "英叔之古墓狂魔",
                    "type_id": 6,
                    "vod_tag": "动作,悬疑,恐怖,奇幻",
                    "type_name": "动作片",
                    "vod_pic": "https://image.soutre.com/cover/119653373afcc8c8f089832cb7eeb57e.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2022",
                    "vod_actor": "刘铁柱,杜康,叶舒予,孙小孟,陈升卫,高天,陈佳意,雷磊",
                    "vod_director": "姚锐",
                    "vod_remarks": "正片",
                    "vod_content": "清末民初，英叔师徒行医济世，除祟安魂，行至小镇郊外恰遇阴公开道大办冥婚，僵尸出没借机害人，师徒几人冒险救下棺木内的红衣美新娘，却被卷入孤坟魔僵连环杀人案，在警察厅的支持下展开紧急调查。百姓接连惨死，贪财好色的恶霸霍大有成为下一个被猎杀的目标，英叔由此推断出丧命者都与清末一桩冤案有关，开坛做法激战复仇魔僵。谜案错杂，正邪交锋，英叔一行人能否为已逝之人洗刷冤屈，还小镇太平呢？",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/9b6WGgOd/index.m3u8$$$正片$https://s.xlzys.com/play/9b6WGgOd'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 133,
                    "vod_hits_day": 379,
                    "vod_hits_week": 622,
                    "vod_hits_month": 334,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939345,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85725,
                    "vod_name": "康熙王朝",
                    "type_id": 13,
                    "vod_tag": "剧情,爱情,传记,历史",
                    "type_name": "大陆剧",
                    "vod_pic": "https://image.soutre.com/cover/22c64ea90b762e830ec7019dcfe43fd2.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2001",
                    "vod_actor": "斯琴高娃,陈道明,高兰村,茹萍,李建群,朱晏,薛中锐,李楠,安亚平,宫雪花,胡天鸽,李晨涛,刘钧,博弘,廖京生,李洪涛,高田昊,万中良,朱艺丹,姚长安,宋来运,张光正,曹永祥,马小矛,陈斌,苏廷石,刘大印,侯永生,刘毓滨,卢勇,汤加丽,高宏亮,李明,李如平,王也天,陈大中,郝铁男,白杨,崔岱,赵凯,薛亦伦,马捷,李小雷,刘长生,尚言生,关德俊,陈韦辰,刘挺,胡珊珊,赵景文,马子俊",
                    "vod_director": "陈家林,刘大印",
                    "vod_remarks": "第46集",
                    "vod_content": "清朝顺治十八年，天花在皇宫蔓延，顺治帝的董爱妃因此一命呜呼，顺治因痛不欲生而决意出家。此时，清帝国充满了内隐外忧。危急之际，孝庄太后（斯琴高娃 饰）当机立断，将得了天花初愈的年仅八岁的皇子玄烨力推为皇室继承人，康熙皇帝登基了。康熙（陈道明 饰）即位以后，手握兵权的鳌拜以权相逼，孝庄太后为了大局也只好暂时放权让鳌拜亲政。鳌拜的野心并不止亲政，他最终目标是图谋改朝换代，少年康熙机智过人，先以终日和一班少年嬉戏放松鳌拜警惕，随后邀约鳌拜进宫而乘机将其软禁，终于为大清除了一大隐患，保住了江山。随后，康熙更是励精图治，向隐忧以久的三藩开刀，开始一段除乱安内的康熙之治！",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'第01集$https://s.xlzys.com/play/rb28rw1e/index.m3u8#第02集$https://s.xlzys.com/play/Xe08prye/index.m3u8#第03集$https://s.xlzys.com/play/nelRL9gb/index.m3u8#第04集$https://s.xlzys.com/play/mepZKjpb/index.m3u8#第05集$https://s.xlzys.com/play/Ddw05q1e/index.m3u8#第06集$https://s.xlzys.com/play/9aA6oY3b/index.m3u8#第07集$https://s.xlzys.com/play/1aMZgVOb/index.m3u8#第08集$https://s.xlzys.com/play/qaQkmr0d/index.m3u8#第09集$https://s.xlzys.com/play/BeXQwB5a/index.m3u8#第10集$https://s.xlzys.com/play/9b6WypVd/index.m3u8#第11集$https://s.xlzys.com/play/mepZKWpb/index.m3u8#第12集$https://s.xlzys.com/play/Ddw0561e/index.m3u8#第13集$https://s.xlzys.com/play/mepZKWNb/index.m3u8#第14集$https://s.xlzys.com/play/qaQkmxLd/index.m3u8#第15集$https://s.xlzys.com/play/rb28rpNe/index.m3u8#第16集$https://s.xlzys.com/play/nelRLyrb/index.m3u8#第17集$https://s.xlzys.com/play/9aA6ozPb/index.m3u8#第18集$https://s.xlzys.com/play/BeXQwvAa/index.m3u8#第19集$https://s.xlzys.com/play/rb28rPNe/index.m3u8#第20集$https://s.xlzys.com/play/nelRLlrb/index.m3u8#第21集$https://s.xlzys.com/play/Ddw05zMe/index.m3u8#第22集$https://s.xlzys.com/play/mepZKv2b/index.m3u8#第23集$https://s.xlzys.com/play/9aA6oGOb/index.m3u8#第24集$https://s.xlzys.com/play/1aMZglAb/index.m3u8#第25集$https://s.xlzys.com/play/BeXQwzWa/index.m3u8#第26集$https://s.xlzys.com/play/nelRL45b/index.m3u8#第27集$https://s.xlzys.com/play/Ddw054Re/index.m3u8#第28集$https://s.xlzys.com/play/1aMZgzAb/index.m3u8#第29集$https://s.xlzys.com/play/rb28rBKe/index.m3u8#第30集$https://s.xlzys.com/play/Xe08pzve/index.m3u8#第31集$https://s.xlzys.com/play/mepZKA2b/index.m3u8#第32集$https://s.xlzys.com/play/nelRLw6b/index.m3u8#第33集$https://s.xlzys.com/play/RdGRxm0b/index.m3u8#第34集$https://s.xlzys.com/play/qaQkmzYd/index.m3u8#第35集$https://s.xlzys.com/play/rb28rMve/index.m3u8#第36集$https://s.xlzys.com/play/nelRL16b/index.m3u8#第37集$https://s.xlzys.com/play/Ddw051we/index.m3u8#第38集$https://s.xlzys.com/play/9aA6opzb/index.m3u8#第39集$https://s.xlzys.com/play/qaQkmMYd/index.m3u8#第40集$https://s.xlzys.com/play/rb28r0ve/index.m3u8#第41集$https://s.xlzys.com/play/9b6WyE9d/index.m3u8#第42集$https://s.xlzys.com/play/nelRL36b/index.m3u8#第43集$https://s.xlzys.com/play/Ddw053we/index.m3u8#第44集$https://s.xlzys.com/play/mepZK31b/index.m3u8#第45集$https://s.xlzys.com/play/9aA6oVBb/index.m3u8#第46集$https://s.xlzys.com/play/RdGRxlyb/index.m3u8$$$第01集$https://s.xlzys.com/play/rb28rw1e#第02集$https://s.xlzys.com/play/Xe08prye#第03集$https://s.xlzys.com/play/nelRL9gb#第04集$https://s.xlzys.com/play/mepZKjpb#第05集$https://s.xlzys.com/play/Ddw05q1e#第06集$https://s.xlzys.com/play/9aA6oY3b#第07集$https://s.xlzys.com/play/1aMZgVOb#第08集$https://s.xlzys.com/play/qaQkmr0d#第09集$https://s.xlzys.com/play/BeXQwB5a#第10集$https://s.xlzys.com/play/9b6WypVd#第11集$https://s.xlzys.com/play/mepZKWpb#第12集$https://s.xlzys.com/play/Ddw0561e#第13集$https://s.xlzys.com/play/mepZKWNb#第14集$https://s.xlzys.com/play/qaQkmxLd#第15集$https://s.xlzys.com/play/rb28rpNe#第16集$https://s.xlzys.com/play/nelRLyrb#第17集$https://s.xlzys.com/play/9aA6ozPb#第18集$https://s.xlzys.com/play/BeXQwvAa#第19集$https://s.xlzys.com/play/rb28rPNe#第20集$https://s.xlzys.com/play/nelRLlrb#第21集$https://s.xlzys.com/play/Ddw05zMe#第22集$https://s.xlzys.com/play/mepZKv2b#第23集$https://s.xlzys.com/play/9aA6oGOb#第24集$https://s.xlzys.com/play/1aMZglAb#第25集$https://s.xlzys.com/play/BeXQwzWa#第26集$https://s.xlzys.com/play/nelRL45b#第27集$https://s.xlzys.com/play/Ddw054Re#第28集$https://s.xlzys.com/play/1aMZgzAb#第29集$https://s.xlzys.com/play/rb28rBKe#第30集$https://s.xlzys.com/play/Xe08pzve#第31集$https://s.xlzys.com/play/mepZKA2b#第32集$https://s.xlzys.com/play/nelRLw6b#第33集$https://s.xlzys.com/play/RdGRxm0b#第34集$https://s.xlzys.com/play/qaQkmzYd#第35集$https://s.xlzys.com/play/rb28rMve#第36集$https://s.xlzys.com/play/nelRL16b#第37集$https://s.xlzys.com/play/Ddw051we#第38集$https://s.xlzys.com/play/9aA6opzb#第39集$https://s.xlzys.com/play/qaQkmMYd#第40集$https://s.xlzys.com/play/rb28r0ve#第41集$https://s.xlzys.com/play/9b6WyE9d#第42集$https://s.xlzys.com/play/nelRL36b#第43集$https://s.xlzys.com/play/Ddw053we#第44集$https://s.xlzys.com/play/mepZK31b#第45集$https://s.xlzys.com/play/9aA6oVBb#第46集$https://s.xlzys.com/play/RdGRxlyb'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 879,
                    "vod_hits_day": 361,
                    "vod_hits_week": 20,
                    "vod_hits_month": 526,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                },
                {
                    "id": 1939343,
                    "api_id": 30,
                    "status": 1,
                    "vod_id": 85727,
                    "vod_name": "英式情爱守则",
                    "type_id": 12,
                    "vod_tag": "喜剧,爱情",
                    "type_name": "喜剧片",
                    "vod_pic": "https://image.soutre.com/cover/986bdd3d3beae0c7f63c1c771ff0e221.jpg",
                    "vod_area": "美国",
                    "vod_lang": "英语",
                    "vod_year": "2014",
                    "vod_actor": "皮尔斯·布鲁斯南,萨尔玛·海耶克,杰西卡·阿尔芭,马尔科姆·麦克道威尔,Duncan Joiner,本·麦肯锡,梅林·邓盖,弗雷德·迈拉麦德,伊凡·谢尔盖,隆巴多·博伊尔,玛丽·玛特琳,李·加林顿,保罗·瑞,Erik Passoja,理查德·梅尔豪斯",
                    "vod_director": "汤姆·沃恩",
                    "vod_remarks": "正片",
                    "vod_content": "本片一个以两性为主题的，制作精良的浪漫喜剧。",
                    "vod_play_from": "'xlm3u8$$$xlyun'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'正片$https://s.xlzys.com/play/BeXQq1va/index.m3u8$$$正片$https://s.xlzys.com/play/BeXQq1va'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 187,
                    "vod_hits_day": 901,
                    "vod_hits_week": 758,
                    "vod_hits_month": 640,
                    "created_at": "2022-10-15 20:00:48",
                    "updated_at": "2022-10-15 20:00:48"
                }
            ],
            downloadList:[
                {
                    id: 0,
                    name: "",
                    url: "",
                    selected: true,
                }
            ],
        }
    },
    mounted() {
        // this.getData();
    },
    methods: {
        showDownload(item){
            console.log(item)
        },


        async getData(){
            // 提取地址
            let result = TransformUrl(this.movie2);
            // 寻找m3u8连接
            let m3u8Item = {};
            if (result.length > 1){
                result.forEach(item=>{
                    if (item.name.includes("m3u8")){
                        m3u8Item = item;
                    }
                })
            }else{
                m3u8Item = result[0];
            }
            // 提交下载
            if (m3u8Item.list.length > 0){
                // for (const item of m3u8Item.list) {
                //      let result = await this.pushDownload(this.movie2.vod_name,item)
                //     console.log(result);
                // }
            }
        },
        // 检查下载状态是否ok
        checkStatus(){
            axios.get("http://localhost:8080/info").then(res=>{
                let {status,data} = res;
                if (status !== 200){
                    this.$toast.success("连接失败，请启动下载器或者检查端口是否正确！");
                }
                let {failTotal,queueTotal,queueTotalReal} = data;
                console.log(failTotal,queueTotal,queueTotalReal);
                this.pushDownload(this.url);
            })
        },
        // 推送下载
        pushDownload(name="",download={}){
            return new Promise((resolve, reject)=>{
                axios.post("http://localhost:8080/push",{
                    type:2,
                    data: `${name}-${download.name},${download.url}`
                }).then(res=>{
                    let {status,data} = res;
                    if (status !== 200){
                        this.$toast.success("连接失败，请启动下载器或者检查端口是否正确！");
                        reject(false);
                    }
                    let {code,message} = data;
                    if (code === 0){
                        this.$toast.success("已添加到下载队列中！");
                        resolve(true);
                    }else{
                        this.$toast.error(message);
                        reject(false);
                    }
                })
            })
        }
    },
    computed:{
        ...mapState(["isMobile","setting"])
    }
}
</script>
