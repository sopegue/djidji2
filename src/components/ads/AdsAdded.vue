<template>
  <div v-cloak class="ads" title="Cliquez pour voir l'annonce" >
    <div class="row-1">
      <div class="d-btn-nc d-flex justify-content-between">
          <button @click="modifierAd" title="Modifier l'annonce" class="btn-nc btn btn-link">
              <i class="fas fa-edit"></i>
          </button> 
          <button @click="supprimerAd" title="Supprimer l'annonce" class="btn-nc btn btn-link">
              <i class="fas fa-trash"></i>
          </button>
          
      </div>
      <div  @click="goToAds()" class="ads-img"  v-lazy-container="{ selector: 'img', error: '/images/error.png', loading: '/images/loading.gif ' }">
        <img :style="{'position':'relative'}" :data-src="image"/>
      </div>
      
    </div>
    <div  @click="goToAds()" class="row-2">
    
      <div class="ad-infoo d-flex flex-column" else>
        <span class="descPrix">{{prix}}</span>
        <span class="descPrix-r-second">{{titre}}</span>
        <span class="p-time"><i class="far fa-clock"></i>Il y a {{dateA}}</span>
        <span v-if="ville!==''" class="p-time"><i class="fas fa-location-arrow"></i>&nbsp;&nbsp;{{this.ads.ville}}</span>
        
       
      </div>
 
    </div>
  </div>
</template>
<style scoped>

.btn-nc{
  position: relative;
  top: -.1rem;
  right: 0.2rem;
  background-color: rgba(0, 0, 0, 0.5) !important;
  width: 32px;
  height: 32px;
  z-index: 1;
}
img[lazy=loading] {
   width: 180px;
    height: 180px;
  }
  img[lazy=error] {
    /*your style here*/
    width: 180px;
    height: 180px;
  }
  img[lazy=loaded] {
    /*your style here*/
    width: 180px;
    height: 180px;
  }
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
  
.fa-edit{
  position: relative;
  top: -0.15rem;
  right: .30rem;
  color: #ddd; 
}
.fa-trash{
  position: relative;
  top: -0.15rem;
  right: .3rem;
  color: #ddd;
}
.ads{
  width: fit-content;
  height: 300px;
  cursor: pointer;
  border: 1px solid rgb(184, 184, 184);
  border-radius: 10px !important;
}
.row-2{
  position: relative;
}
.ads-img{
    position: relative;
    top: -2.0rem;
    width: 180px;
    height: 180px;
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
        loading:true,
        pic:[]
      }
    },
    beforeUpdate(){
      this.ville=this.ads.ville
      console.log(this.ads.ville)
    },
    computed:{
      ville:{
        get:function(){
        return this.ads.ville === undefined ? '' : this.ads.ville
        },
        set:function(val){
          this.ads.ville=val
        }
      },
      dateA(){
      var date=new Date(this.ads.created_at.toString())
      var date1 = Date.now()
      var mili = date.getTime()
      const diffTime = Math.floor(Math.abs(date1 - mili)/1000)
      if(Math.floor(diffTime/60)>=1){
        if(Math.floor(diffTime/(60*60))>=1){
          if(Math.floor(diffTime/(60*60*24))>=1){
            if(Math.floor(diffTime/(60*60*24*7))>=1){
              if(Math.floor(diffTime/(60*60*24*7*4))>=1){
                if(Math.floor(diffTime/(60*60*24*7*4*12))>=1){
                  return Math.floor(diffTime/(60*60*24*7*4*12)).toString()+' an(s)'
                }
                else
                  return Math.floor(diffTime/(60*60*24*7*4)).toString()+' mois'
                
              }
              else
                return Math.floor(diffTime/(60*60*24*7)).toString()+' semaine(s)'
            }
            else{
              return Math.floor(diffTime/(60*60*24)).toString()+' jour(s)'
            }
          }
          else{
            return Math.floor(diffTime/(60*60)).toString()+' heure(s)'
          }
        }
        else{
          return Math.floor(diffTime/60).toString()+' minute(s)'
        }
      }
      else{
        return '1 minute'
      }
    },
     prix(){
       var str = this.ads.prix.toString();
      var len = str.length;
      if (len > 4) {
        if (len == 5) str = str.slice(0, 2) + " " + str.slice(2);
        if (len == 6) str = str.slice(0, 3) + " " + str.slice(3);
        if (len == 7)
          str = str.charAt(0) + " " + str.slice(1, 4) + " " + str.slice(4);
        if (len == 8){
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2, 5) + " " + str.slice(5);
        }
        if (len == 9){
          //if(count==1)
          str = str.slice(0, 3) + " " + str.slice(3, 6) + " " + str.slice(6);
        }
        if (len == 10){
          //if(count==1)
          str = str.slice(0, 1) + " " + str.slice(1, 4) + " " + str.slice(4,7)+ " " + str.slice(7);
        }
      }
       str=str+' FCFA';
       if(str.length>19)
       return str.slice(0,16)+'...'
       return str
    },
      titre(){
        var str = this.ads.titre;
      var len = str.length;
       if(str.length>19)
       return str.slice(0,16)+'...'
       return str
      },
      load(){
        if(this.pic.length!=0)
          return false;
        return true;
      },
      image(){
       return 'http://localhost:8000/storage/'+this.ads.use_id+'/annonces/'+this.pic[0];
      }
    },
    
    updated(){
      this.checkIfSaved()
    },
    beforeMount(){
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      this.addPic();
    },
    props: ['ads'],
    methods:{
      supprimerAd(){
        var r = confirm("Voulez-vous supprimer cette annonce ? Cliquez sur Ok pour supprimer.")
        if (r == true) {
        this.$Progress.start()
        var content = new FormData()
          content.append('ad',this.ads.id)
          this.$store.dispatch('supprimerAd',content).then(()=>{
            this.$notify({
              group: 'deladdel',
            });
             this.$Progress.finish()

            if(this.$router.currentRoute.path==='/user/added')
              location.reload()
          })
          }
      },
      modifierAd(){
        this.$Progress.start()
        this.$store.state.adToDelete=this.ads.id
        var content = new FormData()
          content.append('ad',this.ads.id)
        this.$store.dispatch('getAdToDel',content).then(()=>{
           this.$Progress.finish()
          this.$router.push('/annonce/updating')
        })
      },
      goToAds(){
        this.$router.push({name:'InfoAd',params:{id:this.ads.id}}).then(()=>{
        }).catch(err => {

        });
         
      },
      addPic(){
        this.pic=this.ads.pp.split(",");
      }
    },
    watch:{
      pic: {
        handler: function(){
          //this.pic=this.ads.pp.split(",");
          this.loading=false;
        
      },
      deep:true
      },
    },
  }
</script>