<template>
    <div>
        <!--
         prominent
         src="https://picsum.photos/1920/1080?random"
-->
        <v-app-bar
            absolute
            color="#2196F3"
            dark
            scroll-target="#scrolling-techniques-3"
        >
            <!--背景渐变-->
            <!--<template v-slot:img="{ props }">-->
            <!--    <v-img-->
            <!--        v-bind="props"-->
            <!--        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"-->
            <!--    ></v-img>-->
            <!--</template>-->

            <!--首页图标-->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <!--标题-->
            <v-app-bar-title>{{ movieType.name }}</v-app-bar-title>

            <!--搜索-->
            <v-text-field
                class="mx-4 ml-15"
                flat
                hide-details
                label="支持全文搜索，电影，演员，类型"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keyword"
                @click="search"
            ></v-text-field>

            <v-spacer></v-spacer>
            <!--右侧按钮-->
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>



            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!--历史记录-->
            <v-btn icon>
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <!--    设置-->
            <v-dialog
                v-model="settingDialog"
                transition="dialog-bottom-transition"
                scrollable
                width="800"
            >
                <!--设置按钮-->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon @click="openSetting">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                        配置
                    </v-card-title>

                    <!--配置内容-->
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-radio-group
                                        v-model="setting.showPage"
                                        row
                                    >
                                        <v-radio
                                            label="滚动加载"
                                            :value="true"
                                        ></v-radio>
                                        <v-radio
                                            label="分页加载"
                                            :value="false"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                        label="Legal middle name"
                                        hint="example of helper text only on focus"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                    <v-select
                                        :items="['20', '30', '40', '50']"
                                        v-model="setting.limit"
                                        label="每页显示"
                                        required
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                            color="primary"
                            text
                            @click="resetSetting"
                        >
                            重置
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="saveSetting"
                        >
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <!--导航标签-->
            <template v-slot:extension>
                <v-tabs align-with-title>
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            max-height="1000"
        >
            <v-container style="height: 1000px;margin-top: 100px">
                <!--电影分类-->
                <div class="text-center" v-if="cateList.length > 0">
                    <v-chip
                        class="ma-2"
                        :color="item.type_id === cate_id ? 'primary':''"
                        v-for="(item,index) in cateList"
                        :key="index"
                        @click="changeCate(item)"
                    >
                        {{ item.type_name }}
                    </v-chip>
                </div>

                <MovieList :list="list" :to-detail="false"></MovieList>
            </v-container>
        </v-sheet>

        <!--分页-->
        <template v-if="setting.showPage && total > 10">
            <div class="text-center">
                <v-pagination
                    v-model="page"
                    :length="total"
                    :total-visible="10"
                    circle
                ></v-pagination>
            </div>
        </template>

        <!--侧边栏-->
        <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group
                    v-model="group"
                    color="primary"
                    active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item v-for="(item,index) in menus" :key="index" @click="changeType(item)">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
import MovieList from "./MovieList";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import {mapMutations, mapState} from "vuex";

