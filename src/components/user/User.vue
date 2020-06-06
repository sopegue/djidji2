<template>
  <div>
    <div class="well">
        <ul class="nav nav-tabs">
            <li @click="active" v-bind:class="{'actives': active1}"><router-link class="a-prof" to="/user"><i class="fas fa-user"></i>&nbsp;Profile</router-link></li>
            <li @click="active" v-bind:class="{'actives': active2}"><router-link class="a-prof" to="/user/password"><i class="fas fa-lock"></i> Mot de passe</router-link></li>
            <li @click="active" v-bind:class="{'actives': active3}"><router-link class="a-prof" to="/user/message">
                
                <i class="fas fa-envelope"></i> Messages <span class="spii badge badge-pill badge-success">4</span></router-link>
            </li>
            <li  @click="active" v-bind:class="{'actives': active4}"><router-link class="a-prof" to="/user/notif">
              
                <i class="fas fa-bell"></i> Notifications <span class="spii badge badge-pill badge-danger">4</span></router-link>
                </li>
            <li @click="active" v-bind:class="{'actives': active5}"><router-link class="a-prof" to="/user/list"><i class="fas fa-list"></i> Ma liste</router-link></li>
            <li @click="active" v-bind:class="{'actives': active6}"><router-link class="a-prof" to="/user/added"><i class="fas fa-cube"></i> Mes annonces</router-link></li>
        </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Added from '@/components/user/Added.vue'
import Info from '@/components/user/Info.vue'
import List from '@/components/user/List.vue'
import Message from '@/components/user/Message.vue'
import Notif from '@/components/user/Notif.vue'
import Pwd from '@/components/user/Pwd.vue'
// @ is an alias to /src
export default {
    data() {
      return {
          active1:false,
          active2:false,
          active3:false,
          active4:false,
          active5:false,
          active6:false,
      }
    },
    components:{
        Added,
        Info,
        List,
        Message,
        Notif,
        Pwd
    },
    mounted(){
        this.active()
    },
    created(){
       this.active();
    },
    computed:{
        currentRouteName() {
            return this.$route.name;
        },
    },
    methods:{
        active(){
            if(this.currentRouteName ==='Profile'){
                this.active1=true;
                this.active2=false;
                this.active3=false;
                this.active4=false;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='Password'){
                this.active1=false;
                this.active2=true;
                this.active3=false;
                this.active4=false;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='Message'){
                this.active1=false;
                this.active2=false;
                this.active3=true;
                this.active4=false;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='Notif'){
                this.active1=false;
                this.active2=false;
                this.active3=false;
                this.active4=true;
                this.active5=false;
                this.active6=false;
            }
            if(this.currentRouteName ==='List'){
                this.active1=false;
                this.active2=false;
                this.active3=false;
                this.active4=false;
                this.active5=true;
                this.active6=false;
            }
            if(this.currentRouteName ==='Added'){
                this.active1=false;
                this.active2=false;
                this.active3=false;
                this.active4=false;
                this.active5=false;
                this.active6=true;
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
        width: 12%;
        height: 36px;
        padding-top: 0.4rem;
        text-align: center;
    }
</style>