<template>
    <v-app>
        <!--头部-->
        <v-app-bar app primary>
            <v-app-bar-title>首页</v-app-bar-title>
        </v-app-bar>

        <!--侧边导航-->
        <v-navigation-drawer app>
            <v-list dense nav>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>首页</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <Header></Header>
        <!--主体-->
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Header from "@/components/Layout/Header";
export default {
    components:{
        Header
    }
}
</script>

