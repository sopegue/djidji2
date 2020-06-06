<template>
  <div>
    <router-view :user="user" :ad="ad"></router-view>
    <welcome class="wel-to"></welcome>
  </div>
</template>
<style scoped>
  .wel-to{
    position: relative;
    top:5rem;
    padding-bottom: 3rem;
  }
</style>
<script>
import Welcome from '@/components/body/Welcome.vue'
// @ is an alias to /src
export default {
  components:{
    Welcome
  },
  name: 'InfoAds',
  data(){
    return{
      user:[],
      ad:[],
    }
  },
  watch:{
    ad:{
      handler:function(){
        this.getUser();
        this.$Progress.finish();
      }
    }
  },
  created(){
    this.getAd();
  },
  methods:{
      async getUser(){
        
        const { data } = await this.$http.get(`http://localhost:8000/api/user/${this.ad.use_id}`);
       // alert(this.ad.use_id)
        this.user=data;
      },
      async getAd(){
        this.$Progress.start();
        const { data } = await this.$http.get(`http://localhost:8000/api/annonce/${this.$route.params.id}`);
        this.ad=data;
      },
  }
}
</script>
