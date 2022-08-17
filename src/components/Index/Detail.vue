<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" md="8">
                    <iframe height="500px" width="100%" src="https://player.youku.com/embed/XNzUwOTk5MzE2"
                            frameborder="0"
                            allowfullscreen></iframe>
                </v-col>
                <v-col cols="12" md="4">
                    <div class="d-flex justify-lg-space-between">
                        <div>
                            <v-btn class="ma-2">上一集</v-btn>
                            <v-btn class="ma-2">下一集</v-btn>
                        </div>
                        <div>
                            <v-btn class="ma-2">收藏</v-btn>
                            <v-btn class="ma-2" color="success">分享</v-btn>
                        </div>

                    </div>
                    <div class="d-flex justify-start flex-wrap mt-1">
                        <v-btn
                            v-for="(item,index) in 20"
                            :key="index"
                            class="ma-2">第{{ index + 1 }}集
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col>为你推荐</v-col>
            </v-row>
            <v-row>
                <MovieList :list="list" :grid="grid"></MovieList>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MovieList from "@/components/common/MovieList";

export default {
    name: "Detail",
    components: {
        MovieList
    },
    data() {
        return {
            list: [],
            grid: {
                xl: 2,
                lg: 2,
                md: 2,
                sm: 6,
                xs: 6
            },
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            for (let i = 0; i < 10; i++) {
                let temp = {};
                temp.vod_id = i + 1;
                temp.vod_pic = "https://picsum.photos/id/11/10/6";
                temp.vod_title = "斗罗大陆" + i;
                temp.vod_tag = "宫漫";
                temp.vod_type = "更新至200集";
                temp.updated_at = "2022-01-20 10:01:01";
                this.list.push(temp);
            }
            this.busy = false;
        },
    }
}
</script>

<style scoped>

</style>
