<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
                    <h5 class="">Mes annonces enregistrées</h5>
                    <hr class="hr-us-inf">
                <div>
                    <div class="us-list-load" v-if="isLoading">
                       <b-spinner class="p" label="Loading..."></b-spinner>
                    </div>
                     <div v-else>
                    <div  v-if="isAdSaved" class="d-list-us d-flex flex-wrap justify-content-start">
                        
                        <Ads v-for="ads in adss"
                            v-bind="ads"
                            :key="ads.id"
                            :ads.sync="ads">
                        </Ads>
                    
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
    </div>
</template>
<style scoped>
    .large-12{
        margin-top: 3rem;
    }
    .d-list-us{
        background-color: #f8f9fa;
        margin-top: 2rem;
        padding-bottom: 3rem;
    }
    .ads{
        margin-top: 3rem;
         margin-left: 2%;
        margin-right:auto;
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
    function Adse({ id, use_id, categorie, titre, description, marque, prix, pp, nbvues, added_at, updated_at}) 
  {
     this.id = id;
     this.use_id= use_id;
     this.categorie= categorie;
     this.titre=titre;
     this.description=description;
     this.marque=marque;
     this.prix=prix;
     this.pp=pp;
     this.nbvues=nbvues;
     this.added_at=added_at;
     this.updated_at=updated_at;
   }
    
    export default {
        data () {
            return { 
                adss:[],
                isLoading:false,
            }
        },
        components:{
            Ads,
        },
        computed:{
            isAdSaved(){
                return true
                //return this.$store.state.hasAdSaved
            }
        },
        created(){
            this.isLoading = true;
            this.$Progress.start();
            this.getAdsAll();
        },
        methods:{
            async getAdsAll(){
                const { data } = await this.$http.get('http://localhost:8000/api/annonce');
                data.forEach(ad => this.adss.push(new Adse(ad)));
                this.isLoading = false;
                this.$Progress.finish();
            },
        },
    }
</script>
