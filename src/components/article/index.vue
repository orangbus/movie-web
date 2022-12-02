<template>
    <div>
        <AppHeader
            :placeholder="'支持全文搜索，标题，内容关键词'"
            @confirmCate="confirmCate"
            @changeTab="changeTab"
            @search="search"
            @clear="clear"
        ></AppHeader>

        <v-container style="margin-top: 120px" >
            <v-row>
                <v-col v-bind="grid">
                    <v-card
                        class="mb-3"
                        v-for="(item,index) in list"
                        :key="index"
                        @click="showDetail(item)"
                    >
                        <v-card-title class="text-two-line">{{ item.title }}</v-card-title>
                        <v-card-text class="text-five-line" v-html="item.content"></v-card-text>
                        <v-card-text class="d-flex justify-space-between align-end">
                            <v-chip color="primary">{{ item.cate ? item.cate.name : ''  }}</v-chip>
                            <div>{{ item.visit}} | {{ item.site_name}} | {{ item.updated_at }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <!--分页-->
                    <Page :loading="loading" :total="total" @changePage="changePage"></Page>
                </v-col>
            </v-row>
        </v-container>

        <!--详情-->
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-toolbar-title>{{ article.title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            icon
                            dark
                            @click="dialog = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <!--内容-->
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <div v-html="article.content"></div>
                        </v-col>
                        <v-col cols="12">
                            <div class="d-flex justify-space-between mt-2">
                                <v-chip color="primary">{{ article.cate ? article.cate.name : ''  }}</v-chip>
                                <div>{{ article.visit}} | {{ article.site_name}} | {{ article.updated_at }}</div>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Page from "@/components/common/Page";
import {mapState} from "vuex";
import {articleList} from "@/api/article";
import AppHeader from "@/components/Layout/AppHeader.vue";

export default {
    name: "search",
    components:{
        AppHeader,Page
    },
    data() {
    return{
        grid: {
            xl: 8,
            lg: 8,
            md: 8,
            sm: 12,
            xs: 12
        },
        drawer:false,
        title: "聚合搜索",
        tabs:[],

        keywords: "",
        page:1,
        total: 0,
        list:[],
        loading:true,

        dialog:false,
        article:{}, // 当前文章对象
        // 分类
        cateList:[],
        cate:{},
    }
    },
    created() {
        this.getData();
    },
    methods:{
        showDetail(item){
            this.article = item;
            this.dialog = true;
        },
        search(keywords=""){
            this.keywords = keywords;
            this.page = 1;
            this.getData();
        },
        resetData(){
            this.page = 1;
            this.getData();
        },
        clear(){
            this.keywords = "";
            this.search();
        },
        changePage(page){
            this.page = page;
            this.resetData();
        },
        getData(){
            this.loading = true;
            articleList({
                page:this.page,
                limit: this.setting.limit,
                keywords: this.keywords,
                cate_id: this.cate.id
            }).then(res=>{
                this.loading = false;
                let {data,total} = res;
                this.list = data;
                this.total = total;
            })
        },
        confirmCate(cate){
            this.cate = cate;
            this.page = 1;
            this.list = [];
            this.resetData();
        },

        changeTab(item){
            this.cate = item;
            this.resetData();
        },

        // 选择分类
        selecteCate(item,index){
          this.cateList.forEach(item=>{
              item.selected = false;
          });
          this.cateList[index].selected = true;
        },
    },
    computed:{
        ...mapState(["setting"])
    }
}
</script>

<style scoped>

</style>
