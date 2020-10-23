<template>
  <div style="height:100%; width:100%; position:fixed;" clautss="bg-light">
      <!-- sidebar de l'admin -->
    <div class="d-flex flex-row justify-content-between navbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 shadow-sm">
    <nav class="myyys d-md-block bg-light iidd sidebar d-flex  text-center">
        <router-link title="Djidji.com Dashboard" to="/admin" class="navbar-brand a-logo logo-title">DD</router-link>
    </nav>
    <div class="noff">
        <ul class="d-flex flex-row justify-content-between">
            <li style="padding-right:20%;">
                <router-link to="/admin/myuser/me/message" class="d-flex flex-row">
                <i class="far fa-comment"></i>
                <span  v-show="hasMess || nbContact!==0" class="spii badge badge-pill badge-success">{{nbMess+nbContact}}</span>
                </router-link>
            </li>
            <li class="fabell">
                <router-link to="/admin/myuser/me/notif" class="d-flex flex-row">
                <i class="far fa-bell"></i>
                <span v-show="hasNotif" class="spii badge badge-pill badge-danger">{{nbNotif}}</span>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="userB text-center d-flex align-items-center" >
          <a href="#" type="button" data-toggle="dropdown" class="a-compte dropdown-toggle" >{{this.$store.state.currentUser.Nom}}</a>
           <transition name="slide-fade">
           <ul class="dropdown-menu userInff">
            <li class="usliinf"><a href="#/admin/myuser/me" ><i class="far fa-user"></i> Mon compte</a></li>
            <li class="usliinf"><a href="#/admin/myuser/me/message" ><span  v-show="hasMess || nbContact!==0" class="spiii badge badge-pill badge-success">{{nbMess+nbContact}}</span><i class="far fa-envelope"></i> Mes messages</a></li>
            <li class="usliinf"><a href="#/admin/myuser/me/notif" ><span v-show="hasNotif" class="spiiii badge badge-pill badge-danger">{{nbNotif}}</span><i class="far fa-bell"></i> Mes notifications</a></li>
            <li class="usliinfs"><a href="/#/admin/connexion" @click="signout"><i class="fas fa-sign-out-alt"></i> Se déconnecter</a></li>
          </ul>
           </transition>
    </div>
    </div>

    <div class="container-fluid " style="height:100%;">
        <div class="row" style="height:100%;">
            <nav id="sidebarMenu" class="myyy d-md-block sidebar" style="height:100%;">
              <div class="sidebar-sticky pt-3 myyyaa sidebar">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link to="/admin/users/me" class="nav-link inks active">
                        <i class="fa fa-user"></i>
                        Utilisateurs |
                    </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/admin/ads/me" class="nav-link inks active">
                      <i class="fas fa-shopping-cart"></i>
                      Annonces |
                      </router-link>
                      
                  </li>
                   <li class="nav-item">
                      <router-link to="/admin" class="nav-link inks active">
                      <i class="fas fa-chart-line"></i>
                      Statistiques |
                      </router-link>
                      
                  </li>
                  <li class="nav-item toos">
                      <router-link to="/" class="nav-link active">
                      <i class="fas fa-home"></i>
                        Aller à Djidji.com
                      </router-link>
                  </li>
                 
                </ul>

              </div>
            </nav>
            <main style="height:100%; position:relative; top:1rem;" role="main" class="sidebar atote col-md-9 ml-sm-auto col-lg-9">
              <router-view></router-view>
        <div style="padding-bottom: 8rem;">
            <FooterAd></FooterAd>
        </div>
    </main>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<style>

</style>
<style scoped>
.userInff{
    position: absolute;
    z-index: 4555;
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
    width: 8%;
    left: 22%;
    top: 0.7rem;
}

.spii{
    position: relative;
    right: 25%;
    top: -0.5rem;
}
.spiii{
    position: absolute;;
    z-index: 999;
    left: 1.5%;
    top: 2.4rem;
  display: inline-block;
}
.spiiii{
    position: absolute;;
    z-index: 999;
    left: 1.5%;
    top: 4.4rem;
  display: inline-block;
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
    background-color: #019751;
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
  position: relative;
    overflow: auto;
    width: 20% !important;
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
}
.nav-link svg{
    height: 16px !important;
    width: 20px !important;
}
.aa svg{
    height: 24px !important;
    width: 28px !important;
}
.aaa svg{
    height: 28px !important;
    width: 32px !important;
}
.icon svg {
    width: 60px !important;
    height: 64px !important;
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
    width: 10%;
    position: relative;
    right: 5%;
    top: -0.1em;
    color: rgb(238, 238, 238) !important;;
}
.logo-title{
    height: 48px;
  position: relative;
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
 import FooterAd from '@/components/footer/FooterAd.vue'
 import Axios from 'axios'
export default {
  name: 'Admin',
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
    beforeMount(){
        this.checkNotif()
        this.checkMess()
    },
    created(){
        this.getContactUs()
    },
  methods:{
      signout: function(){
          console.log('deco')
        this.$store.dispatch('logout').then(() =>{ 
             console.log('deco')
               location.reload()
                console.log('deco')
            })
      },

         getContactUs(){
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/getContactUsNb', method: 'GET' })
                .then(respo => {
                  this.nbContact=respo.data
                  console.log('nb',this.nbContact)
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
                Axios({url: 'https://djidjii.herokuapp.com/api/checkMessNb', data: formData, method: 'POST' })
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
        checkNotif(){
            let formData = new FormData();
            var user=localStorage.getItem('usetrixco')
            formData.append('user', user);
            return new Promise((resolve, reject)=>{
                Axios({url: 'https://djidjii.herokuapp.com/api/checkAdmNotifNb', data: formData, method: 'POST' })
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

  },
  components:{ 
      FooterAd
  }
}
</script>
