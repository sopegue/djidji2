<template >
    <div v-if="notif.seen==0" class="new us-c-not">
        <div class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class="d-flex flex-row  align-items-center">
                        <i class="fas fa-envelope"></i>
                         <span style="color:green;"> Nouveau </span><p>Notifiation de message.</p>
                    </div>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   Bonjour <span style="font-weight:600;">{{ this.$store.state.currentUser.Nom}}</span>, vous avez réçu un message concernant l'annonce de titre <router-link to="#" class="add"  @click.native="gotoAd">{{myad.titre}}</router-link>.
                   <br>
                   Consulter votre boite email pour voir le message.
                </div>
            </div>
            <div class="not-foot d-flex flex-row justify-content-between">
                <div class="not-timee">
                    <i class="far fa-clock"></i> Il y a {{dateA}}
                </div>
            </div>
        </div>
    </div>
    <div v-else class="us-c-not">
        <div class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class="d-flex flex-row  align-items-center">
                        <i class="fas fa-envelope"></i>
                        <p>Notifiation de message.</p>
                    </div>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   Bonjour <span style="font-weight:600;">{{ this.$store.state.currentUser.Nom}}</span>, vous avez réçu un message concernant l'annonce de titre <router-link to="#" class="add"  @click.native="gotoAd">{{myad.titre}}</router-link>.
                   <br>
                   Consulter votre boite email pour voir le message.
                </div>
            </div>
            <div class="not-foot d-flex flex-row justify-content-between">
                <div class="not-timee">
                    <i class="far fa-clock"></i> Il y a {{dateA}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
    export default {
        data () {
            return { 
                myad:[],
                mynot:[]
            }
        },
        beforeMount(){
            this.getAd()
        },
        computed:{
            dateA(){
      var date=new Date(this.notif.created_at.toString())
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
        },
        props:['notif'],
        methods: {
            notVue(){
            let formData = new FormData();
            formData.append('notif', this.notif.id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/notVue', data: formData, method: 'POST' })
                .then(respo => {
                    console.log('vue')
                  resolve(respo)
                })
            })
            },
         gotoAd(){
             this.notVue()
            this.$router.push({name:'InfoAd',params:{id:this.notif.ann_id}}).then(()=>{
            }).catch(err => {
                
            });
         },
         getAd(){
            let formData = new FormData();
            formData.append('ad', this.notif.ann_id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/getNotifAd', data: formData, method: 'POST' })
                .then(respo => {
                    this.myad=respo.data
                  resolve(respo)
                })
            })
        }
        }
    }
</script>
<style scoped>
.not-title span{
    padding-left: 4%;
}
.new{
    background-color: #d6d6d62c;
}
.add{
    font-weight: 700;
    color: #004e66 !important;
}
.fa-users,.fa-envelope,.fa-bookmark{
    position: relative;
    top: 0.1rem;
    color: #004e66;
}
.us-c-not{
    height: auto;
    border: 0.5px solid #ddd;
    border-radius: 1%;
    margin-bottom: 0.5rem;
}
.us-c-not .container{
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.message{
    margin: 0 auto;
    width: 92%;
}
.not-title p{
    position: relative !important;
    top: 0.6rem;
    left: 0.7rem;
    color: #004e66;
    font-weight: bold;
    font-size:medium ;
}
.not-foot{
    padding-top: 1.5rem;
}
.not-dismiss button, .not-read button{
    background-color: white;
    border: none;
}
button:focus{
    outline: none;
}
.not-read button{
    color: #004e66;
}
.fa-times{
    font-size: 16px;
    color: rgb(100, 100, 100) !important;
}
.not-timee{
    color: rgb(100, 100, 100);
    font-size: 13px;
}
</style>
