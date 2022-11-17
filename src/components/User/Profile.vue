<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       v-bind="attrs"
                       v-on="on"
                       @click="dialog = true">
                    <v-icon>mdi-account-edit</v-icon>
                </v-btn>
            </template>
            <span>用户编辑</span>
        </v-tooltip>

        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ user.name }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="用户名"
                                    v-model="form.name"
                                    type="input"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="邮箱"
                                    type="email"
                                    v-model="form.email"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="密码"
                                    type="password"
                                    v-model="form.password"
                                    :aria-autocomplete="false"
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
                        @click="dialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="confirm"
                    >
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import {cloneDeep} from "lodash";
import {userStore} from "@/api/user";

export default {
    name: "Profile",
    data() {
        return{
            dialog: false,
            form:{
                name:"",
                email: "",
                password: ''
            }
        }
    },
    mounted() {
      this.form = cloneDeep(this.user);
    },
    methods:{
        ...mapActions(["getUserInfo"]),
        confirm(){
            userStore(this.form).then(res=>{
                if (res.code === 200){
                    this.dialog = false;
                    this.getUserInfo();
                    this.$toast.success(res.msg);
                }else{
                    this.dialog = true;
                    this.$toast.error(res.msg);
                }
            });
        }
    },
    computed:{
        ...mapState(["user"])
    }
}
</script>

<style scoped>

</style>
