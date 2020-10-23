<template >
<div class="us-mess">
<div v-if="boite" class="container">
  
    <h6>{{mysmessage.length}} message(s)</h6>
  <div class="d-flex justify-content-between">
  <h5 class="">Ma boite à messagerie</h5>
  <ul class="addli">
      <li  v-if="adding" @click="messaging">
          <button class="regbs"><i class="fas fa-paper-plane"></i> Envoyer un message</button>
      </li>
      <li v-else @click="cancelMess">
          <button class="btn btn-danger"><i class="fas fa-times"></i> Annuler</button>
      </li>
  </ul>
  </div>
  <hr class="hr-us-inf">
  <div v-if="!adding" class="search-wrapper">
    <input type="text" v-model="search" placeholder="Nom d'utilisateur .."/>
    <label>Rechercher un utilisateur :</label>
    <div v-if="search!==''" class="d-mess">
      <div v-if="filteredList.length==0" class="text-center" style="height:32px; padding-top:0.2rem">
        Ops ! Aucun compte trouvé.
      </div>
      <div class="d-messs overflow-auto" style="max-height:400px; width:100%;  z-index:454; position:absolute" v-else >
          <div @click="sendMessage(index)" :title="'Contacter '+user.Nom+', email : '+user.email" class="user d-flex flex-row align-items-center justify-content-between" v-for="(user,index) in filteredList"
          :key="index">
            <div class="us-inf-img"  v-lazy-container="{ selector: 'img', error: '/images/user.png', loading: '/images/loadingss.gif ' }">
              <img :style="{'position':'relative' }" :data-src="'http://localhost:8000/storage/'+user.id+'/profile/'+user.pp"/>
            </div>
            <div style="font-size: 20px">
              {{nom(user.Nom)}}
            </div>
             <button class="btn"><i class="fas fa-paper-plane"></i></button>
          </div>
      </div>
    </div>
      <div v-if="messageus" class="mx-auto" style="position:relative; margin-top:3rem;">
        <div :title="currentUs.email" class="mx-auto d-flex flex-row justify-content-between" style=" positon:relative; width:fit-content">
            <h5>Envoyez un message à {{currentUs.Nom}}</h5>
            <div class="us-inf-img" style="position:relative; left:4%"  v-lazy-container="{ selector: 'img', error: '/images/user.png', loading: '/images/loadingss.gif ' }">
              <img :style="{'position':'relative' }" :data-src="'http://localhost:8000/storage/'+currentUs.id+'/profile/'+currentUs.pp"/>
            </div>
        </div>
            <form @submit.prevent="envoyerMess" class="mx-auto">
                <div class="mx-auto">
                  <textarea name="message" type="text" id="input-message" placeholder="Votre message" v-model="message"></textarea>
                  
                </div>
                  <div v-if="sending" class="cdcd spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                <button type="submit" id="input-submit">Envoyer <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </form>
        </div>
  </div>
   <div v-if="isLoading" class="us-list-load">
      <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
   </div>
<div v-else-if="mymessage.length==0" class="messaging" style="margin-top:1rem">
  <h6 class="text-center">Aucun nouveau message.</h6>
  <hr>
</div>
<div class="sms overflow-auto" style="max-height:500px" v-else>
  <div v-if="!editing">
  <div @click="goMess(mess.use_id)" v-for="(mess,index) in mymessage"
  :key="index">
  <div :title="mess.name" v-if="mess.seen==0" class="bgg sms-item d-flex flex-row justify-content-between" >
    <span style="font-size:12px;color:green; position:absolute; left:5%"> Nouveau </span><h5>{{sender(mess.name)}}<span style="font-size:18px;opacity:0.6"> {{mess.nb}}</span> | </h5>
    <p style="opacity:0.7;font-size:18px">{{mysms(mess.content)}}</p>
    <p style="font-size:12px;opacity:0.7;margin-top:0.4rem"> | Il y'a {{dateM(mess)}}</p>
  </div>
  <div v-else :title="mess.name" class="bggg sms-item d-flex flex-row justify-content-between" >
    <h5>{{sender(mess.name)}}<span style="font-size:18px;opacity:0.6"> {{mess.nb}}</span> | </h5>
    <p style="opacity:0.7;font-size:18px">{{mysms(mess.content)}}</p>
    <p style="font-size:12px;opacity:0.7;margin-top:0.4rem"> | Il y'a {{dateM(mess)}}</p>
  </div>
  </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</div>
<hr class="hr-us-inf">
<h6>{{notif.length}} message(s)</h6>
  <div class="d-flex justify-content-between">
  <h5 class="">Messages d'utilisateur(s)</h5>
  </div>
  <hr class="hr-us-inf">
  <div v-if="issLoading" class="us-list-load">
      <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
  </div>
  <div v-else class="sms overflow-auto" style="max-height:500px">
  <MessageContactUs 
  v-for="not in notif.slice().reverse()"
  :key="not.id"
  :notif="not"
  >
  </MessageContactUs>
  </div>
