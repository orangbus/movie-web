<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-btn
                    small
                    color="primary"
                >全部清空</v-btn>
            </v-col>
        </v-row>

        <MovieICardList></MovieICardList>
        <v-row>
            <v-col>
                <Page :total="100" @changePage="getData"></Page>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Page from "@/components/common/Page";
import MovieICardList from "@/components/common/movie/cardList";

export default {
    components:{
        MovieICardList,Page
    },
    data() {
        return{
            list:[]
        }
    },
    methods:{
        getData(page){
            console.log(page)
        }
    }
}
</script>

<style scoped>

</style>
