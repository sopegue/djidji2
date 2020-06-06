<template >
    <div class="us-not">
        <h5 class="">Mes notifications</h5>
        <hr class="hr-us-inf">
        <Notification></Notification>
        <Notification></Notification>
        <Notification></Notification>
    </div>
</template>
<style scoped>
    .us-not{
        width: 50%;
        margin: 0 auto;
        position: relative;
        top: 3rem;
    }
</style>
<script>
    import Notification from '@/components/user/Notification.vue'
    export default {
        components:{
            Notification,
        },
        mounted(){

        },
        data () {
            return { 

            }
        },
        methods: {
         
        }
    }
</script>