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
      <div class="adduss" v-if="isAdding">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="adddiv" style="width:30%">
            <label for="mail">Email ou Téléphone</label>
            <input type="text" id="mail" name="mail" placeholder="Email ou numéro de téléphone" />
            </div>
            <div class="adddiv" style="width:30%">
            <label for="username">Nom</label>
            <input type="text" id="username" name="username" placeholder="Nom" />
            </div>
            <div class="adddiv" style="width:30%">       
            <label for="surname">Prénom</label>
            <input type="text" id="surname" name="surname" placeholder="Prénom" />
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="pwd">Mot de passe</label>
            <input type="password" id="pwd" name="password"  placeholder="Mot de passe" />
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="pwdconf">Confirmation de mot de passe</label>
            <input type="password" id="pwdconf" name="pwdconf"  placeholder="Confirmer votre mot de passe" />
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="ville">Ville</label>
            <multiselect class="mul-reg-v" v-model="value1" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect>
            </div>
            <div class="adddiv addiv" style="width:30%">
            <label for="reg-tel">Téléphone</label>
            <input type="text" id="reg-tel" name="reg-tel" placeholder="Numéro de téléphone" />
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
                    <div v-if="saved" class="allrt" role="alert">
                      ✓
                    </div>
                    <div v-if="notimg" class="allrt" role="alert">
                      {{msglert}}
                    </div>
                </div>
            </div>
         </div>
          <button type="button" class="b-lr regb" v-on:click="login()">Ajouter le compte</button>
         <hr>
      </div>
      <div class="linlink">
          <ul class="d-flex justify-content-between">
              <li><router-link class="nnlink" to="/admin/users">Tous les Utilisateurs (45)</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/part">Particuliers (45)</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/admin">Administrateurs (45)</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/blck">Bloqués (45)</router-link></li>
              <li><router-link class="nnlink" to="/admin/users/report">Utilisateurs Signalés (45)</router-link></li>
          </ul>
      </div>
      <router-view></router-view>
  </div>
</template>
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
<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'
export default {
    data(){
        return{
            image:'/images/profile/2.JPG',
                file: '',
                saved:false,
                notimg:false,
                msglert:'',  
            search:'',
            adding:true,
            isAdding:false,
            value1: '',
              options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferkessédougou','Daloa',
                'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                'Odienné','Minignan','Mankono','Touba','Séguéla' ],
             value: '',
              options: ['Particulier','Administrateur' ]
        }
    },
    components: {
        Multiselect
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
