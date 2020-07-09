<template>
  <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="d-flex  aaa">
        <i class="fa fa-user"></i> <h4 class="sttt"> Utilisateurs</h4>
        </div>
      </div>
      <div>
          <ul class="addli">
              <li  v-if="adding" @click="addnew">
                  <button class="regbs"><i class="fas fa-plus"></i> Ajouter un utilisateur</button>
              </li>
              <li v-else @click="addnew">
                  <button class="btn btn-danger"><i class="fas fa-times"></i> Annuler</button>
              </li>
          </ul>
      </div>
      <form @submit.prevent="register" class="adduss" v-if="isAdding">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="adddiv" style="width:30%">
            <label for="mail">Email <span style="color:red;">*</span></label>
            <input type="text" id="mail" name="mail" placeholder="Email"  v-model="mail" />
            </div>
            <div class="adddiv" style="width:30%">
            <label for="username">Nom <span style="color:red;">*</span></label>
            <input type="text" id="username" name="username" placeholder="Nom" v-model="name" />
            <span v-if="notname" style="color:red; font-size:12px">Vous devez donner un nom !</span>
            </div>
            <div class="adddiv" style="width:30%">       
            <label for="surname">Prénom</label>
            <input type="text" id="surname" name="surname" placeholder="Prénom" v-model="surname"/>
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="pwd">Mot de passe  <span style="color:red;">*</span></label>
            <input type="password" id="pwd" name="password"  placeholder="Mot de passe" v-model="pwd" />
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="pwdconf">Confirmation de mot de passe  <span style="color:red;">*</span></label>
            <input type="password" id="pwdconf" name="pwdconf"  placeholder="Confirmer votre mot de passe" v-model="pwd2" />
            </div>
            <div class="adddiv addiv" style="width:30%">
             <label for="ville">Ville</label>
            <multiselect class="mul-reg-v" v-model="ville" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect>
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="reg-tel">Téléphone</label>
            <input  v-on:keypress="checkTelPress" v-on:keyup="checkTelUp" type="text" id="reg-tel" name="reg-tel" placeholder="Numéro de téléphone" v-model="tel" />
            </div>
             <div class="adddiv addiv" style="width:30%">
            <label for="type">Type</label>
            <multiselect class="mul-reg-v" v-model="value" :allow-empty="false" :options="options" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir un type"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect>
            </div>
            <div class="adddiv addiv d-flex align-items-center justify-content-between" style="width:30%">
                <div class="us-inf-img">
                    <img :src="image" :height="64" :width="64"/>
                </div>
                <div class="impp">
                <input type="file" id="file" ref="file" class="inputfile" v-on:change="handleFileUpload()"/>
                    <label for="file">Importer une photo</label>
                </div>
            </div>
         </div>
          <button type="submit" class="b-lr regb" :disabled="registring">Ajouter le compte</button>
         <hr>
      </form>
      <div class="linlink">
          <ul class="d-flex justify-content-between">
              <li><router-link class="nnlink" to="/admin/users/me">Tous les Utilisateurs ({{all.length}})</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/me/part">Particuliers ({{part.length}})</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/me/admin">Administrateurs ({{adm.length}})</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/me/blck">Bloqués ({{block.length}})</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/me/report">Utilisateurs Signalés ({{usersReported.length}})</router-link></li>
          </ul>
      </div>
      <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'
