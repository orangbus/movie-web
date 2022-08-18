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
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }"
                        >
                    <span @click="toDetail(item)">
                        <v-img
                            :lazy-src="item.vod_pic"
                            max-height="350"
                            max-width="100%"
                            :src="item.vod_pic"
                        >
                            <div class="d-flex justify-end white--text">
                                  <v-card-title>{{ item.type_name }}</v-card-title>
                            </div>
                        </v-img>
                        <v-card-subtitle class="text-truncate">{{ item.vod_name }}</v-card-subtitle>
                        <v-card-text>
                            <div>{{ item.vod_remarks }}</div>
                            <div>{{ item.updated_at }}</div>
                        </v-card-text>
                    </span>
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
                path: "/detail/" + item.id
            })
        }
    }
}
</script>

<style scoped>

</style>
