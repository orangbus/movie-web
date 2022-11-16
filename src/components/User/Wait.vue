<template>
    <div>
        <MovieICardList :list="list"></MovieICardList>
        <v-row>
            <v-col>
                <Page :total="total" @changePage="getData"></Page>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Page from "@/components/common/Page";
import MovieICardList from "@/components/common/movie/cardList";

export default {
    components:{
        Page,MovieICardList
    },
    data() {
        return{
            grid: {
                xl: 3,
                lg: 3,
                md: 6,
                sm: 6,
                xs: 12
            },
            list:[],
            page:1,
            total: 0,
            limit:20,
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
