<template>
    <div>
        <Header></Header>

        <v-container style="margin-top: 100px">
            <!--接口调用-->
            <v-alert
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
                    cols="3"
                >
                    <!--` https://picsum.photos/500/300?image=${n * 5 + 10}` -->
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

            <Page :total="total" @changePage="changePage"></Page>
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
            wallpaperList({
                page:this.page,
                limit:this.limit,
            }).then(res=>{
                let {data,total} = res;
                this.list = data;
                this.total = total;
            });
        }
    }
}
</script>
