<template >
    <div style=" position:relative; top:1rem;">
        <div v-if="this.$store.state.okRegister==='true'" class="alert alert-success text-center" role="alert">
            Votre compte a été créé avec succès &#10003;
        </div>
        <br><h3 class="h-lr text-center">Se connecter</h3>
        <div class="c-error"></div>
        
        <div class="">
        <form class="d-login d-flex flex-column" @submit.prevent="login">
            <label for="username">Email<span style="color:red;"> *</span></label>
            <input type="text" id="username" name="username" placeholder="Email" v-model="mailco" /><br>
            <label for="pwd">Mot de passe<span style="color:red;"> *</span></label>
            <input type="password" id="pwd" name="password"  placeholder="Mot de passe" v-model="pwdco"/>
            <br>
            <router-link class="pwd-reset" to="#" @click.native="goReinit">Mot de passe oublié ?</router-link>
            <button type="submit" class="b-lr logb" :disabled="loging">Connexion</button>
        
            <hr class="hr-login">
            <br><h5 class="h-lr hlr text-center">Créer un compte pour vous connecter</h5>
            <br><label for="usernew">Email</label>
            <input type="text" id="usernew" name="usernew" placeholder="Email" v-model="mail"/>
            <button type="button" class="b-lr regb" @click="register(mail)">Créer un compte</button>
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
                mailco:'',
                pwdco:'',
            }
        },
        computed: {
          mail: {
            // getter
            get: function () {
              return this.$store.state.okConnection.regmail
            },
            // setter
            set: function (newValue) {
              this.$store.state.okConnection.regmail=newValue
            }
          }
        },
        methods:{
            goReinit(){
                this.$router.push('/reinit')
            },
            okConnection(){
                if(this.mailco!==""){
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mailco)){
                        this.$store.state.okConnection.okuser="true"
                    }
                    else
                        this.$store.state.okConnection.okuser="false"
                }
                else
                        this.$store.state.okConnection.okuser="false"

                if(this.pwdco!==""){
                    if (this.pwdco.length<8){
                        this.$store.state.okConnection.okpwd="short"
                    }
                    else
                        this.$store.state.okConnection.okpwd="true"
                }
                else
                        this.$store.state.okConnection.okpwd="false"
            },
            okRegister(){

                if(this.mail!==""){
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail)){
                        this.$store.state.okConnection.okregmail="true"
                    }
                    else
                        this.$store.state.okConnection.okregmail="false"
                }
                else
                        this.$store.state.okConnection.okregmail="false"

            },
            login:function() {
                this.$store.state.okConnection.okregmail=""
                this.$store.state.okConnection.notok=""
                this.$store.state.okConnection.okregpwd=""
                this.$store.state.okConnection.okregpwd2=""
                this.$store.state.okConnection.okpwd=""
                this.$store.state.okConnection.okuser=""
                this.okConnection();
                if(this.$store.state.okConnection.okuser==="true" && this.$store.state.okConnection.okpwd==="true"){
                this.$store.state.okConnection.okuser="" 
                this.$store.state.okConnection.okpwd=""
                this.$Progress.start();
                const email = this.mailco
                const password = this.pwdco
                this.$store.dispatch('login', { email, password}).then(() => {
                    if(this.$store.state.okConnection.notok!=="true"){
                        if(this.$store.state.next!==''){
                           
                            this.$router.push(this.$store.state.next)
                            this.$store.state.next=''
                            
                        }
                        if(this.$store.state.saving!==''){
                            console.log(this.$store.state.adToSave,this.$store.state.currentUser.id)
                            var content = new FormData()
                             content.append('ad',this.$store.state.adToSave)
                             content.append('user',localStorage.getItem('usetrixco'))
                             this.$store.dispatch('sauverAd',content).then(()=>{
                                this.$router.push(this.$store.state.saving)
                                this.$store.state.saving=''
                            })
                            
                        }
                        else{
                               this.$router.go(-1)
                          }

                    }
                    else
                        this.$notify({
                        group: 'custom-template',
                        type:'warn'
                      });
                    })
                this.$Progress.finish();
                }
                else    
                this.$notify({
                  group: 'custom-template',
                  type:'warn'
                });
            },
            register:function(mail){
                this.$store.state.okConnection.okuser=""
                this.$store.state.okConnection.okregmail=""
                this.$store.state.okConnection.notok=""
                this.$store.state.okConnection.okregpwd=""
                this.$store.state.okConnection.okregpwd2=""
                this.$store.state.okConnection.okpwd=""
                this.okRegister();
                if(this.$store.state.okConnection.okregmail==="true"){
                    this.$Progress.start();
                    this.$store.state.okConnection.okregmail=""
                    this.$store.state.okConnection.regmail=mail
                    this.$router.push('/connexion/register')
                    this.$Progress.finish();
                }
                else    
                this.$notify({
                  group: 'custom-template',
                  type:'warn'
                });
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
    .alert{
        margin: 0 auto;
        width: 30%;
    }
</style>