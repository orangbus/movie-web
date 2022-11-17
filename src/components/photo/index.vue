<template>
    <div>
        <Header></Header>

        <v-container style="margin-top: 60px">
            <!--接口调用-->
            <v-alert
                v-if="false"
                class="mt-2"
                border="top"
                colored-border
                color="blue"
                elevation="2"
                close-text="Close Alert"
                dismissible
            >
                <p>接口调用说明</p>
                <p>随机图片：</p>
                <p>接口访问：</p>
            </v-alert>

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
            </v-row>

            <Page :loading="loading" :total="total" @changePage="changePage"></Page>
        </v-container>
    </div>
</template>
<script>
import Header from "@/components/Layout/Header";
import Page from "@/components/common/Page";
import {wallpaperList} from "@/api/wallpaper";
export default {
    name: "index",
    components:{
        Header,Page
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
                images: list, // 必须是已数组的形式传递 ["image.png","avatar.png",....]
            })
        },
    }
}
</script>
