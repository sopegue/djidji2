<template>
  <div>
    <div class="well">
        <ul class="text-center nav nav-tabs">
            <li @click="active" v-bind:class="{'actives': active1}"><router-link class="a-prof" to="/admin/myuser/me"><i class="fas fa-user"></i>&nbsp;Profile</router-link></li>
            <li @click="active" v-bind:class="{'actives': active2}"><router-link class="a-prof" to="/admin/myuser/me/password"><i class="fas fa-lock"></i> Mot de passe</router-link></li>
            
            <li  @click="active" v-bind:class="{'actives': active3}"><router-link class="a-prof" to="/admin/myuser/me/message">
              
                <i class="far fa-comment"></i> Messages <span v-show="hasMess ||nbContact!==0" class="spii badge badge-pill badge-success">{{nbMess + nbContact}}</span></router-link>
            </li>
            <li  @click="active" v-bind:class="{'actives': active4}"><router-link class="a-prof" to="/admin/myuser/me/notif">
              
                <i class="far fa-bell"></i> Notifications <span v-show="hasNotif" class="spii badge badge-pill badge-danger">{{nbNotif}}</span></router-link>
            </li>
        </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Info from '@/components/admin/user/Info.vue'
import Message from '@/components/admin/user/Message.vue'
import Notif from '@/components/admin/user/Notif.vue'
import Pwd from '@/components/admin/user/Pwd.vue'
import Axios from 'axios'
// @ is an alias to /src
export default {
    data() {
      return {
          active1:false,
          nbNotif:0,
          nbContact:0,
          nbMess:0,
          hasNotif:false,
          hasMess:false,
          active2:false,
          active3:false,
          active4:false,
          active5:false,
          active6:false,
      }
    },
    components:{
        Info,
        Message,
        Notif,
        Pwd
    },
    beforeMount(){
        this.checkNotif()
        this.checkMess()
        this.active()
    },
    created(){
       this.active();
       this.getContactUs()
    },
    computed:{
        currentRouteName() {
            return this.$route.name;
        },
    },
    methods:{
        getContactUs(){
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/getContactUsNb', method: 'GET' })
                .then(respo => {
                  this.nbContact=respo.data
                  resolve(respo)
                })
            })
            },
        checkNotif(){
            let formData = new FormData();
            var user=localStorage.getItem('usetrixco')
            formData.append('user', user);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/checkAdmNotifNb', data: formData, method: 'POST' })
                .then(respo => {
                  if(respo.data!=0){
                      this.hasNotif=true
                      this.nbNotif=respo.data
                  }
                  else
                  {
                      this.hasNotif=false
                      this.nbNotif=0
                  }
                  resolve(respo)
                })
            })
        },
        checkMess(){
            let formData = new FormData();
            var user=localStorage.getItem('usetrixco')
            formData.append('user', user);
            formData.append('me', this.$store.state.currentUser.id);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/checkMessNb', data: formData, method: 'POST' })
                .then(respo => {
                  if(respo.data!=0){
                      this.hasMess=true
                      this.nbMess=respo.data
                  }
                  else
                  {
                      this.hasMess=false
                      this.nbMess=0
                  }
                  resolve(respo)
                })
            })
        },
        active(){
            if(this.currentRouteName ==='adProfile'){
                this.active1=true;
                this.active2=false;
                this.active3=false;
                this.active4=false;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='adPassword'){
                this.active1=false;
                this.active2=true;
                this.active3=false;
                this.active4=false;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='adMess'){
                this.active1=false;
                this.active2=false;
                this.active3=true;
                this.active4=false;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='adNotif'){
                this.active1=false;
                this.active2=false;
                this.active3=false;
                this.active4=true;
                this.active5=false;
                this.active6=false;
            }
            
        }
    }
}
</script>
<style scoped>
    .spii{
        position: relative;
        right: 10%;
        top: -0.4rem;
    }
    .actives{
        cursor: default !important;
        background-color: white !important;
        border-bottom: 1px solid white !important;
        border-left: 1px solid #dee2e6 !important;
        border-top: 1px solid #dee2e6 !important;
        border-right: 1px solid #dee2e6 !important;
    }
    .nbsms{
        float: left;
        position: relative;
        top: -0.1rem;
        left: 1.7rem;
        background-color: #ff0000 !important;
        width: 10px !important;
        height: 10px !important;
        border-radius: 50%;
        color: /*#004E66 !important;*/ white;
    }
    .a-prof{
        color: rgb(77, 77, 77) !important;
        font-size: 16px;
        
    }
    .well li:not(.actives):hover{
        background-color: rgba(214, 214, 214, 0.342);
        cursor: pointer;
    }
    .well{
        position: relative;
        top: 1.5rem;
    }
    
    .well li{
        width: 20%;
        height: 40px;
        padding-top: 0.6rem;
        text-align: center;
    }
</style>