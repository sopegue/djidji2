<template>
  <div style="height:100%; width:100%; position:fixed;" clautss="bg-light">
      <!-- sidebar de l'admin -->
    <div class="d-flex flex-row justify-content-between navbar navbar-dark sticky-top bg-light flex-md-nowrap p-0 shadow-sm">
    <nav class="myyys d-md-block bg-light iidd sidebar d-flex">
        <router-link to="/admin" class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 a-logo logo-title">Djidji.comDashboard</router-link>
    </nav>
    <div class="noff">
        <ul class="d-flex flex-row justify-content-between">
            <li>
                <router-link to="/user/message">
                <i class="far fa-comment"></i>
                <span class="spii badge badge-pill badge-success">4</span>
                </router-link>
            </li>
            <li class="fabell">
                <router-link to="/user/notif">
                <i class="far fa-bell"></i>
                <span class="spii badge badge-pill badge-danger">2</span>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="userB" >
          <a href="#" type="button" data-toggle="dropdown" class="a-compte dropdown-toggle" >Yaya Sopegue</a>
           <transition name="slide-fade">
           <ul class="dropdown-menu userInff">
            <li class="usliinf"><a href="#/user" ><i class="far fa-user"></i> Mon compte</a></li>
            <li class="usliinf"><a href="#/user/message" ><i class="far fa-envelope"></i> Mes messages</a></li>
            <li class="usliinf"><a href="#/user/notif" ><i class="far fa-bell"></i> Mes notifications</a></li>
            <li class="usliinfs"><a href="#"><i class="fas fa-sign-out-alt"></i> Se déconnecter</a></li>
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
                    <router-link to="/admin/users" class="nav-link inks active">
                        <i class="fa fa-user"></i>
                        Utilisateurs |
                    </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/admin/ads" class="nav-link inks active">
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
 import FooterAd from '@/components/footer/FooterAd.vue'
export default {
  name: 'Admin',
  components:{ FooterAd
  }
}
</script>
