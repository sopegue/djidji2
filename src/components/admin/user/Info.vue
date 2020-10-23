<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
                <div class="us-inf-img"  v-lazy-container="{ selector: 'img', error: '/images/user.png', loading: '/images/loadings.gif ' }">
                    <img :style="{'position':'relative','top':'2.2rem' }" :data-src="mypp"/>
                </div>
                <div class="us-inf-inf d-flex"> 
                    <input type="file" id="file" ref="file" class="inputfile" v-on:change="handleFileUpload()"/>
                    <label for="file">Importer une photo</label>
                    <div v-show="saved" class="alert alert-success success-img" role="alert">
                      Photo mis à jour avec succès ✓
                    </div>
                    <div v-if="notimg" class="alert alert-danger success-img" role="alert">
                      {{msglert}}
                    </div>
                </div>
                <form @submit.prevent="updateUser" class="d-inf-us d-flex flex-column">
                    <h5 class="">Mes informations</h5>
                    <hr class="hr-us-inf">
                    <label for="mail">Email</label>
                    <input type="text" id="mail" name="mail" placeholder="Email" v-model="mail"/>
                    <span style="color:red;font-size:12px;" v-if="validMail">Email invalide.</span><br>
                    <label for="username">Nom</label>
                    <input type="text" id="username" name="username" placeholder="Nom" v-model="name"/>
                     <span style="color:red;font-size:12px;" v-if="validName">Nom invalide.</span><br>
                    <label for="surname">Prénom</label>
                    <input type="text" id="surname" name="surname" placeholder="Prénom" v-model="surname"/><br>
                    <label for="ville">Ville</label>
                    <multiselect class="mul-reg-v" v-model="value1" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect><br>
                    <label for="reg-tel">Téléphone</label>
                    <input @paste="onPaste" v-on:keypress="checkTelPress" v-on:keyup="checkTelUp" type="text" id="reg-tel" name="reg-tel" placeholder="Numéro de téléphone" v-model="tel"/><br>
                     <span style="color:red;font-size:12px;" v-if="validTel">Numéro invalide.</span><br>
                    <button type="submit" class="b-us_inf regb" >Enregistrer</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        computed:{
            mypp(){

                return this.$store.state.currentUser.id ? 'https://djidjii.herokuapp.com/storage/'+this.$store.state.currentUser.id+'/profile/'+this.$store.state.currentUser.pp : ''
            },
            mail:{
                get:function(){
                    return this.$store.state.currentUser.email
                },
                set:function(val){
                    this.$store.state.currentUser.email=val
                }
            },
            name:{
                get:function(){
                    if( this.$store.state.currentUser.Nom==null)
                    return ''
                    return this.$store.state.currentUser.Nom
                },
                set:function(val){
                    this.$store.state.currentUser.Nom=val
                }
            },
            surname:{
                get:function(){
                    if( this.$store.state.currentUser.Prenom==null)
                    return ''
                    return this.$store.state.currentUser.Prenom
                },
                set:function(val){
                    this.$store.state.currentUser.Prenom=val
                }
            },
            value1:{
                get:function(){
                    if( this.$store.state.currentUser.ville==null)
                    return ''
                    return this.$store.state.currentUser.ville
                },
                set:function(val){
                    this.$store.state.currentUser.ville=val
                }
            },
            tel:{
                get:function(){
                    if( this.$store.state.currentUser.tel==null)
                    return ''
                    return this.$store.state.currentUser.tel
                },
                set:function(val){
                    this.$store.state.currentUser.tel=val
                }
            }
        },
        data () {
            return {
                image:'',
                validMail:false,
                picUpdated:false,
                validName:false,
                validTel:false,
                file: '',
                saved:false,
                notimg:false,
                msglert:'',  
                options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferkessédougou','Daloa',
                  'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                  'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                  'Odienné','Minignan','Mankono','Touba','Séguéla' ]
            }
        },
        methods: {
            onPaste:function(evt){
                if(isNaN(this.$store.state.currentUser.tel) || this.$store.state.currentUser.tel.replace(/\s/g, "").length>8)
                    this.$store.state.currentUser.tel=''
            },
            checkTelPress:function(evt){
                if(this.$store.state.currentUser.tel==null)
            var str = ''
        else
            var str = this.$store.state.currentUser.tel;
    if (evt.which < 48 || evt.which > 57 || str.replace(/\s/g, "").length>8)
    {
        evt.preventDefault();
    }
    },
    checkTelUp(){
        if(this.$store.state.currentUser.tel==null)
            var str = ''
        else
            var str = this.$store.state.currentUser.tel;
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
      this.$store.state.currentUser.tel=str;
    },
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
                        //this.$store.dispatch('checkLogin')
                        
                        reader.readAsDataURL( this.file );
                        this.$Progress.start();
                        this.updatePic();
                        this.$Progress.finish();
                        
                        this.$store.dispatch('checkLogin').then(()=>{
                            this.picUpdated=true
                        })
                        //alert( 'https://djidjii.herokuapp.com/storage/'+this.$store.state.currentUser.id+'/profile/'+this.$store.state.currentUser.pp)
                        this.saved=true;
                        this.notimg=false;
                        setTimeout(function(){ this.saved=false }, 5000);
                     }
                    
                 }
                 else{
                     this.msglert='Attention ! Vous devez importer une image';
                     this.notimg=true;
                     this.saved=false;
                 }
            }
          },
          
          validField(){
              if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail))){
                  this.validMail=true
              }
              else
                this.validMail=false

                  if(this.name===""){
                      this.validName=true
                  }
                  else
                    this.validName=false

                      if(this.tel.replace(/\s/g, "").length!=0 && this.tel.replace(/\s/g, "").length<8)
                        this.validTel=true
                      else
                        this.validTel=false
              
            if(this.validMail==false && this.validName == false && this.validTel == false)
                return true
            return false
          },
          updateUser(){
              if(this.validField()){
                  var form= new FormData()
                  form.append('user',this.$store.state.currentUser.id)
                  form.append('email',this.mail)
                  form.append('name',this.name)
                  form.append('surname',this.surname)
                  form.append('ville',this.value1)
                  form.append('tel',this.tel)
                  this.$store.dispatch('isUserExistUpdate',form).then(()=>{
                      if(this.$store.state.notUserExist){
                          this.applyUpdate(form)
                      }
                      else{
                          this.$notify({
                           group: 'User-unmodified'
                         });
                      }
                  })
                  
              }
          },
          
          async applyUpdate(user){
              this.$notify({
                   group: 'User-modified'
                 });
              this.$http.post('https://djidjii.herokuapp.com/api/user/UpdateUser', user)
              .then(resp => { // store the token in localstorage
                
                 console.log('updated')
                 this.$store.dispatch('checkLogin')
                 this.$Progress.finish()
                 
              })
            .catch(err => { // if the request fails, remove any possible user token if possible
              console.log(err)
              this.$Progress.finish();
            })
              
          },
          async updatePic(){
              let formData = new FormData();
              formData.append('file', this.file);
              formData.append('user',this.$store.state.currentUser.id)
              const {data}=await this.$http.post('https://djidjii.herokuapp.com/api/user/UpdatePic',
                formData,{ headers: {'Content-Type': 'multipart/form-data'}});
              if(data==null)
                console.log('success');
              
          },
        },
         watch:{
          saved: { 
            handler: function(n){
              this.saved=n
            },
            deep: true
          },
          hidemenu () {
            this.shme=false
          }
        },
    }
</script>
<style scoped>
  img[lazy=error] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
  img[lazy=loaded] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
    .mul-reg-v{
        width: 50%;
        position: relative;
        left: auto;
    }
    .mul-reg-v input{
        border: none;
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
        margin-left: 1rem;
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
