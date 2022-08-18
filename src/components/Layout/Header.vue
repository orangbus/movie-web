<template>
    <div>
        <!--头部-->
        <v-app-bar app color="primary">
            <v-app-bar-nav-icon @click="showMenu">
                <v-icon color="white">mdi-menu</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-title><span style="color: white">{{ website.name }}{{ title }}</span></v-app-bar-title>
            <v-spacer></v-spacer>

            <v-tooltip
                v-for="(item,index) in headerMenu"
                :key="index"
                bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                    >
                        <v-icon color="white">{{ item.icon }}</v-icon>
                    </v-btn>
                </template>
                <span>{{ item.name }}</span>
            </v-tooltip>
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
                        @click="chanNav(item)"
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
            headerMenu: [
                {type: 1, name: "搜索", icon: "mdi-magnify", path: "/search"},
                {type: 2, name: "刷新缓存", icon: "mdi-refresh", path: "#"},
                {type: 3, name: "历史记录", icon: "mdi-history", path: "/history"},
                {type: 4, name: "个人中心", icon: "mdi-account", path: "/user"},
            ],
        }
    },
    methods: {
        // 显示左侧菜单
        showMenu() {
            this.drawer = !this.drawer;
        },
        // 切换大分类
        chanNav(item) {
            this.title = item.name;
            console.log(this.$route.path)
            if (this.$route.path !== "/") {
                this.$router.push({
                    path: "/"
                })
            }
            this.drawer = false;
        },
    },
    computed: {
        ...mapState({
            menus: state => state.menus,
            website:state => state.website
        })
    }
}
</script>

<style scoped>

</style>
