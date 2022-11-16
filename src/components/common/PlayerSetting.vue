<template>
    <div>
        <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            scrollable
            width="800"
        >
            <!--设置按钮-->
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon @click="openSetting">
                    <v-icon>mdi-cogs</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 blue">
                    播放设置
                </v-card-title>
                <!--配置内容-->
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-radio-group
                                    v-model="setting.open_parse"
                                    label="是否优先使用加速播放"
                                    row
                                >
                                    <v-radio
                                        label="开启"
                                        :value="true"
                                    ></v-radio>
                                    <v-radio
                                        label="关闭"
                                        :value="false"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>

                        </v-row>
                    </v-container>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn
                        color="primary"
                        text
                        @click="resetSetting"
                    >
                        重置
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="saveSetting"
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
    name: "PlayerSetting",
    data() {
        return{
            dialog: true,

            setting:{
                open_parse: true, // 优先使用线路播放
            },
        }
    },
    methods: {
        openSetting(){
            this.dialog = true;
        },
        saveSetting(){

        },
        resetSetting(){

        }
    },
}
</script>

<style scoped>

</style>