</div>


<div v-else class="container">
<div class="scc">
  <button @click="goBack()" class="btn btn-success"><i class="fas fa-arrow-left"></i> Retour</button>
</div>
<div v-if="iisLoading" class="us-list-load">
    <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
</div>
<div v-else class="overflow-auto" style="max-height:500px; margin-top:1.5rem">

<div class="allm" v-for="(mess,index) in allM"
  :key="index">
  <div class="d-flex flex-column">
<div class="d-flex flex-row justify-content-between">
<div class="us-inf-imgs d-flex flex-row " style="position:relative;"  v-lazy-container="{ selector: 'img', error: '/images/user.png', loading: '/images/loadingss.gif ' }">
  <img :style="{'position':'relative' }" :data-src="'http://localhost:8000/storage/'+mess.use_id+'/profile/'+mess.pp"/>
  <p style="position:relative; left:15%;"><span style="font-weight:700">{{mess.Nom}}</span></p>
</div>
<div class="d-flex flex-row justify-content-between">
<p style="font-size:12px">Il y'a {{dateM(mess)}}</p>
<button type="button" class="btn" v-if="mess.response==null" @click="setToRes(mess)" title="Répondre" style="float:right; margin-top:-0.8rem"><i class="fa fa-reply" aria-hidden="true"></i></button>
</div>
</div>
<div>
  <p style="position:relative; left:6.8%; width:75%;word-wrap: break-word;">{{mess.content}}
  </p>
</div>

<div v-if="mess.response!=null" style="width:100%;" class="d-flex flex-column align-self-end">
<p class="align-self-end" style="position:relative;"><span style="font-weight:700">Moi</span></p>
<p class="align-self-end" style="position:relative;direction: rtl; max-width:75%;word-wrap: break-word;">
  {{mess.response}}
  </p>
</div>
</div>
<div v-if="mess.respond">
<button type="button" title="Fermer" @click="close(mess)"><i class="fa fa-times" aria-hidden="true"></i></button>
<form  @submit.prevent="respond(mess.id)" class="mx-auto">
    <div class="mx-auto">
      <textarea name="message" type="text" id="input-message" placeholder="Votre message" v-model="message"></textarea>
    </div>
      <div v-if="sending" class="cdcd spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    <button type="submit" id="input-submit">Envoyer <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
