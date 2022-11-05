<template>
    <div>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                    v-for="(item,index) in list"
                    :key="index"
                    v-bind="grid"
                >
                    <v-hover v-slot="{ hover }" open-delay="200">
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
        grid: {
            type: Object,
            default: () => {
                // xl: 2,
                // lg, 2,
                // md: 2,
                // sm: 6,
                // xs: 6,
            }
        },
    },
    data(){
        return{
            movie:{},
            dialog:false,
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
