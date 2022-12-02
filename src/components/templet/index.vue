<template>
    <div>
        <AppHeader></AppHeader>
    </div>
</template>
<script>
import AppHeader from "@/components/Layout/AppHeader.vue";
export default {
    components:{
        AppHeader
    },
    data () {
        return {
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                { title: 'Photos', icon: 'mdi-image' },
                { title: 'About', icon: 'mdi-help-box' },
            ],
            right: null,
        }
    },
}
</script>
