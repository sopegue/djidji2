<template>
<div>
<div class="scc">
          <button @click="goBack()" class="btn btn-success"><i class="fas fa-arrow-left"></i> Retour</button>
</div>
  <div class="bdd">
      <div v-if="isLoading" class="us-list-load">
        <b-spinner class="p" label="Loading..."></b-spinner>
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
                  fixed-height="300px">
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
            fixed-height="48px">
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
          <div class="titre">
            <div>
              <i class="fas fa-tags"></i><span> Informatique </span> ><span> Ordinateur portable</span> <button title="Supprimer l'annonce" @click="deletead(ad.id)" class="btn"><i class="fas fa-trash"></i></button>
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
          
          <div class="contact-bdd d-flex flex-row justify-content-between">
             <button type="button" @click="gotoUser(ad.use_id)" class="btn bbttn btn-primary"><i class="fas fa-eye"></i> Voir le profil</button>
            <div v-if="user.isblocked===0" class="d-flex justify-content-between"><button @click="block(ad.use_id)" title="Cliquez pour bloquer l'utilisateur" class="btn btn-success sssc"><span key="stared" v-show="user.isblocked==0"><i class="fas fa-lock-open"></i></span></button></div>
            <div v-else class="d-flex justify-content-between"><button class="btn btn-danger" @click="unblock(ad.use_id)"  title="Cliquez pour débloquer l'utilisateur"><span key="unstared" v-show="user.isblocked!=0"><i class="fas fa-lock"></i></span></button></div>
          </div>
          <hr class="hr11">
          
      </div>
  </div>
  </transition>
  </div>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import Axios from 'axios'
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
    block(id){
       let r = prompt('Souhaitez-vous bloquer cet utilisateur ? Entrez le mot "oui" puis cliquez sur Ok pour bloquer')
      if (r == 'oui') {
        this.$Progress.start()
         let formData = new FormData();
            formData.append('user', id);
            formData.append('me', this.$store.state.currentUser.id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/blockuser', data: formData, method: 'POST' })
                .then(respo => {
                   this.user.isblocked=1
                    console.log('blocked')
                        this.$notify({
                          group: 'usblocked',
                        });
                    this.$Progress.finish()
                  resolve(respo)
                })
            })
      }
    },
    unblock(id){
       let r = prompt('Souhaitez-vous débloquer cet utilisateur ? Entrez le mot "oui" puis cliquez sur Ok pour débloquer')
      if (r == 'oui') {
        this.$Progress.start()
        let formData = new FormData();
            formData.append('user', id);
            formData.append('me', this.$store.state.currentUser.id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/unblockuser', data: formData, method: 'POST' })
                .then(respo => {
                   this.user.isblocked=0
                    console.log('unblocked')
                    this.$notify({
                          group: 'usunblocked',
                    });
                    this.$Progress.finish()
                  resolve(respo)
                })
            })
      }
    },
    gotoUser(us){
        this.$store.state.notUser=us
       this.$router.push('/admin/usinf').catch(err => {});
        
      },
    deletead(id){
      let r = prompt('Voulez-vous supprimer cette annonce? Entrez le mot "oui" puis cliquez sur Ok pour supprimer')
        if (r == 'oui') {
        this.$Progress.start()
        var content = new FormData()
          content.append('ad',id)
          content.append('admin',this.$store.state.currentUser.id)
          this.$store.dispatch('supprimerAd',content).then(()=>{
            this.$notify({
              group: 'deladdel',
            });
             this.$Progress.finish()
             this.$router.go(-1)
          })
          }
      },
     goBack(){
          this.$router.go(-1);
      },
    afficheTelBox(){
      this.showTelBox=true
    },
    afficheMbox(){
      this.showMbox=true
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
        this.$store.dispatch('sendEmail',content).then(()=>{
          
        this.resetField()
          this.$notify({
              group: 'success-sendEmail',
          });
          this.sending=false
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
    width: 48px;
    height: 48px;
  }
  img[lazy=loading] {
    /*your style here*/
    width: 48px;
    height: 48px;
  }
  img[lazy=loaded] {
    /*your style here*/
    width: 48px;
    height: 48px;
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
      font-size: 20px;
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
    .bbttn{
      background-color: #004e66;
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

<style lang="scss" scoped>
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
  color: #e74c3c;
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