</form>
</div>
</div>
</div>
</div>
</div>
</template>
<style scoped>
.bgg {
  background-color: 	#004e660c;
}
.bgg:hover,.bggg:hover{
  background-color: #004e6617;
}
</style>
<script>
import MessageContactUs from '@/components/admin/user/MessageContactUs.vue'
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
  import Axios from 'axios'
    export default {
      beforeMount(){
            this.getMess()
            this.getContactUs()
        },
        components:{
          MessageContactUs
        },
        mounted(){
          this.getUser()
        },
        data () {
            return {
              notif:[],
              curUs:0,
              toResp:0,
              iisLoading:true,
              boite:true,
              adding:true,
              editing:false,
              isLoading:true,
              issLoading:true,
              search:'',
              message:'',
              messValid:false,
              messageus:false,
              sending:false,
              users:[],
              mymessage:[],
              mysmessage:[],
              currentUs:[],
              us:[],
              usUnique:[],
              allM:[]

            }
        },
        computed:{
        filteredList() {
            return this.users.filter(post => {
            return (post.Nom.toLowerCase().includes(this.search.toLowerCase())
            || post.email.toLowerCase().includes(this.search.toLowerCase()) 
            )
            })
        }
        },
        methods: {
          setToRes(mess){
            console.log('clic')
            mess.respond=true
          },
          respond(id){
            if(this.checkField()){
            this.sending=true
            let formData = new FormData();
            formData.append('id', id);
            formData.append('message',this.message)
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/getAdmMessageRespond',data: formData, method: 'POST' })
                .then(respo => {
                  console.log('responded')
                  this.envoyerMessAll()
                  
                  this.resetField()
                  this.$notify({
                      group: 'success-sendEmail',
                  });
                  this.sending=false
                  this.getAllMess(this.curUs,this.$store.state.currentUser.id)
                  resolve(respo)
                })
            })
            }
          },
          close(mess){
           mess.respond=false
          },
          goBack(){
            this.boite=true
          },
          goMess(us){
            this.curUs=us
            this.boite=false
            this.iisLoading=true
            //this.setVue(us.id,this.$store.state.currentUser.id)
            this.getAllMess(us,this.$store.state.currentUser.id)
          },
          getAllMess(user,me){

            let formData = new FormData();
            formData.append('user', user);
            formData.append('me', me);
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/getAdmMessage',data: formData, method: 'POST' })
                .then(respo => {
                  this.allM=respo.data
                  this.iisLoading=false
                  resolve(respo)
                })
            })
          },
           sender(nom){
            if(nom.length>8)
            return nom.slice(0,5)+'...'
            return nom
          },
          
           mysms(nom){
            if(nom.length>55)
            return nom.slice(0,52)+'...'
            return nom
          },
         getMess(){
            let formData = new FormData();
            var user=localStorage.getItem('usetrixco')
            formData.append('user', user);
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/getMess', data: formData, method: 'POST' })
                .then(respo => {
                  this.isLoading=false
                  this.mysmessage=respo.data
                  if(this.mysmessage.length!=0)
                  {for (let index = 0; index < this.mysmessage.length; index++) {
                    this.us[index] = this.mysmessage[index].use_id
                    
                  }
                  }
                  this.usUnique=this.us.filter( onlyUnique )
                  for (let index = 0; index < this.usUnique.length; index++) {
                    for (let i = this.mysmessage.length-1; i>=0 ; i--) {
                      if(this.mysmessage[i].use_id==this.usUnique[index]){
                        this.mymessage[index]=this.mysmessage[i]
                        break
                      }
                      
                    }
                    
                  }
                  resolve(respo)
                })
            })
            },
            getContactUs(){
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/getContactUs', method: 'GET' })
                .then(respo => {
                  this.notif=respo.data
                  this.issLoading=false
                  resolve(respo)
                })
            })
            },
          checkField(){
      this.messValid=false
      if(this.message!==''){
          return true
      }
      this.messValid=true
      return false
    },
    resetField(){
      this.message=''
    },
    dateM(mess){
      var date=new Date(mess.updated_at.toString())
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
  envoyerMessAll(){
        if(this.checkField()){
        var content = new FormData()
        content.append('to_user',this.curUs)
        content.append('message',this.message)
        content.append('user',this.$store.state.currentUser.id)
        content.append('name',this.$store.state.currentUser.Nom)
        // envoyer le message
        this.$store.dispatch('sendAdmMess',content).then(()=>{
          this.getAllMess(this.curUs,this.$store.state.currentUser.id)
        })
      }
          },

      envoyerMess(){
        if(this.checkField()){
        this.sending=true
        var content = new FormData()
        content.append('to_user',this.currentUs.id)
        content.append('message',this.message)
        content.append('user',this.$store.state.currentUser.id)
        content.append('name',this.$store.state.currentUser.Nom)
        // envoyer le message
        this.$store.dispatch('sendAdmMess',content).then(()=>{
        
        this.resetField()
          this.$notify({
              group: 'success-sendEmail',
          });
          this.sending=false
          this.getMess()
        })
      }
          },
          sendMessage(index){
            this.search=''
            this.messageus=true
           this.currentUs=this.filteredList[index]
          },
           nom(nom){
            if(nom.length>13)
            return nom.slice(0,10)+'...'
            return nom
          },
         cancelMess(){
           this.adding=true
           this.messageus=false
           this.sending=false
         },
         
        async getUser(){
        this.$Progress.start();
        const { data } = await this.$http.get('https://djidjii.herokuapp.com/api/useradmin');
         this.users=data
          this.$Progress.finish();
      },
         messaging(){
           this.adding=false
         }
        }
    }
</script>

<style lang="scss" scoped>
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
.btn-nc{
  position: relative;
  top: -.1rem;
  right: 0.2rem;
  background-color: rgba(0, 0, 0, 0.5) !important;
  width: 32px;
  height: 32px;
  z-index: 1;
}
.df{
  position: relative;
  top: -.2rem;
}
button{
  z-index: 10;
  cursor: pointer !important;
}
.fa-whatsapp{
  font-size: 20px;
  color: green;
}
@import url(https://fonts.googleapis.com/css?family=Merriweather);
$red: #e74c3c;

form {
   max-width: 600px;
   text-align: center;
   margin: 20px auto;
  input{
    height: 16px;
  }
  input, textarea {
     border:0; outline:0;
     padding: 1em;
     display: block;
     width: 100%;
     margin-top: 1em;
     font-family: 'Merriweather', sans-serif;
     resize: none;
    
  }
  
  #input-submit {
     color: white; 
     background: rgb(1, 151, 81);
     cursor: pointer;
     position: relative;
     top: 0.5rem;
     width: 100%;
    
    
    &:hover {
      background-color: #004e66;
    }
  }
  
  textarea {
      height: 150px;
  }
}


.half {
  float: left;
  width: 48%;
  margin-bottom: 1em;
}

