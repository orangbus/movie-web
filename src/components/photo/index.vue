<template>
    <div>
        <AppHeader></AppHeader>
        <v-main>
            <v-row>
                <v-col
                    v-for="(item,index) in list"
                    :key="index"
                    class="d-flex"
                    v-bind="grid"
                    @click="bigPic(item.url)"
                >
                    <v-img
                        :src="item.url"
                        :lazy-src="item.url"
                        aspect-ratio="1"
                        max-height="250px"
                        class="grey lighten-2 border-radius"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>

                <v-col cols="12">
                    <Page :loading="loading" :total="total" @changePage="changePage"></Page>
                </v-col>
            </v-row>
        </v-main>
    </div>
</template>
<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/common/Page";
import {wallpaperList} from "@/api/wallpaper";
export default {
    name: "index",
    components:{
        AppHeader,Page
    },
    data(){
        return{
             grid: {
                 xl: 3,
                 lg: 3,
                 md: 4,
                 sm: 12,
                 xs: 12
             },
            loading:true,
            page: 1,
            limit: 20,
            total: 0,
            list:[],
        }
    },
    created() {
        this.getData();
    },
    methods:{
        changePage(page){
            this.page = page;
            this.list = [];
            this.getData();
        },
        getData(){
            this.loading = true;
            wallpaperList({
                page:this.page,
                limit:this.limit,
            }).then(res=>{
                this.loading = false;
                let {data,total} = res;
                this.list = data;
                this.total = total;
            });
        },
        bigPic(url) {
            let list = [];
            list.push(url);
            this.$viewerApi({
                images: list, // ????????????????????????????????? ["image.png","avatar.png",....]
            })
        },
    }
}
</script>
