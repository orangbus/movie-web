<template>
    <div>
        <AppHeader></AppHeader>
        <v-container style="margin-top: 80px">
            <v-row>
                <v-col cols="3" v-for="(item,index) in list" :key="index">
                    <v-card
                        class="mx-auto "
                        max-width="374"
                    >
                        <template slot="progress">
                            <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></v-progress-linear>
                        </template>

                        <v-img
                            height="250"
                            :src="item.url"
                        ></v-img>

                        <!--标题-->
                        <v-card-title>{{ item.name }}</v-card-title>
                        <!--介绍-->
                        <v-card-text>
                            <div>{{ item.desc}}
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-text>
                            <v-chip-group
                                v-model="selection"
                                active-class="deep-purple accent-4 white--text"
                                column
                            >
                                <v-chip>5:30PM</v-chip>

                                <v-chip>7:30PM</v-chip>

                                <v-chip>8:00PM</v-chip>

                                <v-chip>9:00PM</v-chip>
                            </v-chip-group>
                        </v-card-text>

                        <v-card-actions>
                            <v-card-text>2022-11-19 10:12:02</v-card-text>
                            <v-spacer></v-spacer>
                            <div>
                                <v-btn
                                    color="deep-purple lighten-2"
                                    text
                                    @click="showDetail(item)"
                                >
                                    立即加入
                                </v-btn>
                            </div>

                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <Page :loading="loading" :total="total" :limit="limit"></Page>
        </v-container>

    <!--    详情-->
        <v-dialog
            v-model="detailModal"
            transition="dialog-bottom-transition"
            scrollable
            width="600"
        >
            <v-card>
                <v-card-title class="text-h5 primary v-alert--text">
                    {{ detail.name }}
                </v-card-title>

                <!--配置内容-->
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" class="text-center">
                                <v-img
                                    height="250"
                                    :src="detail.url"
                                ></v-img>
                            </v-col >
                             <v-col cols=12 v-html="detail.content"></v-col>
                        </v-row>
                    </v-container>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="join(item)"
                    >
                        立即加入
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <!-- 弹窗二维码-->

    </div>
</template>

<script>
import AppHeader from "@/components/Layout/AppHeader";
import Page from "@/components/common/Page";

export default {
    name: "index",
    components: {
        AppHeader,Page
    },
    data() {
        return {
            loading: true,
            selection: 1,

            page:1,
            limit: 24,
            total: 100,
            list: [
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
                {name:"聚合影视交流群",url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",desc:"聚合影视交流群,欢迎大家加入",content: "聚合影视交流群,欢迎大家加入,聚合影视交流群,欢迎大家加入"},
            ],

            detailModal: false,
            detail:{},
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            this.loading = false;
        },
        showDetail(item) {
            this.detail = item;
           this.detailModal = true;
        },
        join(item){
            console.log(item)
        }
    }
}
</script>

<style scoped>

</style>
