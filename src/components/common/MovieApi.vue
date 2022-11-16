<template>
    <div>
        <v-dialog
            v-model="dialog"
            max-width="500"
            scrollable
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="dialog = true"
                >
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5">
                    {{ movieApi.name ? movieApi.name : '数据源列表'}}
                </v-card-title>
                <v-divider></v-divider>

                <v-tabs
                    v-model="tab"
                    centered
                    slider-color="blue"
                >
                    <v-tab
                        v-for="(item,index) in tabs"
                        :key="index"
                        :href="`#tab-${index}`"
                        @click="changeTab(item)"
                    >
                        {{ item.name }}
                    </v-tab>
                </v-tabs>

                <v-card-text style="max-height: 500px" >
                    <v-list rounded>
                        <v-list-item-group
                            color="primary"
                        >
                            <v-list-item v-for="(item,index) in apiList.length !== 0 ? apiList: movieApiList" :key="index" @click="changeApi(item)">
                                <v-list-item-title>{{ item.name }}({{ item.is_vip ? '会员' : '免费' }})</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="updateApi"
                    >
                        更新接口
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
import {mapState, mapMutations, mapActions} from "vuex";
import Tool from "@/util/Tool";

export default {
    data() {
        return {
            Tool,
            dialog: false,
            code: "", // 激活码
            movieApi: {},

            tab: 0,
            tabs: [
                {type: 0, name: "全部"},
                {type: 1, name: "免费"},
                {type: 2, name: "会员"},
            ],
            apiList:[],
        }
    },
    methods: {
        ...mapMutations(["setMovieApi"]),
        ...mapActions(["getMovieApiList"]),
        changeApi(item) {
            this.movieApi = item;
        },
        updateApi(){
            this.getMovieApiList();
            this.$toast.info("接口已更新");
        },

        changeTab(item) {
            this.tab = item.type;
            let list = [];
            if (this.tab === 1){
                this.movieApiList.forEach(item=>{
                    if (!item.is_vip){
                        list.push(item)
                    }
                })
            }else if (this.tab === 2){
                this.movieApiList.forEach(item=>{
                    if (item.is_vip){
                        list.push(item)
                    }
                })
            }else{
                list = this.movieApiList;
            }
            this.apiList = list;
        },
        confirm() {
            this.setMovieApi(this.movieApi);
            this.$emit("changeMovieApi", this.movieApi);
            this.$toast.info("接口已切换至：" + this.movieApi.name);
            this.submit();
        },
        submit(){
            this.dialog = false;
            this.$emit("getResult");
        }
    },
    computed: {
        ...mapState(["user", "website", "movieApiList"]),
    }
}
</script>

<style scoped>

</style>
