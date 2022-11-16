<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-alert
                        border="top"
                        colored-border
                        color="blue"
                        elevation="2"
                    >
                        <div class="text-center">个人信息</div>
                        <p>手机号：{{ user.phone}}</p>
                        <p>邮箱：{{ user.email}}</p>
                        <p>api_token：{{ user.api_token}}</p>
                    </v-alert>
                </v-col>


            </v-row>
            <v-row>
                <v-col cols="12">
                    <div class="text-h5">我的应用</div>
                </v-col>

                <v-col
                    v-for="(item,index) in 10"
                    :key="index"
                    v-bind="grid">
                    <v-card>
                        <v-card-title>会员</v-card-title>
                        <v-card-subtitle>获取激活码</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import {mapState} from "vuex";

export default {

    data() {
        return{
            grid: {
                xl: 3,
                lg: 3,
                md: 3,
                sm: 12,
                xs: 12
            },
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        changePage(page){
            this.page = page;
            this.getData();
        },
        getData(){
            for (let i = 0; i < 30; i++) {
                this.list.push(i)
            }
            this.total = 1000;
            console.log(this.list)
        }
    },
    computed:{
        ...mapState(["user"])
    }
}
</script>

<style scoped>

</style>
