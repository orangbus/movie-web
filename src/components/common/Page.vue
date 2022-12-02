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

                    <!--分页-->
                    <div class="text-center mt-4 pb-10" v-if="setting.showPage && total > (limit === 0 ? 20:setting.limit)">
                        <v-pagination
                            v-model="page"
                            :length="Math.trunc(total/(limit === 0 ? 20:setting.limit))"
                            :total-visible="10"
                            @input="loadMore"
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
            page: 1
        }
    },
    methods:{
        loadMore(page){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.$emit("changePage",page);
        }
    },
    computed:{
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
