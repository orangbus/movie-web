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
            <v-app-bar-title ><span @click="toHome" class="text-pointer">{{ title }}</span></v-app-bar-title>

            <!--搜索-->
            <v-text-field
                class=" mt-10 ml-15"
                flat
                clearable
                label="支持全文搜索，标题，内容关键词"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                v-model="keyword"
                @keyup.enter="search"
                @click:clear="clear"
            ></v-text-field>


            <v-spacer></v-spacer>

            <!--分类-->
            <v-dialog
                v-model="dialog"
                width="800"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon  v-bind="attrs"
                           v-on="on">
                        <v-icon>mdi-list-box-outline</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-toolbar
                        color="primary"
                        dark
                    > 分类列表</v-toolbar>
                    <v-card-text>
                        <div class="py-2">
                            <v-chip
                                class="ma-1"
                                v-for="(item,index) in cateList"
                                :key="index"
                                :color="item.selected ? 'primary':''"
                                @click="selecteCate(item,index)"
                            >
                                {{ item.name }}
                            </v-chip>
                        </div>

                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            关闭
                        </v-btn>
                        <v-btn
                            color="primary"
                            text
                            @click="confirm"
                        >
                           确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!--个人中心-->
            <v-btn icon @click="toUser">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <!--最近点击-->
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

        <v-container style="margin-top: 120px" >
            <v-card
                class="mb-3"
            v-for="(item,index) in list"
            :key="index"
            >
                <v-card-title class="text-two-line">春节后不想上班的说说大全假期结束不想上班的心情说</v-card-title>
                <v-card-text class="text-five-line">
                    1. 每个月都有三十天不想上班。


                    2. 没有中午休息时间，每天六点半就要起床，单位领导要多有多，同事也总是欺负我善良。我是有多想辞职啊。


                    3. 明天是节后第一天上班,各位朋友们准备好了吗?明天倒没有什么温差,气温在-℃,不过北风来势汹汹,加上下雨,雨伞和围巾羽绒服都是出门必备品。


                    4. 春节最后一天啦,大家要警惕节后综合症:


                    5. 疲惫不堪;神经性厌食;想睡觉;不想上班;工作精神不集中;反应有些迟缓;心情忧郁;感觉孤单;还在回味假期的美好时光。


                    6. 春节后第一天上班,在西安的第一场雪后,冷冷的,睡眼惺忪的,再也不能贪恋的自然醒去哪呢?


                    7. 春节即将结束,明天将是节后上班的第一天。从愉快的假期回归工作当中,节后综合征也相伴而来。


                    8. 明天初八,是节后第一天上班的日子。祝大家八万发财,万事如意!


                    9. 节后第一天上班,有木有觉得连吃饭时刻都还在发困?有木有发觉长假其实也不长? 速度振作,快速调整,要加油哟!
                </v-card-text>
                <v-card-text class="d-flex justify-space-between align-end">
                    <v-chip color="primary">经典说说</v-chip>
                    <div>2022-10-20 10:20:30</div>
                </v-card-text>
            </v-card>

            <!--分页-->
            <Page :total="total" @changePage="changePage"></Page>
        </v-container>
    </div>
</template>

<script>
import Page from "@/components/common/Page";


export default {
    name: "search",
    components:{
        Page
    },
    data() {
    return{
        drawer:false,
        title: "聚合搜索",
        tabs:[],

        keyword: "",
        page:1,
        total: 0,
        list:[],

        dialog:false,

        // 分类
        cateList:[],
        cate:{},
    }
    },
    created() {
       this.getCate();
        this.getData();
    },
    methods:{
        getCate(){
            for (let i = 0; i < 100; i++) {
                this.cateList.push({id:i+1,name:"免费"+i,selected:false});
            }
            if (this.tabs.length === 0){
                this.tabs = this.cateList.splice(0,6);
            }
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
            this.total = 1000;
            this.list = 10;
        },
        confirm(){
            this.page = 1;
            this.list = [];
            this.getData();
            // 将当前标签追加到顶部菜单中
            this.tabs.unshift(this.cate);
        },

        changeTab(item){
            this.cate = item;
            this.search();
        },

        // 选择分类
        selecteCate(item,index){
          this.cateList.forEach(item=>{
              item.selected = false;
          });
          this.cateList[index].selected = true;
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
        toHome(){
            this.$router.push({
                path: "/"
            })
        }
    }
}
</script>

<style scoped>

</style>
