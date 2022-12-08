<template>
    <v-dialog
        scrollable
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
                small
                @click="parseUrl">
                <v-icon class="mr-1">
                    mdi-tray-arrow-down
                </v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5">
                {{ movie.vod_name }}
            </v-card-title>

            <v-card-text>
                <v-list
                    flat
                    subheader
                    three-line
                >
                    <v-list-item-subtitle>如果未能下载成功,提示服务器错误，请先启动下载器或者检查端口是否正确,下载软件请加群获取。</v-list-item-subtitle>
                    <v-subheader>
                        <v-checkbox v-model="total" @change="selectAll" ></v-checkbox> 已选择：{{selectedCount}}
                    </v-subheader>

                    <v-list-item-group
                        multiple
                        active-class=""
                    >
                        <v-list-item
                            v-for="(item,index) in downloadList.list"
                            :key="index"
                        >
                            <template>
                                <v-list-item-action>
                                    <v-checkbox v-model="item.selected" :disabled="item.disable" @change="changeSelect(item,index)"></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                    <v-list-item-title>{{ item.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.url}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-list-item-action-text>
                                        <span :style="`color:${item.status === true ? '#CFD8DC':'#37474F'}`">{{ item.status === true ? '已推送下载':'待下载' }}</span>
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
                    @click="dialog = false"
                >
                    关闭
                </v-btn>
                <v-spacer></v-spacer>
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
</template>

<script>
import TransformUrl from "@/util/TransformUrl";
import {checkStatus, pushDownload} from "@/api/download";
import {mapState} from "vuex";
import {saveAs} from 'file-saver';

export default {
    name: "MovieDownload",
    props:{
        movie:{
            type:Object,
            default:()=>{}
        },
    },
    data() {
        return{
            dialog:false,
            m3u8Item:{},
            downloadList:[],
            selectedCount:0, // 总数
            remain:0, // 剩余
            count:0,
        }
    },
    mounted() {

    },
    methods:{
        parseUrl(){
            // 提取地址
            let result = TransformUrl(this.movie);
            // 寻找m3u8连接
            let m3u8Item = [];
            if (result.length > 1){
                result.forEach(item=>{
                    if (item.name.includes("m3u8")){
                        m3u8Item = item;
                    }
                })
            }else{
                m3u8Item = result[0];
            }
            // 重构数据接口
            let data = [];
            m3u8Item.list.forEach((item,index)=>{
                item.id = index;
                item.status = false;
                item.selected = true; // 默认全选
                item.disable = false;
                data.push(item);
                this.selectedCount +=1;
                this.count +=1;
            });
            m3u8Item.list = data;
            this.downloadList = m3u8Item;
            this.remain = 0;

            this.dialog = true;
        },

        // 全选
        selectAll(status){
            this.downloadList.list.forEach((item,index)=>{
                this.downloadList.list[index].selected = status;

            })
            this.selectedCount = status ? this.downloadList.list.length: 0;
        },

        changeSelect(item,index){
            let status = this.downloadList.list[index].selected
            this.downloadList.list[index].selected = status === true;
            if (status){
                this.selectedCount +=1;
            }else{
                this.selectedCount -=1;
            }
        },
        // 推送下载
        async downloadPlayer(){
            let status = await checkStatus();
            if (!status){
                return;
            }

            let success = 0;
            let error = 0;
            // 提交下载
            let list = this.downloadList.list;
            if (list.length > 0){
                for (const item of list) {
                    const index = list.indexOf(item);
                    if (item.selected){
                        let result = await pushDownload(this.movie.vod_name,item);
                        this.remain +=1;
                        if (result){
                            this.downloadList.list[index].status = true;
                            this.downloadList.list[index].disable = true;
                            success +=1;
                        }else{
                            error +=1;
                        }
                    }
                }
            }
            // 执行结束后关闭弹窗
            this.$toast.info(`成功推送${success}条,失败${error}条`);
            this.dialog = false;
        },

        // 转化为文本下载
        downloadText(){
            let list = this.downloadList.list;

            let name = this.movie.vod_name;
            let textArray = [];
            if (list.length > 0){
                list.forEach(item=>{
                    if (item.selected){
                        textArray.push(`${name}-${item.name},${item.url}`);
                    }
                })
                let str = new Blob([textArray.join("\r\n")],{
                    type: "text/plain;charset=utf-8"
                })
                saveAs(str,`${name}.txt`);
            }else{
                this.$toast.error("暂无下载");
            }
        },
    },
    computed:{
        ...mapState(["user","isMobile"]),
        total(){
            return this.count === this.selectedCount;
        },
        progress(){
            if (this.selectedCount === 0){
                return 0;
            }
            if (this.remain === 0){
                return 0;
            }
            return (this.remain/this.selectedCount)*100;
        }
    }
}
</script>

<style scoped>

</style>
