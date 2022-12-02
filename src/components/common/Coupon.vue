<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       v-bind="attrs"
                       v-on="on"
                       @click="dialog = true">
                    <v-icon>mdi-ticket-percent-outline</v-icon>
                </v-btn>
            </template>
            <span>激活码</span>
        </v-tooltip>


        <v-dialog
            v-model="dialog"
            max-width="450"
        >
            <v-card>
                <v-card-title class="text-h5">
                    {{user.vip ? '扫码加入群':'解锁会员'}}
                </v-card-title>

                <div>
                    <div class="pt-3 px-3 pb-1">
                        <div class="text-center" v-if="website.qq_url">
                            <VudQr :text="website.qq_url"></VudQr>
                        </div>
                        <div v-if="!user.vip" class="my-2 text-center">
                            扫描上方二维码获取【激活码】
                        </div>
                        <div  v-else class="my-2 ">
                            <p>尊敬的会员，你已经是本站的会员</p>
                            <p>到期时间：{{ user.vip_etime === 0 ? "不限":Tool.transformTimestamp(user.vip_etime)}}
                            </p>
                        </div>
                        <div  v-if="!user.vip">
                            <v-text-field v-model="code" outlined placeholder="已有激活码，请输入你的激活码"></v-text-field>
                        </div>

                    </div>
                </div>

                <v-card-actions>
                    <v-dialog
                        v-model="activeModal"
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
                            >
                                专属激活码
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">专属激活码激活</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                        >
                                            <v-text-field
                                                v-model="userCode"
                                                label="请输入好友激活码"
                                                required
                                            ></v-text-field>
                                            <small>这里填写的是好友激活码，不是邀请码</small>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="activeModal = false"
                                >
                                    取消
                                </v-btn>
                                <v-btn
                                    :loading="loading"
                                    :disabled="loading"
                                    color="blue darken-1"
                                    text
                                    @click="codeApply"
                                >
                                    立即激活
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="joinGroup"
                    >
                        加入群
                    </v-btn>

                    <v-btn
                        v-if="!user.vip"
                        color="blue blue-1"
                        text
                        @click="confirm"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
import {couponStore} from "@/api/coupon";
import Tool from "@/util/Tool";
import VudQr from "vue-qr"
import {userCodeApply} from "@/api/user";

export default {
    components:{
        VudQr
    },
    data() {
        return{
            Tool,
            dialog: false,
            code: "", // 激活码

            activeModal: false,
            loading:false,
            userCode: ""
        }
    },
    methods:{
        ...mapMutations(["setUser"]),
        joinGroup(){
            window.open(this.website.qq_url,"_blank")
        },
        confirm(){
            if (this.code === ""){
                this.$toast.error("请输入激活码");
                return;
            }
            couponStore({code:this.code}).then(res=>{
                if (res.code === 200){
                    this.dialog = false;
                    this.$toast.success(res.msg);
                }else{
                    this.dialog = true;
                    this.$toast.error(res.msg);
                }
            });
        },

        // 专属激活码
        codeApply(){
            if (this.userCode === ""){
                this.$toast.error("请输入激活码");
                return;
            }
            this.loading = true;
            userCodeApply({code:this.userCode}).then(res=>{
                this.loading = false;
                if (res.code === 200) {
                    this.$toast.success(res.msg);
                    this.activeModal = false;
                    this.setUser(res.data);
                } else {
                    this.$toast.error(res.msg);
                }
            });
        }
    },
    computed:{
        ...mapState(["user","website"])
    }
}
</script>

<style scoped>

</style>
