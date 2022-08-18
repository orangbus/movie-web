<template>
    <div>
        <!--头部-->
        <v-app-bar app color="primary" elevate-on-scroll>
            <v-app-bar-nav-icon @click="showMenu">
                <v-icon color="white">mdi-menu</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <span class="text-pointer" style="color: white" @click="toHome">{{ website.name }}{{ title }}</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>

            <!--快捷导航-->
            <div v-for="(item,index) in movieCateList"
            :key="index">
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
                            聚合影视
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
                        v-for="(item, i) in menus"
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
        // 切换顶部导航
        chanMenu(item){
            this.title = item.name;
            if (this.$route.path !== "/") {
                this.$router.push({
                    path: "/"
                })
            }
            this.drawer = false;
        },
        // 选择电影小分类
        chanMovieCate(item){
            this.$store.commit("setMovieCate",item)
        },
        chanNav(item) {
           switch (item.type){
               case 2:
                   this.$store.dispatch("refreshCache")
                   break;
               default:
                   this.$router.push({
                       path: "/"
                   })
                   break;
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
