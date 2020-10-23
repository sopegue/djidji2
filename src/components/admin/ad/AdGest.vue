<template>
  <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="d-flex  aaa">
        <i class="fas fa-shopping-cart"></i> <h4 class="sttt"> Annonces</h4>
        </div>
      </div>
      <div class="linlink">
          <ul class="d-flex justify-content-between">
              <li><router-link class="nnlink" to="/admin/ads/me">Tous les annonces ({{all}})</router-link></li>
              <li><router-link class="nnlink" to="/admin/ads/me/report">Signalées({{reported}})</router-link></li>
          </ul>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    data(){
        return{
            all:0,
            reported:0,
        }
    },
    created(){
        this.$Progress.start()
        this.getAll()
        this.getReported()
        this.$Progress.finish()
    },
    methods:{
       async getAll(){
            
            const { data } = await this.$http.get('https://djidjii.herokuapp.com/api/adallnb');
             this.all=data
        },
       async getReported(){
            const { data } = await this.$http.get('https://djidjii.herokuapp.com/api/adssignalenb');
             this.reported=data
        }
    }
}
</script>
<style lang="scss" scoped>
.linlink{
    width: 38%;
    clear: both;
    position: relative;
}
.nnlink{
    color: #004e66 !important;
       text-decoration: underline !important;
    &:hover{
     color: rgb(90, 90, 90) !important;
    }
}
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