<template>
    <div>
        <AppHeader></AppHeader>
        <v-main >
        <v-container>
            <v-row>
                <v-col cols="12"
                v-bind="grid"
                v-for="(item,index) in list"
                       :key="index"
                >
                    <v-hover v-slot="{ hover }">
                        <v-card  :elevation="hover ? 12 : 2" class="text-pointer" @click="showDetail(item)">
                            <v-card-title>{{ item.title }}</v-card-title>
                            <v-card-text >
                                <div class="text-three-line" v-html="item.content"></div>
                                <div class="pt-3">{{ item.created_at}}</div>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12"
                       v-bind="grid">
                    <Page :limit="limit" :total="total" :loading="loading" :page="page" @changePage="changePage"></Page>
                </v-col>
            </v-row>

            <!--详情-->
            <v-dialog
                scrollable
                v-model="dialog"
                width="770"
            >
                <v-card>
                    <v-card-title class="text-h5 ">
                        {{  notice.title }}
                    </v-card-title>

                    <v-card-text v-html="notice.content" />

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
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
            <!--到顶部-->
            <v-btn
                v-if="list.length > 20"
                class="mx-3"
                fab
                fixed
                right
                dark
                large
                :bottom="true"
                color="primary"
                @click="toTop"
            >
                <v-icon dark>
                    mdi-format-vertical-align-top
                </v-icon>
            </v-btn>
        </v-main>
    </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/common/Page.vue";
import {noticeList} from "@/api/notice";
export default {
    name: "index",
    components:{
        AppHeader,Page
    },
    data(){
        return{
            dialog: false,
            grid: {
                xl: 8, // 4K 和超宽屏幕
                lg: 8, // 桌面端
                md: 8, // 大型号平板到手提电脑
                sm: 12, // 小型号到中型号的平板
                xs: 12, // 小型号到大型号的手机
                offsetMd: 2,
                offsetLg: 2,
                offsetXl: 2,
            },

            page:1,
            limit: 20,
            loading: true,
            list:[],
            total: 0,
            notice:{}
        }
    },
    created() {
        this.getData();
    },
    methods:{
        getData(){
            this.loading = true;
            noticeList({page:this.page,limit:this.limit}).then(res=>{
                this.loading = false;
                let {code,data,total} = res;
                if (code === 200 && data !=null){
                    this.list = data;
                    this.total = total;
                }
            });
        },

        changePage(page){
        this.page = page;
        this.getData();
        },

        showDetail(item){
            this.notice = item;
            this.dialog = true;
        },
        toTop(){
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            })
        }
    }
}
</script>

<style scoped>

</style>
