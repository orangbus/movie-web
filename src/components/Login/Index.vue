<template>
    <div>
        <v-container>
            <v-row class="mt-10">
                <v-col v-bind="grid" offset-md="3" offset-lg="3" offset-sm="0" offset-xl="3">
                    <v-form
                        ref="form"
                        v-model="form"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="form.phone"
                            :counter="11"
                            :rules="{}"
                            label="手机号"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="form.password"
                            label="密码"
                            required
                        ></v-text-field>

                        <v-btn
                            color="primary"
                            class="mr-4"
                            @click="login"
                            block
                        >
                            登录
                        </v-btn>
                        <v-btn
                            :disabled="!valid"
                            color="default"
                            class="mr-4 mt-3"
                            @click="validate"
                            block
                        >
                            注册
                        </v-btn>

                    </v-form>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
export default {
    name: "Index",
    data(){
        return{
            grid: {
                xl: 6,
                lg: 6,
                md: 6,
                sm: 24,
                xs: 24
            },
            form:{
                phone:"18388112501",
                password: "admin666"
            }
        }
    },
    methods:{
        login(){

        },
        register(){

        }
    }
}
</script>

<style scoped>

</style>
