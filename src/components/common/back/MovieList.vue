<template>
    <div>
        <v-container>
            <v-row >
                <v-col
                    class="col-6"
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
                            max-height="350"
                            max-width="100%"
                            :src="item.vod_pic"
                        >
                            <div class="d-flex justify-end white--text">
                                  <v-card-title>{{ item.type_name }}</v-card-title>
                            </div>
                        </v-img>
                        <v-card-subtitle class="text-truncate">{{ item.vod_name }}</v-card-subtitle>
                        <v-card-text>
                            <div>{{ item.vod_remarks }}</div>
                            <div>{{ item.updated_at }}</div>
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
                    <MovieDetail :item="movie" v-if="dialog"></MovieDetail>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import MovieDetail from "@/components/common/MovieDetail";
export default {
    name: "MovieList",
    components:{
        MovieDetail
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
        showPlayer(item){
            this.movie = item;
            this.dialog = true;
        },
    }
}
</script>

<style scoped>

</style>
