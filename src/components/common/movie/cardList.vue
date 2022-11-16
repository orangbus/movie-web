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
                            size="140"
                            tile
                            rounded
                        >
                            <v-img src="https://picsum.photos/1920/1080?random"></v-img>
                        </v-avatar>

                        <div class="w-full">
                            <v-card-title>斗罗大陆</v-card-title>

                            <v-card-subtitle class="py-0">
                                <p class="my-0 py-0">国产动漫 | 唐家三少</p>
                                <p class="my-0 py-0"> 动漫 | 2022-10-11 10:12:00</p>
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn
                                    class="ml-2"
                                    small
                                    color="primary"
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
    }
}
</script>

<style scoped>

</style>
