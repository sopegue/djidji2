<template >
    <div v-if="notif.admseen==0" class="new us-c-not">
        <div v-if="notif.ann_id" class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class="d-flex flex-row  align-items-center">
                        <i class="far fa-flag"></i>
                         <span style="color:green;"> Nouveau </span><p>Notifiation de signalement (annonce).</p>
                    </div>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   Bonjour <span style="font-weight:600;">{{ this.$store.state.currentUser.Nom}}</span>, une <span style="font-weight:700">annonce</span> a été signalée, cliquez <router-link v-if="mynot.id" to="#" class="add"  @click.native="gotoAd">ici </router-link> pour la consulter.
                  
                </div>
            </div>
            <div class="not-foot d-flex flex-row justify-content-between">
                <div class="not-timee">
                    <i class="far fa-clock"></i> Il y a {{dateA}}
                </div>
            </div>
        </div>
        <div v-if="notif.use_to_sig" class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class="d-flex flex-row  align-items-center">
                        <i class="far fa-flag"></i>
                         <span style="color:green;"> Nouveau </span><p>Notifiation de signalement (utilisateur).</p>
                    </div>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   Bonjour <span style="font-weight:600;">{{ this.$store.state.currentUser.Nom}}</span>, un <span style="font-weight:700">utilisateur</span> a été signalé, cliquez <router-link v-if="mynot.id" to="#" class="add"  @click.native="gotoAd">ici </router-link>pour consulter.
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
        <div v-if="notif.ann_id" class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class="d-flex flex-row  align-items-center">
                        <i class="far fa-flag"></i>
                         <p>Notifiation de signalement (annonce).</p>
                    </div>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   Bonjour <span style="font-weight:600;">{{ this.$store.state.currentUser.Nom}}</span>, une <span style="font-weight:700">annonce</span> a été signalée, cliquez <router-link v-if="mynot.id" to="#" class="add"  @click.native="gotoAd">ici </router-link> pour la consulter.
                  
                </div>
            </div>
            <div class="not-foot d-flex flex-row justify-content-between">
                <div class="not-timee">
                    <i class="far fa-clock"></i> Il y a {{dateA}}
                </div>
            </div>
        </div>
        <div v-if="notif.use_to_sig" class="container">
            <div class="not-head d-flex flex-row justify-content-between">
                <div class="not-title">
                    <div class="d-flex flex-row  align-items-center">
                        <i class="far fa-flag"></i>
                        <p>Notifiation de signalement (utilisateur).</p>
                    </div>
                </div>
            </div>
            <div class="not-bd">
                <div class="message">
                   Bonjour <span style="font-weight:600;">{{ this.$store.state.currentUser.Nom}}</span>, un <span style="font-weight:700">utilisateur</span> a été signalé, cliquez <router-link v-if="mynot.id" to="#" class="add"  @click.native="gotoAd">ici </router-link>pour consulter.
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
            this.getMyNotif()
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
                Axios({url: 'http://localhost:8000/api/notVueAdminn', data: formData, method: 'POST' })
                .then(respo => {
                    console.log('vue')
                  resolve(respo)
                })
            })
            },
         gotoAd(){
            this.notVue()
            if(this.notif.ann_id!==null){
            this.$router.push({name:'InfoAdm',params:{id:this.mynot.id}}).then(()=>{
            }).catch(err => {
                this.$router.push('/admin')
            });
            }
            else{
            this.$store.state.notUser=this.mynot.id
            this.$router.push('/admin/usinf').then(()=>{
            }).catch(err => {
                this.$router.push('/admin')
            });
            }
            

         },
        getMyNotif(){
            let formData = new FormData();
            if(this.notif.use_to_sig!==null){
                formData.append('user_to', this.notif.use_to_sig);
                console.log('user',this.notif.use_to_sig)}
            if(this.notif.ann_id!==null){
                formData.append('ad', this.notif.ann_id);
                console.log('ad',this.notif.ann_id)}
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/getNotifContentAdmin', data: formData, method: 'POST' })
                .then(respo => {
                    this.mynot=respo.data
                    console.log('result',this.mynot.id)
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
    background-color: #d6d6d648;
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
