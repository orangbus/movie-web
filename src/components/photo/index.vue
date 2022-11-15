<template>
    <v-row>
        <Header></Header>

        <v-container style="margin-top: 100px">
            <v-row>
                <v-col
                    v-for="n in list"
                    :key="n"
                    class="d-flex"
                    cols="3"
                >
                    <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                        aspect-ratio="1"
                        class="grey lighten-2 border-radius"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>

            <Page :total="total" @change-page="getData"></Page>
        </v-container>

    </v-row>
</template>
<script>
import Header from "@/components/Layout/Header";
import Page from "@/components/common/Page";
export default {
    name: "index",
    components:{
        Header,Page
    },
    data(){
        return{
            page: 1,
            total: 0,
            list:[],
        }
    },
    created() {
        this.getData();
    },
    methods:{
        getData(){
            this.list = 10;
        }
    }
}
</script>
