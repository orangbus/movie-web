<template>
    <div>
        <v-dialog
            scrollable
            persistent
            v-model="dialog"
            width="800"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-if="user.vip && !isMobile"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    icon
                    text
                    @click="parseUrl">
                    <v-icon class="mr-1">
                        mdi-tray-arrow-down
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    下载列表
                </v-card-title>

                <v-card-text>
                    <div class="d-flex justify-lg-space-between">
                        <v-switch
                            v-model="isShowUrlList"
                            @change="showUrlList"
                            label="显示地址"
                        ></v-switch>
                        <v-switch
                            v-show="isShowUrlList"
                            v-model="isHideName"
                            @change="hideName"
                            label="隐藏标题"
                        ></v-switch>
                    </div>
                    <!--<div> 请等待下载全部推送完成后在关闭此窗口</div>-->
                    <v-list
                        v-show="!isShowUrlList"
                        subheader
                        two-line
                    >
                        <v-list-item
                            v-for="(item,index) in list"
                            :key="index"
                        >
                            <v-list-item-avatar>
                                <v-img :src="item.pic"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ `总数${item.list.length}, 已下载${item.remain}` }}
                                </v-list-item-subtitle>
                                <v-progress-linear v-if="item.downloading && item.remain > 1"
                                                   :value="`progress(item) %`"></v-progress-linear>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="showDetail(item)">
                                    <v-icon :color="item.list.length === item.remain ? 'primary':'grey' ">
                                        {{ item.list.length === item.remain ? 'mdi-check-underline' : 'mdi-format-list-bulleted' }}
                                    </v-icon>
                                </v-btn>

                                <v-btn icon @click="removeRemove(item.title,index)">
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                <!--    地址列表-->
                    <div v-show="isShowUrlList">
                        <p
                        v-for="(item,index) in urlList"
                        :key="index"
                        ><span v-show="!isHideName">{{ item.name }},</span>{{ item.url}}</p>
                    </div>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-progress-linear v-if="progress > 1" :value="progress"></v-progress-linear>

                    <v-btn
                        color=""
                        text
                        @click="dialog = false"
                    >
                        关闭
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="downloadText(2)"
                    >
                        地址+标题
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="downloadText"
                    >
                        立即下载
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--详情-->
        <v-dialog
            scrollable
            v-model="detailDialog"
            width="800"
        >
            <v-card>
                <v-card-title class="text-h5">
                    {{ detailList.title }} - 下载列表
                </v-card-title>

                <v-card-text>
                    <v-list
                        flat
                        subheader
                        three-line
                    >
                        <v-list-item-subtitle>
                            如果未能下载成功,提示服务器错误，请先启动下载器或者检查端口是否正确,下载软件请加群获取。
                        </v-list-item-subtitle>
                        <v-subheader>
                            <v-checkbox v-model="total" @change="selectAll"></v-checkbox>
                            已选择：{{ selectedCount }}
                        </v-subheader>

                        <v-list-item-group
                            multiple
                            active-class=""
                        >
                            <v-list-item
                                v-for="(item,index) in detailList.list"
                                :key="index"
                            >
                                <template>
                                    <v-list-item-action>
                                        <v-checkbox v-model="item.selected" :disabled="item.disable"
                                                    @change="changeSelect(item,index)"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ item.url }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-list-item-action-text>
                                            <span :style="`color:${item.status === true ? '#CFD8DC':'#37474F'}`">{{
                                                    item.status === true ? '已推送下载' : '待下载'
                                                }}</span>
                                        </v-list-item-action-text>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>

                        </v-list-item-group>
                    </v-list>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-progress-linear v-if="progress > 1" :value="progress"></v-progress-linear>

                    <v-btn
                        color=""
                        text
                        @click="detailDialog = false"
                    >
                        关闭
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="downloadPlayer"
                    >
                        立即下载
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
import TransformUrl from "@/util/TransformUrl";
import {checkStatus, pushDownload} from "@/api/download";
import {mapState} from "vuex";
import {saveAs} from 'file-saver';
import Tool from "@/util/Tool";

