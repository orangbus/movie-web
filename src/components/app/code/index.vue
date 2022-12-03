<template>
    <div>
        <AppHeader
            placeholder="请输入你的关键词"
        @search="search"
        @clear="clear"
        ></AppHeader>

        <v-container style="margin-top: 80px">
            <v-row>
                <v-col cols="3" v-for="(item,index) in list" :key="index">
                    <v-card
                        class="mx-auto "
                        max-width="374"
                        @click="showDetail(item)"
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
                            :src="item.pic"
                        ></v-img>

                        <!--标题-->
                        <v-card-title>{{ item.name }}</v-card-title>
                        <!--介绍-->
                        <v-card-text>
                            <div class="text-two-line" v-html="item.content" />
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <!--<v-card-text>-->
                        <!--    <v-chip-group-->
                        <!--        v-model="selection"-->
                        <!--        active-class="deep-purple accent-4 white&#45;&#45;text"-->
                        <!--        column-->
                        <!--    >-->
                        <!--        <v-chip>5:30PM</v-chip>-->

                        <!--        <v-chip>7:30PM</v-chip>-->

                        <!--        <v-chip>8:00PM</v-chip>-->

                        <!--        <v-chip>9:00PM</v-chip>-->
                        <!--    </v-chip-group>-->
                        <!--</v-card-text>-->

                        <v-card-actions>
                            <v-card-text>{{  item.created_at }}</v-card-text>
                            <v-spacer></v-spacer>
                            <div>
                                <v-btn
                                    color="deep-purple lighten-2"
                                    text
                                >
                                    详情
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
                <v-card-title class="text-h5">
                    {{ detail.name }}
                </v-card-title>

                <!--配置内容-->
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" class="text-center">
                                <v-img
                                    height="250"
                                    :src="detail.pic"
                                ></v-img>
                            </v-col >
                             <v-col cols="12" v-html="detail.content"></v-col>
                        </v-row>
                        <v-divider class="mx-4"></v-divider>

                        <v-row v-if="detail.qr">
                            <v-col cols="12">
                                <v-img :src="detail.qr.url"></v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-list-item two-line v-if="detail.qr.name">
                                    <v-list-item-content>
                                        <v-list-item-title>联系人</v-list-item-title>
                                        <v-list-item-subtitle>{{ detail.qr.name }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item two-line v-if="detail.qr.phone">
                                    <v-list-item-content>
                                        <v-list-item-title>手机号</v-list-item-title>
                                        <v-list-item-subtitle>{{ detail.qr.phone }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item two-line v-if="detail.qr.wechat">
                                    <v-list-item-content>
                                        <v-list-item-title>微信号</v-list-item-title>
                                        <v-list-item-subtitle>{{ detail.qr.wechat }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item two-line v-if="detail.qr.wechat">
                                    <v-list-item-content>
                                        <v-list-item-title>QQ号</v-list-item-title>
                                        <v-list-item-subtitle>{{ detail.qr.qq }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item two-line v-if="detail.qr.remark">
                                    <v-list-item-content>
                                        <v-list-item-title>备注</v-list-item-title>
                                        <v-list-item-subtitle>{{ detail.qr.remark }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>

                <v-divider></v-divider>

                <!--<v-card-actions>-->
                <!--    <v-spacer></v-spacer>-->
                <!--    <v-btn-->
                <!--        color="primary"-->
                <!--        text-->
                <!--        @click="join(item)"-->
                <!--    >-->
                <!--        立即加入-->
                <!--    </v-btn>-->
                <!--</v-card-actions>-->
            </v-card>
        </v-dialog>
    <!-- 弹窗二维码-->

    </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import Page from "@/components/common/Page";
import {liveCodeDetail, liveCodeList} from "@/api/liveCode";

export default {
    name: "index",
    components: {
        AppHeader,Page
    },
    data() {
        return {
            loading: true,
            selection: 1,

            keywords: "",
            page:1,
            limit: 24,
            total: 0,
            list: [],

            detailModal: false,
            detail:{},
        }
    },
    created() {
        this.getData();
    },
    methods: {
        search(keywords=""){
            this.keywords = keywords;
            this.getData();
        },
        clear(){
            this.keywords = "";
            this.getData();
        },
        getData(){
            this.loading = false;
            liveCodeList({
                page:this.page,
                limit: 24,
                keywords: this.keywords
            }).then(res=>{
                if (res.code === 200){
                    this.list = res.data;
                    this.total = res.total;
                }
            });
        },
        showDetail(item) {
            liveCodeDetail({uuid:item.uuid}).then(res=>{
                if (res.code === 200) {
                    this.detail = res.data;
                    this.detailModal = true;
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        join(item){
            console.log(item)
        }
    }
}
</script>

<style scoped>

</style>
