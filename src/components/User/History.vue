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
import {mapState} from "vuex";
import Page from "@/components/common/Page";
import MovieICardList from "@/components/common/movie/cardList";
import {movieHistory} from "@/api/movie";

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
            movieHistory({
                page:this.page,
                limit: this.setting.limit
            }).then(res=>{
                let {data,total} = res;
                this.list = data;
                this.total = total;
            })
        }
    },
    computed:{
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
