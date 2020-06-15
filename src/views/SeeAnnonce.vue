<template>
  <div class="sss d-flex flex-row">
      <div class="ssleft">
          <div class="head-menus">
          <div class="c-head-menus">
            <div class="cd-head-menus">
              <span>Toutes les catégories</span>
            </div>
          </div>
          <div class="c-body-menus">
            <ul>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Informatique')"><i class="fas fa-laptop"></i> Informatique</router-link> <button v-click-outside="hitem" @click="showitem('computer')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Informatique','Pc Bureau')">Pc Bureau</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Informatique','Pc Portable')">Pc Portable</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Informatique','Accessoires Pc')">Accessoires Pc</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Informatique','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Electronique')"><i class="fas fa-plug"></i> Electronique</router-link> <button v-click-outside="hitem1" @click="showitem('electro')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive1">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Electronique','Electroménager')">Electroménager</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Electronique','Accessoires électro.')">Accessoires électro.</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Electronique','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Téléphone')"><i class="fas fa-mobile"></i> Téléphone</router-link> <button v-click-outside="hitem2" @click="showitem('tel')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive2">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Téléphone','Android')">Android</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Téléphone','Tablette')">Tablette</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Téléphone','Ios')">Ios</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Téléphone','Windows phone')">Windows phone</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Téléphone','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Mode')"><i class="fas fa-tshirt"></i> Mode</router-link> <button v-click-outside="hitem3" @click="showitem('mode')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive3">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Mode','Homme')">Homme</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Mode','Femme & enfant')">Femme & enfant</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Mode','Self-care')">Self-care</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Mode','Accessoires H,F & E')">Accessoires H,F & E</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Mode','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Maison')"><i class="fas fa-home"></i> Maison</router-link> <button v-click-outside="hitem4" @click="showitem('house')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive4" @click.native="reloading()">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Maison','Meuble')">Meuble</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Maison','Decoration')">Decoration</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Maison','Bricolage')">Bricolage</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Maison','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Jeux')"><i class="fas fa-gamepad"></i> Jeux</router-link> <button v-click-outside="hitem5" @click="showitem('jeu')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive5">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Jeux','Console')">Console</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Jeux','Jeux vidéos')">Jeux vidéos</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Jeux','Accessoires de jeux')">Accessoires de jeux</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Jeux','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Véhicules')"><i class="fas fa-car"></i> Véhicules</router-link> <button v-click-outside="hitem6" @click="showitem('vehi')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive6">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Véhicules','Moto')">Moto</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Véhicules','Voiture')">Voitures</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Véhicules','Bicyclette')">Bicyclette</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Véhicules','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Instruments')"><i class="fab fa-think-peaks"></i> Instruments</router-link> <button v-click-outside="hitem7" @click="showitem('instru')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive7">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Instruments','Sport')">Sport</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Instruments','Music')">Music</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Instruments','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Immobilier')"><i class="fas fa-chalkboard-teacher"></i> Immobilier</router-link> <button v-click-outside="hitem8" @click="showitem('imo')"><i class="fas fa-chevron-down ss"></i></button>
                  <transition name="slide-fade">
                  <ul v-if="mactive8">
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Immobilier','Location')">Location</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Immobilier','Terrain')">Terrain</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Immobilier','Vente')">Vente</router-link></li>
                    <li class="bbli"><router-link to="#" class="bli" @click.native="gotoAdsCateg('Immobilier','Autres')">Autres</router-link></li>
                  </ul>
                  </transition>
              </li>
              <li class="bbli"><router-link class="bli" to="#" @click.native="gotoAdCateg('Autres')"><i class="fas fa-plus"></i> Autres</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    <router-view></router-view>
  </div>
</template>
<style scoped>
button{
  border: none;
}
.cd-head-menus{
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  
}

.head-menus{
  width: 250px;
}
.c-body-menus{
    border: 1px solid  rgb(221, 221, 221);
 
   padding-top: 1rem;
  padding-bottom: 1rem;
}
  .bli{
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
  .bli:hover{
    background-color: rgba(231, 231, 231, 0.513);
  }
  .bbli button{
    position: relative;
    top: 0.02rem;
  }
.bbli .svg-inline--fa{
    width: 20px;
    height: 20px;
  }
   .ss{
    width: 16px !important;
    height: 16px !important;
  }
.sss{
    width: 95%;
    margin: 0 auto;
    margin-bottom: 12rem;
}
.ssleft{
    position: relative;
    top:12.6rem;
}

</style>
<script>
// @ is an alias to /src
import ClickOutside from 'vue-click-outside'
export default {
  name: 'SeeAnnonce',
  data(){
    return{
      mactive:false,
        mactive1:false,
        mactive2:false,
        mactive3:false,
        mactive4:false,
        mactive5:false,
        mactive6:false,
        mactive7:false,
        mactive8:false
    }
  },
  methods:{
    gotoAdCateg:function(type){
      this.$store.state.currentPageAds=1
      localStorage.removeItem('prix')
        localStorage.removeItem('trier')
        this.$store.commit('setTrier','')
        this.$store.commit('setPmin',5)
        this.$Progress.start();
        this.$store.commit('setTypeOfSearch',2)
        this.$store.dispatch('searchMenu',type).then(() =>{this.$router.push({ path: '/annonce/search/searching' });this.$Progress.finish();})
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
        this.$store.dispatch('searchMenuSous',info).then(() =>{ this.$router.push({ path: '/annonce/search/searching' });this.$Progress.finish();})
      },
      showitem(n){
        if(n==='computer')
          this.mactive=!this.mactive;
        if(n==='electro')
          this.mactive1=!this.mactive1;
        if(n==='tel')
          this.mactive2=!this.mactive2;
        if(n==='mode')
          this.mactive3=!this.mactive3;
        if(n==='house')
          this.mactive4=!this.mactive4;
        if(n==='jeu')
          this.mactive5=!this.mactive5;
        if(n==='vehi')
          this.mactive6=!this.mactive6;
        if(n==='instru')
          this.mactive7=!this.mactive7;
        if(n==='imo')
          this.mactive8=!this.mactive8;
      },
      hitem(){
        
          this.mactive=false;
      },
       hitem1(){
        
          this.mactive1=false;
      },
       hitem2(){
        
          this.mactive2=false;
      },
       hitem3(){
        
          this.mactive3=false;
      },
       hitem4(){
        
          this.mactive4=false;
      },
       hitem5(){
        
          this.mactive5=false;
      },
       hitem6(){
        
          this.mactive6=false;
      },
       hitem7(){
        
          this.mactive7=false;
      },
       hitem8(){
        
          this.mactive8=false;
      },
  },
  directives: {
      ClickOutside
  },
}
</script>
