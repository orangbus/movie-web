<template>
    <div>
        <v-app-bar
            absolute
            color="#2196F3"
            dark
            src="https://picsum.photos/1920/1080?random"
        >
            <!--背景渐变-->
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <!--首页图标-->
            <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
            <!--标题-->
            <v-app-bar-title>{{ title }}</v-app-bar-title>

            <!--导航标签-->
            <template v-slot:extension>
                <!--centered-->
                <v-tabs align-with-title >
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-container style="margin-top: 100px" >
            <v-row class="mt-10">
                <v-col v-bind="grid" offset-md="3" offset-lg="3" offset-sm="0" offset-xl="3">
                    <v-form
                        ref="form"
                        lazy-validation
                    >
                        <v-text-field
                            v-if="tab === 2"
                            v-model="form.name"
                            :counter="10"
                            label="用户名"
                            outlined
                        ></v-text-field>

                        <v-text-field
                            v-model="form.phone"
                            :counter="11"
                            label="手机号"
                             outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="form.password"
                            label="密码"
                            type="password"
                            :counter="15"
                             outlined
                            required
                        ></v-text-field>

                        <v-text-field
                            v-if="tab === 2"
                            type="password"
                            v-model="form.confirm_password"
                            :counter="15"
                            label="重复密码"
                            outlined
                        ></v-text-field>

                        <v-btn
                            color="primary"
                            class="mr-4"
                            @click="userLogin"
                            block
                            :loading="submitting"
                        >
                            {{tab === 1 ? '登录':'立即注册'}}
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import {login, register} from "@/api";
import LocalStorage from "@/util/LocalStorage";
import EnumData from "@/util/EnumData";
import {mapState} from "vuex";

export default {
    name: "Index",
    data(){
        return{
            grid: {
                xl: 6,
                lg: 6,
                md: 6,
                sm: 24,
                xs: 24
            },
            drawer:false,
            title: "登录",
            tab: 1,
            tabs:[
                {type:1,name:"登录"},
                {type:2,name:"注册"},
            ],
            submitting : false,
            form:{
                phone:"",
                password: "",
                confirm_password:"",
                code: ""
            }
        }
    },
    created() {
      let code = this.$route.query.code;
      if (code != undefined && code != "" && code.length >0){
          LocalStorage.set(EnumData.inviteCode,code);
          this.code = code;
      }
    },
    mounted() {
        if (this.authorization){
            this.$router.push({
                path:"/user"
            })
        }
    },
    methods:{
        userLogin(){
            if (this.form.phone.length < 11){
                this.$toast.error("请输入正确的手机号");
                return;
            }
            let {name,phone,password,confirm_password} = this.form;
            this.submitting = true;
            if (this.tab === 1){
                login({phone,password }).then(res=>{
                    this.submitting = false;
                    if (res.code === 200){
                        let {access_token,user} = res.data;
                        LocalStorage.set(EnumData.token,access_token);
                        this.$store.commit("setUser",user);
                        this.$router.push({
                            path:"/"
                        });
                        this.$toast.success("登录成功");
                    }else{
                        this.$toast.error(res.msg);
                    }
                });
            }else{
                if (password != confirm_password){
                    this.$toast.error("两次输入的密码不一致");
                    return;
                }
                let code = LocalStorage.get(EnumData.inviteCode);
                register({name,phone,password,code}).then(res=>{
                    this.submitting = false;
                    if (res.code === 200){
                        let {access_token,user} = res.data;
                        LocalStorage.set(EnumData.token,access_token);
                        this.$store.commit("setUser",user);
                        this.$router.push({
                            path:"/"
                        });
                        this.$toast.success("登录成功");
                    }else{
                        this.$toast.error(res.msg);
                    }
                });
            }
        },

        changeTab(item){
          this.tab = item.type;
        },
        openMenu(){
         this.$router.push({
             path: "/"
         })
        }
    },
    computed:{
        ...mapState(["authorization"])
    }
}
</script>

<style scoped>

</style>
