<template>
    <div>
        <!--头部-->
        <v-app-bar app color="primary" elevate-on-scroll>
            <v-app-bar-nav-icon @click="showMenu">
                <v-icon color="white">mdi-menu</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <span class="text-pointer" style="color: white" @click="toHome">{{ website.name }}</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>

            <!--快捷导航-->
            <div v-for="(item,index) in movieCateList"
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
            >
                <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                >
                    <v-list-item
                        v-for="(item, i) in movieCateList"
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
            drawer: false,
        }
    },
    created() {
        // 获取电影分类
      this.$store.dispatch("getMovieCate");
    },
    methods: {
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
        }
    },
    computed: {
        ...mapState({
            movieCateList:state => state.movieCateList,
            menus: state => state.menus,
            website:state => state.website,
        })
    }
}
</script>

<style scoped>

</style>
