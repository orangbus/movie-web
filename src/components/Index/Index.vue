<template>
    <div>
        <!--导航-->
        <v-container>
            <v-row no-gutters>
                <!--    搜索-->
                <v-col cols="12" class="d-flex align-baseline">
                    <v-text-field
                        clearable
                        :autofocus="true"
                        v-model="keywords"
                        :label="`当前分类${movieCate.type_name || '推荐'}`"
                        hint="本站支持全文搜索（标题，演员，类型）"
                        @keyup.enter="search"
                        @click:clear="clearKeyword"
                    >
                    </v-text-field>
                    <v-btn depressed tile class="pa-3 ml-3" color="primary" @click="search">搜索</v-btn>
                    <v-btn depressed tile class="pa-3 ml-3"  @click="refresh">刷新</v-btn>
                </v-col>
                <v-col cols="12">
                    <v-btn-toggle
                        v-model="hits"
                        tile
                        color="deep-purple accent-3"
                        group
                    >
                        <v-btn
                            v-for="(item,index) in hitsList"
                            :key="index"
                            @click="sortHit(index)"
                            :value="index">
                            {{ item.name }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <!--推荐标签，历史记录-->
                <v-col cols="12" class="text-center d-flex justify-space-between ">
                    <div v-if="movieHistory.length > 0">
                        <v-chip
                            class="mr-1 mb-1 hidden-xs-only"
                            v-for="(item,index) in movieHistory"
                            :key="index"
                            @click="changeTag(item)"
                        >
                            {{ item }}
                        </v-chip>
                    </div>
                    <div class="hidden-xs-only">
                        第{{page}}页/{{ total}} 条数据
                    </div>
                </v-col>
            </v-row>
        </v-container>


        <!--内容-->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <MovieList :list="list" :to-detail="false" :grid="grid"></MovieList>
        </div>
        <v-container>
            <!--加载中 -->
            <v-row>
                <v-col v-if="busy && !is_end">
                    <v-progress-linear
                        class="mb-5"
                        indeterminate
                        color="cyan darken-2"
                    ></v-progress-linear>
                </v-col>
                <v-col v-if="!busy && list.length === 0">
                    到底啦。。。
                </v-col>
            </v-row>
        </v-container>


        <v-row >
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <!--<template v-slot:activator="{ on, attrs }">-->
                <!--    <v-btn-->
                <!--        color="primary"-->
                <!--        dark-->
                <!--        v-bind="attrs"-->
                <!--        v-on="on"-->
                <!--    >-->
                <!--        打开-->
                <!--    </v-btn>-->
                <!--</template>-->

                <v-card>
                    <!--标题-->
                    <v-toolbar
                        dark
                        color="primary"
                    >
                        <v-toolbar-title>斗罗大陆</v-toolbar-title>
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
                    <MovieDetail v-if="dialog"></MovieDetail>
                    <v-container v-if="false">
                        <v-row>
                            <v-col v-bind="left_grid">
                                <v-col style="padding: 0px">
                                    <iframe
                                        width="100%"
                                        style="border-radius: 5px; max-height:750px;min-height: 750px;"
                                        src="https://jx.wujinkk.com/dplayer/?url=https://new.qqaku.com/20221029/HCuTjIZC/index.m3u8"
                                        frameborder="0"
                                        allowfullscreen></iframe>
                                </v-col>

                                <v-col >
                                    <v-list-item class="pt-0" >
                                        <v-list-item-avatar color="grey darken-3">
                                            <v-img
                                                class="elevation-6"
                                                alt=""
                                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content style="padding: 0px;">
                                            <v-card-title>斗罗大陆</v-card-title>
                                            <v-card-subtitle>斗罗大陆,斗罗大陆，斗罗大陆</v-card-subtitle>
                                        </v-list-item-content>
                                        <v-row
                                            align="center"
                                            justify="end"
                                        >
                                            <v-btn color="primary" >
                                                <v-icon class="mr-1">
                                                    mdi-heart
                                                </v-icon>
                                                <span class="subheading mr-2">256</span>
                                            </v-btn>

                                            <v-btn class="ml-3" color="pink">
                                                <v-icon class="mr-1">
                                                    mdi-share-variant
                                                </v-icon>
                                                <span class="subheading">45</span>
                                            </v-btn>

                                        </v-row>
                                    </v-list-item>
                                    <v-list-item-content class="pt-0">
                                        <p>导演：沈乐平</p>
                                        <p>演员：沈磊,程玉珠,黄翔宇,王肖兵,倪康,赵乾景,吴磊,张琦,秦紫翼</p>
                                        <p> 唐门外门弟子唐三，因偷学内门绝学为唐门所不容，跳崖明志时却发现没有死，反而以另外一个身份来到了另一个世界，一个属于武魂的世界，名叫斗罗大陆。这里没有魔法，没有斗气，没有武术，却有神奇的武魂。这里的每个人，在自己六岁的时候，都会在武魂殿中令武魂觉醒。武魂有动物，有植物，有器物，武魂可以辅助人们的
                                        </p>
                                    </v-list-item-content>
                                </v-col>
                            </v-col>
                            <v-col v-bind="right_grid">
                                <v-row class="mt-2">
                                    <v-chip
                                        class="ma-2"
                                        color="primary"
                                        label
                                        text-color="white"
                                    >
                                        <v-icon left>
                                            mdi-label
                                        </v-icon>
                                        Tags
                                    </v-chip>
                                    <v-chip
                                        class="ma-2"
                                        color="primary"
                                    >
                                        Primary
                                    </v-chip>

                                    <v-chip
                                        class="ma-2"
                                        color="secondary"
                                    >
                                        Secondary
                                    </v-chip>

                                    <v-chip
                                        class="ma-2"
                                        color="red"
                                        text-color="white"
                                    >
                                        Red Chip
                                    </v-chip>
                                </v-row>
                                <v-row>
                                    <v-list three-line class="ml-0 ">
                                        <template v-for="(item, index) in items2">
                                            <v-subheader
                                                v-if="item.header"
                                                :key="item.header"
                                                v-text="item.header"
                                            ></v-subheader>

                                            <v-divider
                                                v-else-if="item.divider"
                                                :key="index"
                                                :inset="item.inset"
                                            ></v-divider>

                                            <v-list-item
                                                v-else
                                                :key="item.title"
                                                class="pl-0"
                                            >
                                                <v-avatar
                                                    class="ma-3"
                                                    size="125"
                                                    tile
                                                >
                                                    <v-img style="border-radius: 5px" :src="item.avatar"></v-img>
                                                </v-avatar>


                                                <v-list-item-content>
                                                    <v-list-item-title v-html="item.title"></v-list-item-title>
                                                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                                    <v-list-item-subtitle class="d-flex justify-start">
                                                        <div>动漫</div>
                                                        <div class="ml-2">更新至198集</div>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </template>
                                    </v-list>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import MovieList from "@/components/common/MovieList";
import { movieList} from "@/api";
import {mapState} from "vuex";
import {cloneDeep} from "lodash";
import mdui from "mdui";
import MovieDetail from "@/components/Index/Detail";

export default {
    name: "Index",
    components: {
        MovieList,MovieDetail
    },
    data() {
        return {
            grid:{
                xl: 2,
                lg: 2,
                md: 2,
                sm: 12,
                xs: 12
            },
            keywords: "",
            placeholder: "",
            hits: 0,
            cate: [], //分类列表
            cate_id: 0, //数据源id
            movie_type: 1, // 电影类型
            type_id:0,
            page: 1,
            limit: 20,
            total: 0,
            list: [], // 列表数据

            busy: true,
            is_end: false,

            dialog:false,

            items2: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this w in your neighborhood doing errands this w in your neighborhood doing errands this w in your neighborhood doing errands this weekend. Do you want to hang out?`,
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                },
            ],

        }
    },
    created() {
        this.type_id = this.$route.query.type_id;
        this.getData();
    },
    watch:{
        // 切换电影分类
        movieCate(cate){
            console.log("电影分类切换",cate)
            if (this.$route.path === "/"){
                this.hits = 0;
                this.search();
            }
        },

        //切换电影大分类
        movieType(item){
            this.movie_type = item.type;
            if (this.$route.path === "/"){
                this.hits = 0;
                this.search();
            }
        },
    },
    methods: {
        openPlayer(){

        },




        getData() {
            let params = {
                page: this.page,
                limit: this.limit,
                hits: this.hits, // 排名
                type: this.movie_type // 大分类
            }
            // 设置分类
            let type_id = this.type_id ? this.type_id : this.movieCate.type_id;
            // 当搜索的时候忽略分类
            if (this.keywords != ""){
                params.keywords = this.keywords;
            }else{
                params.type_id = type_id; // 小分类
            }

            let _this = this;
            movieList(params).then(res => {
                let {data, total} = res;
                if (res.code === 200 && res.data != null) {
                    this.list.push(...data);
                    this.total = total;
                    setTimeout(function () {
                        _this.busy = false;
                        if (data.length === 0 || data.length < 10) {
                            _this.is_end = true;
                            mdui.snackbar("到底啦")
                        }
                    }, 300);
                }
            });
        },

        // 切换标签
        changeTag(tag){
            this.keywords = tag;
            this.search();
        },

        // 加载更多
        loadMore() {
            console.log(this.$route.path)
            if (this.$route.path !== "/"){
                return;
            }
            if (this.busy) {
                return;
            }

            if (this.is_end) {
                return;
            }
            this.busy = true;
            this.page += 1;
            this.getData();
        },

        // 搜索
        search() {
            this.list = [];
            this.page = 1;
            this.busy = true;
            this.getData();

            // 加入历史记录
            if (this.keywords != "" && !this.movieHistory.includes(this.keywords)) {
                let data = cloneDeep(this.movieHistory)
                data.unshift(this.keywords)
                if (data.length > 10){
                    data.splice(10,1)
                }
                this.$store.commit("setMovieHistory", data);
            }
        },
        // 请求搜索
        clearKeyword(){
            this.list = [];
            this.keywords = "";
            this.page = 1;
            this.busy = true;
            this.getData();
        },

        sortHit(index){
            this.hits = index;
            this.list = [];
            this.page = 1;
            this.is_end = false;
            this.busy = true;
            this.getData();
        },

        // 详情
        toDetail(item) {
            this.$router.push({
                path: "/detail/" + item.id
            })
        },

        // 刷新缓存
        refresh(){
            this.$store.dispatch("refreshCache");
            mdui.snackbar("缓存已清理");
        }
    },
    computed:{
        ...mapState({
            movieCate: state => state.movieCate,
            movieCateList: state => state.movieCateList,
            movieHistory: state => state.movieHistory,
            movieType:state => state.movieType,
            hitsList:state => state.hitsList
        })
    }

}
</script>

<style scoped>

</style>
