<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <!--加载中-->
                    <div class="text-center mt-3" v-if="loading && setting.loadingStyle === EnumData.loadingCircle">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </div>

                    <v-progress-linear
                        class="text-center mt-3"
                        v-if="loading && setting.loadingStyle === EnumData.loadingLine"
                        indeterminate
                        color="cyan"
                    ></v-progress-linear>

                    <!--滚动加载分页提示-->
                    <div class="text-center">
                        第{{page}}页，累计{{ total }}条
                    </div>

                    <!--分页-->
                    <div class="text-center mt-4 pb-10" v-if="setting.showPage && total > (limit === 0 ? 20:setting.limit)">
                        <v-pagination
                            v-model="page"
                            :length="Math.trunc(total/(limit === 0 ? 20:setting.limit))"
                            :total-visible="10"
                            @input="changePage"
                        ></v-pagination>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import {mapState} from "vuex";
import EnumData from "@/util/EnumData";

export default {
    props:{
        page:{
            type:Number,
            default:()=> 1
        },
        limit:{
            type:Number,
            default:()=>0
        },
        total:{
            type:Number,
            default:()=>20
        },
        loading:{
            type:Boolean,
            default:()=>true
        }
    },
    data() {
        return{
            EnumData,
        }
    },
    methods:{
        changePage(page){
            this.$emit("changePage",page);
        },

    },
    computed:{
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
