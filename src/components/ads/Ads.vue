<template>
  <div v-cloak class="ads" @click="goToAds()" >
    <div class="row-1">
      <div class="d-btn-nc d-flex justify-content-between">
          <button class="btn-nc btn btn-link">
              <i v-if="saved"  class="fas fa-check"></i>
              <i v-else class="fas fa-plus"></i>
          </button> 
          <button class="btn-nc btn btn-link">
              <i class="fas fa-exclamation-circle"></i>
          </button>
          
      </div>
      <div class="ads-img">
        <img v-if="load" :style="{'position':'relative'}" :src="'/images/loading.png'" :height="180" :width="180"/>
        <img v-else :style="{'position':'relative'}" :src="image" :height="180" :width="180"/>
      </div>
      
    </div>
    <div class="row-2">
      <p  v-if="load" style="font-size: small; color: gray; position: relative; left:0.5rem;">Chargement...</p>
      <div class="ad-infoo d-flex flex-column" else>
        <span class="descPrix">{{ads.prix}} FCFA</span>
        <span class="descPrix-r-second">{{ads.titre}}</span>
        <span class="p-time"><i class="far fa-clock"></i>Il y a 9h.</span>
        <span class="p-time"><i class="fas fa-location-arrow"></i> Abidjan</span>
        
       
      </div>
 
    </div>
  </div>
</template>
<style scoped>
  .p-time{
    padding-left: 0.5rem;
    padding-top: 0.2rem;
    color: rgb(136, 134, 134);
  }
  .fa-clock{
    margin-right: 0.5rem;
  }
  .ad-infoo{
    position: relative;
    top: 0.2rem;
  }
  
.fa-plus{
  position: relative;
  top: -0.15rem;
  right: .35rem;
  color: #ddd; 
}
.fa-exclamation-circle{
  position: relative;
  top: -0.15rem;
  right: .3rem;
  color: #ddd;
}
.fa-check{
  position: relative;
  top: -0.1rem;
  right: .3rem;
  color: #ddd;
}
</style>
<script>
  export default {
    data() {
      return {
        saved:true,
        pic:[]
      }
    },
    computed:{
      load(){
        if(this.ads!=null)
          return false;
        return true;
      },
      image(){
       return `/images/${this.pic[0]}.JPG`;
      }
    },
    mounted(){
      this.addPic();
    },
    props: ['ads'],
    methods:{
      goToAds(){
        this.$router.push({name:'InfoAd',params:{id:this.ads.id}}).catch(err => {});
       if(this.$router.currentRoute.name==='InfoAd')
        location.reload();
      },
      addPic(){
        this.pic=this.ads.pp.split(",");
      }
    },
    watch:{
      ads: {
        handler: function(){
          this.loading=false;
        
      },
      deep:true
      },
    },
  }
</script>