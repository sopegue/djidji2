<template >
    <div class="c-register">
        <br><h3 class="h-lr text-center">Créer un compte pour vous connecter</h3>
        <div class="c-error"></div>
        <form class="d-login d-flex flex-column" @submit.prevent="register">
            <label for="mail">Email <span style="color:red;">*</span></label>
            <input type="text" id="mail" name="mail" placeholder="Email"  v-model="mail" /><br>
            <label for="username">Nom</label>
            <input type="text" id="username" name="username" placeholder="Nom" v-model="name" /><br>
            <label for="surname">Prénom</label>
            <input type="text" id="surname" name="surname" placeholder="Prénom" v-model="surname"/><br>
            <label for="pwd">Mot de passe  <span style="color:red;">*</span></label>
            <input type="password" id="pwd" name="password"  placeholder="Mot de passe" v-model="pwd" /><br>
           
            <label for="pwdconf">Confirmation de mot de passe  <span style="color:red;">*</span></label>
            <input type="password" id="pwdconf" name="pwdconf"  placeholder="Confirmer votre mot de passe" v-model="pwd2" /><br>
             <div class="addi d-flex align-items-center justify-content-between" style="width:30%">
                <div class="us-inf-img">
                    <img :src="image" :height="64" :width="64"/>
                </div>
                <div class="impp">
                <input type="file" id="file" ref="file" class="inputfile" v-on:change="handleFileUpload()"/>
                    <label for="file">Importer une photo</label>
                    <div v-if="notimg" role="alert">
                      {{msglert}}
                    </div>
                </div>
            </div><br>
            <label for="ville">Ville</label>
            <multiselect class="mul-reg-v" v-model="ville" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect><br>
            <label for="reg-tel">Téléphone</label>
            <input type="text" id="reg-tel" name="reg-tel" placeholder="Numéro de téléphone" v-model="tel" /><br>
            <button type="submit" class="b-lr regb" :disabled="registring">Créer un compte</button>
       
            <hr class="hr-login">
            <br><h5 class="h-lr text-center">Se connecter</h5>
            </form>
            <form class="d-login d-flex flex-column" @submit.prevent="login">
            <label for="usernamec">Email</label>
            <input type="text" id="usernamec" name="usernamec" placeholder="Email" v-model="mailco"/><br>
            <label for="pwdc">Mot de passe</label>
            <input type="password" id="pwdc" name="passwordc"  placeholder="Mot de passe" v-model="pwdco"/>
            <div class="remember">
                <input type="checkbox" v-model="remember" id="rememberMe"> <label for="rememberMe">Se souvenir</label>
            </div>
            <router-link class="pwd-reset" to="#">Mot de passe oublié ?</router-link>
            <button type="submit" class="b-lr logb" :disabled="loging">Connexion</button>
            </form>
    </div>
</template>
<style  scoped>
.addi{
    width: 60% !important;
}
.impp{
    position: relative;
    left: 3%;
}
    .success-img{
        position: relative;
        left: 2%;
        top: -0.5rem;
    }
    .us-inf-inf button{
        height: 32px;
        position: relative;
        left: 2%;
    }
    .inputfile {
	    width: 0.1px;
	    height: 0.1px;
	    opacity: 0;
	    overflow: hidden;
	    position: absolute;
	    z-index: -1;
    }
    .inputfile:focus + label {
    	outline: 1px dotted #000;
    	outline: -webkit-focus-ring-color auto 5px;
    }
    .inputfile + label {
        height: 32px;
        font-size: 1.1em;
        color: white;
        background-color: #004E66;
        display: inline-block;
        padding-top: 0.24rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: rgb(1, 102, 133);
    }
    .inputfile + label {
    	cursor: pointer; /* "hand" cursor */
    }
    .us-inf-inf{
        position: relative;
        left: 8%;
    }
    .us-info{
        position: relative !important;
        top: 1rem !important;
    }
    .us-inf-img img{
        border-radius: 50%;
    }
    .pwd-reset{
        height: 1em !important;
        position: relative;
        top: 0rem;
        color: rgb(7, 148, 190) !important;
        font-size: 1em;
    }
    .pwd-reset:hover{
        text-decoration: underline !important;
    }
    .c-register{
        z-index: 100;
    }
    .mul-reg-v{
        width: 50%;
        position: relative;
        left: 0;
    }
    .mul-reg-v input{
        border: none;
    }
</style>
<script>
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        data () {
            return {
                loging:false,
                registring:false,
                remember:false,
                mail:'',
                mailco:'',
                name:'',
                surname:'',
                pwd:'',
                pwdco:'',
                pwd2:'',
                tel:'',
                image:'/images/user.svg',
                file: '',
                saved:false,
                notimg:false,
                msglert:'',  
              value: 'Particulier',
              options: ['Particulier','Entreprise' ],
              ville: '',
              options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferkessédougou','Daloa',
                'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                'Odienné','Minignan','Mankono','Touba','Séguéla' ]
            }
        },
        computed:{
        },
        methods:{
            
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
              let reader  = new FileReader();
              reader.addEventListener("load", function () {
                  this.image = reader.result;
            }.bind(this), false);
            if( this.file ){
                 if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                     if(this.file.size>5000000){
                         this.msglert='Veuillez importer une image de taille < 5 MB';
                         this.notimg=true;
                         this.saved=false;
                     }
                     else{
                        reader.readAsDataURL( this.file );
                        this.$Progress.start();
                        this.submitFile();
                        this.$Progress.finish();
                        this.saved=true;
                        this.notimg=false;
                     }
                    
                 }
                 else{
                     this.msglert='Attention ! Vous devez importer une image';
                     this.notimg=true;
                     this.saved=false;
                 }
            }
          },
          async submitFile(){
              let formData = new FormData();
              formData.append('file', this.file);
              const {data}=await this.$http.post('http://localhost:8000/api/user',
                formData,{ headers: {'Content-Type': 'multipart/form-data'}});
              if(data==null)
                console.log('success');
              
          },
            login:function(){
                this.$Progress.start();
                this.loging=true
                this.registring=true
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
            register:function(){
                this.$Progress.start();
                this.registring=true
                this.loging=true
                var info = {
                  name: this.name,
                  email: this.mail,
                  password: this.pwd,
                  surname:this.surname,
                  ville:this.ville,
                  tel:this.tel

                }
                this.$store.dispatch('signup', info).then(() => this.$router.push('/connexion'))
                this.$Progress.finish();
            },
        },
    }
</script>
<style scoped>

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