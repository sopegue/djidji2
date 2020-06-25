<template>
  <div id="header" v-bind:class="{'navbar--hidden'  : !showNavbar}">
    <div class="high d-flex flex-row justify-content-between">
      <div class="logo">
        <router-link to="/" class="a-logo"><h2 class="logo-title">Djidji.com</h2></router-link>
      </div>
      <form class="search d-flex flex-row" @submit.prevent="searchAds">
        <div class="col1">
            <select class="sSelect" v-model="selected">
                <option
                    v-for="col in sCategorie"
                    :value="col"
                    :key="col"
                >
                    {{ col }}
                </option>
            </select>
        </div>
        <div class="col2 d-flex flex-row">
          <input type="text" class="sInput" name="djdjiS" placeholder="Rechercher sur Djidji.com" v-model="search"/>
          <button type="submit" class="sBtn" ><i class="fas fa-search"></i></button>
        </div>
      </form>
      <div class="toConnect d-flex flex-row justify-content-around">
        <div class="userB text-center" v-show="this.$store.state.usCoStatus==='success'">
          <span v-show="this.$store.state.hasNotif" class="dot"></span>
          <a href="#" role="button" data-toggle="dropdown" class="a-compte dropdown-toggle">{{this.$store.state.currentUser.Nom}}</a>
           <transition name="slide-fade">
           <ul class="dropdown-menu userInff">
            <li class="usliinf"><a href="#/user" ><i class="far fa-user"></i> Mon compte</a></li>
            <li class="usliinf"><a href="#/user/notif" ><span v-show="this.$store.state.hasNotif" class="dots"></span><i class="far fa-bell"></i> Mes notifications</a></li>
            <li class="usliinf"><a href="#/user/list" ><i class="far fa-bookmark"></i> Ma liste</a></li>
            <li class="usliinf"><a href="#/user/added" ><i class="fas fa-list"></i> Mes annonces</a></li>
            <li class="usliinfs"><a href="#" @click="signout"><i class="fas fa-sign-out-alt"></i> Se déconnecter</a></li>
          </ul>
           </transition>
        </div>
        <div class="d-flex flex-row justify-content-between">
          <div v-if="this.$store.state.usCoStatus!=='success'" class="b-conn">
            <button class="cBtn" @click="toConnect">S'inscrire</button>
          </div>
          <button class="cBtn" @click="addAd">Annoncer</button>
        
        </div>
      </div>
    </div>
    <div class="d-none">{{hidemenu}}</div>
    <div class="down">
      <div v-click-outside="hidem">
      <div @click="shmenu" class="menu d-inline-block">
        <i class="fas fa-bars"></i>
      </div>
      <transition name="slide-fade">
       <div v-if="shme" class="head-menu">
          <div class="c-head-menu">
            <div class="cd-head-menu">
              <span>Toutes les catégories</span>
            </div>
            <button @click="shmenu"  class="cbtn-head-menu">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="c-body-menu">
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
                  <ul v-if="mactive4" @click="reloading()">
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
      </transition>
    </div>
      <div v-click-outside="hideloc" class="localise d-inline-block">
        <a @click="selecting" v-if="this.$store.state.adsPlace.length==1" v-show="notselecting" class="a-localise"><i class="fas fa-map-marker-alt"></i> {{this.$store.state.adsPlace[0].name}} <i class="fas fa-chevron-down"></i></a>
        <a @click="selecting" v-if="this.$store.state.adsPlace.length!=1" v-show="notselecting" class="a-localise"><i class="fas fa-map-marker-alt"></i> {{this.$store.state.adsPlace[0].name}} et {{this.$store.state.adsPlace.length-1}} autres <i class="fas fa-chevron-down"></i></a>
        <transition name="fade">
        <div v-if="selectmul">
          <multiselect  class="multiselect" v-model="value" selectedLabel="✓"  deselectGroupLabel="✕" deselectLabel="✕" selectLabel="Choisir" selectGroupLabel="Selectionner" :options="options" :multiple="true" group-values="ville" group-label="district" :group-select="true" placeholder="Trouver un lieu..." track-by="name" label="name"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect>
          <button type="button" @click="retrievebyloc" class="sel-btn"> Ok </button>
        </div>
        </transition>
        <p v-show="notselecting" class="p-localise">{{this.$store.state.placeNb}} annonces</p>
      </div>
      <div class="item d-inline-block">
        <div class="iitemm">
        <button class="ibBtn" @click="shitem('A la une')"><i class="fas fa-heart"></i> A la une</button>
        <button class="ieBtn" @click="shitem('Economiques')"><i class="fas fa-wallet"></i> Economiques</button>
        <button class="itBtn" @click="shitem('Top catégories')"><i class="fas fa-bolt"></i> Top catégories</button>
        
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.usliinf{
  margin: 0 auto;
}
.userInff{
    position: absolute;
    width: fit-content;
    margin: 0 auto !important;
    z-index: 4555;
}
.userB{
    width: 20%;
    position: relative;
}
.sBtn{
  border-radius: unset !important;
}
.fa-times{
  color:  rgb(9, 3, 24) !important;
  font-size: 28px;
}
  .bli{
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
  .dot {
    position: absolute;;
    z-index: 999;
    left: -6%;
    top: -.1rem;
  height: 10px;
  width: 10px;
  background-color: rgb(68, 228, 82);
  border-radius: 50%;
  display: inline-block;
}
  .dots {
    position: absolute;;
    z-index: 999;
    left: 1.5%;
    top: 2.8rem;
  height: 10px;
  width: 10px;
  background-color: rgb(68, 228, 82);
  border-radius: 50%;
  display: inline-block;
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
  .dropdown-toggle::after{
    position: relative;
    top: 0.08rem;
    left: 1%;
  }
  .ss{
    width: 16px !important;
    height: 16px !important;
  }
</style>
<script>
  import Multiselect from 'vue-multiselect'
  import Connexion from '@/components/connexion/Connexion.vue'
  import ClickOutside from 'vue-click-outside'
  export default {
      name: 'Header',
      components: {
        Connexion,
        Multiselect
    },
    data() {
      return {
        selected:'Toutes les catégories',
        shit:false,
        btnmenu:false,
        mactive:false,
        mactive1:false,
        mactive2:false,
        mactive3:false,
        mactive4:false,
        mactive5:false,
        mactive6:false,
        mactive7:false,
        mactive8:false,
        shme:false,
        selectmul:false,
        notselecting:true,
        showNavbar: Boolean,
        toggle:false,
        sCategorie: ['Toutes les catégories','Informatique','Electronique','Téléphone','Mode',
        'Maison','Jeux','Véhicules','Instruments','Immobilier','Autres'],
        value: [],
        options: [
          {
            district: 'Abidjan',
            ville: [
              { name: 'Abidjan'},
            ]
          },
          {
            district: 'Yamoussoukro',
            ville: [
              { name: 'Yamoussoukro'},
            ]
          },
          {
            district: 'Vallée du Bandama',
            ville: [
              { name: 'Bouaké'},
              { name: 'Katiola'}
             
            ]
          },
          {
            district: 'Savanes',
            ville: [
              { name: 'Korhogo'},
              { name: 'Boundiali'},
              { name: 'Ferké'}
            ]
          },
          {
            district: 'Sassandra-Marahoué',
            ville: [
              { name: 'Daloa'},
              { name: 'Bouaflé'}
            ]
          },
          {
            district: 'Montagnes',
            ville: [
              { name: 'Man'},
              { name: 'Duékoué'},
              { name: 'Guiglo'}
            ]
          },
          {
            district: 'Bas-Sassandra',
            ville: [
              { name: 'Sassandra'},
              { name: 'San-Pédro'},
              { name: 'Soubré'}
            ]
          },
          {
            district: 'Comoé',
            ville: [
              { name: 'Abengourou'},
              { name: 'Aboisso'},
            ]
          },
          {
            district: 'Gôh-Djiboua',
            ville: [
              { name: 'Gagnoa'},
              { name: 'Divo'},
            ]
          },
          {
            district: 'Lacs',
            ville: [
              { name: 'Daoukro'},
              { name: 'Bongouanou'},
              { name: 'Dimbokro'}
            ]
          },
          {
            district: 'Zanzan',
            ville: [
              { name: 'Bouna'},
              { name: 'Bondoukou'},
            ]
          },
          {
            district: 'Denguélé',
            ville: [
              { name: 'Odienné'},
              { name: 'Minignan'},
            ]
          },
          {
            district: 'Woroba',
            ville: [
              { name: 'Mankono'},
              { name: 'Touba'},
              { name: 'Séguéla'},
            ]
          }
        ],
      }
    },
    props:['scrolling','hasNotif'],
    methods: {
      hideloc(){
        this.selectmul=false;
        this.notselecting=true;
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
      searchAds:function(){
        this.$store.state.currentPageAds=1
        localStorage.removeItem('prix')
        localStorage.removeItem('trier')
        this.$store.commit('setTrier','')
        this.$store.commit('setPmin',5)
         this.$store.commit('setTypeOfSearch',1)
         this.$Progress.start();
          var info={
            selected:this.selected,
            search:this.search 
          }
          this.$store.dispatch('searchBar',info).then(() =>{ this.$router.push('/annonce/search/searching');this.$Progress.finish();})
          this.selected=this.$store.state.categSearch
        
       
      },
      
      shitem:function(what){
        this.$store.state.currentPageAds=1
        localStorage.removeItem('prix')
        localStorage.removeItem('trier')
        this.$store.commit('setTrier','')
        this.$store.commit('setPmin',5)
        this.$Progress.start();
        this.$store.commit('setTypeOfSearch',4)
        this.$store.dispatch('searchByWhat',what).then(() =>{
            this.$router.push('/annonce/search/searching');  
          this.$Progress.finish(); 
          })
      },
      signout: function(){
        var current=this.$router.currentRoute.path
        this.$store.dispatch('logout').then(() =>{ this.$router.push(current) ; location.reload();})
      },
      addAd: function(){
        if(this.$store.state.accessToken!=='')
          this.$router.push('/annonce/add')
        else{
          this.$store.state.next='/annonce/add'
          this.$router.push('/connexion')
        }
      },
      toConnect(){
            this.$router.push('/connexion')
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
      retrievebyloc(){
        // retrieve item by loc
        this.selectmul=false;
        this.notselecting=true;
        this.$Progress.start();
        this.$store.dispatch('updPlace',this.value);
        this.$Progress.finish();
      },
      selecting(){
        if(this.selectmul==true){
          this.selectmul=false;
          this.notselecting=true;
        }
        else{
          this.selectmul=true;
          this.notselecting=false;
        }
        

      },
      shmenu(){
        this.shme=!this.shme;
      },
      hidem() {
            this.shme=false;
         
      },
      shitemm() {
            this.shit=false;
         
      },
      },
      created() {
        
       this.$store.dispatch('updPlace',this.$store.state.adsPlace)
        },
      computed:{
        // hasNotif(){
        //   return this.$store.state.hasNotif==true
        // },
        hidemenu(){
          return this.$store.state.categSearch
        },
         search: {
          get () {
            return this.$store.state.searchh
          },
          set (value) {
            this.$store.commit('updateSearch', value)
          }
        }
      },
    // do not forget this section
    directives: {
      ClickOutside
    },
    watch:{
      scrolling: { 
        handler: function(n){
          if(this.shit || this.shme || this.selectmul
          || this.toggle || this.btnmenu || this.mactive
          ) this.showNavbar=true;
          else this.showNavbar=n;
        },
        deep: true
      },
      hidemenu () {
        this.shme=false
      }
    },
  }
</script>