<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-alert
                        border="top"
                        colored-border
                        color="blue"
                        elevation="2"
                    >
                        <div class="text-center text-h5">个人信息</div>
                        <p>手机号：{{ user.phone }}</p>
                        <p>邮箱：{{ user.email }}</p>
                        <p>api_token：{{ user.api_token }}</p>
                        <div class="d-flex justify-space-between align-end">
                            <div>
                                到期时间：{{ user.vip_etime === 0 ? "不限" : Tool.transformTimestamp(user.vip_etime) }}
                            </div>
                            <ShareQr></ShareQr>
                        </div>
                    </v-alert>
                </v-col>

                <v-col cols="6">
                    <v-alert
                        border="top"
                        colored-border
                        color="blue"
                        elevation="2"
                    >
                        <div class="text-center text-h5">我的配置</div>
                        <p>自定义分页条数：{{ setting.limit }}</p>
                        <p>视频解析：{{ setting.jiexi ? setting.jiexi.name : '无'}}</p>
                        <p>m3u8解析：{{ setting.parse ? setting.parse.name : '无'}} (当视频未使用加速播放时，使用该接口进行加速播放)</p>
                    </v-alert>
                </v-col>
                <!--<v-col cols="6">-->
                <!--    <v-row>-->
                <!--        <v-col-->
                <!--            v-for="(item,index) in 10"-->
                <!--            :key="index"-->
                <!--            v-bind="grid">-->
                <!--            <v-card>-->
                <!--                <v-card-title>会员</v-card-title>-->
                <!--                <v-card-subtitle>获取激活码</v-card-subtitle>-->
                <!--            </v-card>-->
                <!--        </v-col>-->
                <!--    </v-row>-->
                <!--</v-col>-->

            </v-row>
        </v-container>
    </div>
</template>

<script>

import {mapState} from "vuex";
import ShareQr from "@/components/common/ShareQr";
import Tool from "@/util/Tool";

export default {
    components: {
        ShareQr
    },
    data() {
        return {
            Tool,
            grid: {
                xl: 3,
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
            },
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.getData();
        },
        getData() {
            for (let i = 0; i < 30; i++) {
                this.list.push(i)
            }
            this.total = 1000;
            console.log(this.list)
        }
    },
    computed: {
        ...mapState(["user","setting"])
    }
}
</script>

<style scoped>

</style>
