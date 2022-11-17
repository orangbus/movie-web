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
            <v-app-bar-title>{{ movieType.name }}</v-app-bar-title>

            <!--搜索-->
            <v-text-field
                class=" mt-10 ml-15"
                flat
                clearable
                label="支持全文搜索，标题，内容关键词"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keywords"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>


            <v-spacer></v-spacer>
            <!--右侧按钮-->
            <v-btn icon to="/search">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <ArticleCateList :cate-list="cateList" @confirm="confirm"></ArticleCateList>

            <!--个人中心-->
            <v-btn icon @click="toUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--    设置-->
            <Setting @getResult="search"></Setting>

            <!--导航标签-->
            <template v-slot:extension>
                <!--centered-->
                <v-tabs align-with-title >
                    <v-tab
                        v-for="(item,index) in tabs.length > 0 ? tabs : cateData" :key="index"
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
                <div class="text-center py-2 text-h5">
                    {{ website.name }}
                </div>

                <v-list-item-group
                    v-model="movieApi.id"
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


                    <v-list-item link to="/todayhistory">
                        <v-list-item-icon>
                            <v-icon>mdi-chart-timeline-variant-shimmer</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >历史上的今天</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--分割线-->
                    <v-divider class="my-1" />

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapMutations, mapState} from "vuex";
import Setting from "@/components/common/Setting";
import ArticleCateList from "@/components/common/ArticleCateList";
import {articleCate} from "@/api/article";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";

export default {
    name: "Header",
    components:{
        Setting,ArticleCateList
    },
    data() {
        return {
            drawer: false,
            setting:{},
            tab: 0,
            tabs: [],
            keywords: "",
            // 分类
            cateData:[], // 临时分类
            cateList:[],
            cate:{},
        }
    },
    mounted() {
        let cate = LocalStorage.get(EnumData.articleHistoryCate);
        if (cate !== null){
            this.tabs = cate;
        }
        this.getCate();
    },
    methods: {
        ...mapMutations(["setSetting","setArticleHistoryCate"]),

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
        // 切换分类
        changeTab(item) {
            this.$emit("changeTab",item);
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
        ...mapState(["movieType","user","authorization","movieApi","website"]),
    }
}
</script>

<style scoped>

</style>
