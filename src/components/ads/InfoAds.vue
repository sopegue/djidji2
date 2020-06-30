<template>
  <div class="bdd">
      <div v-if="isLoading" class="us-list-load">
        <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
      </div>
      <transition  v-else name="fade">
      <div class="bdb d-flex flex-row">
      <div class="bd-left">
          <div class="ad-bd-img">
            <vueper-slides
                  fade
                  arrowsOutside
                  ref="vueperslides1"
                 style="border-radius : 30px !important;"
                  @slide="$refs.vueperslides2 && $refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
                  :slide-ratio="1 / 8"
                  :bullets="false"
                  fixed-height="400px">
                  <vueper-slide
                    v-for="(pp,index) in pic"
                    :key="index">
                    <template v-slot:content>
                      <div class="d-vi-img"  v-lazy-container="{ selector: 'img', error: '/images/error.png', loading: '/images/loadingss.gif' }">
                        <img class="vueperslide__image" style="border-radius : 10px;" :data-src="'http://localhost:8000/storage/'+users+'/annonces/'+pic[index]"/>
                      </div>
                    </template>
                  </vueper-slide>
            </vueper-slides>
          <vueper-slides
            :arrowsOutside="false"
            :disableArrowsOnEdges="true"
            :bullets="false"
            :style="'background-color: rgb(250, 250, 250)'"
            ref="vueperslides2"
            :gap="3"
            class="no-shadow"
            :slide-ratio="1 / 8"
            :dragging-distance="70"
            @slide="$refs.vueperslides1 && $refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
            :visible-slides="6"
            fixed-height="64px">
            <vueper-slide
            v-for="(i,index) in pic.length"
            :key="index"
            @click.native="$refs.vueperslides2 && $refs.vueperslides2.goToSlide(i - 1)">
              <template v-slot:content>
                <div class="vueperslide__content-wrapper"  v-lazy-container="{ selector: 'img', error: '/images/error.png', loading: '/images/loadingss.gif'  }">
                  <img class="vueperslide__image1" style="border-radius : 10px;" :data-src="'http://localhost:8000/storage/'+users+'/annonces/'+pic[index]"/>
                </div>
              </template>
            </vueper-slide>
          </vueper-slides>
          </div>
          <div class="ad-descr">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td class="tit">Description détaillée</td>
                  <td class="details text-xsmall">{{desc}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            
      </div>
      <div class="bdd-right">
          <div class="titre d-flex justify-content-between">
            <div>
              <i class="fas fa-tags"></i><span><router-link to="#" @click.native="gotoAdCateg(categ)"> {{categ}}</router-link> </span><span v-if="categ!=='Autres'"> > <router-link to="#" @click.native="gotoAdsCateg(categ,souscateg)"> {{souscateg}}</router-link></span> 
            </div>
             <div  v-if="!this.$store.state.currentUser.id || this.$store.state.currentUser.id && (this.$store.state.currentUser.id !=this.user.id)" class="d-btn-nc d-flex justify-content-between align-items-center">
            <div v-show="saved==false">
            <button  title="Ajouter à ma liste" @click="sauverAd" class="btn-nc df btn btn-link">
                <span><i class="fas fa-plus" key="stared"></i></span>
            </button>
            </div>
            <div v-show="saved==true">
            <button  type="button" @click="retirerAd" title="Retirer de ma liste" class="btn-nc df btn btn-link">
                <span><i class="fas fa-check" key="unstared"></i></span>
            </button>
            </div>
            <button @click="signalerAd" title="Signaler l'annonce" class="btn-nc btn btn-link">
                <i class="fas fa-exclamation-circle"></i>
            </button>
          
          </div>
          <div v-else class="d-btn-nc d-flex justify-content-between align-items-center">
            <button @click="modifierAd" title="Modifier l'annonce" class="btn-nc btn btn-link">
              <i class="fas fa-edit"></i>
          </button> 
          <button @click="supprimerAd" title="Supprimer l'annonce" class="btn-nc btn btn-link">
              <i class="fas fa-trash"></i>
          </button>
          </div>
      
          </div>
          <div class="pr-titre">
            <span class="pr">{{prix}} FCFA</span><br><br>
            <div id="ppptitre">
            <span class="ptitre">{{ad.titre}}</span>
            </div>
            <span class="d-aj">Ajouté il y'a {{date}}</span>
          </div>
          <hr class="hr1">
          
          <div class="user-bdd">
              <div class="ustt d-titre d-flex justify-content-between">
                  <span class="pptitre">Annonceur</span><button @click="signalerUser" v-if="!this.$store.state.currentUser.id || this.$store.state.currentUser.id && (this.$store.state.currentUser.id !=this.user.id)" title="Signaler l'utilisateur" class="text-center impbtn">
                  <i class="fas ffaex fa-exclamation-circle"></i>
              </button>
              </div>
             <div class="us-inf-img d-user d-flex flex-row">
                <div class="us-inf-img"  v-lazy-container="{ selector: 'img', error: '/images/user.png', loading: '/images/user.png' }">
                    <img :style="{'position':'relative','top':'2.2rem' }" :data-src="'http://localhost:8000/storage/'+user.id+'/profile/'+user.pp"/>
                </div>
                <div class="inf-nv">
                  <span class="ppr">{{this.user.Prenom}} {{this.user.Nom}}</span><br>
                  <span class="pville"><i class="fas fa-map-pin"></i> {{this.ad.ville}}</span>
                </div>
              </div>
              
              <div class="dd-cc">
                <span class="pville d-cc">Membre depuis {{dateM}}</span>
              </div>
          </div>
          
          <div v-if="!this.$store.state.currentUser.id  || this.$store.state.currentUser.id && (this.$store.state.currentUser.id !=this.user.id)" class="contact-bdd d-flex flex-row">
             <button type="button" @click.prevent="afficheMbox" class="b-lr regbs"><i class="fas fa-envelope"></i> Envoyer un message</button>
             <button type="button" v-if="!showTelBox" @click="afficheTelBox"  class="b-lr regbs regg2"><i class="fas fa-phone"></i> Contacter par téléphone</button>
             <transition v-else name="fade">
             <div style="margin-top:1.4rem; margin-left:1rem; z-index: 11;">
               <span> Téléphone : {{ad.tel}}</span> <span v-if="ad.what==1" style="margin-left:1rem;"><i  title="Ce numéro a un compte Whatsapp" class="fab fa-whatsapp"></i></span>
             </div>
             </transition>
          </div>
          <div v-if="this.$store.state.currentUser.id && (this.$store.state.currentUser.id ==this.user.id)" class="contact-bdd d-flex flex-row text-center">
             <p>Cette annonce vous appartient.</p>
          </div>
          
          <hr class="hr11">
           <transition v-if="showMbox" name="fade">
             <div>
          <div style="position:relative; padding-top:5rem;">
            <h5 class="text-center">Envoyez votre message à l'annonceur</h5>
            <form @submit.prevent="envoyerMail">
                <div class="half left cf">
                  <input type="text" id="input-name" placeholder="Votre nom" v-model="name">
                  <span style="color:red;font-size:12px;" v-if="nameValid" >Veuillez ajouter un nom ! </span>
                  <input type="email" id="input-email" placeholder="Votre adresse email" v-model="mail">
                  <span style="color:red;font-size:12px;" v-if="mailValid">Veuillez ajouter une adresse email ou votre email est invalide ! </span>
                </div>
                <div class="half right cf">
                  <textarea name="message" type="text" id="input-message" placeholder="Votre message" v-model="message"></textarea>
                  <span style="color:red;font-size:12px;" v-if="messValid">Veuillez ajouter un message ! </span>
                </div>
                <button type="submit" id="input-submit">Envoyer <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </form>
            </div>
          
          </div>
           </transition>
          
      </div>
  </div>
  </transition>
  <div class="alert-bdd d-flex flex-row text-center mx-auto">
    <p class="warn-alrt"><i class="fas fa-exclamation-triangle"></i></p>
    <p class="warn-mess">Assurez-vous de vérifier la crédibilité des annonces avant de procéder à tout achat. <br>
      Il est aussi recommandé de procéder à l'échange dans un lieu public.
    </p>
  </div>
  </div>
</template>
<style lang="scss" scoped>
.details{
  white-space: pre-wrap;
}
.cdcd{
  width: 20px;
  height: 20px;
}
.fa-edit{
  position: relative;
  top: -0.15rem;
  right: .30rem;
  color: #ddd; 
}
.fa-trash{
  position: relative;
  top: -0.15rem;
  right: .3rem;
  color: #ddd;
}
.btn-nc{
  position: relative;
  top: -.1rem;
  right: 0.2rem;
  background-color: rgba(0, 0, 0, 0.5) !important;
  width: 32px;
  height: 32px;
  z-index: 1;
}
.df{
  position: relative;
  top: -.2rem;
}
button{
  z-index: 10;
  cursor: pointer !important;
}
.fa-whatsapp{
  font-size: 20px;
  color: green;
}
@import url(https://fonts.googleapis.com/css?family=Merriweather);
$red: #e74c3c;

form {
   max-width: 600px;
   text-align: center;
   margin: 20px auto;
  input{
    height: 16px;
  }
  input, textarea {
     border:0; outline:0;
     padding: 1em;
     display: block;
     width: 100%;
     margin-top: 1em;
     font-family: 'Merriweather', sans-serif;
     resize: none;
    
  }
  
  #input-submit {
     color: white; 
     background: rgb(1, 151, 81);
     cursor: pointer;
     position: relative;
     top: 0.5rem;
     width: 100%;
    
    
    &:hover {
      background-color: #004e66;
    }
  }
  
  textarea {
      height: 150px;
  }
}


.half {
  float: left;
  width: 48%;
  margin-bottom: 1em;
}

.right { width: 50%; }

.left {
     margin-right: 2%; 
}


@media (max-width: 480px) {
  .half {
     width: 100%; 
     float: none;
     margin-bottom: 0; 
  }
}


/* Clearfix */
.cf:before,
.cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}

