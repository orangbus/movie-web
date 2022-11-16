<template>
    <div>
        <v-row>
            <v-col
                v-for="(item,index) in list"
                :key="index"
                v-bind="grid">
                <v-card hover>
                    <div class="d-flex justify-start">
                        <v-avatar
                            class="ma-0"
                            size="155"
                            tile
                            rounded
                        >
                            <v-img class="border-radius" :src="item.vod_pic"></v-img>
                        </v-avatar>

                        <div class="w-full">
                            <v-card-title class="pt-0"><span class="text-two-line">{{ item.vod_name }}</span></v-card-title>

                            <v-card-subtitle class="py-0">
                                <p class="my-0 py-0">{{ item.type_name }}</p>
                                <p class="my-0 py-0">{{ item.updated_at }}</p>
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn
                                    class="ml-2"
                                    small
                                    color="primary"
                                    @click="playerMovie(item)"
                                >
                                    立即观看
                                </v-btn>
                                <v-btn
                                    class="ml-2"
                                    outlined
                                    small
                                    color="error"
                                >
                                    取消收藏
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "item",
    props:{
        list:Array,
        default:()=>0
    },
    data() {
        return {
            grid: {
                xl: 3,
                lg: 3,
                md: 6,
                sm: 6,
                xs: 12
            },
        }
    },
    methods:{
        playerMovie(item){
            console.log(item)
        }
    }
}
</script>

<style scoped>

</style>