.right { width: 50%; }

.left {
     margin-right: 2%; 
}


@media (max-width: 480px) {
  .half {
     width: 100%; 
     float: none;
     margin-bottom: 0; 
  }
}


/* Clearfix */
.cf:before,
.cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}

.cf:after {
    clear: both;
}
</style>
<style scoped>
.contact-bdd p{
  width: fit-content;
  margin:  0 auto;
}
  #ppptitre{
    width: 80% !important;
    word-wrap: break-word;
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
</style>
<style lang="scss" scoped>
.cdcd{
  width: 28px;
  height: 28px;
}
.sms-item{
   padding-left: 10%;
   padding-top: 1.1%;
  padding-right: 10%;
  width: 100%;
  height: 48px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0,0,0,.12);
  cursor: pointer;
}
.allm{
   padding-left: 10%;
   padding-top: 1.1%;
  padding-right: 10%;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0,0,0,.12);
}
.user{
  padding-left: 10%;
  padding-right: 10%;
  width: 100%;
  height: 48px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0,0,0,.12);
  cursor: pointer;

}
.user:hover{
 background-color: rgba(128, 128, 128, 0.199);

}
 .us-inf-img{
        width: 38px !important;
        height: 38px !important;
    } 
    .us-inf-imgs{
        width: fit-content !important;
        height: 38px !important;
    } 
    .us-inf-img img{
        width: 38px !important;
        height: 38px !important;
        border-radius: 50%;
    }
    .us-inf-imgs img{
        width: 38px !important;
        height: 38px !important;
        border-radius: 50%;
    }
.d-mess{
  position: relative;
  border-top: none;
  border-left: 1px solid rgba(0,0,0,.12);
  border-bottom: 1px solid rgba(0,0,0,.12);
  border-right: 1px solid rgba(0,0,0,.12);
  
  width: 30%;
  top: 1rem;
}
.sms{
  border: 1px solid rgba(0,0,0,.12);
}
.d-messs{
  border-top: none;
  top: 0.1rem;
  background-color: white;
  border-left: 1px solid rgba(0,0,0,.12);
  border-bottom: 1px solid rgba(0,0,0,.12);
  border-right: 1px solid rgba(0,0,0,.12);
}
.search-wrapper {
  padding-bottom: 2rem;
    position: relative;
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 10px;
      left: 12px;
      z-index: -1;
      visibility: hidden;
      transition: .15s all ease-in-out;
    }
    input {
      padding: 4px 12px;
      width: 30%;
      position: relative;
      top: 1rem;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + .d-mess{
          transform: scale(1.05);
        }
        & + label  {
            visibility: visible;
          font-size: 16px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
         font-size: 16px;
          color: rgb(114, 114, 114);
          font-weight: 400;
      }
    }
  }

</style>
<style scoped>
.us-mess{
    margin-top: 3rem;
}
    .container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.scrollbar{
  overflow: auto;
  
}
.inbox_people {
  background: none;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c3c3c3;
}
.inbox_msg {
  border: 1px solid #b1b1b1;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
 .recent_heading h4{
 
  font-size: 21px;
  margin: auto;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
  padding-left: -10% ;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #aaaaaa;}

.srch_bar input{ border:1px solid #797979; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none; }
.srch_bar .input-group-addon button {
  background: none;
  position: relative;
  top: 0.2rem;
  border: medium none;
  padding-left: 10%;
  font-size: 18px;
}
.fa-search{
  color: #646464 !important;
}
button:focus, input:focus, textarea:focus{
    outline: none;
}
.search-bar::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgba(71, 71, 71, 0.79);
  opacity: 1; /* Firefox */
}

.search-bar:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: rgba(71, 71, 71, 0.79);}

.search-bar::-ms-input-placeholder { /* Microsoft Edge */
  color: rgba(71, 71, 71, 0.79);
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px;  margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px;  margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  cursor: pointer;
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:rgba(230, 230, 230, 0.342);}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #014157 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.write_msg::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgba(90, 90, 90, 0.79);
  opacity: 1; /* Firefox */
}

.write_msg:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: rgba(90, 90, 90, 0.79);
  }

.write_msg::-ms-input-placeholder { /* Microsoft Edge */
  color: rgba(90, 90, 90, 0.79);
}
.write_msg {
  padding-top: 1rem;
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c !important;
  font-size: 15px;
  max-height: 48px;
  min-height: 48px;
  resize: none;
   overflow:hidden;
  width: 80%;
}


.msg_send_btn {
  background: #014157 none repeat scroll 0 0;
  border: medium none;
  border-radius: 10%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: relative;
  left: 5%;
  top: -1rem;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  border-bottom: rgba(102, 102, 102, 1) solid 1px;
  overflow-y: auto;
}
</style>