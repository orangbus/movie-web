<template>
    <div>
        <v-container>
            <v-row dense>
                <v-col v-bind="grid" cols="12">
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
                                到期时间：{{ user.vip_etime === 0 ? "不限" : Tool.transformTimestamp(user.vip_etime).substring(0,10) }}
                            </div>
                            <div class="d-flex ">
                                <ActiveCode></ActiveCode>
                                <ShareQr></ShareQr>
                            </div>
                        </div>
                        <div>
                        </div>
                    </v-alert>
                </v-col>

                <v-col v-bind="grid" cols="12">
                    <v-alert
                        border="top"
                        colored-border
                        color="blue"
                        elevation="2"
                    >
                        <div class="text-center text-h5">我的配置</div>
                        <p>自定义分页条数：{{ setting.limit }}</p>
                        <p>视频解析：{{ setting.jiexi ? setting.jiexi.name : '无' }}</p>
                        <p>m3u8解析：{{ setting.parse ? setting.parse.name : '无' }}
                            (当视频未使用加速播放时，使用该接口进行加速播放)</p>

                        <div class="text-center text-h5">视频更新规则</div>
                        <p>【默认接口】每天中午 12：00 更新</p>
                        <p>【其他数据源】 每天晚上 8:00 更新</p>
                        <p>减少服务器压力，每天要更新50+个接口的数据</p>
                    </v-alert>
                </v-col>
                <v-col v-bind="grid" cols="12">
                    <v-alert
                        border="top"
                        colored-border
                        color="blue"
                        elevation="2"
                    >
                        <div class="text-center text-h5">使用技巧</div>
                        <p> 1、手机端播放视频推荐使用 <a href="https://www.myquark.cn/" target="_blank">夸克浏览器</a>
                        </p>
                        <p>2、如果夸克浏览器播放还是有点卡顿，或者画质不够清晰，推荐加入我们的QQ群，<span class="text-red">50元即可获得夸克浏览器【一年超级会员和6T存储空间】，丝滑流畅，看片下载两不误</span>
                        </p>
                        <p>3、加入本站QQ群，即可 <span class="text-red">免费获得会员激活码</span>，解锁更多视频，配合聚合搜索，从此看片不再愁。
                        </p>
                        <p>4、本站基于vue开发，如果页面有所卡顿，可刷新一下浏览器。</p>
                        <p>5、如果你有好的创意好意见，欢迎到群反馈</p>
                        <p>6、建议看到喜欢的视频加入收藏，后期可生成m3u8播放链接</p>
                        <p> 推荐一个小巧的下载器
                            <a href="https://github.com/oopsguy/m3u8" target="_blank">https://github.com/oopsguy/m3u8</a>
                            搭配本站资源列表，资源卡顿也能流畅播放
                        </p>
                    </v-alert>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import {mapState} from "vuex";
import ShareQr from "@/components/common/ShareQr";
import Tool from "@/util/Tool";
import ActiveCode from "./ActiveCode"

export default {
    components: {
        ShareQr,ActiveCode
    },
    data() {
        return {
            Tool,
            grid: {
                xl: 6,
                lg: 6,
                md: 6,
                sm: 12,
                xs: 12,
                offsetXl:3,
                offsetLg:3,
                offsetMd:3,
            },
            navGrid:{
                xl: 3,
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
            },
            appList: [
                {type: 1, name: "Vip视频解析", "desc": "解析各大平台vip视频",url:"/player"},
                {type: 2, name: "M3u8播放器", "desc": "解析播放m3u8视频链接",url:"/m3u8"},
                {type: 3, name: "推广二维码", "desc": "动态切换二维码",url:"/code"},
            ],

            drawer: null,
            items: [
                { title: 'Home', icon: 'mdi-view-dashboard' },
                { title: 'About', icon: 'mdi-forum' },
            ],
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.getData();
        },

        toPage(item){
            this.$router.push({
                path: item.url
            })
        }
    },
    computed: {
        ...mapState(["user", "setting"])
    }
}
</script>

<style scoped>
.text-red {
    color: #F44336;
}
</style>
