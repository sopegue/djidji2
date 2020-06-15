<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
                    <h5 class="">Mes annonces ajoutées</h5>
                    <br />
                     <span class="ssnb">{{this.$store.state.saveAds.total}} annonce(s)</span>
                     <span v-if="this.$store.state.saveAds.total!==0" class="ssnb"><br>
                     <span v-if="this.$store.state.saveAds.total>=12">
                       <span v-if="this.$store.state.saveAds.total-(this.$store.state.currentPageMyAds-1)*12 +1>12">({{(this.$store.state.currentPageMyAds-1)*12 +1}} - {{(this.$store.state.currentPageMyAds-1)*12 + 12 }})</span>
                       <span v-else>({{(this.$store.state.currentPageMyAds-1)*12 +1}} - {{((this.$store.state.currentPageMyAds-1)*12 +1)+ (this.$store.state.saveAds.total - ((this.$store.state.currentPageMyAds-1)*12 +1))}})</span>
                     </span>
                     <span v-else>({{this.$store.state.currentPageMyAdss}} - {{this.$store.state.saveAds.total}})</span></span>
                    <hr class="hr-us-inf">

                    <div class="us-list-load" v-if="this.$store.state.savedAdfound==='loading'" >
                        <b-spinner class="p" label="Loading..."></b-spinner>
                    </div>
                    <div v-else>
                        <div v-if="this.$store.state.hasAdAdded">
                        <b-pagination
                      class="customPagination"
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      first-number
                      last-number
                    ></b-pagination>
                    <div  class="d-list-us " >
                        <div class="ddl d-flex flex-wrap justify-content-between">
                        <AdsAdded class="p-1" v-for="ads in items"
                            v-bind="ads"
                            :key="ads.id"
                            :ads.sync="ads">
                        </AdsAdded>
                        </div>
                    </div>
                     <div class="pp">
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
                    <div v-else class="text-center">
                        <hr>
                        <p>Vous n'avez aucune annonce ajoutée pour l'instant.</p>
                        <p>Cliquez sur <router-link style="color : #004e66 !important; font-weight:700;" to="/annonce/add">Annoncer</router-link> pour ajouter une annonce.</p>
                    </div>
                    </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ddl{
    padding-left: 7%;
    width: 90%;
}
.pp{
    position: relative;
    top: 0.5rem;
    width: fit-content;
    margin:  0 auto;
}
    .large-12{
        margin-top: 3rem;
    }
    .d-list-us{
        background-color: #f8f9fa;
        padding-top: 0rem !important;
        padding-bottom: 3rem;
    }
    .ads{
        margin-top: 5rem !important;
        margin: 0 auto;
    }
    .us-list-load{
        background-color: white !important;
        width: 64px;
        height: 64px;
        margin: 0 auto;
    }
     .us-list-load .p{
        position: relative;
        top: 0.2rem !important;
    }
</style>
<script>
    import AdsAdded from '@/components/ads/AdsAdded.vue'
    
    export default {
        data () {
            return { 
                perPage:1
            }
        },
        computed: {
            items(){
                return this.$store.state.saveAds.ads
            },
          rows(){
            return this.$store.state.nbPageMyAds
          },
          currentPage:{
            // getter
          get: function () {
            return this.$store.state.currentPageMyAds
          },
          // setter
          set: function (newValue) {
            this.$store.state.currentPageMyAds=newValue
            this.gotoNextPage()
              window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
            }

          },
        },
        
    methods:{
      shitem:function(what){
        this.$store.state.currentPageAds=1
        localStorage.removeItem('prix')
        localStorage.removeItem('trier')
        this.$store.commit('setTrier','')
        this.$store.commit('setPmin',5)
        this.$Progress.start();
        this.$store.commit('setTypeOfSearch',4)
        this.$store.dispatch('searchByWhat',what).then(() =>{
          if(what==='Top catégories')
            this.$router.push('/annonce/search/searching'); 
          if(what==='A la une')
            this.$router.push('/annonce/search/searching');
          else
            this.$router.push('/annonce/search/searching');  
          this.$Progress.finish(); 
          })
          this.$Progress.finish();
      },
    },
        components:{
            AdsAdded,
        },
        beforeMount(){
            
            this.$Progress.start();
            this.$store.state.savedAdfound='loading'
            setTimeout(() => {
               var user=localStorage.getItem('usetrixco')
                let form= new FormData()
            form.append('user',user)
            form.append('curPage',this.$store.state.currentPageMyAds)
            console.log(user)
            this.$store.dispatch('getSavedAds',form).then(()=>{
            //form.append('next',this.$store.state.currentPageMyAds)
            this.$Progress.finish();
            })
            }, 1000);
            
        },
        methods:{
            gotoNextPage(){
            let form= new FormData()
            form.append('user',this.$store.state.currentUser.id)
            form.append('curPage',this.$store.state.currentPageMyAds)
            this.$store.dispatch('getSavedAds',form).then(()=>{
            //form.append('next',this.$store.state.currentPageMyAds)
            this.$Progress.finish();
            })
            },
        },
    }
</script>
