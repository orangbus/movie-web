<template>
    <div>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                    v-for="(item,index) in list"
                    :key="index"
                    v-bind="grid"
                >
                    <v-hover>
                        <v-card
                        >
                            <div @click="toDetail(item)">
                                <v-img
                                    :lazy-src="item.vod_pic"
                                    max-height="200"
                                    max-width="100%"
                                    :src="item.vod_pic"
                                ></v-img>
                                <v-card-subtitle class="text-truncate">{{ item.vod_title }}</v-card-subtitle>
                                <v-card-text>
                                    <div>{{ item.vod_type }}</div>
                                    <div>{{ item.created_at }}</div>
                                </v-card-text>
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "MovieList",
    props: {
        list: {
            type: Array,
            default: () => []
        },
        grid: {
            type: Object,
            default: () => {
                // xl: 2,
                // lg, 2,
                // md: 2,
                // sm: 6,
                // xs: 6,
            }
        },
    },
    methods: {

        toDetail(item) {
            this.$router.push({
                path: "/detail/" + item.vod_id
            })
        }
    }
}
</script>

<style scoped>

</style>
