<template>
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
                <div class="vueperslide__content-wrapper"  v-lazy-container="{ selector: 'img', error: '/images/error.png', loading: '/images/loading.gif'  }">
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
             <div  v-if="this.$store.state.currentUser.id && (this.$store.state.currentUser.id !=this.user.id)" class="d-btn-nc d-flex justify-content-between">
            <button title="Signaler l'annonce" class="btn-nc btn btn-link">
                <i class="fas fa-exclamation-circle"></i>
            </button>
          
          </div>
      
          </div>
          <div class="pr-titre">
            <span class="pr">{{prix}} FCFA</span><br><br>
            <div id="ppptitre">
            <span class="ptitre">{{ad.titre}}</span>
            </div><br>
            <span class="d-aj">Ajouté il y'a {{date}}</span>
          </div>
          <hr class="hr1">
          
          <div class="user-bdd">
              <div class="ustt d-titre d-flex justify-content-between">
                  <span class="pptitre">Annonceur</span><button v-if="this.$store.state.currentUser.id && (this.$store.state.currentUser.id !=this.user.id)" title="Signaler l'utilisateur" class="text-center impbtn">
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
          
          <div v-if="this.$store.state.currentUser.id && (this.$store.state.currentUser.id !=this.user.id)" class="contact-bdd d-flex flex-row">
             <button type="button" class="b-lr regbs"><i class="fas fa-envelope"></i> Envoyer un message</button>
             <button type="button" class="b-lr regbs regg2"><i class="fas fa-phone"></i> Contacter par téléphone</button>
          </div>
          <div v-else class="contact-bdd d-flex flex-row text-center">
             <p>Cette annonce vous appartient.</p>
          </div>
          <hr class="hr11">
          <div class="alert-bdd d-flex flex-row justify-content-between">
            <p class="warn-alrt"><i class="fas fa-exclamation-triangle"></i></p>
            <p class="warn-mess">Assurez-vous de vérifier la crédibilité des annonces avant de procéder à tout achat. <br>
              Il est aussi recommandé de procéder à l'échange dans un lieu public.
            </p>
          </div>
      </div>
  </div>
  </transition>
  <hr class="hr1">
  </div>
</template>
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
      add:[],
      usReady:false,
      isLoading:true,
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
      var date=new Date(this.ad.updated_at.toString())
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
    
    addPic(){
        this.pic=this.ads.pp.split(",");
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
button{
  border: none !important;
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

   .vueperslide__image[lazy=error] {
    /*your style here*/
    width: 64px;
    height: 64px;
  }
  .vueperslide__image[lazy=loading] {
    /*your style here*/
    position: relative;
    left: 48%;
    top: 45%;
    margin: 0 auto;
    width: 8% !important;
    height: 8% !important;
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
        height: 100%;
        width: 80%;
        position: relative;
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
      top: 5rem;
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
