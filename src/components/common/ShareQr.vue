<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       v-bind="attrs"
                       v-on="on"
                       @click="dialog = true">
                    <v-icon>mdi-qrcode-plus</v-icon>
                    <!--{{ // user.vip ? '会员':'普通用户' }}-->
                </v-btn>
            </template>
            <span>推广码</span>
        </v-tooltip>

        <v-dialog
            v-model="dialog"
            max-width="450"
        >
            <v-card>
                <v-card-title class="text-h5">
                    我的推广二维码
                </v-card-title>

                <div>
                    <div class="pt-3 px-3 pb-1">
                        <div class="my-2 ">
                            <v-alert
                                border="left"
                                colored-border
                                color="deep-purple accent-4"
                                elevation="2"
                            >
                                <p>规则说明：</p>
                                <p>邀请一个好友即可获得7天会员奖励，可累加</p>
                            </v-alert>
                        </div>
                        <div class="text-center">
                            <VueQr :text="registerUrl"></VueQr>
                        </div>
                        <div  class="my-2 text-center">
                            推荐码：{{ user.code }}
                        </div>
                    </div>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        取消
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
import {mapState} from "vuex";
import {couponStore} from "@/api/coupon";
import Tool from "@/util/Tool";
import VueQr from "vue-qr";

const base_url = process.env.VUE_APP_WEB_URL;

export default {
    components:{
        VueQr,
    },
    data() {
        return{
            Tool,
            dialog: false,
            code: "", // 激活码
        }
    },
    methods:{
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
        }
    },
    computed:{
        ...mapState(["user","website"]),
        registerUrl(){
            let code = this.user.code;
            return base_url+"/#/login?code="+code;
        }
    }
}
</script>

<style scoped>

</style>
