<template>
  <div id="welbd">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div @click="gotoAd"  class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="/bannerdesign.png" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/bannerdesign.png" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="/bannerdesign.png" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  </div>
</template>
<script>
  export default { 
     data() {
      return {
      }
    }, 
    methods:{
      gotoAd(){
        var myForm=new FormData()
        myForm.append('ad',138)
        if(this.$store.state.accessToken!=='' && this.$store.state.currentUser.id != 82 ){
          myForm.append('user',this.$store.state.currentUser.id)
        }
        if(this.$store.state.accessToken!=='' && this.$store.state.currentUser.id == 82 ){
          myForm.append('self',this.$store.state.currentUser.id)
        }
        this.$store.dispatch('increment',myForm)
        this.$router.push({name:'InfoAd',params:{id:138}}).then(()=>{
        }).catch(err => {

        });
         
      },
    },
  }
</script>
<style scoped>
  #welbd{
    z-index: 45;
  }
  #carouselExampleControls{
    cursor: pointer;
    padding-bottom: 2rem;
    padding-top: 2rem;
    margin: 0 auto;
    width: 70%;
    width: 65%;
    height: auto;
  }
</style>