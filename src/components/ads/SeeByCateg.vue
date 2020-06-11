<template>
  <div class="ssright">
    <div class="sshead d-flex flex-column">

      <div class="categt d-flex flex-column" v-if="this.$store.state.typeOfSearch==2 || this.$store.state.typeOfSearch==1 || this.$store.state.typeOfSearch==3 || this.$store.state.typeOfSearch==4">
        <div class="tik align-self-center">
          <h5>{{this.$store.state.categSearch}}</h5>
          <br><h6 v-if="this.$store.state.typeOfSearch==3">{{this.$store.state.sCateg}}</h6><br>
        </div>
        <p>
           <span v-if="this.$store.state.typeOfSearch==1" class="sssea">{{this.$store.state.search}}</span>
          <br />
          <span class="ssnb">{{this.$store.state.Ads.total}} annonce(s)</span>
        </p>
      </div>
      <hr class="sshr" />

      <div class="d-flex flex-column">
        <div class="us-list-load" v-if="this.$store.state.searchfound==='loading'" >
          <b-spinner class="p" label="Loading..."></b-spinner>
        </div>
        <div v-else>
            
        <div class="ulist-loads" v-if=" (this.$store.state.typeOfSearch==2 || this.$store.state.typeOfSearch==4) && this.$store.state.searchfound==='error'">
             <div class="alert alert-light" role="alert">
              Oops ! Désolé, aucune annonce disponible dans "{{this.$store.state.categSearch}}"
            </div>
        </div>
        <div class="ulist-loads" v-if=" this.$store.state.typeOfSearch==3 && this.$store.state.searchfound==='error'">
             <div class="alert alert-light" role="alert">
              Oops ! Désolé, aucune annonce disponible dans "{{this.$store.state.sCateg}}"
            </div>
        </div>
         <div class="ulist-loads" v-if="this.$store.state.typeOfSearch==1 && this.$store.state.searchfound==='error'">
             <div class="alert alert-light" role="alert">
              Oops ! Désolé, aucune annonce disponible sous " {{this.$store.state.search}}"
            </div>
        </div>
        <div v-if="this.$store.state.searchfound==='success'">
                                 
      <div class="pagi d-flex flex-row justify-content-between">
        <div v-if="this.$store.state.pagination==='true'">
        <b-pagination
          class="customPagination"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-number
          last-number
        ></b-pagination>
      </div>
        <div class="prsl text-center">
          <div class="form-group d-flex flex-column align-items-center">
            <div>
              <span>Prix minimum : </span>
              <span class="prrmin">{{minn}} F CFA</span>
            </div>
            <div>
              <range-slider class="slider" min="5" max="1000006" step="500" v-model="sliderValue"></range-slider>
            </div>
          </div>
        </div>
        <div class="trii">
          <span>Trier par :</span>

          <vs-select :color="'#004e66'" placeholder="Trier par..." v-model="value">
            <vs-option label="Prix croissant" value="1">Prix croissant</vs-option>
            <vs-option label="Prix décroissant" value="2">Prix décroissant</vs-option>
            <vs-option label="Le plus récent" value="3">Le plus récent</vs-option>
            <vs-option label="Le plus ancien" value="4">Le plus ancien</vs-option>
          </vs-select>
        </div>
      </div>
      <div class="us-list-load" style="margin-bottom:5rem;" v-if="this.$store.state.filteringAds==='loading'" >
          <b-spinner class="p" label="Loading..."></b-spinner>
      </div>
      <div v-else class="applist">
        <div class="d-list-us d-flex  justify-content-between flex-wrap">
          <Ads v-for="ads in items" class="p-1" v-bind="ads" :key="ads.id" :ads.sync="ads"></Ads>
        </div>
      </div>
      <div class="pagi-bot">
        <b-pagination
          class="customPagination"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-number
          last-number
        ></b-pagination>
      </div>
        </div> 
        </div>
      </div>

    </div>
  </div>
</template>

