<template>
  <div id="welbd">
      <Favorite :adsfav="adsfav"></Favorite>
      <Top :adstop="adstop"></Top>
      <Economic :adseco="adseco"></Economic>
  </div>
</template>
<script>
  function Ads({ id, use_id, categorie, titre, description, marque, prix, pp, nbvues, added_at, updated_at}) 
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
  import Economic from '@/components/body/Economic.vue'
  import Favorite from '@/components/body/Favorite.vue'
  import Top from '@/components/body/Top.vue'
  export default { 
     data() {
      return {
        adseco:[],
        adstop:[],
        adsfav:[],
      }
    }, 
    created(){
        this.getAdsAll();
    },
    methods:{
        async getAdsAll(){
            const { data } = await this.$http.get('http://localhost:8000/api/annonce');
            data.forEach(ads => this.adseco.push(new Ads(ads)));
            data.forEach(ads => this.adsfav.push(new Ads(ads)));
            data.forEach(ads => this.adstop.push(new Ads(ads)));
        },
    },
    components: {
      Economic,
      Favorite,
      Top
    }
  }
</script>
<style scoped>
  #welbd{
    z-index: 45;
  }
</style>