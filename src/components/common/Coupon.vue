<template>
    <div>
        <v-btn icon @click="dialog = true">
            {{ user.vip ? '会员':'普通用户' }}
        </v-btn>

        <v-dialog
            v-model="dialog"
            max-width="450"
        >
            <v-card>
                <v-card-title class="text-h5">
                    解锁会员
                </v-card-title>

                <div>
                    <div class="pt-3 px-3 pb-1">
                        <v-img src="https://picsum.photos/1920/1080?random" class="border-radius" ></v-img>
                        <div class="my-2 text-center">
                            扫描上方二维码获取【激活码】
                        </div>
                        <div>
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

export default {
    data() {
        return{
            dialog: false,
            code: "", // 激活码
        }
    },
    methods:{
        joinGroup(){
          this.dialog = false;
        },
        confirm(){
            if (this.code === ""){
                this.$toast.error("请输入激活码");
                return;
            }
            this.dialog = false;
        }
    },
    computed:{
        ...mapState(["user","website"])
    }
}
</script>

<style scoped>

</style>