<style  scoped>
.pagi-bot{
  margin: 0 auto;
  width: fit-content;

}
.slider {
  /* overwrite slider styles */
  width: 250px;
}
.range-slider-fill {
  background: #004e66;
}
.tik h6,
.tik span {
  position: relative;
  top: -1.8rem;
  text-align: center;
}
.tik {
  position: relative;
  top: 2rem;
}
.d-list-us {
  background-color: #f8f9fa;
  margin-top: 2rem;
  padding-bottom: 3rem;
  padding-left: 5%;
  padding-right: 5%;
}
.applist {
  position: relative;
  top: -4.1rem;
}
.ads {
  margin-top: 3rem;
}
.us-list-load {
  background-color: white !important;
  width: 64px;
  height: 64px;
  margin: 0 auto;
}
.us-list-load .p {
  position: relative;
  top: 2rem !important;
}
.form-group span {
  position: relative;
  top: -0.21rem !important;
}
.categt {
  position: relative;
}
.categt {
  top: -1rem;
}
.ulist-loads{
    font-size: 24px;
    width: fit-content;
    position: relative;
    top: 5rem;
    margin: 0 auto;
}
.prrmin {
  width: 110px !important;
}
.rgslide {
  position: relative;
  right: 1.3%;
}
.prsl {
  top: -0.5rem;
  position: relative;
}
.sshr {
  width: 100%;
  position: relative;
  bottom: 2.5rem;
}
.sssea {
  font-weight: 500;
}
.ssnb {
  color: rgb(109, 109, 109);
}
.trii {
  position: relative;
  top: -1rem;
}
.ssright {
  padding-left: 1.5%;
  position: relative;
  top: 2rem;
  width: 100%;
}
.pagi {
  position: relative;
  top: -2rem;
}
</style>
<script>
import Ads from "@/components/ads/Ads.vue";
// @ is an alias to /src
import RangeSlider from "vue-range-slider";
// you probably need to import built-in style
import "vue-range-slider/dist/vue-range-slider.css";
export default {
  name: "SeeByCateg",
  data() {
    return {
      perPage: 1,
    };
  },
 created(){
   this.$store.dispatch('checkAdsCache')
 },
  methods: {
  },
  computed: {
    rows(){
      return this.$store.state.nbPageAds
    },
    items(){
      return this.$store.state.Ads.ads
    },
    currentPage:{
      // getter
    get: function () {
      return this.$store.state.currentPageAds
    },
    // setter
    set: function (newValue) {
      this.$store.state.currentPageAds=newValue
        this.reSearch()
      }
      
    },
    sliderValue: {
    // getter
    get: function () {
      return this.$store.state.prixmin
    },
    // setter
    set: function (newValue) {
      this.$store.commit('setPmin',newValue)
        this.reSearch()
      }
    },
    value: {
    // getter
    get: function () {
      return this.$store.state.trier
    },
    // setter
    set: function (newValue) {
        this.$store.commit('setTrier',newValue)
        this.reSearch()
      }
    },
    minn() {
      var str = this.sliderValue.toString();
      var len = str.length;
      if (len > 4) {
        if (len == 5) str = str.slice(0, 2) + " " + str.slice(2);
        if (len == 6) str = str.slice(0, 3) + " " + str.slice(3);
        if (len == 7)
          str = str.charAt(0) + " " + str.slice(1, 4) + " " + str.slice(4);
      }
      return str;
    }
  },
  methods:{
    
    reSearch(){
      
      localStorage.setItem('prix', this.$store.state.prixmin)
      localStorage.setItem('trier', this.$store.state.trier)
        this.$store.state.filteringAds="loading"
        if(this.$store.state.typeOfSearch==1)
          {
          this.$Progress.start();
          var info={
            selected:this.$store.state.categSearch,
            search:this.$store.state.search
          }
          this.$store.dispatch('searchBar',info).then(() =>{this.$store.state.filteringAds=""; this.$Progress.finish(); })
          }

          if(this.$store.state.typeOfSearch==2)
          {
          this.$Progress.start();
          this.$store.dispatch('searchMenu',this.$store.state.categSearch).then(() =>{this.$store.state.filteringAds=""; this.$Progress.finish(); })
          }

          if(this.$store.state.typeOfSearch==3)
          {
          this.$Progress.start();
          var info={
            categ:this.$store.state.categSearch,
            scateg:this.$store.state.sCateg
          }
          this.$store.dispatch('searchMenuSous',info).then(() =>{this.$store.state.filteringAds=""; this.$Progress.finish(); })
          }

          if(this.$store.state.typeOfSearch==4)
          {
          this.$Progress.start();
          this.$store.dispatch('searchByWhat',this.$store.state.categSearch).then(() =>{this.$store.state.filteringAds=""; this.$Progress.finish(); })
          }

    },
    sortBy(type){
      if(type==="1"){
        this.$store.state.Ads.ads.sort((a, b)=> a.prix-b.prix)
      }
       if(type==="2"){
        this.$store.state.Ads.ads.sort((a, b)=> b.prix-a.prix)
      }
       if(type==="3"){
        this.$store.state.Ads.ads.sort((a, b)=> new Date(b.added_at)-new Date(a.added_at))
        
      }
       if(type==="4"){
        this.$store.state.Ads.ads.sort((a, b)=> new Date(a.added_at)-new Date(b.added_at))
      }
    }
  },
  components: {
    Ads,
    RangeSlider
  }
};
</script>
