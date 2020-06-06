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
                      <div class="d-vi-img">
                        <img class="vueperslide__image" style="border-radius : 10px;" :src="`/images/`+pp+`.JPG`"/>
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
                <div class="vueperslide__content-wrapper">
                  <img class="vueperslide__image1" style="border-radius : 10px;" :src="`/images/`+pic[index]+`.JPG`"/>
                </div>
              </template>
            </vueper-slide>
          </vueper-slides>
          </div>
          <div class="ad-descr">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td class="tit">Description du produit</td>
                  <td class="details">Téléphone portable samsung galaxy s10
                    nouveau utilisrtable samsung galaxy s10
                    nouveau utilisértable samsung galaxy s10
                    nouveau utilisértable samsung galaxy s10
                    nouveau utilisértable samsung galaxy s10
                    nouveau utiliséé 2 mois.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <div class="bdd-right">
          <div class="titre d-flex justify-content-between">
            <div>
              <i class="fas fa-tags"></i><span> Informatique </span> ><span> Ordinateur portable</span> 
            </div>
            <div class="d-btn-ncc d-flex justify-content-between">
              <button class="btn-nc btn btn-link">
                  <i v-if="saved"  class="fas fa-check"></i>
                  <i v-else class="fas fa-plus"></i>
              </button> 
              <button class="btn-nc btn btn-link">
                  <i class="fas fa-exclamation-circle"></i>
              </button>
          
            </div>
          </div>
          <div class="pr-titre">
            <span class="pr">{{ad.prix}} FCFA</span><br>
            <span class="ptitre">{{ad.titre}}fvregverfvrere regvrevregvre</span><br>
            <span class="d-aj">Ajouté il y'a 2 jours</span>
          </div>
          <hr class="hr1">
          
          <div class="user-bdd">
              <div class="ustt d-titre d-flex justify-content-between">
                  <span class="pptitre">Annonceur</span><button class="text-center impbtn">
                  <i class="fas ffaex fa-exclamation-circle"></i>
              </button>
              </div>
             <div class="us-inf-img d-user d-flex flex-row">
                <img :style="{'position':'relative','top':'2rem' }" :src="`/images/`+user.pp" :height="64" :width="64"/>
                <div class="inf-nv">
                  <span class="ppr">{{user.Prenom}}</span><br>
                  <span class="pville"><i class="fas fa-map-pin"></i> {{user.ville}}</span>
                </div>
              </div>
              
              <div class="dd-cc">
                <span class="pville d-cc">Annonceur depuis 2 mois</span>
              </div>
          </div>
          
          <div class="contact-bdd d-flex flex-row">
             <button type="button" class="b-lr regbs"><i class="fas fa-envelope"></i> Envoyer un message</button>
             <button type="button" class="b-lr regbs regg2"><i class="fas fa-phone"></i> Contacter par téléphone</button>
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
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'InfoAd',
  data(){
    return{
      ads:[],
      pic:[],
      usReady:false,
      isLoading:true,
      saved:true
    }
  },
  props:['ad','user']
  ,
  watch:{
      ad: { 
        handler: function(n){
          this.pic=this.ad.pp.split(",");
      },
      deep: true
      },
      user:{
        handler: function(n){
        this.isLoading=false;
        this.usReady=true;
      },
      deep: true
      }
  },
  components: {
      VueperSlides, VueperSlide
  }
}
</script>
<style scoped>
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
    .d-btn-ncc{
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
        background-color: white !important;
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
      color: rgb(0, 78, 102);
    }
    .pr-titre{
      position: relative;
      top: 2rem;
    }
    .dd-cc{
      position: relative;
      top: 2rem;
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
      font-size: 18px;
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
