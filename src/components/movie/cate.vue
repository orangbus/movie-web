<template>
    <div>
        <AppHeader
            :showSearch="false"
            :tab="tab"
            :tabs="tabs"
            :placeholder="'搜索分类'"
            @search="search"
        ></AppHeader>

        <v-main>
            <v-container class="mb-5">
                <v-row>
                    <v-col>
                        <v-text-field placeholder="搜索分类" v-model="keywords" @input="search"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        class="p-0"
                        :cols="6"
                           v-bind="grid"
                           v-for="(item,index) in list"
                           :key="index"
                    >
                        <v-card @click="toList(item)">
                            <v-card-text>
                                <h3 class="text-center text-pointer">
                                    {{ item }}
                                </h3>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import {movieCateAll} from "@/api/movie";

export default {
	name: "cate",
	components: {
		AppHeader
	},
	data() {
		return {
			grid: {
				xl: 2,
				lg: 2,
				md: 2,
				sm: 4,
				xs: 6,
			},
			tab: 0,
			tabs: [
				// {type: 0, name: '推荐'},
			],
			keywords: "",
			list: [],
            data:[], // 原始数据
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			movieCateAll().then(res => {
				if (res.code === 200) {
					this.list = res.data;
					this.data = res.data;
				}
			});
		},
		// 搜索
		search() {
			if (this.keywords == ""){
				this.list = this.data;
				return false;
            }
			this.list = [];
			this.data.forEach(item=>{
				if (item.includes(this.keywords)){
					this.list.push(item)
                }
            })
		},
		toList(item){
			console.log(item)

        }
	}
}
</script>

<style scoped>

</style>
