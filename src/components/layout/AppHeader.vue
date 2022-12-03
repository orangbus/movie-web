<template>
    <div>
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
            <v-app-bar-title><span class="text-pointer" @click="toHome">{{ website.name }}</span></v-app-bar-title>
            <!--搜索-->
            <v-text-field
                v-if="!isMobile"
                class=" mt-10 ml-15"
                flat
                clearable
                :label="placeholder"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keywords"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>


            <v-spacer></v-spacer>
            <!--右侧按钮-->
            <v-btn icon to="/search" v-if="!headerSearch || !headerUser">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <!--电影- 接口选择-->
            <MovieApi @getResult="search" @changeApi="changeApi" v-if="headerMovie"></MovieApi>

            <!--文章分类-->
            <ArticleCateList :cate-list="cateList" @confirm="confirm" v-if="headerArticle"></ArticleCateList>

            <!--聚合搜索- 历史记录-->
            <v-btn icon to="/user" v-if="user.vip && headerSearch">
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <!--用户激活码-->
            <Coupon v-if="headerUser"></Coupon>
            <!--推广码-->
            <ShareQr v-if="headerUser"></ShareQr>
            <!--个人资料-->
            <Profile v-if="headerUser"></Profile>
            <!--退出登录-->
            <Logout v-if="headerUser"></Logout>

            <!--个人中心-->
            <v-btn icon @click="toUser" v-if="!headerUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--    设置-->
            <Setting @getResult="search" v-if="headerMovie || headerSearch"></Setting>

            <!--导航标签-->
            <template v-slot:extension v-if="tabs.length > 0">
                <!--centered-->
                <v-tabs align-with-title >
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

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
                <div class="text-center py-2 text-h5" @click="toHome">
                    {{ website.name }}
                </div>

                <v-list-item-group
                    color="primary"
                    active-class="deep-purple--text text--accent-4"
                >
                    <!--公共导航-->
                    <v-list-item link to="/video" v-if="user.vip">
                        <v-list-item-icon>
                            <v-icon>mdi-video-image</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >视频</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/article">
                        <v-list-item-icon>
                            <v-icon>mdi-list-box-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >文章</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/photo">
                        <v-list-item-icon>
                            <v-icon>mdi-image-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >图片</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--分割线-->
                    <v-divider class="my-1" />
                    <v-list-item link to="/code">
                        <v-list-item-icon>
                            <v-icon>mdi-qrcode-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >活码</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <!--<v-list-item link to="/player">-->
                    <!--    <v-list-item-icon>-->
                    <!--        <v-icon>mdi-movie-play-outline</v-icon>-->
                    <!--    </v-list-item-icon>-->
                    <!--    <v-list-item-content>-->
                    <!--        <v-list-item-title >视频解析</v-list-item-title>-->
                    <!--    </v-list-item-content>-->
                    <!--</v-list-item>-->
                    <!--<v-list-item link to="/m3u8">-->
                    <!--    <v-list-item-icon>-->
                    <!--        <v-icon>mdi-movie-open-play-outline</v-icon>-->
                    <!--    </v-list-item-icon>-->
                    <!--    <v-list-item-content>-->
                    <!--        <v-list-item-title >m3u8播放器</v-list-item-title>-->
                    <!--    </v-list-item-content>-->
                    <!--</v-list-item>-->

                    <!--分割线-->
                    <v-divider class="my-1" />

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import Logout from "@/components/common/Logout.vue";
import Coupon from "@/components/common/Coupon.vue";
import ShareQr from "@/components/common/ShareQr.vue";
import Profile from "@/components/user/Profile.vue";
import Setting from "@/components/common/Setting.vue";
import MovieApi from "@/components/common/MovieApi.vue";
import ArticleCateList from "@/components/common/ArticleCateList.vue";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import {articleCate} from "@/api/article";


export default {
    name: "Header",
    props:{
        tab:{
            type:Number,
            default:()=>0
        },
        tabs:{
            type: Array,
            default:()=> {
                // {type: 0, name: '我的'},
                return []
            }
        },
        // 搜索关键词
        keywords:{
            type:String,
            default:()=>""
        },
        placeholder:{
            type:String,
            default:()=> "请输入你的关键词"
        },

    },
    components:{
        Logout,Coupon,ShareQr,Profile,Setting,MovieApi,ArticleCateList
    },
    data() {
        return {
            // 左侧菜单
            drawer: false,

            // 电影设置
            setting:{},

            // 文章 - 分类
            cateData:[], // 临时分类
            cateList:[],
            cate:{},

            // 电影导航
            headerMovie: false,
            // 聚合搜索
            headerSearch: false,
            // 用户导航
            headerUser: false,
            // 文章
            headerArticle: false,
            // 图片
            headerPhoto: false,
            // 活码
            headerLiveCode:false,
            // 视频
            headerVideo: false

        }
    },
    created() {
      let path = this.$route.path;
      switch (path){
          case "/user":
              this.headerUser = true;
              break;
          case "/movie":
          case "/":
              this.headerMovie = true;
              break;
          case "/search":
              this.headerSearch = true;
              break;
          case "/article":
              this.headerArticle = true;
              break;
          case "/photo":
              this.headerPhoto = true;
              break;
          case "/code":
              this.headerLiveCode = true;
              break;
          case "/vide":
              this.headerVideo = true;
              break;
      }
    },
    mounted() {
        if (this.headerArticle){
            let cate = LocalStorage.get(EnumData.articleHistoryCate);
            if (cate !== null){
                this.tabs = cate;
            }
            this.getCate();
        }

    },
    methods: {
        ...mapMutations(["setSetting","setArticleHistoryCate"]),
        // 切换分类
        changeTab(item) {
            this.$emit("changeTab",item);
        },

        // 电影-切换api
        changeApi(movieapi){
            this.tab = 0;
            this.$emit("changeApi",movieapi)
        },

        getCate(){
            articleCate().then(res=>{
                let list = [];
                res.data.forEach(item=>{
                    item.selected = false;
                    list.push(item);
                })

                this.cateList =list;
                if (this.tabs.length === 0){
                    this.cateData = this.cateList.splice(0,10);
                }
            });
        },
        // 选择分类
        confirm(cate){
            // 将当前标签追加到顶部菜单中
            this.tabs.unshift(cate);
            this.setArticleHistoryCate(this.tabs);
            this.$emit("confirmCate",cate);
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

        // 搜索
        search() {
            this.$emit("search",this.keywords);
        },
        clear(){
            this.keywords = "";
            this.$emit("clear");
        },
        // 个人中心
        toUser(){
            this.$router.push({
                path: this.authorization ? "user":"login"
            })
        },

        // 返回首页
        toHome(){
            this.$router.push({
                path: "/"
            })
        },

        toPage(path){
            this.$router.push({
                path
            })
        },
    },
    computed: {
        ...mapState(["user","authorization","website","isMobile"]),
    }
}
</script>

<style scoped>

</style>
