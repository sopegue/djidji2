<template>
    <div id="wel-bd">
      <div class="item-title">
          <router-link to="/economic" class="a-ads-title">Economiques <small class="a-ads-title-small"> Voir plus</small></router-link>
      </div>
      <div class="item-bd">
        <div id="item-header">
          <!-- une boucle for pour afficher les adss -->
          <slider animation="fade"
          :stopOnHover="true">
            <slider-item
              v-for="i in 3"
              :key="i"
              :style="{ backgroundColor: '#f8f9fa', width: '100%', height: '100%' }"
            >
              <div class="us-list-load text-center"  v-if="isLoading">
                <b-spinner class="p" label="Loading..."></b-spinner>
              </div>
              <div class="d-flex flex-row justify-content-between" v-else>
                <ads v-for="(j,index) in 5"
                  :key="index"
                  :ads="ads[index + (15-i*5)]"
                >
                </ads>
              </div>
              
              <!--<crud-component
                v-for="crud in cruds"
                v-bind="crud"
                :key="crud.id"
                @update="update"
                @delete="del"
              >
              </crud-component>-->
            </slider-item>
          </slider>
        </div>
      </div>
  </div>
</template>
<style scoped>
  
   .us-list-load{
     position: relative;
     top:45%;
        width: 64px;
        height: 64px;
        margin: 0 auto;
    }
    .ads{
      border:none;
    }
    .ads:hover{
  border: 1px solid rgb(184, 184, 184);
  transform: scale(1);
}
     .us-list-load .p{
        position: relative;
        top: 0.2rem !important;
    }
</style>
<script>
  import Ads from '@/components/ads/Ads.vue'
  export default { 
     data() {
      return {
        ads:[],
        isLoading:true
      }
    },
    props:['adseco'],
    watch:{
      adseco: { 
        handler: function(n){
        this.ads=n;
        this.isLoading=false;
      },
      deep: true
      },
    },
    components: {
       Ads,
    }
  }
</script>