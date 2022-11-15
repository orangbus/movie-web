<template>
    <div>
        <v-btn icon @click="dialog = true">
            <v-icon>mdi-logout</v-icon>
        </v-btn>

        <v-dialog
            v-model="dialog"
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    退出提示?
                </v-card-title>

                <v-card-text>
                    是否确定退出登录
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        取消
                    </v-btn>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="userLogout"
                    >
                        退出
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
    name: "LogOut",
    data() {
        return{
            dialog: false
        }
    },
    methods:{
        ...mapMutations(["logout"]),
        userLogout(){
            this.logout();
            this.$router.push({
                path:"/"
            })
        }
    }
}
</script>

<style scoped>

</style>
