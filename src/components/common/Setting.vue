<template>
    <div>
        <v-dialog
            v-model="settingDialog"
            transition="dialog-bottom-transition"
            scrollable
            width="800"
        >
            <!--设置按钮-->
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon @click="openSetting">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 primary">
                    配置
                </v-card-title>

                <!--配置内容-->
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                v-if="false"
                                cols="6"
                            >
                                <v-radio-group
                                    v-model="setting.showPage"
                                    label="开启分页"
                                    row
                                >
                                    <v-radio
                                        label="滚动加载"
                                        :value="false"
                                    ></v-radio>
                                    <v-radio
                                        label="分页加载"
                                        :value="true"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col
                                cols="6"
                                v-if="false"
                            >
                                <v-radio-group

                                    v-model="setting.page"
                                    label="开启本地分页"
                                    row
                                >
                                    <v-radio
                                        label="开启"
                                        :value="true"
                                    ></v-radio>
                                    <v-radio
                                        label="关闭"
                                        :value="false"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col
                                cols="6"
                            >
                                <v-radio-group
                                    v-model="setting.loadingStyle"
                                    label="加载跟多样式"
                                    row
                                >
                                    <v-radio
                                        v-for="(item,index) in EnumData.loadingStyleList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.type"
                                    ></v-radio>

                                </v-radio-group>
                            </v-col>
                            <v-col
                                cols="6"
                            >
                                <v-select
                                    :items="[24, 30, 36, 42]"
                                    v-model="setting.limit"
                                    label="每页显示"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="6"
                                v-if="user.vip"
                            >
                                <v-select
                                    :items="jiexi"
                                    v-model="setting.jiexi_url"
                                    :hint="`${setting.jiexi ? setting.jiexi.name : ''}`"
                                    label="默认解析接口"
                                    item-text="name"
                                    item-value="id"
                                    persistent-hint
                                    return-object
                                    single-line
                                    @input="changeJiexi"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="6"
                                v-if="user.vip"
                            >
                                <v-select
                                    :items="parse"
                                    :hint="`${setting.parse ? setting.parse.name : ''}`"
                                    v-model="setting.parse"
                                    label="默认播放加速地址"
                                    item-text="name"
                                    item-value="id"
                                    persistent-hint
                                    return-object
                                    single-line
                                    @input="changeParse"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn
                        color="primary"
                        text
                        @click="resetSetting"
                    >
                        重置配置
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="clearCacheAll"
                    >
                        清理缓存
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="saveSetting"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import { mapMutations,mapState,mapActions} from "vuex";

export default {
    name: "Setting",
    data() {
       return{
           EnumData,
           // 配置
           settingDialog: false,
           setting: {},
       }
    },
    mounted() {
        // 加载配置
        let setting = LocalStorage.get(EnumData.setting);
        if (setting === null){
            this.setting = EnumData.defaultSetting;
        }else{
            this.setting = setting;
        }
    },
    methods:{
        ...mapMutations(["setSetting","clearCache"]),
        ...mapActions(["getJiexiList","getM3u8List"]),
        changeJiexi(item){
            this.setting.jiexi = item;
        },
        changeParse(item){
            this.setting.parse = item;
        },
        // 保存设置
        saveSetting() {
            this.setSetting(this.setting);
            this.$toast.success("保存成功！");
            this.submit();
        },
        // 重置设置
        resetSetting() {
            LocalStorage.remove(EnumData.setting);
            this.$toast.info("重置成功！");
            this.submit();
        },
        // 打开设置
        openSetting() {
            if (this.user.vip){
                this.getJiexiList();
                this.getM3u8List();
            }
            this.settingDialog = true;
        },
        // 清理缓存
        clearCacheAll(){
            this.clearCache();
            this.$toast.success("清理成功");
            this.submit();
        },
        // 提交事件
        submit(data={}){
            this.settingDialog = false;
            this.$emit("getResult",data)
        }
    },
    computed:{
        ...mapState(["jiexi","parse","user"])
    }
}
</script>

<style scoped>

</style>
