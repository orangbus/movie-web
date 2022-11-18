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
                    <v-btn
                        color="green darken-1"
                        text
                        @click="joinGroup"
                    >
                        加入群
                    </v-btn>
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
import VudQr from "vue-qr"

export default {
    components:{
        VudQr
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
        ...mapState(["user","website"])
    }
}
</script>

<style scoped>

</style>
