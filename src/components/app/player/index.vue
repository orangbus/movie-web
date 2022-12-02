<template>
    <div>
        <AppHeader></AppHeader>
        <v-main>
            <v-container class="mt-15">
                <v-row>
                    <v-col cols="9" xs="9">
                        <v-text-field
                            v-model="url"
                            label="请输入m3u8链接地址"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" xs="3">
                        <v-btn @click="player" color="primary" class="mt-3">播放</v-btn>
                    </v-col>

                    <v-col cols="12">
                        <v-chip
                            v-for="(item,index) in jiexi"
                            :key="index"
                            @click="change(item)"
                        >{{ item.name}}</v-chip>
                    </v-col>
                    <v-col>
                        <iframe
                            v-if="playerUrl"
                            width="100%"
                                 style="border-radius: 6px; max-height:600px;min-height: 600px"
                                 :src="playerUrl" frameborder="0"
                                 allowfullscreen></iframe>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import AppHeader from "@/components/Layout/AppHeader";
import {mapState,mapActions} from "vuex";

export default {
    name: "index",
    components:{
        AppHeader
    },
    data() {
        return{
            url: "https://new.qqaku.com/20221119/SbkFBND4/index.m3u8",
            playerUrl:''
        }
    },
    created() {
        this.getM3u8List();
    },
    methods:{
        ...mapActions(["getM3u8List"]),
        player(){
            this.playerUrl = this.setting.jiexi.url + this.url;
            console.log(this.playerUrl)
        },
        change(item){
            let that = this;
            this.playerUrl = "";
            setTimeout(function (){
                that.playerUrl = item.url + this.url;
            },100)
        }
    },
    computed:{
        ...mapState(["parse","setting"])
    }
}
</script>

<style scoped>

</style>