.cf:after {
    clear: both;
}
</style>
<style scoped>
.contact-bdd p{
  width: fit-content;
  margin:  0 auto;
}
  #ppptitre{
    width: 80% !important;
    word-wrap: break-word;
  }
</style>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'InfoAd',
  data(){
    return{
      pic:[],
      us:[],
      saved:false,
      mail:'',
      name:'',
      message:'',
      sending:false,
      messValid:false,
      nameValid:false,
      mailValid:false,


      add:[],
      usReady:false,
      isLoading:true,
      showMbox:false,
      loadTel:true,
      loadM:true,
      showTelBox:false
      //saved:false
    }
  },
  computed:{
    users(){
      return this.ad.use_id
    },
    desc(){
      return this.ad.description
    },
    categ(){
      return this.ad.categorie
    },
    souscateg(){
      
      return this.ad.souscateg
    },
    date(){
      var date=new Date(this.ad.created_at.toString())
      var date1 = Date.now()
      var mili = date.getTime()
      const diffTime = Math.floor(Math.abs(date1 - mili)/1000)
      console.log(diffTime + " seconds")
      if(Math.floor(diffTime/60)>=1){
        if(Math.floor(diffTime/(60*60))>=1){
          if(Math.floor(diffTime/(60*60*24))>=1){
            if(Math.floor(diffTime/(60*60*24*7))>=1){
              if(Math.floor(diffTime/(60*60*24*7*4))>=1){
                if(Math.floor(diffTime/(60*60*24*7*4*12))>=1){
                  return Math.floor(diffTime/(60*60*24*7*4*12)).toString()+' an(s)'
                }
                else
                  return Math.floor(diffTime/(60*60*24*7*4)).toString()+' mois'
                
              }
              else
                return Math.floor(diffTime/(60*60*24*7)).toString()+' semaine(s)'
            }
            else{
              return Math.floor(diffTime/(60*60*24)).toString()+' jour(s)'
            }
          }
          else{
            return Math.floor(diffTime/(60*60)).toString()+' heure(s)'
          }
        }
        else{
          return Math.floor(diffTime/60).toString()+' minute(s)'
        }
      }
      else{
        return '1 minute'
      }

    },
    dateM(){
      var date=new Date(this.user.created_at.toString())
      var date1 = Date.now()
      var mili = date.getTime()
      const diffTime = Math.floor(Math.abs(date1 - mili)/1000)
      console.log(diffTime + " seconds")
      if(Math.floor(diffTime/60)>=1){
        if(Math.floor(diffTime/(60*60))>=1){
          if(Math.floor(diffTime/(60*60*24))>=1){
            if(Math.floor(diffTime/(60*60*24*7))>=1){
              if(Math.floor(diffTime/(60*60*24*7*4))>=1){
                if(Math.floor(diffTime/(60*60*24*7*4*12))>=1){
                  return Math.floor(diffTime/(60*60*24*7*4*12)).toString()+' an(s)'
                }
                else
                  return Math.floor(diffTime/(60*60*24*7*4)).toString()+' mois'
                
              }
              else
                return Math.floor(diffTime/(60*60*24*7)).toString()+' semaine(s)'
            }
            else{
              return Math.floor(diffTime/(60*60*24)).toString()+' jour(s)'
            }
          }
          else{
            return Math.floor(diffTime/(60*60)).toString()+' heure(s)'
          }
        }
        else{
          return Math.floor(diffTime/60).toString()+' minute(s)'
        }
      }
      else{
        return '1 minute'
      }
    },
    titres(){
        var str = this.ad.titre;
      var len = str.length;
       if(str.length>19)
       return str.slice(0,16)+'...'
       return str
      },
    prix(){
       var str = this.ad.prix.toString();
      var len = str.length;
      if (len > 4) {
        if (len == 5) str = str.slice(0, 2) + " " + str.slice(2);
        if (len == 6) str = str.slice(0, 3) + " " + str.slice(3);
        if (len == 7)
          str = str.charAt(0) + " " + str.slice(1, 4) + " " + str.slice(4);
        if (len == 8){
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2, 5) + " " + str.slice(5);
        }
        if (len == 9){
          //if(count==1)
          str = str.slice(0, 3) + " " + str.slice(3, 6) + " " + str.slice(6);
        }
        if (len == 10){
          //if(count==1)
          str = str.slice(0, 1) + " " + str.slice(1, 4) + " " + str.slice(4,7)+ " " + str.slice(7);
        }
      }
      return str;
    
    }
  },
    beforeMount(){
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
    },
  props:['ad','user']
  ,
  watch:{
      ad: { 
        handler: function(n){
          this.checkIfSaved()
          this.pic=this.ad.pp.split(",")
          if(!this.pic)
            this.pic[0]=this.ad.pp
      },
      deep: true,
      },
      user:{
        handler: function(n){
        this.isLoading=false;
        this.usReady=true;
      },
      deep: true
      }
  },
  methods:{
    afficheTelBox(){
      this.showTelBox=true
    },
    afficheMbox(){
      this.showMbox=!this.showMbox
    },
    checkIfSaved(){
        if(this.$store.state.accessToken!=='')
        {
        var form= new FormData()
        form.append('user',this.$store.state.currentUser.id)
        form.append('ad',this.ad.id)
        this.$http.post('http://localhost:8000/api/savedAdsCheck', form ).then(response => {
          if(response.data!=0)
            {
              this.saved=true
              console.log('saved',this.saved)
            }
          else
            this.saved=false
         //console.log('user',this.$store.state.currentUser.id,'ad',this.ads.id)
        })
        }
      },
    checkField(){
      this.messValid=false
      this.nameValid=false
      this.mailValid=false
      if(this.mail!=='' && this.name!=='' && this.message!==''){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail)){
          return true
        }else{
          this.mailValid=true
          return false
        }
        
      }
      if(this.mail==='')
        this.mailValid=true
      if(this.name==='')
        this.nameValid=true
      if(this.message==='')
        this.messValid=true
      return false
    },
    resetField(){
      this.mail=''
      this.name=''
      this.message=''
    },
     supprimerAd(){
       var r = confirm("Voulez-vous supprimer cette annonce ? Cliquez sur Ok pour supprimer.")
        if (r == true) {
        this.$Progress.start()
        var content = new FormData()
          content.append('ad',this.ad.id)
          this.$store.dispatch('supprimerAd',content).then(()=>{
            this.$notify({
              group: 'deladdel',
            });
             this.$Progress.finish()
             this.$router.go(-1)
          })
          }
      },
      modifierAd(){
        this.$Progress.start()
        this.$store.state.adToDelete=this.ad.id
        var content = new FormData()
          content.append('ad',this.ad.id)
        this.$store.dispatch('getAdToDel',content).then(()=>{
           this.$Progress.finish()
          this.$router.push('/annonce/updating')
        })
      },
    envoyerMail(){
      if(this.checkField()){
        this.$Progress.start()
        this.sending=true
        var content = new FormData()
        content.append('email',this.mail)
        content.append('to_user',this.user.id)
        content.append('toemail',this.user.email)
        console.log(this.user.email)
        content.append('ad',this.ad.id)
        content.append('prix',this.prix)
        content.append('titre',this.titres)
        content.append('name',this.name)
        content.append('message',this.message)
        if(this.$store.state.accessToken!=='')
          content.append('user',this.$store.state.currentUser.id)
        // envoyer le message
        this.$Progress.finish()
         
        this.resetField()
          this.$notify({
              group: 'success-sendEmail',
          });
        this.$store.dispatch('sendEmail',content).then(()=>{
         
        })
      }
    },
      retirerAd(){
        var content = new FormData()
          content.append('ad',this.ad.id)
          content.append('user',this.$store.state.currentUser.id)
          this.$store.dispatch('retirerAd',content).then(()=>{
            this.$notify({
              group: 'removed',
            })
            this.checkIfSaved()
            if(this.$router.currentRoute.path==='/user/list')
              location.reload()
          })
      },
      signalerAd(){
        var r = confirm("Pensez-vous que cette annonce est inappropriée ? Cliquez sur Ok pour signaler.")
        if (r == true) {
          var content = new FormData()
          content.append('ad',this.ad.id)
          if(this.$store.state.accessToken!=='')
            content.append('user',this.$store.state.currentUser.id)
          this.$store.dispatch('signalerAd',content).then(()=>{
            this.$notify({
              group: 'ad-signaler',
            })
          })
        }
      },
      signalerUser(){
        var r = confirm("Pensez-vous que ce compte est inapproprié ? Cliquez sur Ok pour signaler.")
        if (r == true) {
          var content = new FormData()
          content.append('user_to',this.ad.use_id)
          if(this.$store.state.accessToken!=='')
            content.append('user',this.$store.state.currentUser.id)
          this.$store.dispatch('signalerUser',content).then(()=>{
            this.$notify({
              group: 'ad-signaler',
            })
          })
        }
      },
      sauverAd(){
        if(this.$store.state.accessToken!=='')
         {
          var content = new FormData()
          content.append('ad',this.ad.id)
          content.append('user',this.$store.state.currentUser.id)
          this.$store.dispatch('sauverAd',content).then(()=>{
            this.$notify({
              group: 'added',
            })
            this.checkIfSaved()
          })
          
        }
        else{
          this.$store.state.adToSave=this.ad.id
          this.$store.state.saving=this.$router.currentRoute.path
          this.$router.push('/connexion')
        }
      },
      adNotSaved(){

        return false
      },
    addPic(){
        this.pic=this.ad.pp.split(",");
      },
    gotoAdCateg:function(type){
        this.$store.state.currentPageAds=1
        localStorage.removeItem('prix')
        localStorage.removeItem('trier')
        this.$store.commit('setTrier','')
        this.$store.commit('setPmin',5)
        this.$Progress.start();
        this.$store.commit('setTypeOfSearch',2)
        this.$store.dispatch('searchMenu',type).then(() =>{ this.$router.push('/annonce/search/searching');this.$Progress.finish();})
      },
      gotoAdsCateg:function(categ,scateg){
        this.$store.state.currentPageAds=1
        localStorage.removeItem('prix')
        localStorage.removeItem('trier')
        this.$store.commit('setTrier','')
        this.$store.commit('setPmin',5)
        this.$Progress.start();
        this.$store.commit('setTypeOfSearch',3)
        let info={
          categ:categ,
          scateg:scateg
        }
        this.$store.dispatch('searchMenuSous',info).then(() =>{this.$router.push('/annonce/search/searching');this.$Progress.finish();})
      },
  },
  components: {
      VueperSlides, VueperSlide
  }
}
</script>
<style scoped>
.fa-plus{
  position: relative;
  top: -0.15rem;
  right: .25rem;
  color: #ddd; 
}
  .vueperslide__image1{
      width:100%;
      height:100%;
      margin:  0 auto;
      border: 1px solid rgb(214, 214, 214);
    }
    .vueperslide__image{
      width:100%;
      height:100%;
      margin:  0 auto;
      
    }
    .d-btn-nc{
  width: 13%;
  position: relative;
  top: 0.5rem;
    float: right;
}
  
