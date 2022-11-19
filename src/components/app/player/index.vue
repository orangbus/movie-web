<template>
    <div>
        <AppHeader></AppHeader>
        <v-container style="margin-top: 80px">
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="url"
                        hint=""
                        label="请输入m3u8链接地址"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-chip
                v-for="(item,index) in parse"
                :key="index"
                >{{ item.name}}</v-chip>
            </v-row>

        </v-container>
    </div>
</template>

<script>
import AppHeader from "@/components/Layout/AppHeader";
import {mapState} from "vuex";

export default {
    name: "index",
    components:{
        AppHeader
    },
    data() {
        return{
            url: "",

        }
    },
    computed:{
        ...mapState(["parse"])
    }
}
</script>

<style scoped>

</style>
