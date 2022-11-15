<template>
    <div>
        <!--到顶部-->
        <v-btn
            class="mx-3"
            fab
            fixed
            right
            dark
            large
            :bottom="true"
            color="blue"
            @click="toTop"
        >
            <v-icon dark>
                mdi-format-vertical-align-top
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "ToTop",
    data() {

    },
    methods:{
        toTop(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<style scoped>

</style>
