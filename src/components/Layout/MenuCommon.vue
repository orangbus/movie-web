<template>
    <div>
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

        <v-list-item link to="/m3u8">
            <v-list-item-icon>
                <v-icon>mdi-chart-timeline-variant-shimmer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title >M3u8解析</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/todayhistory">
            <v-list-item-icon>
                <v-icon>mdi-chart-timeline-variant-shimmer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title >视频解析</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <!--分割线-->
        <v-divider class="my-1" />
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "MenuCommon",
    data() {
        return{}
    },
    computed:{
        ...mapState(["user"])
    }
}
</script>

<style scoped>

</style>
