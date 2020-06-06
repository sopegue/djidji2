<template >
    <div id="c-login">
        <Connexion></Connexion>
    </div>
</template>

<script>
    import Connexion from '@/components/connexion/Connexion.vue'
    export default {
        data(){
            return{
                
            }
        },
        components: {
            Connexion,
        },
        methods:{
           login:function() {
                const remember= this.remember
                const email = this.mailco
                const password = this.pwdco
                this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))
            
            },
            register(){
            
            },
        },
    }
</script>