<template>
    <div>
        <v-container>
            <v-row>
                <v-col
                    class="col-12"
                    v-bind="grid"
                    v-for="(item,index) in list"
                    :key="index"
                >
                    <v-hover v-if="true" v-slot="{ hover }" open-delay="200">
                        <v-card
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }"
                        >
                            <span @click="toDetailPage(item)">
                        <v-img
                            :lazy-src="item.vod_pic"
                            max-height="320"
                            min-height="320"
                            max-width="100%"
                            class="text-pointer"
                            style="border-radius: 5px 5px 0px 0px"
                            :src="item.vod_pic"
                            @error="loadImg(item.vod_pic)"
                        >
                            <div class="d-flex justify-end white--text text-pointer">
                                  <v-card-title>{{ item.type_name }}</v-card-title>
                            </div>
                        </v-img>
                                </span>
                            <v-card-subtitle class="text-truncate"><span @click="toDetailPage(item)">{{
                                    item.vod_name
                                }}</span></v-card-subtitle>
                            <v-card-text>
                                 <span @click="toDetailPage(item)">
                                <div>{{ item.vod_remarks }}</div>
                                <div>{{ item.updated_at }}</div>
                                 </span>
                                <div class="d-flex justify-lg-space-between mt-2" v-if="authorization">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <div @click="collect(item)"
                                                 v-bind="attrs"
                                                 v-on="on"
                                                 class="text-pointer">
                                                <v-icon>mdi-heart-outline</v-icon>
                                            </div>
                                        </template>
                                        <span>加入收藏</span>
                                    </v-tooltip>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <div @click="addWait(item)"
                                                 v-bind="attrs"
                                                 v-on="on"
                                                 class="text-pointer">
                                                <v-icon>mdi-playlist-plus</v-icon>
                                            </div>
                                        </template>
                                        <span>稍后观看</span>
                                    </v-tooltip>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>

        <v-row>
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <!--标题-->
                    <v-toolbar
                        dark
                        color="primary"
                    >
                        <v-toolbar-title>{{ movie.vod_name }}</v-toolbar-title>
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
                    <MoviePlayer :movie="movie" v-if="dialog"></MoviePlayer>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import {mapState} from "vuex";
import MoviePlayer from "@/components/common/MoviePlayer";
import {movieCollectStore, movieWaitStore} from "@/api/movie";

export default {
    name: "MovieList",
    components: {
        MoviePlayer
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        toDetail: {
            type: Boolean,
            default: () => false
        },
    },
    data() {
        return {
            movie: {},
            dialog: false,

            grid: {
                xl: 2, // 4K 和超宽屏幕
                lg: 2, // 桌面端
                md: 4, // 大型号平板到手提电脑
                sm: 4, // 小型号到中型号的平板
                xs: 6 // 小型号到大型号的手机
            }
        }
    },
    methods: {
        toDetailPage(item) {
            if (this.toDetail) {
                this.$router.push({
                    path: "/detail/" + item.id
                })
            } else {
                this.showPlayer(item)
            }
        },
        // 弹窗播放
        showPlayer(item) {
            this.movie = item;
            this.dialog = true;
        },
        loadImg() {
            let img = event.srcElement;
            img.src = "@/assets/images/poster.jpg";
            img.onerror = null; //防止闪图
        },
        // 收藏
        collect(item) {
            movieCollectStore({
                id: item.id,
                api_id: this.movieApi.id
            }).then(res => {
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        // 加入稍后观看
        addWait(item) {
            movieWaitStore({
                vid: item.id,
            }).then(res => {
                if (res.code === 200) {
                    this.$toast.success(res.msg)
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
    },
    computed: {
        ...mapState(["user", "authorization", "movieApi"])
    }
}
</script>

<style scoped>

</style>