export default {
    data(){
        return{
            users:[],
            usersReported:[],
            notname:false,
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
            search:'',
            adding:true,
            isAdding:false,
            ville: '',
              options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferkessédougou','Daloa',
                'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                'Odienné','Minignan','Mankono','Touba','Séguéla' ],
             value: 'particulier',
              options: ['particulier','administrateur' ]
        }
    },
    components: {
        Multiselect
    },
    computed:{
         mail: {
            // getter
            get: function () {
              return this.$store.state.okConnection.regmail
            },
            // setter
            set: function (newValue) {
              this.$store.state.okConnection.regmail=newValue
            }
          },
        all() {
            return this.users
        },
        part() {
            return this.users.filter(post => {
            return (post.type.toLowerCase().includes('particulier'))
            })
        },
        adm() {
            return this.users.filter(post => {
            return (post.type.toLowerCase().includes('administrateur'))
            })
        },
        block() {
            return this.users.filter(post => {
           return post.isblocked.toString().includes('1')
            })
        },
    },
    created(){
        this.getUser();
        this.getUserReported();
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
         async getUser(){
        this.$Progress.start();
        const { data } = await this.$http.get('http://localhost:8000/api/user');
         this.users=data
          
      },
       async getUserReported(){
        this.$Progress.start();
        const { data } = await this.$http.get('http://localhost:8000/api/usersignale');
         this.usersReported=data
          
      },
      okRegister(){
                if(this.name===''){
                    this.notname=true
                }
                else{
                    this.notname=false
                }
                
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
            register:function(){
                //this.$store.state.UserExistance=false
                this.$store.state.okConnection.okuser="" 
                this.$store.state.okConnection.okpwd=""
                this.$store.state.okConnection.notok=""
                this.$store.state.okConnection.okregmail=""
                this.okRegister()
                 if((this.$store.state.okConnection.okregmail==="true" && this.$store.state.okConnection.okregpwd==="true" && this.$store.state.okConnection.okregpwd2==="true")&&this.$store.state.okConnection.notokpwd!=="false"  && this.name!==''){
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
                     myForm.append('type',this.value)
                     myForm.append('ville',this.ville)
                     myForm.append('tel',this.tel)
                     if(this.picUploaded)
                        myForm.append('pic',this.file)
                    this.$store.dispatch('isUserExist', myForm).then(() =>{
                        if(this.$store.state.notUserExist){
                            this.$store.dispatch('signup', myForm).then(() =>{
                                this.getUser();
                                this.getUserReported();
                                this.$Progress.finish()
                                this.name=''
                                this.surname=''
                                this.pwd='',
                                this.pwd2=''
                                this.value='particulier'
                                this.ville=''
                                this.tel=''
                                this.file=''
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
        addnew(){
            this.adding=!this.adding;
            if(!this.adding)
                this.isAdding=true;
            else
                this.isAdding=false;
        }
    }
}
</script>
<style scoped>
.allrt{
    position: relative;
    top: 0.5rem;
    height: 32px;
}
.impp{
    position: relative;
    left: 1%;
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
</style>

        <style  scoped>
        .addli li{
            width: fit-content;
        }
            .pwd-reset{
                height: 1em !important;
                position: relative;
                top: 0rem;
                color: rgb(7, 148, 190) !important;
                font-size: 1em;
            }
            .adddiv input{
                width: 100% !important;
            }
            .addiv{
                position: relative;
                top: 1rem;
            }
            .pwd-reset:hover{
                text-decoration: underline !important;
            }
            .c-register{
                z-index: 100;
            }
            .adduss,.addli{
                position: relative;
                left: 0;
                padding: 0 !important;
            }
            .adduss{
                padding-bottom: 1rem !important;
            }
            .adduss > div{
                padding-bottom: 1rem !important;
            }
            .adduss hr{
                position: relative;
                top: 1rem;
            }
            .mul-reg-v{
                position: relative;
                left: 0;
            }
            .mul-reg-v input{
                border: none;
            }
        </style>
        <style lang="scss" scoped>
        .linlink{
            width: 95%;
            clear: both;
            position: relative;
        }
        .nnlink{
            color: #004e66 !important;
               text-decoration: underline !important;
            &:hover{
             color: rgb(90, 90, 90) !important;
            }
        }
        
        
        </style>
        <style scoped>
        
        .atote{
            position: relative;
            padding-right: 5%;
        }
        .sttt{
            position: relative;
            left: 5%;
        }
        .noff{
            position: relative;
            left: 26%;
            top: 0.7rem;
        }
        
        .spii{
            position: relative;
            right: 25%;
            top: -0.5rem;
        }
        .fa-comment,.fabell svg{
            font-size: 20px;
        }
        .ddrap div{
            cursor: pointer;
        }
        .toos{
            background-color: rgb(0, 72, 93);
            position: relative;
            top: 1.5rem;
        }
        .toos:hover{
            background-color: rgb(124, 212, 83);
        }
        .toos:hover .nav-link 
        {
            color: white !important;
        }
        .nav-link:hover{
            color: rgb(255, 255, 255) !important;
        }
        .inks:hover{
            color: rgb(255, 255, 255) !important;
        }
        .myyy{
            overflow: auto;
            width: 20% !important;
            height: 100% !important;
        }
        .myyys{
            overflow: auto;
            width: 20% !important;
            height: 100% !important;
        }
        .row{
            height: 100%;
        }
        
        #sidebarMenu{
            overflow: unset !important;
            background-color: #004E66;
            height: 100% !important;
            padding-bottom: 2rem;
        }
        .nav-link svg{
            height: 16px !important;
            width: 16px !important;
        }
        .aa svg{
            height: 24px !important;
            width: 24px !important;
        }
        .aaa svg{
            height: 28px !important;
            width: 28px !important;
        }
         .dropdown-toggle::after{
            position: relative;
            top: 0.08rem;
            left: 1%;
          }
        
        .too {
            background-color: rgb(0, 72, 93);
        }
        .userB{
            position: relative;
            right: 5%;
            top: -0.1em;
            color: rgb(238, 238, 238) !important;;
        }
        .logo-title{
            height: 48px;
          position: relative;
          left: 8%;
          font-weight: 400;
          color: /*white*/ rgb(243, 243, 243) !important;
        }
        
        .nav-item a{
            color: rgb(206, 206, 206) !important;
        }
            .iidd{
                
            background-color: #004E66 !important;
            }
        </style>