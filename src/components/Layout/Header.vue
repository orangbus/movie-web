<template>
    <div>
        <!--头部-->
        <v-app-bar app color="primary"  elevate-on-scroll>
            <v-app-bar-nav-icon @click="showMenu">
                <v-icon color="white">mdi-menu</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <span class="text-pointer" style="color: white" @click="toHome">{{ website.name }}</span>
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <!--快捷导航-->
            <v-menu
                open-on-hover
                offset-y
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    text
                    color="white"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon @click="toUser">mdi-account-circle</v-icon>
                    <v-dialog
                        v-model="dialog"
                        scrollable
                        max-width="300px"
                    >
                        <v-card>
                            <v-card-title>Select Country</v-card-title>
                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-btn>
            </template>
            </v-menu>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <div  v-if="false">
                <div
                    v-for="(item,index) in movieCateList"
                    :key="index" class="hidden-xs-only">
                    <v-menu
                        open-on-hover
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                text
                                color="white"
                                dark
                                v-bind="attrs"
                                v-on="on"
                            >
                                {{  item.name  }}
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(cate, index) in item.list"
                                :key="index"
                                @click="chanMovieCate(cate)"
                            >
                                <v-list-item-title>{{ cate.type_name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>

        </v-app-bar>

        <!--侧边导航-->
        <v-navigation-drawer app
                             v-model="drawer"
                             bottom
                             temporary
        >
            <v-list shaped>
                <v-list-item
                    dense
                    rounded>
                    <v-list-item-content>
                        <v-list-item-title class="text-center font-weight-bold">
                            {{  website.name }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                nav
                dense
                rounded
            >
                <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                >
                    <!--公共导航-->
                    <v-list-item @click="toPage('article')">
                        <v-list-item-icon>
                            <v-icon>mdi-list-box-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >文章</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/photo">
                        <v-list-item-icon>
                            <v-icon>mdi-image-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >图片</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/todayhistory">
                        <v-list-item-icon>
                            <v-icon>mdi-chart-timeline-variant-shimmer</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title >历史上的今天</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--首页-->
                    <div>
                        <v-divider class="my-1" />
                        <v-list-item
                            v-for="(item, i) in movieApiList"
                            :key="i"
                            @click="chanMenu(item)"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>

                    <!--个人中心-->


                    <!--文章-->


                    <!--聚合搜索-->


                    <!--自定义导航-->
                    <v-divider class="my-1" />
                    <v-list-item
                        v-for="(item, i) in movieApiList"
                        :key="i"
                        @click="chanMenu(item)"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Header",
    data() {
        return {
            selectedItem: 0,
            title: "首页",
            drawer: true,

            dialog: false,

            select:"",
            loading:true,
            items:["斗罗大陆","斗破苍穹"]
        }
    },
    created() {
        // 获取电影分类
      this.$store.dispatch("getMovieCate");
    },
    methods: {
        // 搜索
        search(){
          console.log(this.select)
        },
        // 显示左侧菜单
        showMenu() {
            this.drawer = !this.drawer;
        },

        /**
         * 切换顶部导航
         * 1、跳转首页
         * 3、记录分类id
         * @param item
         */
        chanMenu(item){
            this.$store.commit("setMovieType",item)
            this.title = item.name;
            if (this.$route.path !== "/") {
                this.$router.push({
                    path: "/",
                    query:{
                        type:item.type
                    }
                })
            }
            this.drawer = false;
        },
        // 选择电影小分类
        chanMovieCate(item){
            this.$store.commit("setMovieCate",item)
            if (this.$route.path != "/"){
                this.$router.push({
                    path:"/",
                    query: {
                        type_id:item.type_id
                    }
                });
            }
        },
        // 返回首页
        toHome(){
            this.$router.push({
                path: "/"
            })
        },
        // 个人中心
        toUser(){
            this.$router.push({
                path: "/user"
            })
        },

        toPage(path){
            this.$router.push({
                path
            })
        },
    },
    computed: {
        // ...mapState({
        //     movieCateList:state => state.movieCateList,
        //     menus: state => state.menus,
        //     website:state => state.website,
        // })
        ...mapState(["movieCateList","menus","website","movieApiList"])
    }
}
</script>

<style scoped>

</style>
