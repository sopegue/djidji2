<template>
  <div :style="{'position':'relative','top':'1rem' }">
      <div>
          <button @click="goBack()" class="btn btn-success"><i class="fas fa-arrow-left"></i> Retour</button>
      </div>
      <div v-if="isLoading" class="us-list-load">
        <b-spinner class="p" label="Loading..."></b-spinner>
      </div>
      <div v-else class="d-flex">
          <div class="pic text-center">
               <img :style="{'position':'relative','top':'1.5rem' }" :src="'/images/1.JPG'" :height="128" :width="128"/>
               <p class="us" :style="{'position':'relative','top':'2.5rem' }">Yaya Sopégué Soro</p>
               <p class="sign" :style="{'position':'relative','top':'2rem' }"><i class="fas fa-user-plus"></i> Inscrit le 12 Octobre 2019</p>
               <p class="lieu" :style="{'position':'relative','top':'1.5rem' }"><i class="fas fa-map-pin"></i> Habite à Monastir</p>
          </div>
          <div class="pipic">
              
      <div class="adduss">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="adddiv">
            <span>Email ou Téléphone</span><br>
            <span class="black">aazdadazda</span>
            </div>
            <div class="adddiv">
            <span>Nom</span><br>
            <span class="black">aazdadazda</span>
            </div>
            <div class="adddiv tt">       
            <span>Prénom</span><br>
            <span class="black">aazdadazda</span>
            </div>
            <div class="adddiv tt">
          <span>Ville</span><br>
            <span class="black">aazdadazda</span>
            </div>
            <div class="adddiv tt ta">
           <span>Tel</span><br>
            <span class="black">aazdadazda</span>
            </div>
             <div class="adddiv tt ta">
            <span>Type de compte</span><br>
            <span class="black">aazdadazda</span>
            </div>
         </div>
         <div v-if="blocked">
             <button class="btn btn-danger" title="Bloquer l'utilisateur"><i class="fas fa-lock"></i></button>
         </div>
         <div v-else>
             <button class="btn btn-success sssc" title="Débloquer l'utilisateur"><i class="fas fa-lock-open"></i></button>
         </div>
          
         
      </div>
          </div>
      </div>
      <hr>
  </div>
</template>
<style scoped>
.black{
    font-weight: 700;
    font-size: 18px;
}
.ta{
    position: relative;
    top: 2rem !important;
}
.tt{
    position: relative;
    top: 1rem;
}
.adduss{
    width: 90%;
    margin: 0 auto;
}
.adddiv{
    width: 40%;
}
.us{
    font-weight: 700;
    font-size: 20px;
}
.sign,.lieu{
    color: grey;
}
.pic img{
    border-radius: 50%;
}
.pipic,hr{
    position: relative;
    top: 2.5rem;
}
.btn-danger,.sssc{
    position: relative;
    top: 4rem;
}
.pic{
    position: relative;
    top: 2rem;
    width: 30%;
    height: 280px  !important;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 10px;
}
.atote{
    position: relative;
    padding-right: 5%;
}
.sttt{
    position: relative;
    left: 5%;
}
.noff{
    position: relative;
    left: 26%;
    top: 0.7rem;
}

.spii{
    position: relative;
    right: 25%;
    top: -0.5rem;
}
.fa-comment,.fabell svg{
    font-size: 20px;
}
.ddrap div{
    cursor: pointer;
}
.toos{
    background-color: rgb(0, 72, 93);
    position: relative;
    top: 1.5rem;
}
.toos:hover{
    background-color: rgb(124, 212, 83);
}
.toos:hover .nav-link 
{
    color: white !important;
}
.nav-link:hover{
    color: rgb(255, 255, 255) !important;
}
.inks:hover{
    color: rgb(255, 255, 255) !important;
}
.myyy{
    overflow: auto;
    width: 20% !important;
    height: 100% !important;
}
.myyys{
    overflow: auto;
    width: 20% !important;
    height: 100% !important;
}
.row{
    height: 100%;
}

#sidebarMenu{
    overflow: unset !important;
    background-color: #004E66;
    height: 100% !important;
    padding-bottom: 2rem;
}
.nav-link svg{
    height: 16px !important;
    width: 16px !important;
}
.aa svg{
    height: 24px !important;
    width: 24px !important;
}
.aaa svg{
    height: 28px !important;
    width: 28px !important;
}
.icon svg {
    width: 60px !important;
    height: 60px !important;
}
 .dropdown-toggle::after{
    position: relative;
    top: 0.08rem;
    left: 1%;
  }

.too {
    background-color: rgb(0, 72, 93);
}
.userB{
    position: relative;
    right: 5%;
    top: -0.1em;
    color: rgb(238, 238, 238) !important;;
}
.logo-title{
    height: 48px;
  position: relative;
  left: 8%;
  font-weight: 400;
  color: /*white*/ rgb(243, 243, 243) !important;
}

.nav-item a{
    color: rgb(206, 206, 206) !important;
}
    .iidd{
        
    background-color: #004E66 !important;
    }
</style>
<script>
// @ is an alias to /src
export default {
    data(){
        return{
            isLoading:false,
            blocked:false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>
