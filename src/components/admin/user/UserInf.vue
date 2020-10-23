<template>
  <div :style="{'position':'relative','top':'1rem' }">
      <div>
          <button @click="goBack()" class="btn btn-success"><i class="fas fa-arrow-left"></i> Retour</button>
      </div>
      <div v-if="isLoading" class="us-list-load">
        <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
      </div>
      <div v-else class="d-flex">
          <div class="pic text-center">
               <div class="us-inf-img"  v-lazy-container="{ selector: 'img', error: '/images/user.png', loading: '/images/loadingss.gif ' }">
                    <img :style="{'position':'relative','top':'2.2rem' }" :data-src="'https://djidjii.herokuapp.com/storage/'+user.id+'/profile/'+user.pp"/>
                </div>
               <p v-if="user.Nom && user.Prenom" class="us" :style="{'position':'relative','top':'2.5rem' }">{{user.Prenom}} {{user.Nom}}</p>
               <p v-else-if="user.Nom" class="us" :style="{'position':'relative','top':'2.5rem' }">{{user.Nom}}</p>
               <p class="sign" :style="{'position':'relative','top':'2rem' }"><i class="fas fa-user-plus"></i> Membre depuis {{dateM}}</p>
               <p v-if="user.ville" class="lieu" :style="{'position':'relative','top':'1.5rem' }"><i class="fas fa-map-pin"></i> Habite à {{user.ville}}</p>
          </div>
          <div class="pipic">
              
      <div class="adduss">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="adddiv">
            <span>Email</span><br>
            <span class="black">{{user.email}}</span>
            </div>
            <div class="adddiv">
            <span>Nom</span><br>
            <span class="black">{{user.Nom}}</span>
            </div>
            <div class="adddiv tt">       
            <span>Prénom</span><br>
            <span v-if="user.Prenom" class="black">{{user.Prenom}}</span>
            <span v-else class="black" style="font-style: italic;">Pas de prénom.</span>
            </div>
            <div class="adddiv tt">
          <span>Ville</span><br>
            <span v-if="user.ville" class="black">{{user.ville}}</span>
            <span v-else class="black" style="font-style: italic;">Pas de ville.</span>
            </div>
            <div class="adddiv tt ta">
           <span>Tel</span><br>
            <span v-if="user.tel" class="black">{{user.tel}}</span>
            <span v-else class="black" style="font-style: italic;">Pas de téléphone.</span>
            </div>
             <div class="adddiv tt ta">
            <span>Type de compte</span><br>
            <span class="black">{{user.type}}</span>
            </div>
         </div>
         <div v-if="user.isblocked!==0">
             <button class="btn btn-danger" @click="unblock(user.id)"  title="Cliquez pour débloquer l'utilisateur"><span key="unstared" v-show="user.isblocked!=0"><i class="fas fa-lock"></i></span></button>
         </div>
         <div v-else>
             <button @click="block(user.id)" title="Cliquez pour bloquer l'utilisateur" class="btn btn-success sssc"><span key="stared" v-show="user.isblocked==0"><i class="fas fa-lock-open"></i></span></button>
             
         </div>
          
         
      </div>
          </div>
      </div>
      <hr>
  </div>
</template>
<script>
import Axios from 'axios'
// @ is an alias to /src
export default {
    data(){
        return{
            isLoading:true,
            user:[],
            us:0,
            blocked:false
        }
    },
    beforeMount(){
        this.us=localStorage.getItem('ccur')
        this.getUser()
        this.$Progress.finish();
    },
    computed:{
        dateM(){
      var date=new Date(this.user.created_at.toString())
      var date1 = Date.now()
      var mili = date.getTime()
      const diffTime = Math.floor(Math.abs(date1 - mili)/1000)
      console.log(diffTime + " seconds")
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
    },
    methods:{
        block(id){
       let r = prompt('Souhaitez-vous bloquer cet utilisateur ? Entrez le mot "oui" puis cliquez sur Ok pour bloquer')
      if (r == 'oui') {
        this.$Progress.start()
         let formData = new FormData();
            formData.append('user', id);
            formData.append('me', this.$store.state.currentUser.id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/blockuser', data: formData, method: 'POST' })
                .then(respo => {
                   this.user.isblocked=1
                    console.log('blocked')
                        this.$notify({
                          group: 'usblocked',
                        });
                    this.$Progress.finish()
                  resolve(respo)
                })
            })
      }
    },
    unblock(id){
       let r = prompt('Souhaitez-vous débloquer cet utilisateur ? Entrez le mot "oui" puis cliquez sur Ok pour débloquer')
      if (r == 'oui') {
        this.$Progress.start()
        let formData = new FormData();
            formData.append('user', id);
            formData.append('me', this.$store.state.currentUser.id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/unblockuser', data: formData, method: 'POST' })
                .then(respo => {
                   this.user.isblocked=0
                    console.log('unblocked')
                    this.$notify({
                          group: 'usunblocked',
                    });
                    this.$Progress.finish()
                  resolve(respo)
                })
            })
      }
    },
        async getUser(){
        this.$Progress.start();
        const { data } = await this.$http.get(`https://djidjii.herokuapp.com/api/user/${this.us}`);
       // alert(this.ad.use_id)
        this.user=data;
        this.isLoading=false
        //this.$store.commit('infoUser',data)

      },
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
img[lazy=error] {
    /*your style here*/
    width: 128px;
    height: 128px;
  }
  img[lazy=loading] {
    /*your style here*/
    width: 128px;
    height: 128px;
  }
  img[lazy=loaded] {
    /*your style here*/
    width: 128px;
    height: 128px;
  }
.us-list-load{
      position: relative;
        padding-top: 2rem;
        padding-bottom: 2rem;
        width: 64px;
        height: 64px;
        margin: 0 auto;
    }
     .us-list-load .p{
        position: relative;
        top: 0.2rem !important;
    }
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