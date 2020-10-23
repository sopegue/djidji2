<template>
  <div>
    <router-view :user="user" :ad="ad"></router-view>
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
      handler:function(n){
        this.getUser();
        this.$Progress.finish();
      }
    }
  },
  beforeMount(){
    this.getAd();
  },
  methods:{
      async getUser(){
        
        const { data } = await this.$http.get(`https://djidjii.herokuapp.com/api/user/${this.ad.use_id}`);
       // alert(this.ad.use_id)
        this.user=data;
        localStorage.setItem('infoUser',JSON.stringify(this.user))
        //this.$store.commit('infoUser',data)

      },
      async getAd(){
        this.$Progress.start();
        const { data } = await this.$http.get(`https://djidjii.herokuapp.com/api/annonce/${this.$route.params.id}`)
        .catch(()=>{
          this.$router.push('/admin')
        })
        this.ad=data;
        localStorage.setItem('infoAd',JSON.stringify(this.ad))
        this.$store.commit('infoAd',data)
      },
  }
}
</script>
