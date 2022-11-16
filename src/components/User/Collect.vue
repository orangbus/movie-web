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

        <MovieICardList :list="list"></MovieICardList>

        <Page :total="100" @changePage="getData"></Page>
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
    mounted() {
        this.getData();
    },
    methods:{
        changePage(page){
            this.page = page;
            this.getData();
        },
        getData(){
            for (let i = 0; i < 30; i++) {
                this.list.push(i)
            }
            this.total = 1000;
            console.log(this.list)
        }
    }
}
</script>

<style scoped>

</style>
