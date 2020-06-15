<template >
    <div class="c-register" style=" position:relative; top:1rem;">
        
         <div v-if="this.$store.state.okRegister==='false'" class="alert dan alert-danger text-center" role="alert">
          Désolé cet email existe déja &#10005;.<br>
           Connecter vous si cet email vous appartient. <br>
           Réinitialiser votre mot de passe si vous l'avez oublié.
        </div>
        <br><h3 class="h-lr text-center">Créer un compte pour vous connecter</h3>
        <div class="c-error"></div>
        <form class="d-login d-flex flex-column" @submit.prevent="register">
            <label for="mail">Email <span style="color:red;">*</span></label>
            <input type="text" id="mail" name="mail" placeholder="Email"  v-model="mail" /><br>
            <label for="username">Nom <span style="color:red;">*</span></label>
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
                </div>
            </div><br>
            <label for="ville">Ville</label>
            <multiselect class="mul-reg-v" v-model="ville" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect><br>
            <label for="reg-tel">Téléphone</label>
            <input  v-on:keypress="checkTelPress" v-on:keyup="checkTelUp" type="text" id="reg-tel" name="reg-tel" placeholder="Numéro de téléphone" v-model="tel" /><br>
            <button type="submit" class="b-lr regb" :disabled="registring">Créer un compte</button>
       
            <hr class="hr-login">
            <br><h5 class="h-lr text-center">Se connecter</h5>
            </form>
            <form class="d-login d-flex flex-column" @submit.prevent="login">
            <label for="usernamec">Email<span style="color:red;"> *</span></label>
            <input type="text" id="usernamec" name="usernamec" placeholder="Email" v-model="mailco"/><br>
            <label for="pwdc">Mot de passe<span style="color:red;"> *</span></label>
            <input type="password" id="pwdc" name="passwordc"  placeholder="Mot de passe" v-model="pwdco"/>
            <br>
            <router-link class="pwd-reset" to="#" @click.native="goReinit">Mot de passe oublié ?</router-link>
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
                picUploaded:false,
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
            
    checkTelPress:function(evt){
    if (evt.which < 48 || evt.which > 57 || this.tel.replace(/\s/g, "").length>8)
    {
        evt.preventDefault();
    }
    },
    checkTelUp(){
     var str = this.tel;
      var count=(str.split(" ").length - 1)
      //var string=str.substr(0,str.indexOf(' '))
      str=str.replace(/\s/g, "")

      if(str.length>8){
        str=str.substring(0, (str.length-1))
      }
      var len=str.length
      if (len > 2) {
        if (len ==3 || len ==4){
          //if(count==0)
          str = str.slice(0, 2) + " " + str.slice(2);
        }
        if (len ==5 || len ==6){ 
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2,4)+ " "+ str.slice(4);
        }
        if (len == 7 || len ==8 ){
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2,4)+ " "+ str.slice(4,6) + " " + str.slice(6);
        }
      }
      this.tel=str;
    },
            goReinit(){
                this.$router.push('/reinit')
            },
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
              console.log( this.$refs.file.files[0])
              let reader  = new FileReader();
              reader.addEventListener("load", function () {
                  this.image = reader.result;
            }.bind(this), false);
            if( this.file ){
                 if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                     if(this.file.size>5000000){
                         this.msglert='Veuillez importer une image de taille < 5 MB';
                         
                     }
                     else{
                        this.picUploaded=true
                         reader.readAsDataURL( this.file );
                     }
                    
                 }
                 else{
                     this.msglert='Attention ! Vous devez importer une image';
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
                if(this.pwd!==""){
                    if (this.pwd.length<8){
                        this.$store.state.okConnection.okregpwd="short"
                    }
                    else
                        this.$store.state.okConnection.okregpwd="true"
                }
                else
                        this.$store.state.okConnection.okregpwd="false"
                
                 if(this.pwd2!==""){
                    if (this.pwd2.length<8){
                        this.$store.state.okConnection.okregpwd2="short"
                    }
                    else
                        this.$store.state.okConnection.okregpwd2="true"
                }
                else
                        this.$store.state.okConnection.okregpwd2="false"
                if((this.pwd2!=="" && this.pwd!=="") && (this.pwd2 === this.pwd))
                    this.$store.state.okConnection.notokpwd="true"
                else
                    this.$store.state.okConnection.notokpwd="false"
            },
            login:function() {
                this.$store.state.okConnection.okregmail=""
                this.$store.state.okConnection.notok=""
                this.$store.state.okConnection.okregpwd=""
                this.$store.state.okConnection.okregpwd2=""
                this.$store.state.okConnection.notokpwd=""
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
                        else
                            this.$router.push(this.$store.state.previous)

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
            register:function(){
                //this.$store.state.UserExistance=false
                this.$store.state.okConnection.okuser="" 
                this.$store.state.okConnection.okpwd=""
                this.$store.state.okConnection.notok=""
                this.$store.state.okConnection.okregmail=""
                this.okRegister()
                if((this.$store.state.okConnection.okregmail==="true" && this.$store.state.okConnection.okregpwd==="true" && this.$store.state.okConnection.okregpwd2==="true")&&this.$store.state.okConnection.notokpwd!=="false"){
                    this.$store.state.okConnection.okregpwd=""
                    this.$store.state.okConnection.okregpwd2=""
                    this.$store.state.okConnection.notokpwd=""
                    this.$store.state.okConnection.okregmail===""
                     this.$Progress.start();
                     var myForm= new FormData()
                     myForm.append('name',this.name)
                     myForm.append('surname',this.surname)
                     myForm.append('email',this.mail)
                     myForm.append('password',this.pwd)
                     myForm.append('ville',this.ville)
                     myForm.append('tel',this.tel)
                     if(this.picUploaded)
                        myForm.append('pic',this.file)
                    this.$store.dispatch('isUserExist', myForm).then(() =>{
                        if(this.$store.state.notUserExist){
                            this.$store.dispatch('signup', myForm).then(() =>{
                                 this.$router.push('/connexion');
                                 this.$notify({
                                    group: 'success-reg',
                                });
                            })
                        }
                        else{
                            this.$notify({
                                group: 'existUser',
                            })
                        }
                    })
                    }
                     else
                     this.$notify({
                        group: 'custom-template',
                     type:'warn'
                    });
               
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
    .alert{
        margin: 0 auto;
        width: 30%;
    }
     .dan{
        margin: 0 auto;
        width: 40%;
    }
</style>