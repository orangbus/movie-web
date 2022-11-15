<template>
    <div>
        <Header></Header>

        <v-container style="margin-top: 100px">
            <v-row>
                <v-col>
                    <v-card
                        class="mx-auto"
                    >
                        <v-card-text class="py-0">
                            <v-timeline
                                :dense="$vuetify.breakpoint.smAndDown"
                            >
                                <v-timeline-item
                                    v-for="(item, i) in list"
                                    :key="i"
                                    :color="item.color"
                                    :icon="item.icon"
                                    fill-dot
                                >
                                    <v-card
                                        :color="item.color"
                                        dark
                                    >
                                        <v-card-title class="text-h6">
                                            Lorem Ipsum Dolor
                                        </v-card-title>
                                        <v-card-text class="white text--primary">
                                            <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
                                            <v-btn
                                                :color="item.color"
                                                class="mx-0"
                                                outlined
                                            >
                                                Button
                                            </v-btn>
                                        </v-card-text>
                                    </v-card>
                                </v-timeline-item>
                            </v-timeline>

                        </v-card-text>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Header from "@/components/Layout/Header";
export default {
    components:{
        Header
    },
    data: () => ({
        list: [
            {
                color: 'red lighten-2',
                icon: 'mdi-star',
            },
            {
                color: 'purple darken-1',
                icon: 'mdi-book-variant',
            },
            {
                color: 'green lighten-1',
                icon: 'mdi-airballoon',
            },
            {
                color: 'indigo',
                icon: 'mdi-buffer',
            },
        ],
    }),
    created() {
        this.getData();
    },
    methods:{
        getData(){

        }
    }
}
</script>
