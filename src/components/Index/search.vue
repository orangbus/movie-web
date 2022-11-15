<template>
    <div>
        <v-app-bar
            absolute
            color="#2196F3"
            dark
        >
            <!--背景渐变-->
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <!--首页图标-->
            <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
            <!--标题-->
            <v-app-bar-title>{{ title }}</v-app-bar-title>

            <!--搜索-->
            <v-text-field
                class=" mt-10 ml-15"
                flat
                clearable
                label="支持全文搜索，电影，演员，类型"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keyword"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>


            <v-spacer></v-spacer>

            <!--历史记录-->
            <v-btn icon>
                <v-icon>mdi-history</v-icon>
            </v-btn>

            <!--个人中心-->
            <v-btn icon @click="toUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--导航标签-->
            <template v-slot:extension>
                <!--centered-->
                <v-tabs align-with-title >
                    <v-tab
                        v-for="(item,index) in tabs" :key="index"
                        @click="changeTab(item)"
                    >{{ item.name }}</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-sheet
            id="movie-content"
            max-height="1000"
        >
            <v-container style="height: 1000px;margin-top: 100px" >
                <!--搜索-->
                <v-row>
                    <v-col cols="12" class="d-flex align-baseline">
                        <v-text-field
                            clearable
                            :autofocus="true"
                            v-model="keyword"
                            hint="本站支持全文搜索（标题，演员，类型）"
                            @keyup.enter="search"
                            @click:clear="clear"
                        >
                        </v-text-field>
                        <v-btn depressed ripple  class="pa-3 ml-3" color="primary" @click="search">搜索</v-btn>
                    </v-col>
                </v-row>

                <!--内容-->


                <!--分页-->
                <Page :total="total" @changePage="changePage"></Page>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import Page from "@/components/common/Page";
export default {
    name: "search",
    components:{
        Page,
    },
    data() {
    return{
        drawer:false,
        title: "聚合搜索",

        tabs:[
            {type:1,name:"免费"},
            {type:2,name:"会员"},
        ],


        keyword: "",
        page:1,
        total: 0,
    }
    },
    created() {
        this.getData();
    },
    methods:{
        changeTab(item){
          console.log(item)
        },



        search(){
          this.page = 1;
          this.getData();
        },
        clear(){
            this.keyword = "";
            this.search();
        },
        changePage(page){
          this.page = page;
          this.getData();
        },
        getData(){

        },
        // 打开菜单
        openMenu(){
            if (this.authorization){
                this.drawer = !this.drawer;
            }else{
                this.$router.push({
                    path: "login"
                })
            }
        },
        // 个人中心
        toUser(){
            this.$router.push({
                path: this.authorization ? "user":"login"
            })
        },
    }
}
</script>

<style scoped>

</style>
