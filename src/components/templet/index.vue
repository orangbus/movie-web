<template>
    <div>
        <v-row>
            <v-col
                class="p-0"
                cols="6"
                v-bind="grid"
                v-for="(item,index) in list"
                :key="index"
            >
                <v-card>
                    <v-card-text>
                        <h3 class="text-center text-pointer d-flex justify-center card">
                            {{ item }}
                            <v-icon
                                class="ml-3 download"
                                small
                            >
                                mdi-download
                            </v-icon>

                        <!--    <span class="ml-3 download">-->
                        <!--    <v-icon>mdi_download</v-icon>-->
                        <!--</span>-->
                        </h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>

export default {
	data() {
		return {
			player:null,
			url:"",
			grid: {
				xl: 2,
				lg: 2,
				md: 2,
				sm: 6,
				xs: 6,
			},
			list:[
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
				"斗路大陆",
            ]
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>
<style scoped>
.download{
    display: none;

}

.card:hover .download {
    display: block;
}
</style>
