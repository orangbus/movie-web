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
                <v-card-title class="text-h5 grey lighten-2">
                    配置
                </v-card-title>

                <!--配置内容-->
                <v-card-text>
                    <v-container>
                        <v-row>
                            <!--<v-col-->
                            <!--    cols="12"-->
                            <!--&gt;-->
                            <!--    <v-radio-group-->
                            <!--        v-model="setting.showPage"-->
                            <!--        label="开启分页"-->
                            <!--        row-->
                            <!--    >-->
                            <!--        <v-radio-->
                            <!--            label="滚动加载"-->
                            <!--            :value="false"-->
                            <!--        ></v-radio>-->
                            <!--        <v-radio-->
                            <!--            label="分页加载"-->
                            <!--            :value="true"-->
                            <!--        ></v-radio>-->
                            <!--    </v-radio-group>-->
                            <!--</v-col>-->
                            <v-col
                                cols="12"
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
                                cols="12"
                            >
                                <v-select
                                    :items="[20,24, 30, 36, 42,58]"
                                    v-model="setting.limit"
                                    label="每页显示"
                                    required
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
                        重置
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
import {mapMutations} from "vuex";

export default {
    name: "Setting",
    data() {
       return{
           // 配置
           settingDialog: false,
           setting: {
               showPage: true, // 是否分页显示
               limit: 20, // 每页显示条数
               page:true,
           },
       }
    },
    methods:{
        ...mapMutations(["setSetting"]),
        // 保存设置
        saveSetting() {
            this.setSetting(this.setting);
            this.settingDialog = false;
            this.$toast.success("保存成功！")
        },
        // 重置设置
        resetSetting() {
            LocalStorage.remove(EnumData.setting);
            this.settingDialog = false;
            this.$toast.info("重置成功！")
        },
        // 打开设置
        openSetting() {
            this.settingDialog = true;
        },
    }
}
</script>

<style scoped>

</style>
