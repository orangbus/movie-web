<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       v-bind="attrs"
                       v-on="on"
                       @click="dialog = true">
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
            </template>
            <span>选择分类</span>
        </v-tooltip>

        <v-dialog
            v-model="dialog"
            width="800"
        >
            <v-card>
                <v-toolbar
                    color="primary"
                    dark
                > 分类列表
                </v-toolbar>
                <v-card-text style="max-height: 500px;overflow: scroll">
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
    </div>
</template>

<script>
export default {
    name: "ArticleCateList",
    props: {
        cateList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            dialog: false,
            cate:{},
        }
    },
    methods:{
        selecteCate(item,index){
            this.cate = item;
            this.cateList.forEach(item=>{
                item.selected = false;
            })
            this.cateList[index].selected = true;
        },
        confirm(){
            this.$emit("confirm",this.cate);
            this.dialog  = false;
        }
    }
}
</script>

<style scoped>

</style>
