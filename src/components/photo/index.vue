<template>
    <div class="xyScrollBar" @scroll="loadMore" id="backTop">
        <AppHeader></AppHeader>
        <v-main>
            <v-container>
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
                        <Page :loading="loading" :page="page" :total="total" @changePage="changePage"></Page>
                    </v-col>
                </v-row>

                <!--到顶部-->
                <v-btn
                    v-if="showTop"
                    class="mx-3"
                    fab
                    fixed
                    right
                    dark
                    large
                    :bottom="true"
                    color="primary"
                    @click="toTop"
                >
                    <v-icon dark>
                        mdi-format-vertical-align-top
                    </v-icon>
                </v-btn>
            </v-container>
        </v-main>
    </div>
</template>
<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/common/Page";
import {wallpaperList} from "@/api/wallpaper";
import {mapState} from "vuex";

export default {
    name: "index",
    components: {
        AppHeader, Page
    },
    data() {
        return {
            grid: {
                xl: 3,
                lg: 3,
                md: 4,
                sm: 12,
                xs: 12
            },
            loading: true,
            page: 1,
            limit: 20,
            total: 0,
            list: [],
            // 底部加载
            isEnd: false,
            showTop: false, // 显示到顶部
        }
    },
    created() {
        this.getData();
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.list = [];
            this.getData();
        },
        getData() {
            this.loading = true;
            wallpaperList({
                page: this.page,
                limit: this.limit,
            }).then(res => {
                this.loading = false;
                let {data, total} = res;
                this.total = total;
                this.setting.showPage ? this.list = data : this.list.push(...data);

                // 到底了提示
                if (data.length === 0) {
                    this.isEnd = true;
                    this.$toast.success("到底啦！");
                } else {
                    this.isEnd = false;
                }
            });
        },
        loadMore(event) {
            if (this.setting.showPage) {
                return false;
            }
            //vue中获取滚动条到底部的距离
            let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
            // 显示到顶部
            this.showTop = event.target.scrollTop > 1000;
            //以下三个条件不执行数据加载：1.数据正在加载的状态，2.已经到底了，3.滚动条距离底部的距离小于100px
            if (!this.loading && !this.isEnd && scrollBottom < 100) {
                this.loading = true;
                this.page += 1;
                this.getData();
            }
        },
        toTop(){
            console.log(document.getElementById("backTop").scrollTop)
            document.body.scrollTop = 0;
            document.getElementById("backTop").scrollTop = -100;
        },
        bigPic(url) {
            let list = [];
            list.push(url);
            this.$viewerApi({
                images: list, // 必须是已数组的形式传递 ["image.png","avatar.png",....]
            })
        },

    },
    computed: {
        ...mapState(["setting", "isMobile"]),
    }
}
</script>
