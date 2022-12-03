<template>
    <div>
            <v-dialog
                v-model="dialog"
                width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        @click="getData"
                    >
                        专属激活码
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="text-h5 ">
                        专属激活码
                    </v-card-title>

                    <v-card-text class="pt-3" v-if="userCode != null">
                        <div>我的专属激活码：<span class="text-pointer" v-clipboard:copy="userCode.code" v-clipboard:success="onCopy">{{ userCode.code}}</span></div>
                        <div>可激活天数：{{ userCode.number}}</div>
                        <div>状态：{{ userCode.status === 1 ? '可用':'不可用'}}</div>
                        <div>开通vip可自定义专属激活码</div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-dialog
                            v-model="editModal"
                            persistent
                            max-width="600px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    text
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="user.vip"
                                >
                                    修改
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">自定义激活码</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                cols="12"
                                            >
                                                <v-text-field
                                                    v-model="code"
                                                    label="请输入自定义激活码 (数字+字母，最长15位)"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="editModal = false"
                                    >
                                       取消
                                    </v-btn>
                                    <v-btn
                                        :loading="loading"
                                        :disabled="loading"
                                        color="blue darken-1"
                                        text
                                        @click="editCode"
                                    >
                                        修改
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
    </div>
</template>

<script>
import {userCode, userCodeStore} from "@/api/user";
import {mapState} from "vuex";

export default {
    name: "ActiveCode",
    data() {
        return{
            loading: false,
            dialog: false,
            userCode:null,

            editModal: false,
            code: "",
        }
    },
    methods:{
        // 编辑激活码
        editCode(){
            if (this.code == ""){
                this.$toast.error("请输入激活码");
                return;
            }
            this.loading = true;
            userCodeStore({code:this.code}).then(res=>{
                this.loading = false;
                if (res.code === 200) {
                    this.code = res.data;
                    this.$toast.success(res.msg);
                    this.editModal = false;
                } else {
                    this.$toast.error(res.msg);
                }
            });
        },
        getData(){
            userCode().then(res=>{
                if (res.code === 200 && res.data != null){
                    this.userCode = res.data;
                }
            });
        },
        onCopy(){
            this.$toast.success("复制成功！");
        }
    },
    computed:{
        ...mapState(["user"])
    }
}
</script>

<style scoped>

</style>