.ustt{
  width: 20%;
}

.impbtn{
  position: relative !important;
  top: 0.25rem !important;
  left: 10%;
  color: rgb(65, 65, 65) !important;
}
.impbtn .fa-exclamation-circle{
  color: rgb(78, 77, 77) !important;
}
    .d-vi-img{
      width: 100%;
      height: 100%;
    }
    .bd-left{
        width: 45%;
    }
    img[lazy=error] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
  img[lazy=loading] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
  img[lazy=loaded] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
.fa-exclamation-circle{
  position: relative;
  top: -0.15rem;
  right: .22rem;
  color: #ddd;
}
   .vueperslide__image[lazy=error] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
  .vueperslide__image[lazy=loading] {
    /*your style here*/
    position: relative;
    left: 48%;
    top: 50%;

    
  }
  .vueperslide__image[lazy=loaded] {
    /*your style here*/
    width: 100% !important;
    height: 100% !important;
  }
  

  .vueperslide__image1[lazy=error] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
  .vueperslide__image1[lazy=loading] {
    /*your style here*/
    width: 40% !important;
    height: 40% !important;
  }
  .vueperslide__image1[lazy=loaded] {
    /*your style here*/
    width: 100% !important;
    height: 100% !important;
  }
    .bdd{
        height: fit-content;
        width: 80%;
        position: relative;
        padding-bottom: 2rem;
        margin: 0 auto;
        top: 2.5rem;
    }
    
    .no-shadow{
        top: 0.5rem;
    }
    .us-list-load{
      position: relative;
        padding-top: 5rem;
        padding-bottom: 5rem;
        width: 64px;
        height: 64px;
        margin: 0 auto;
    }
     .us-list-load .p{
        position: relative;
        top: 0.2rem !important;
    }
    .contact-bdd {
      top: 4rem;
    }
    .titre{
      font-size: 23px;
      font-weight: 700;
      color: rgb(0, 78, 102) !important;
    }
    .titre a{
      color: rgb(0, 78, 102) !important;
    }
    .pr-titre{
      width: 100% !important;
      position: relative;
      top: 2rem;
    }
    .dd-cc{
      position: relative;
      top: 2.5rem;
    }
    .d-aj{
      position: relative;
      top: 1rem;
      color: rgb(98, 98, 98);
    }
    .ad-descr{
      position: relative;
    }

    .ad-descr h6{
      text-decoration: underline;
      font-size: 20px;
    }
    .tit{
      width: 25%;
      background-color: rgb(1, 151, 81);
      color:white;
      border: 1px solid rgb(1, 151, 81);
    }
    .mark{
      background-color: rgb(253, 253, 253);
      color: rgb(0, 78, 102);
      font-size: 18px;
      font-weight: 600;
    }
    .details{
      font-size: 16px;
    }
    .inf-nv{
      position: relative;
      top: 2rem;
      left: 2%;
    }
    .hr1{
      position: relative;
      top: 3rem;
    }
    .pr-titre .ptitre{
      width: 50% !important;
    }
    .pr-titre .pr,.pr-titre .ptitre{
      font-size: 22px;
      font-weight: 700;
    }
    .d-titre{
      position: relative;
      top: 1.5rem;
    }
    .pptitre{
      font-size: 18px;
      font-weight: 600;
    }
    .alert-bdd{
      position: relative;
      width: 70%;
      top: 1rem;
      background: rgba(255, 184, 169, 0.08);
      border: 1px solid rgb(207, 207, 207);
    }
    .alert-bdd p{
      padding-top: 0.5rem;
      padding-left: 2%;
      padding-right: 2%;
    }
    .us-inf-img img{
        border-radius: 50%;
    }

    .us-inf-img {
        border-radius: 10px !important;
    }
    .ppr{
      font-size: larger;
      font-weight: 500;
    }
    .pville{
      position: relative;
      top: 0.5rem;
      color: rgb(98, 98, 98);
    }
    .user-bdd{
      padding-bottom: 1rem;
      position: relative;
      top: 2rem;
    }
    .bdd-right{
      width: 50%;
      position: relative;
      left: 8%;
    }
    .warn-alrt{
      position: relative;
      font-size: 25px;
      top: 50%;
    }
    .warn-mess{
      position: relative;
      width: 90%;
    }
    
</style>