export default {
    name: "MovieDownload",
    props: {
        movie: {
            type: Object,
            default: () => {
            }
        },
        movieList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            dialog: false,
            list: [], // 待下载

            detailDialog: false, // 详情
            detailList: [],

            m3u8Item: {},
            selectedCount: 0, // 总数
            remain: 0, // 剩余
            count: 0,

            isShowUrlList: false, // 显示列表
            isHideName: false,
            urlList:[],
        }
    },
    watch:{
        movieList(list){
            this.list = list;
        }
    },
    methods: {
        // 显示链接列表
        showUrlList(status){
            let list = [];
            this.list.forEach(row=>{
                let temp = {};
                row.list.forEach(data=>{
                    temp.name = `${row.title}-${data.name}`;
                    temp.url = data.url;
                })
                list.push(temp)
            })
            this.urlList = list;
            this.isShowUrlList = status;
        },
        // 隐藏地址
        hideName(status){
            this.isHideName = status;
        },
        // 解析列表
        parseUrl() {
            this.list = [];
            this.downloadList = [];
            let list = [];
            this.movieList.forEach(item => {
                // 提取地址
                let result = TransformUrl(item);
                // 寻找m3u8连接
                let m3u8Item = [];
                if (result.length > 1) {
                    result.forEach(item => {
                        if (item.name.includes("m3u8")) {
                            m3u8Item = item;
                        }
                    })
                } else {
                    m3u8Item = result[0];
                }

                // 重构数据接口
                let data = [];
                m3u8Item.list.forEach((item, index) => {
                    item.id = index;
                    item.status = false;
                    item.selected = true; // 默认全选
                    item.disable = false;
                    data.push(item);
                    this.selectedCount += 1;
                    this.count += 1;
                });
                m3u8Item.list = data;
                m3u8Item.remain = 0;
                m3u8Item.title = item.vod_name;
                m3u8Item.pic = item.vod_pic;
                m3u8Item.downloading = false;
                list.push(m3u8Item);
            });
            this.list = list;
            this.dialog = true;
        },

        // 开始下载
        async startDownload() {
            let total = this.list.length;
            for (let index = 0; index < total; index++) {
                let item = this.list[index];
                // 标记当前下载
                this.list[index].downloading = true;
                // 推送下载
                let result = await this.push(item, index);
                if (result) {
                    // 完成
                    this.list[index].downloading = false;
                    this.list[index].remain = item.list.length;

                }
            }
            // 下载完成
            this.$toast.success("已全部推送下载");
            this.dialog = false;
        },


        async push(item, index) {
            for (let i = 0; i < item.list.length; i++) {
                await pushDownload(item.title, item.list[i]);
                this.list[index].remain += 1;
            }
            return true;
        },


        progress(item = {}) {
            let total = item.selectedCount;
            let remain = item.remain;
            if (total === 0 || remain === 0) {
                return 0;
            }
            return (remain / total) * 100;
        },

        // 转化为文本下载
        downloadText(type=1){
            let list = this.list;

            let textArray = [];
             textArray.push(`accept: */*`);
             textArray.push(`accept-encoding: gzip, deflate, br`);
             textArray.push(`accept-language: zh-CN,zh;q=0.9,en;q=0.8`);
             textArray.push(`cache-control: no-cache`);
             textArray.push(`dnt: 1`);
             textArray.push(`pragma: no-cache`);
             textArray.push(`sec-fetch-dest: empty`);
             textArray.push(`sec-fetch-mode: cors`);
             textArray.push(`sec-fetch-site: same-origin`);
             textArray.push(`user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36`);
             textArray.push(`Cookie: _ga=GA1.2.731507251.1543905232; _octo=GH1.1.1349689180.1543905232;`);

            if (list.length > 0){
                for (let index = 0; index < list.length; index++) {
                    let item = list[index];
                    let name = "";

                    item.list.forEach(data=>{
                        if (data.selected){
                            let url = data.url.replace("'",""); // 视频地址
                            switch (type) {
                                case 2:
                                   name = Tool.removeSpace(`${item.title}-${data.name}.mp4`)
                                    textArray.push(`${url} ${name}`);
                                    break;
                                default:
                                    name = Tool.removeSpace(`${item.title}-${data.name}`)
                                    textArray.push(`${name},${url}`);
                            }
                        }
                    })
                }
                let str = new Blob([textArray.join("\r\n")],{
                    type: "text/plain;charset=utf-8"
                })
                saveAs(str,`下载列表.txt`);
            }else{
                this.$toast.error("暂无下载");
            }
        },

        showDetail(item) {
            this.detailList = item;
            this.detailDialog = true;
        },

        // 全选
        selectAll(status) {
            this.downloadList.list.forEach((item, index) => {
                this.downloadList.list[index].selected = status;

            })
            this.selectedCount = status ? this.downloadList.list.length : 0;
        },
        changeSelect(item, index) {
            let status = this.downloadList.list[index].selected
            this.downloadList.list[index].selected = status === true;
            if (status) {
                this.selectedCount += 1;
            } else {
                this.selectedCount -= 1;
            }
        },

        // 移除某个影片下载
        removeRemove(name, index) {
            this.list.splice(index, 1);
            this.$toast.success(`${name} 移除成功！`);
        },

        // 单个下载 推送下载
        async downloadPlayer() {
            let status = await checkStatus();
            if (!status) {
                return;
            }

            let success = 0;
            let error = 0;
            // 提交下载
            let list = this.downloadList.list;
            if (list.length > 0) {
                for (const item of list) {
                    const index = list.indexOf(item);
                    if (item.selected) {
                        let result = await pushDownload(this.this.downloadList.title, item);
                        this.remain += 1;
                        if (result) {
                            this.downloadList.list[index].status = true;
                            this.downloadList.list[index].disable = true;
                            success += 1;
                        } else {
                            error += 1;
                        }
                    }
                }
            }
            // 执行结束后关闭弹窗
            this.$toast.info(`成功推送${success}条,失败${error}条`);
            this.dialog = false;
        }
    },
    computed: {
        ...mapState(["user","isMobile"]),
        total() {
            return this.count === this.selectedCount;
        },
    }
}
</script>

<style scoped>

</style>
