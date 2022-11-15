<template>
    <div>
        <!--
         prominent
         src="https://picsum.photos/1920/1080?random"
         scroll-target="#movie-content"
-->
        <v-app-bar
            absolute
            color="#2196F3"
            dark
        >
            <!--背景渐变-->
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <!--首页图标-->
            <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
            <!--标题-->
            <v-app-bar-title>{{ movieType.name }}</v-app-bar-title>

            <!--搜索-->
            <v-text-field
                class=" mt-10 ml-15"
                flat
                clearable
                label="支持全文搜索，电影，演员，类型"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keyword"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>


            <v-spacer></v-spacer>
            <!--右侧按钮-->
            <v-btn icon to="/search">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <!--历史记录-->
            <v-btn icon to="/user?type=2">
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <!--个人中心-->
            <v-btn icon @click="toUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--    设置-->
            <Setting></Setting>


            <!--导航标签-->
            <template v-slot:extension>
                <!--centered-->
                <v-tabs align-with-title >
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <!-- class="overflow-y-auto"-->
        <v-sheet
            id="movie-content"
            max-height="1000"
        >
            <v-container style="height: 1000px;margin-top: 100px" >
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

                <!--分页-->
                <!--v-if="setting.showPage && total > 1"-->
                <div class="text-center mt-10 pb-16" >
                    <v-pagination
                        v-model="page"
                        :length="Math.trunc(total/setting.limit)"
                        :total-visible="10"
                        @input="loadMore"
                    ></v-pagination>
                </div>
            </v-container>
        </v-sheet>

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
                    v-model="movieApi.id"
                    color="primary"
                    active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item v-for="(item,index) in menus" :key="index" @click="changeApi(item)">
                        <v-list-item-title>{{ item.name }}({{ item.is_vip ? '会员':'免费' }})</v-list-item-title>
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
import {movieList} from "@/api";
import Setting from "@/components/common/Setting";

export default {
    components: {
        MovieList,Setting
    },
    data: () => ({
        drawer: false,
        setting:{},

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
        limit: 24,
        total: 0,
        keyword: "",
        list:[],

        // 左侧菜单
        menus: [],

    }),

    created() {
        // 加载配置
        let setting = LocalStorage.get(EnumData.setting);
        if (setting === null){
            this.setting = EnumData.defaultSetting;
        }else{
            this.setting = setting;
        }
        // 获取接口
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
        ...mapMutations(["setMovieType", "setMovieCate","setMovieApi","setHistoryCate","setSetting"]),

        loadMore(page){
            this.page = page;
            this.list = [];
            this.getData();
        },

        // 获取接口列表
        getMenus(){
            this.menus = LocalStorage.get(EnumData.movieApiList);
        },
        // 切换数据源
        changeApi(item){
            this.setMovieApi(item);
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
        // 切换电影分类
        changeCate(item) {
            this.setHistoryCate(item);
            this.cate_id = item.type_id;
            this.search();
        },

        // 搜索
        search() {
            this.page = 1;
            this.list = [];
            this.getData();
        },
        clear(){
          this.page = 1;
          this.list = [];
          this.keyword = "";
          this.getData();
        },
        // 获取列表数据
        getData() {
            movieList({
                page:this.page,
                limit:this.setting.limit,
                api_id: this.movieApi.id,
                type:this.tab,
                type_id:this.cate_id
            }).then(res=>{
                let {data,total} = res;
                this.list= data;
                this.total= total;
            });
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
                    this.cateList = this.historyCateList;
                    break;
            }
            this.search();
        },

        // 切换电影类型
        changeType(item) {
            this.title = item.name;
            this.setMovieType(item);
            LocalStorage.set(EnumData.movieType, item);
            this.search();
        },

        // 打开菜单
        openMenu(){
            if (this.authorization){
                this.drawer = !this.drawer;
            }else{
                this.$router.push({
                    path: "login"
                })
            }
        },
        // 个人中心
        toUser(){
            this.$router.push({
                path: this.authorization ? "user":"login"
            })
        },

    },
    computed: {
        ...mapState(["movieType","user","authorization","movieApi","historyCateList"]),
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