export default {
    components: {
        MovieList
    },
    data: () => ({
        drawer: false,
        group: null,

        title: "电影",

        tab: 0,
        tabs: [
            {type: 0, name: '推荐'},
            {type: 1, name: '电影'},
            {type: 2, name: '电视剧'},
            {type: 3, name: '综艺'},
            {type: 4, name: '动漫'},
        ],
        cate_id: 0, // 分类id
        cateData: [], // 分类列表元数据
        cateList: [], // 分类列表

        page: 1,
        limit: 20,
        total: 0,
        keyword: "",
        list:[],

        // 配置
        settingDialog: false,
        setting: {
            showPage: true, // 是否分页显示
            limit: 20, // 每页显示条数
        },

        // 左侧菜单
        menus: [],

        items:[
            {type: 0, name: '推荐'},
            {type: 1, name: '电影'},
            {type: 2, name: '电视剧'},
            {type: 3, name: '综艺'},
            {type: 4, name: '动漫'},
        ]
    }),

    created() {
        // 菜单
        // this.menus = EnumData.menus;
        this.getMenus();
        this.getCate();
        this.getData();
    },

    watch: {
        group() {
            this.drawer = false
        },
    },
    methods: {
        ...mapMutations(["setMovieType", "setMovieCate"]),
        // 获取接口列表
        getMenus(){

        },
        // 获取分类
        getCate() {
            this.cateData = {
                "id": 40,
                "api_id": 60,
                "movie": [
                    {
                        "id": 3501,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 1,
                        "type_name": "电影",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3506,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 6,
                        "type_name": "动作片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3507,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 7,
                        "type_name": "喜剧片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3508,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 8,
                        "type_name": "爱情片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3509,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 9,
                        "type_name": "科幻片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3510,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 10,
                        "type_name": "恐怖片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3511,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 11,
                        "type_name": "剧情片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3512,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 12,
                        "type_name": "战争片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3520,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 21,
                        "type_name": "纪录片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3531,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 32,
                        "type_name": "悬疑片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3532,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 33,
                        "type_name": "动画片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3533,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 34,
                        "type_name": "犯罪片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3534,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 35,
                        "type_name": "奇幻片",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3535,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 36,
                        "type_name": "邵氏电影",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    }
                ],
                "tv_play": [
                    {
                        "id": 3502,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 2,
                        "type_name": "连续剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3513,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 13,
                        "type_name": "国产剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3514,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 14,
                        "type_name": "香港剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3515,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 15,
                        "type_name": "台湾剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3516,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 16,
                        "type_name": "美国剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3521,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 22,
                        "type_name": "韩国剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3522,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 23,
                        "type_name": "日本剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3523,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 24,
                        "type_name": "海外剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3536,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 37,
                        "type_name": "泰剧",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    }
                ],
                "variety": [
                    {
                        "id": 3503,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 3,
                        "type_name": "综艺",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3524,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 25,
                        "type_name": "大陆综艺",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3525,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 26,
                        "type_name": "日韩综艺",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3526,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 27,
                        "type_name": "港台综艺",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3527,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 28,
                        "type_name": "欧美综艺",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    }
                ],
                "cartoon": [
                    {
                        "id": 3504,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 4,
                        "type_name": "动漫",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3528,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 29,
                        "type_name": "国产动漫",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3529,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 30,
                        "type_name": "日韩动漫",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3530,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 31,
                        "type_name": "欧美动漫",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    }
                ],
                "other": [
                    {
                        "id": 3505,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 5,
                        "type_name": "资讯",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3517,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 17,
                        "type_name": "公告",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3518,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 18,
                        "type_name": "头条",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3537,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 38,
                        "type_name": "体育赛事",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    },
                    {
                        "id": 3538,
                        "sort": 0,
                        "api_id": 60,
                        "status": 1,
                        "type_id": 39,
                        "type_name": "体育赛事",
                        "created_at": "2022-09-14 21:23:18",
                        "updated_at": "2022-09-14 21:23:18"
                    }
                ],
                "created_at": "2022-09-14 21:23:53",
                "updated_at": "2022-09-14 21:23:53"
            };
        },
        // 切换分类
        changeCate(item) {
            this.cate_id = item.type_id;
            this.search();
        },

        // 搜索
        search() {
            this.page = 1;
            this.list = [];
            this.getData();
        },
        // 获取列表数据
        getData() {
            this.list= [
                {
                    "id": 1939600,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 46641,
                    "vod_name": "变身男女2012",
                    "type_id": 8,
                    "vod_tag": "",
                    "type_name": "爱情片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20221015-1/b1c63eb5cdd698f53925d2a8e5701db7.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2012",
                    "vod_actor": "林志颖,姚笛,午马,徐德昕,徐松子,杨迪,赵春山",
                    "vod_director": "李旗",
                    "vod_remarks": "HD",
                    "vod_content": "<p>电影《假如我是你》是国内首部涉及“换体”爱情的电影作品。\r\n　　千年难遇的太阳磁暴，把巨大的宇宙能量带到地球，鬼才发明家（午马 饰）带着刚发明的“情爱颠覆伞”来到人间。花心男单民（林志颖 饰）是一个在浙江音乐调频工作的DJ。内心渴望成为一名主持，却总因为紧张就结巴，终究未能如愿以偿。穿梭于情场的小艾（姚笛 饰）是一个酒托，从小在孤儿院长大的她，机灵善变，以骗男人为生，把欺骗当作保护自己的最好武器。两个人毫无关系的人在雷雨夜邂逅，正巧被“情爱颠覆伞”交换了灵魂，进入了对方的身体，于是一个成了伪娘，一个成了“春哥”。从高级商圈到魅惑夜场，从床头到床尾，这对错位男女经历了一次又一次身心的纠缠，各种啼笑皆非的身份换位，各种HOLD不住的百出笑料……</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/P8raO4zbxYAxHlXt$$$HD$https://cdn.zoubuting.com/20221015/38SjfT9c/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1939598,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 46639,
                    "vod_name": "猪猪侠大电影·海洋日记",
                    "type_id": 33,
                    "vod_tag": "",
                    "type_name": "动画片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20221015-1/3796a4cb87e909b62185412756686500.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2022",
                    "vod_actor": "陆双,谢蔚,吉莹,吴海涛,陈志荣,白文显",
                    "vod_director": "钟彧",
                    "vod_remarks": "HD",
                    "vod_content": "<p>超星特工猪猪侠在上次的任务中留下了后遗症，但他坚持独自潜入海底世界执行新任务。在五彩缤纷的海底世界见识到各种各样的海底生物，结识了正在寻找哥哥的小豆芽，受小豆芽勇敢执着的精神所打动，猪猪侠决定帮助小豆芽，帮他一起寻找哥哥。原来海洋世界发生了一件不为人知的大事，导致大量海洋“居民”失踪。这件事并不简单，背后隐藏着一个危及海洋世界和平的大危机。猪猪侠这次要如何克服困难，突破自我，解除海洋大危机呢？</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://new.qqaku.com/share/7eMNEufCmBZaart1$$$HD$https://new.qqaku.com/20221015/xoR9wc7u/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1937298,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 46621,
                    "vod_name": "意外杀手2",
                    "type_id": 34,
                    "vod_tag": "",
                    "type_name": "犯罪片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20221014-1/61bc2a2f1445e9f595c7cf50fb18f644.jpg",
                    "vod_area": "英国",
                    "vod_lang": "英语",
                    "vod_year": "2022",
                    "vod_actor": "斯科特·阿金斯,雷·史蒂文森,莎拉·费希恩,派瑞·本森,博·福勒,Faisal Mohammed,George Fouracres,Andreas Nguyen,Steffi Thake,Sarah Chang,Peter Lee Thomas",
                    "vod_director": "George Kirby,Harry Kirby",
                    "vod_remarks": "HD",
                    "vod_content": "<p>麦克·福隆（斯科特·阿金斯饰），号称意外杀手的他，是位冷血杀手。就他从事的职业来讲，他是顶尖的，无论是条理多样的刺杀技巧，还是瞒天过海躲过警察视线，他的每次任务都使雇主满意高兴。但是有一天他挚爱的人却卷入了伦敦的地下杀手世界，并惨遭自己同组织的人 杀害。而福隆不得不打破自己长久以来井然有序，条理安排的生活，开始向实施这一切的人展开复仇。\r\n　　剧本已以2020年完成并计划在年内开拍，但由于疫情缘故，延迟开拍。</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://new.qqaku.com/share/acMaetsLQ8lb9V1q$$$HD$https://new.qqaku.com/20221014/PMnda5Vh/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1739360,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 28124,
                    "vod_name": "笨鸟大冒险",
                    "type_id": 33,
                    "vod_tag": "",
                    "type_name": "动画片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220130-1/4059a52fe783ebae2dbc40db0968837f.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2021",
                    "vod_actor": "",
                    "vod_director": "",
                    "vod_remarks": "HD",
                    "vod_content": "<p>一只小鸻鹬因为没有学会飞翔，而被迁徙的鸟群落下，它要一个人面对寒冷的冬天以及捕食者的威胁，最终在朋友的帮助下，他找到了温暖的避难地，迎来了又一个春天。</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/KnYjNb6jWvrUuPFY$$$HD$https://cdn.zoubuting.com/20221015/YSPUO5KZ/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1738761,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 28861,
                    "vod_name": "北海",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220224-1/5534b411b7ce1d28c39c272b75af49d1.jpg",
                    "vod_area": "挪威",
                    "vod_lang": "英语",
                    "vod_year": "2021",
                    "vod_actor": "克里斯汀·库亚斯·托普",
                    "vod_director": "约翰·安德烈亚斯·安德森",
                    "vod_remarks": "HD",
                    "vod_content": "<p>挪威海岸上的一个石油钻井平台突然倒塌，研究人员意识到这只是更严重事件的开始，试图找出发生了什么。</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/aZyFAXmv4jgjQMaj$$$HD$https://cdn.zoubuting.com/20221015/unJyJese/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1738680,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 9757,
                    "vod_name": "边防站",
                    "type_id": 6,
                    "vod_tag": "边防站,边防站,边防,影片,讲述,毗邻,金三角,祖国,西南,边陲,公安",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20210727-1/9acdda2f72411f3c2025cbb8ec268911.jpg",
                    "vod_area": "内地",
                    "vod_lang": "普通话",
                    "vod_year": "2012",
                    "vod_actor": "丁海峰,孔庆三,高海诚",
                    "vod_director": "高力强",
                    "vod_remarks": "HD",
                    "vod_content": "<p>影片讲述了毗邻“金三角”的祖国西南边陲，公安边防工作站站长蔡斯文带领官兵与贩毒分子展开惊心动魄的较量，最终人赃俱获的精彩故事。</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'高清$https://cdn.zoubuting.com/share/1S9Si1MDMI8shMMn$$$高清$https://cdn.zoubuting.com/20221015/kGZQftEF/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 29,
                    "vod_hits_day": 601,
                    "vod_hits_week": 466,
                    "vod_hits_month": 664,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1738664,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 28888,
                    "vod_name": "镖行天下前传之编外人选",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220224-1/347846a8dd0b1e8335dad093bd758c16.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2010",
                    "vod_actor": "吴奇隆,王鸥,成功,丁正勇,沈保平,杨军,朱妍,阎以昌",
                    "vod_director": "邓衍成",
                    "vod_remarks": "HD",
                    "vod_content": "<p>盐帮势力扩张过猛，朝廷决定进行打压，车千户派出五人小组实施抓捕盐帮首领的计谋。而此时，盐帮副帮主万千里却暗地里杀死了帮主万廷玉，盐帮一时乱作一团。原来万千里是想借眼帮大会之际升任盐帮帮主，恰好谷平安也将盐帮圣物石尊押镖给盐帮长老，万千里高兴不已，却不料五人小组已做好缜密部署，万千里被及时抓获。可狡猾的万千里却利用丐帮传播消息救他，同时在五人小组内部进行策反，由于万千里的捣鬼，王兆兴被认为是叛徒，不想五人之一的长者却是反水者，长者顶着万千里的重金承诺，将其护送到荣州，王兆兴等人也历尽艰险，追随到荣州。最终众人万万没想到万千里拿着石尊竟然是要打开盐帮的宝库。然而万千里的美梦能成真吗？长者遗恨自己一个老龙骑禁军竟不如王兆兴这个新丁。可悲可叹啊！</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/1tI82GuQRuEKZFZx$$$HD$https://cdn.zoubuting.com/20221015/JcRTwShI/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1738281,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 29340,
                    "vod_name": "镖行天下前传之燃眉危机",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220303-1/e34c3669a61daeba5bc49941bde8fe3b.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2010",
                    "vod_actor": "吴奇隆,王鸥,佟仲琪,徐亮",
                    "vod_director": "邓衍成",
                    "vod_remarks": "HD",
                    "vod_content": "<p>《镖行天下前传之燃眉危机》讲述右玉关在番军的长期围攻之下岌岌可危，奸相严嵩把持下的朝政却坐视不管，右玉关守将杨选只有率部顽强抵抗，苦苦等待友军支援的粮草。平安镖局押送的粮草于纷飞的战火中安全送达右玉关，无疑给已经断粮三天的右玉关雪中送炭。平安镖局副总镖头谷平安将押镖的粮草交付给守将杨选，获悉番军最近虽不攻城，却接连向城内抛扔死尸。\r\n　　谷平安当即赶到城门处察看番军抛扔进城的死尸，发现每具死尸上都有不同程度的黑斑。谷平安押镖行走江湖多年，见多识广粗通医术，知道死尸上的黑斑乃传染性极强、病死率极高的黑斑病。谷平安、王兆兴在察看完右玉关的殓尸房准备集中处理的尸体之后，更加坚定番军通过黑斑病将右玉关变成一座死城的企图。\r\n　　黑斑病在右玉关迅速蔓延，城内民众和兵士感染上黑斑病的人数不断增加，如何根治黑斑病、制止黑斑病在右玉关蔓延，成了能不能守住右玉关的关键所在。守将杨...</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/48O64xrmr15qlXBN$$$HD$https://cdn.zoubuting.com/20221015/hjIZEKP0/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1738060,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 29661,
                    "vod_name": "镖行天下前传之虎口夺镖",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220308-1/d5200c5fd2e8266235053cfa72f6a9e6.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2010",
                    "vod_actor": "吴奇隆,王鸥,修革",
                    "vod_director": "邓衍成,马玉成",
                    "vod_remarks": "HD",
                    "vod_content": "<p>谷平安独自护送人镖小倩去找夫家，却在半途中被以刀疤脸为首的一伙绑匪绑架。王兆兴预感情况不妙，前去营救，竟遇到了曾经在飞鱼营干过的师兄游四。王兆兴向游四打听刀疤脸的消息，不料游四竟向王兆兴隐瞒实情，还指路为马。经过一番调查，以及小师妹保护朝廷刘大人调查官粮囤积案所掌握的信息，众人终于闯入最阔祸首黄布政大人的行宫。在大量证据面前，黄布政和游四的丑恶行径和贪赃枉法不攻自破，刘大人将贪官缉拿归案，游四趁机溜走。王兆兴追出野外，与昔日的师兄展开一番较量，游四终有所顿悟，倔强的他却结束了自己的性命，王兆兴不免感到伤感和惋惜。</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/rUYcTBe5e6OrwnZv$$$HD$https://cdn.zoubuting.com/20221015/Q6OhXNqK/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1737997,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 13650,
                    "vod_name": "本命年",
                    "type_id": 8,
                    "vod_tag": "本命年,本命年,本命,经过,劳动改造,劳动,改造,犯人,慧泉,刑满释放,刑满",
                    "type_name": "爱情片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20210726-1/1b5cfa8a2686ac7bd201ac545ecd1aa2.jpg",
                    "vod_area": "内地",
                    "vod_lang": "普通话",
                    "vod_year": "1990",
                    "vod_actor": "姜文,程琳,蔡鸿翔,",
                    "vod_director": "谢飞,",
                    "vod_remarks": "HD",
                    "vod_content": "<p>经过劳动改造，犯人李慧泉刑满释放，他回到了从小生长的胡同老街坊邻居罗大妈很照顾这个父母亡故、孤苦伶仃的小伙子。当年，哥们叉子因为女友爱上了别人，气愤不过，拉着讲义气的李慧泉，教训了那个男人，结果无意中弄出了人命，二人双双入狱。如今，叉子的家人对他们依旧抱有成见，只有叉子的弟弟觉得李慧泉是条汉子。李慧泉在民警小刘，后来选择了练摊谋生，期间遇到了三教九流令他尝遍人间冷暖。在歌厅里，李慧泉认识了驻唱的歌手赵雅秋，此后他成为她的护花使者，但是在他决定重新开始新生活的时候，却陷入了始料未及的困境……</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'高清$https://cdn.zoubuting.com/share/T0wFXgYCGe9ejWHU$$$高清$https://cdn.zoubuting.com/20221015/dMhjylCG/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 514,
                    "vod_hits_day": 535,
                    "vod_hits_week": 332,
                    "vod_hits_month": 715,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1737305,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 1190,
                    "vod_name": "碧海红波",
                    "type_id": 12,
                    "vod_tag": "战争,老电影,国产电影,朝鲜",
                    "type_name": "战争片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20210630-1/0f9404442e3f42bf5103e6f872cdf405.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "普通话/国语",
                    "vod_year": "1975",
                    "vod_actor": "马长春,毕福生,杨凤良",
                    "vod_director": "刘斌",
                    "vod_remarks": "DVD",
                    "vod_content": "<p>抗美援朝战争中，美帝利用空中优势，企图切断我后方运输线。为粉碎敌人偷袭一号江桥的S计划，志愿军某部派雷波带领一支雷达部队，在敌阵地前沿架起雷达。敌人派飞机侦察，雷波等设假天线，造成敌人判断错误。接着，雷波冒险排除了定时炸弹，并消灭了妄图炸毁雷达和进行干扰的敌特。当战斗最激烈的时候，敌机炸断了雷达的输送线，雷波接线时手臂中弹，他忍着巨痛，接通了输送线，保证及时报出空情，使我军粉碎了敌人的S计划。文化大革命，革了电影的命。文革前出产的故事片几乎全都成了毒草被停映，电影院里放的国产影片几乎全是毛主席接见红卫兵之类的新闻纪录片。要看故事片，也只有那么几部外国电影了。那时老百姓风趣地说：“朝鲜的电影有哭有笑，越南的电影飞机大炮，阿尔巴尼亚的电影又搂又抱，中国的电影《新闻简报》。”本片是难得的文革十年电影精品，也是红色岁月的经典珍藏，讲述抗美援朝时期我志愿军和美帝国主义斗争的故事，由陈鸣皋、黄中秋、杨风良、李安秦、徐晓星主演，让我们拭目以待！</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'高清$https://cdn.zoubuting.com/share/UvpO7PaCQ3om0YiB$$$高清$https://cdn.zoubuting.com/20221015/raZ2LSXQ/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1737180,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 1010,
                    "vod_name": "北京时间",
                    "type_id": 8,
                    "vod_tag": "爱情片,剧情片,国产电影,国产,文艺片",
                    "type_name": "爱情片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20210630-1/72a35d1cf94c9cab5f1803caec70baa9.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2015",
                    "vod_actor": "陈乔恩,李保田,马元",
                    "vod_director": "安战军",
                    "vod_remarks": "HD",
                    "vod_content": "<p>王小莫（孙艺洲 饰）是含着金汤匙出生的富家少爷，年纪轻轻便被送往国外深造艺术设计，学成归来后，王小莫进入了公司工作，希望能够在岗位上闯出一片属于自己的天地。然而，让王小莫没有想到的是，他竟然被分配到了老劳模时长工（李保田 饰）的身边，主要工作就是照顾他的饮食起居。时长工的个性古怪又苛刻，平日里没少刁难王小莫，然而在相处的过程中，王小莫发现时长工冷漠的外表下隐藏着一颗古道热肠的心。时长工亦对不离不弃耐心善良的王小莫产生了信任的情感。王小莫对时长工的过去有着强烈的好奇心，抽丝剥茧之中，时长工和技术员薛亚兰（陈乔恩 饰）之间的爱情故事渐渐浮出了水面。</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'高清$https://cdn.zoubuting.com/share/MMgQCrXnOavo4hTz$$$高清$https://cdn.zoubuting.com/20221015/DMsmzy2a/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1736348,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 30990,
                    "vod_name": "镖行天下之深宅大院",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220402-1/d0a9ef8a130d3d53fd3ebaf5d4158174.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2007",
                    "vod_actor": "周群达,吴晓敏,姜大卫",
                    "vod_director": "李厚才,周伟",
                    "vod_remarks": "HD",
                    "vod_content": "<p>京城女镖师沈飞燕（吴晓敏 饰），应通州富商刘大鹏（隋抒洋 饰）之邀前来护镖，据刘家总管介绍，近来刘府经常出现莫名其妙的怪事，刘母（柏含 饰）疑心妖孽作祟，镖师王振威（周群达 饰）派小来与飞燕一同前往。刘家人对飞燕的到来十分欢迎，盼她早日降妖，小少爷灵儿（辰辰 饰）一句看似信口拈来的童言引起飞燕的警觉，他说每当半夜有个叔叔来府上教他画画，由于家中怪事迭出，老夫人对不务正业的灵儿进行了责罚，不料当即受到神秘白衣人（李振涛 饰）的警告。白衣人自称他是被刘家害死的冤魂，再三劝告飞燕不要插手刘家的事，经过一番周密侦查，沈飞燕终于弄明白了一起惊天冤案……</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/hYfwdbArXdpHDxSt$$$HD$https://cdn.zoubuting.com/20221015/PWLAJXEx/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1736327,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 31136,
                    "vod_name": "镖行天下之瞒天过海",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220404-1/44e81b05981466ef4c174866e4fac3ac.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2007",
                    "vod_actor": "周群达,姜大卫,吴晓敏",
                    "vod_director": "邓衍成",
                    "vod_remarks": "HD",
                    "vod_content": "<p>“捣练图”是唐代名画中的极品，一个偶然机会这幅流散民间多年的国宝落在了管青山（佟小虎 饰）手上，这下可让觊觎它已久的各路人马算计起来。江湖大盗九尾狐差人送信指名盗宝，而管青山则要在两日后的“赏画大会”后将此画尽快出手，因怕夜长梦多，他想请天下镖局护镖。飞燕（吴晓敏 饰）认为此镖风险太大，不敢冒然应允，可王振威（周群达 饰）禁不住此镖利润巨大，决意护镖，双方立下字据，镖额五十万两。王兆兴（姜大卫 饰）闻言九尾狐要盗此宝，善意提醒飞燕和王振威，并在管府布下天罗地网，以防不测，且发现管的女儿金凤（董丽丹 饰）举止有些异样。这时，管青山借故推迟一天开赏画大会，王兆兴心中生疑，他暗中监视管青山的行踪，不料发现了管青山的惊天秘密……</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/DPcc2ZaIWmwhOcvY$$$HD$https://cdn.zoubuting.com/20221015/8indgW66/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1736195,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 31172,
                    "vod_name": "镖行天下之桃花劫",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220405-1/ac206c0ebba2e82b661ecff2b0d1dc2a.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2007",
                    "vod_actor": "周群达,吴晓敏,邹爽",
                    "vod_director": "邓衍成",
                    "vod_remarks": "HD",
                    "vod_content": "<p>故事发生在明朝年间。少镖主王振威（周群达 饰）这日接到陈震南（安瑞云 饰）将军的镖书，要他将爱女盈盈（徐自贤 饰）和聘礼护送至远在边关的北齐王处，那边的世子将迎娶性格孤傲的盈盈，不明就里的盈盈跟着护镖的一干人马踏上了征程。出发不久，遇上了劫色的一伙叛军，他们想挟盈盈做人质，逼迫其父陈震南退兵，在王振威、副将李峰（任天野 饰）、沈飞燕（吴晓敏 饰）的保护下，总算杀出重围。行进中盈盈无意间发现了箱子里的凤冠霞帔，这才明白此行是父亲要把她嫁给一个自已不爱的人，她声泪俱下地质问和她早就相爱的李峰，并提出要与其私奔。李峰有苦难言，而王振威则看出了盈盈有要逃走的迹象......</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/LpPUEYlX1a9aVgAa$$$HD$https://cdn.zoubuting.com/20221015/0Xh4iTdY/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1735881,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 31637,
                    "vod_name": "镖王",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220412-1/f7e52c33f2291f63896a93ced16c2726.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "1986",
                    "vod_actor": "安亚平,路峻,马军勤",
                    "vod_director": "李启民",
                    "vod_remarks": "HD",
                    "vod_content": "<p>1910年代，我国西部边陲，鸦片交易猖獗。镖王扎西（安亚平 饰）被洋人汤姆（龙伟 饰）看中，收买至麾下帮其运输毒品。为使扎西死心踏地卖命，汤姆许以重金并从妓院赎出扎西的相好翠花（马军勤 饰）。边关辑私队金雷（路峻 饰）奉命追查洋人贩毒事宜，苦于找不到凭证，他与师叔九曲道长多方打探，终于找到汤姆藏匿的鸦片。事情败露后，汤姆为逃脱罪责，竟嫁祸扎西，不明就里的扎西被下监收押。翠花眼见情人入狱，不得已忍辱委身他人，求得探监机会，将原委讲与扎西。汤姆这时已将鸦片装上汽车，企图从北门逃走，正遇上从监狱逃出来的扎西。仇人相见，分外眼红，扎西顾不上多想，跃上汽车，纵火焚烧......</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/UpNvy4jH7C2WKTcd$$$HD$https://cdn.zoubuting.com/20221015/KpGW3pTL/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1735505,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 16441,
                    "vod_name": "卑劣的街头",
                    "type_id": 34,
                    "vod_tag": "韩国,黑帮,犯罪,韩国电影,赵寅成,黑社会,卑劣的街头,柳河的暴力三部曲",
                    "type_name": "犯罪片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20210807-1/41d1ef746882645a360c851ae117f3b4.jpg",
                    "vod_area": "韩国",
                    "vod_lang": "韩语",
                    "vod_year": "2006",
                    "vod_actor": "赵寅成,李宝英,千虎珍,南宫珉,晋久",
                    "vod_director": "庾河",
                    "vod_remarks": "HD",
                    "vod_content": "<p>赵炳斗（赵仁成 饰）是一个三流社团的小头目，家中有两个弟妹，母亲身体不好，生活困顿；他在社团里也混得不如意，老大不器重，净派一些当街打架、恐吓收债的小事情，本来应该他接手的游戏厅也被别人抢了功。\r\n　　炳斗的同窗好友金珉浩（南宫民 饰）是一个不得志的小导演，为了拍黑帮片，找炳斗体验生活；在金珉浩的帮助下，炳斗也和初恋对象姜贤珠（李宝英 饰）重逢，但是炳斗黑社会的身份让贤珠心存芥蒂。\r\n　　终于，炳斗抓住了一个机会代替了老大，在社团中地位大大提升，他帮助清理拆迁中的钉子户，使社团新开发的房地产项目大获成功，自己也从中分了一杯羹；在他坚持不懈的努力下，贤珠渐渐接受了他的感情，他也答应退出黑社会，过平淡的生活。\r\n　　金珉浩的电影因为真实而深受好评，炳斗到电影院观看，正是这部电影，改变了二人的生活，事情往不可控制的方向发展</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD中字$https://cdn.zoubuting.com/share/YLrrssPPtviwCKeq$$$HD中字$https://cdn.zoubuting.com/20221015/YdXDMcue/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1735131,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 32497,
                    "vod_name": "镖行天下之天下镖局",
                    "type_id": 6,
                    "vod_tag": "",
                    "type_name": "动作片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220501-1/85fb82fdc0551876f39b3416b0910ba8.jpg",
                    "vod_area": "中国大陆",
                    "vod_lang": "汉语普通话",
                    "vod_year": "2007",
                    "vod_actor": "周群达,吴晓敏,姜大卫,高亚麟,闫妮,姬麒麟,房振华",
                    "vod_director": "邓衍成",
                    "vod_remarks": "HD",
                    "vod_content": "<p>王振威（周群达 饰）的父亲王兆兴（姜大卫 饰）曾经是名震江湖的镖师，如今已经归隐田园的他只想要过平静的生活。然而，王振威却并不赞同父亲的想法，心高气傲的他只想着能够成就一番大事业，因此同父亲之间屡次争吵。\r\n　　王振威孤身一人来到京城，开办了天下镖局，却因为初来乍到，而遭到了各路同行的刁难，更于无意之中得罪的千金大小姐沈飞燕（吴晓敏 饰）。为了作弄王振威，沈飞燕将一个无足轻重的香囊交付给他，命他送往保定，就这样，王振威踏上了旅途。哪知道这一个小小的香囊竟然让王振威和沈飞燕惹上了杀身之祸，其中究竟隐藏了什么秘密呢？</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/lR20rjS4YSw9vwHB$$$HD$https://cdn.zoubuting.com/20221015/jmh1LZ65/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1734546,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 33094,
                    "vod_name": "北京遇上西雅图",
                    "type_id": 7,
                    "vod_tag": "",
                    "type_name": "喜剧片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20220513-1/be989feabbadca5a32f15031bb523f40.jpg",
                    "vod_area": "中国大陆,中国香港",
                    "vod_lang": "汉语普通话,英语,闽",
                    "vod_year": "2013",
                    "vod_actor": "汤唯,吴秀波,海清,宋美曼,宋美慧,金燕玲,买红妹,布拉德·哈德,李绮虹",
                    "vod_director": "薛晓路",
                    "vod_remarks": "HD",
                    "vod_content": "<p>“败金女”文佳佳（汤唯 饰）曾经是美食杂志编辑，对爱情充满了像电影《西雅图夜未眠》一样的浪漫幻想。而在现实中，为了给自己的孩子一个“美利坚公民”的身份，她不远万里只身来到西雅图的月子中心待产生子。\r\n　　在月子中心，文佳佳炫富的作风引发了房东（金燕玲 饰）和其他孕妇周逸（海清 饰）、陈悦（买红妹 饰）的反感，倍感孤独的她只能向司机郝志Frank（吴秀波 饰）倾诉心声。而看上去木讷老实的“落魄叔”Frank并不是一个平庸的男子，他在中国曾是一位一流的心血管疾病方面的名医。在相处中，Frank的体贴包容渐渐融化着文佳佳的刁蛮任性。当文佳佳的富豪男友突然失踪后，一夜之间变成穷人的文佳佳得到了Frank无微不至的照顾，跟Frank和他的女儿Julie（宋美曼 &amp; 宋美慧 饰）一起生活的这段日子，让文佳佳找到了家的温暖。\r\n　　当经历了变故的文佳佳，生下了孩子，就要结束她...</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/4Ppf1AB3UaDjzcRN$$$HD$https://cdn.zoubuting.com/20221015/390iifg3/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                },
                {
                    "id": 1732531,
                    "api_id": 60,
                    "status": 1,
                    "vod_id": 25936,
                    "vod_name": "变形金刚5：最后的骑士",
                    "type_id": 9,
                    "vod_tag": "科幻,美国,特效,动作,2017,机甲,漫画改编,热血",
                    "type_name": "科幻片",
                    "vod_pic": "https://pic.wujinpp.com/upload/vod/20211116-1/a90107d4cb7486415f4c03a87dff82a3.jpg",
                    "vod_area": "美国,中国大陆,加拿大,墨西哥",
                    "vod_lang": "英语",
                    "vod_year": "2017",
                    "vod_actor": "马克·沃尔伯格,安东尼·霍普金斯,乔什·杜哈明,劳拉·哈德克,桑地亚哥·卡布瑞拉,伊莎贝拉·莫奈,杰洛德·卡尔迈克,斯坦利·图齐,利亚姆·加里根,马丁·麦克里迪,约翰·霍林沃思,丹尼尔·阿德博伊加,格伦·莫肖尔,嘉玛·陈,约翰·特托罗,托尼·海尔,克劳德·诺尔顿,雅各布·扎哈尔,玛姬·斯蒂德,莎拉·斯图尔特,菲比·尼克尔斯,丽贝卡·弗朗特,斯蒂芬·霍根,小本杰明·弗洛雷斯,胡利奥塞萨尔·查韦斯,艾莎卡比娅,安迪·比恩,马克·德克斯特,罗伯·贾维斯,蒂姆·唐尼,克里斯蒂娜·谭,宝琳·麦克林,塞塔·因德尼,温",
                    "vod_director": "迈克尔·贝",
                    "vod_remarks": "HD",
                    "vod_content": "<p>汽车人和霸天虎连年不断的战争，给地球带来了莫大的伤害。为此，地球各国联合成立反应部队，针对变形金刚无论正邪一律绞杀。与擎天柱交往甚密的地球人凯德?伊格尔（马克·沃尔伯格 Mark Wahlberg 饰）不顾身边人的反对和政府的压力，以一己之力为大黄蜂、钢锁等汽车人提供庇护场所，期间他无意得到一枚徽章，从而将危机引向自身。失踪的擎天柱飘回赛博坦，被变形金刚的创造者昆塔沙捕获并黑化，命令他返回地球寻找至高无上的权杖，毁灭地球，复兴赛博坦。与此同时，威震天和地球政府达成协议，彼此联合追寻凯德及其盟友的踪迹，其目标同样是曾属于魔法师梅林的权杖。\r\n　　地球真正的危机终于降临了……</p>",
                    "vod_play_from": "'wjyun$$$wjm3u8'",
                    "vod_play_note": "$$$",
                    "vod_play_url": "'HD$https://cdn.zoubuting.com/share/vZ76orqe5GFpmynI$$$HD$https://cdn.zoubuting.com/20221015/3UdE8Yz0/index.m3u8'",
                    "vod_down_note": "",
                    "vod_down_url": "",
                    "vod_hits": 0,
                    "vod_hits_day": 0,
                    "vod_hits_week": 0,
                    "vod_hits_month": 0,
                    "created_at": "2022-10-15 20:01:25",
                    "updated_at": "2022-10-15 20:01:25"
                }
            ];
        },

        // 切换分类
        changeTab(item) {
            this.cate_id = 0; // 重置分类id
            this.tab = item.type;
            switch (item.type) {
                case 1: // 电影
                    this.cateList = this.cateData.movie;
                    break;
                case 2: //电视剧
                    this.cateList = this.cateData.tv_play;
                    break;
                case 3: // 综艺
                    this.cateList = this.cateData.variety;
                    break;
                case 4: // 动漫
                    this.cateList = this.cateData.cartoon;
                    break;
                default:
                    this.cateList = [];
                    break;
            }
            this.search();
        },

        // 打开设置
        openSetting() {
            this.settingDialog = true;
        },
        // 保存设置
        saveSetting() {
            LocalStorage.set(EnumData.setting, this.setting);
            this.settingDialog = false;
            this.getData();
        },
        // 重置设置
        resetSetting() {
            LocalStorage.remove(EnumData.setting);
            this.settingDialog = false;
            this.getData();
        },
        // 切换电影类型
        changeType(item) {
            this.title = item.name;
            this.setMovieType(item);
            LocalStorage.set(EnumData.movieType, item);
            this.search();
        },


    },
    computed: {
        ...mapState(["movieType"]),
        // cateList(){
        //     return [];
        //     switch (this.tab) {
        //         case 1: // 电影
        //             return this.cateData.movie;
        //             break;
        //         case 2: //电视剧
        //             return this.cateData.tv_play;
        //             break;
        //         case 3: // 综艺
        //             return this.cateData.variety;
        //             break;
        //         case 4: // 动漫
        //             return this.cateData.cartoon;
        //             break;
        //         default:
        //             return [];
        //             break;
        //
        //     }
        // }
    }
}
</script>
