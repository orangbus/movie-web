<template>
    <div >
        <v-row :dense="isMobile">

            <v-col
                cols="6"
                v-bind="grid"
                v-for="(item,index) in list"
                :key="index"
            >
                <v-hover  v-slot="{ hover }" open-delay="200">
                    <v-card
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        @click="openPlayer(item)"
                    >
                        <v-img
                            :lazy-src="item.vod_pic"
                            :max-height="movie_img_height"
                            :min-height="movie_img_height"
                            max-width="100%"
                            :src="item.vod_pic"
                            class="text-pointer"
                        >
                            <div class="d-flex justify-end white--text text-pointer">
                                  <v-card-title>{{ item.category }}</v-card-title>
                            </div>
                        </v-img>
                        <v-card-subtitle class="text-truncate text-pointer">{{ item.vod_title }}</v-card-subtitle>
                        <v-card-text>
                            <div>{{ item.vod_area }}</div>
                            <div>{{ item.updated_at }}</div>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>

        </v-row>

        <v-row>
            <!-- hide-overlay -->
            <v-dialog
                v-model="dialog"
                width="900"
                :fullscreen="isMobile"
                transition="dialog-bottom-transition"
            >
                <v-card v-if="dialog">
                    <!--标题-->
                    <v-toolbar
                        dark
                        color="primary"
                    >
                        <v-toolbar-title>{{ video.vod_title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                icon
                                dark
                                @click="dialog = false"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <!--内容-->
                    <v-container>
                        <v-row>
                            <v-col>
                                <iframe  width="100%"
                                         style="border-radius: 6px; max-height:750px;min-height: 700px;"
                                         :src="url" frameborder="0"
                                         allowfullscreen></iframe>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "VideoList",
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            grid: {
                xl: 2,
                lg: 2,
                md: 2,
                sm: 12,
                xs: 12
            },
            dialog:false,
            movie: {},

            title: "",
            url: '',
            parse_url: "https://player.iuk.ink/m3u8.php?p2p=true&url=", // 解析地址
        }
    },
    methods: {
        // 打开播放器
        openPlayer(item){
            this.video = item;
            this.title = item.vod_title;
            let list = item.vpath.split("$");
            if (list.length == 1) {
                this.url = this.parse_url === null ? list[0] : this.parse_url + list[0];
            } else {
                this.url = this.parse_url === null ? list[1] : this.parse_url + list[1];
            }
            this.dialog = true;
        }
    },
    computed:{
        ...mapState(["isMobile"]),
        movie_img_height(){
            let height = 320;
            if (this.isMobile){
                height = 230
            }
            return  height;
        }
    }

}
</script>

<style scoped>

</style>
