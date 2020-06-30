<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
                    <h5 class="">Mes annonces enregistrées</h5>
                    <br />
                     <span class="ssnb">{{this.$store.state.mysaveAds.total}} annonce(s)</span>
                     <span v-if="this.$store.state.mysaveAds.total!==0" class="ssnb"><br>
                     <span v-if="this.$store.state.mysaveAds.total>=12">
                       <span v-if="this.$store.state.mysaveAds.total-(this.$store.state.currentPageSavedAds-1)*12 +1>12">({{(this.$store.state.currentPageSavedAds-1)*12 +1}} - {{(this.$store.state.currentPageSavedAds-1)*12 + 12 }})</span>
                       <span v-else>({{(this.$store.state.currentPageSavedAds-1)*12 +1}} - {{((this.$store.state.currentPageSavedAds-1)*12 +1)+ (this.$store.state.mysaveAds.total - ((this.$store.state.currentPageSavedAds-1)*12 +1))}})</span>
                     </span>
                     <span v-else>({{this.$store.state.currentPageSavedAds}} - {{this.$store.state.mysaveAds.total}})</span></span>
                    <hr class="hr-us-inf">

                    <div class="us-list-load" v-if="this.$store.state.mysavedAdfound==='loading'" >
                        <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
                    </div>
                    <div v-else>
                        <div v-if="this.$store.state.hasAdSaved">
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
                        <Ads class="p-1" v-for="ads in items"
                            v-bind="ads"
                            :key="ads.id"
                            :ads.sync="ads">
                        </Ads>
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
                        <p>Vous n'avez aucune annonce enregistrée pour l'instant.</p>
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
    import Ads from '@/components/ads/Ads.vue'
    
    export default {
        data () {
            return { 
                perPage:1
            }
        },
        computed: {
            items(){
                return this.$store.state.mysaveAds.ads
            },
          rows(){
            return this.$store.state.nbPageMySavedAds
          },
          currentPage:{
            // getter
          get: function () {
            return this.$store.state.currentPageSavedAds
          },
          // setter
          set: function (newValue) {
            this.$store.state.currentPageSavedAds=newValue
            this.gotoNextPage()
              window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
            }

          },
        },
        components:{
            Ads,
        },
        beforeMount(){
            
            this.$Progress.start();
            this.$store.state.mysavedAdfound='loading'
            setTimeout(() => {
               var user=localStorage.getItem('usetrixco')
                let form= new FormData()
            form.append('user',user)
            form.append('curPage',this.$store.state.currentPageSavedAds)
            console.log(user)
            this.$store.dispatch('getMySavedAds',form).then(()=>{
            //form.append('next',this.$store.state.currentPageMyAds)
            this.$Progress.finish();
            })
            }, 1000);
            
        },
        methods:{
            gotoNextPage(){
            let form= new FormData()
            form.append('user',this.$store.state.currentUser.id)
            form.append('curPage',this.$store.state.currentPageSavedAds)
            this.$store.dispatch('getMySavedAds',form).then(()=>{
            //form.append('next',this.$store.state.currentPageMyAds)
            this.$Progress.finish();
            })
            },
        },
    }
</script>
