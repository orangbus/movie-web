<template>
    <div>
        <v-container>
            <v-row >
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
                        <!--         :lazy-src="item.vod_pic" -->
                        <v-img
                            max-height="320"
                            min-height="320"
                            max-width="100%"
                            style="border-radius: 5px 5px 0px 0px"
                            :src="item.vod_pic"
                            @error="loadImg(item.vod_pic)"
                        >
                            <div class="d-flex justify-end white--text">
                                  <v-card-title>{{ item.type_name }}</v-card-title>
                            </div>
                        </v-img>
                        <v-card-subtitle class="text-truncate">{{ item.vod_name }}</v-card-subtitle>
                        <v-card-text>
                            <div>{{ item.vod_remarks }}</div>
                            <div>{{ item.updated_at }}</div>
                            <div class="d-flex justify-lg-space-between" v-if="authorization">
                                 <div @click="collect(item)"><v-icon>mdi-heart-outline</v-icon></div>
                                <div @click="addWait(item)"><v-icon>mdi-playlist-plus</v-icon></div>
                            </div>
                        </v-card-text>
                    </span>
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
export default {
    name: "MovieList",
    components:{
        MoviePlayer
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        toDetail:{
          type:Boolean,
          default:()=>false
        },
        // grid: {
        //     type: Object,
        //     default: ()=> {
        //         return {
        //             xl: 2, // 4K 和超宽屏幕
        //             lg: 2, // 桌面端
        //             md: 2, // 大型号平板到手提电脑
        //             sm: 2, // 小型号到中型号的平板
        //             xs: 2 // 小型号到大型号的手机
        //         }
        //     }
        // },
    },
    data(){
        return{
            movie:{},
            dialog:false,

            grid:{
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
            if (this.toDetail){
                this.$router.push({
                    path: "/detail/" + item.id
                })
            }else{
                this.showPlayer(item)
            }
        },
        // 弹窗播放
        showPlayer(item){
            this.movie = item;
            this.dialog = true;
        },
        loadImg() {
            let img = event.srcElement;
            img.src = "@/assets/images/poster.jpg";
            img.onerror = null; //防止闪图
        },
        // 收藏
        collect(item){
            console.log(item)
        },
        // 加入稍后观看
        addWait(item){
            console.log(item)
        },
    },
    computed:{
        ...mapState(["user","authorization"])
    }
}
</script>

<style scoped>

</style>
