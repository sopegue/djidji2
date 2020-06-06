<template>
  <div class="ssright">
    <div class="sshead d-flex flex-column">
      <div class="categt d-flex flex-column" v-if="this.$store.state.typeOfSearch==1">
        <div class="tik align-self-center">
          <h5>{{this.$store.state.categSearch}}</h5>
          <br><!--<h6>Pc portable</h6>-->
        </div>
        <p>
          <span class="sssea">{{this.$store.state.search}}</span>
          <br />
          <span class="ssnb">{{this.$store.state.searchNb}} annonce(s)</span>
        </p>
      </div>

      <div class="categt d-flex flex-column" v-if="this.$store.state.typeOfSearch==2 || this.$store.state.typeOfSearch==0 ">
        <div class="tik align-self-center">
          <h5>{{this.$store.state.categSearch}}</h5>
          <br><!--<h6>Pc portable</h6>-->
        </div>
        <p>
          <span class="ssnb">{{this.$store.state.Ads.length}} annonce(s)</span>
        </p>
      </div>
      <hr class="sshr" />

      <div class="d-flex flex-column">
        <div class="us-list-load" v-if="this.$store.state.searchfound==='loading'" >
          <b-spinner class="p" label="Loading..."></b-spinner>
        </div>
        <div v-else>
            
        <div class="ulist-loads" v-if=" this.$store.state.typeOfSearch==2 && this.$store.state.searchfound==='error'">
             <div class="alert alert-light" role="alert">
              Oops ! Désolé, aucune annonce disponible dans "{{this.$store.state.categSearch}}"
            </div>
        </div>
         <div class="ulist-loads" v-if="this.$store.state.typeOfSearch==1 && this.$store.state.searchfound==='error'">
             <div class="alert alert-light" role="alert">
              Oops ! Désolé, aucune annonce disponible sous " {{this.$store.state.search}}"
            </div>
        </div>
        <div v-if="this.$store.state.searchfound==='success'">
                                 
      <div class="pagi d-flex flex-row justify-content-between">
        <div class>
          <b-pagination
            class="customPagination"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-number
            last-number
          ></b-pagination>
        </div>
        <div class="prsl">
          <div class="form-group d-flex flex-column align-items-center">
            <div>
              <span>Prix minimum :</span>
              <span class="prrmin">{{minn}} F CFA</span>
            </div>
            <div>
              <range-slider class="slider" min="1" max="5000001" step="10" v-model="sliderValue"></range-slider>
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
      
      <div class="applist">
        <div class="d-list-us d-flex flex-wrap justify-content-start">
          <Ads v-for="ads in this.$store.state.Ads" v-bind="ads" :key="ads.id" :ads.sync="ads"></Ads>
        </div>
      </div>
      <div class="align-self-center">
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
.slider {
  /* overwrite slider styles */
  width: 300px;
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
}
.applist {
  position: relative;
  top: -4.1rem;
}
.ads {
  margin-top: 3rem;
  margin-left: 3.5%;
  margin-right: auto;
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
function Adse({
  id,
  use_id,
  categorie,
  titre,
  description,
  marque,
  prix,
  pp,
  nbvues,
  added_at,
  updated_at
}) {
  this.id = id;
  this.use_id = use_id;
  this.categorie = categorie;
  this.titre = titre;
  this.description = description;
  this.marque = marque;
  this.prix = prix;
  this.pp = pp;
  this.nbvues = nbvues;
  this.added_at = added_at;
  this.updated_at = updated_at;
}
// @ is an alias to /src
import RangeSlider from "vue-range-slider";
// you probably need to import built-in style
import "vue-range-slider/dist/vue-range-slider.css";
export default {
  name: "SeeByCateg",
  data() {
    return {
      rows: 10,
      perPage: 1,
      currentPage: 5,
      sliderValue: 1,
      value: "",
      adss: [],
      isLoading: false
    };
  },
 created(){
   this.$store.dispatch('checkAdsCache')
 },
  methods: {
  },
  computed: {
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
  components: {
    Ads,
    RangeSlider
  }
};
</script>
