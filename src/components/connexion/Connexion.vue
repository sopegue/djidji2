<template >
    <div>
        <br><h3 class="h-lr text-center">Se connecter</h3>
        <div class="c-error"></div>
        
        <div class="">
        <form class="d-login d-flex flex-column" @submit.prevent="login">
            <label for="username">Email ou Téléphone</label>
            <input type="text" id="username" name="username" placeholder="Email" v-model="mailco" /><br>
            <label for="pwd">Mot de passe</label>
            <input type="password" id="pwd" name="password"  placeholder="Mot de passe" v-model="pwdco"/>
            <div class="remember">
                <input type="checkbox" v-model="remember" id="rememberMe"> <label for="rememberMe">Se souvenir</label>
            </div>
            <router-link class="pwd-reset" to="#">Mot de passe oublié ?</router-link>
            <button type="submit" class="b-lr logb" :disabled="loging">Connexion</button>
        
            <hr class="hr-login">
            <br><h5 class="h-lr hlr text-center">Créer un compte pour vous connecter</h5>
            <br><label for="usernew">Email</label>
            <input type="text" id="usernew" name="usernew" placeholder="Email" v-model="mail"/>
            <button type="button" class="b-lr regb" @click="$router.push('/connexion/register')">Créer un compte</button>
        </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                loging:false,
                remember:false,
                mail:'',
                mailco:'',
                pwdco:'',
            }
        },
        methods:{
            login:function() {
                this.loging=true
                this.$Progress.start();
                const email = this.mailco
                const password = this.pwdco
                this.$store.dispatch('login', { email, password}).then(() => {
                    if(this.$store.state.next!=='')
                        this.$router.push(this.$store.state.next)
                    else
                        this.$router.push('/')
                    })
                this.$Progress.finish();
            },
            register(){
            
            },
        },
    }
</script>
<style scoped>
    .pwd-reset{
        display: block;
        height: 1em !important;
        position: relative;
        top: 0rem;
        color: rgb(7, 148, 190) !important;
        font-size: 1em;
    }
    .pwd-reset:hover{
        text-decoration: underline !important;
    }
    input[type="checkbox"] {
      -webkit-appearance: checkbox;
         -moz-appearance: checkbox;
              appearance: checkbox;
      display: inline-block;
      width: auto;
    }
    label {
        color: #666;
        font-size: .875rem;
        position: relative;
        top: -.094rem;
    }
    .remember{
        position: relative;
        top: 0.5rem;
    }
</style>