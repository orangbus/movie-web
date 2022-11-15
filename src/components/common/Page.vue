<template>
    <div>
        <!--分页-->
        <div class="text-center mt-4 pb-10" v-if="total > 0">
            <v-pagination
                v-model="page"
                :length="Math.trunc(total/limit)"
                :total-visible="10"
                @input="loadMore"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        limit:{
            type:Number,
            default:()=>20
        },
        total:{
            type:Number,
            default:()=>20
        }
    },
    data() {
        return{
            page: 1
        }
    },
    methods:{
        loadMore(page){
            this.$emit("changePage",page);
        }
    }
}
</script>

<style scoped>

</style>
