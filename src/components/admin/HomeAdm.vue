<template>
  <div>
      <div v-if="isLoading" class="us-list-load">
        <b-spinner class="p text-secondary" label="Loading..."></b-spinner>
      </div>
  <div v-else>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="d-flex  aaa">
        <i class="fas fa-chart-line"></i> <h4 class="sttt"> Statistiques</h4>
        </div>
      </div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="d-flex  aa">
        <i class="fas fa-shopping-cart"></i> <h5 class="sttt"> Annonces</h5>
        </div>
      </div>
      <div class="aazz">
        <div class="row">
          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-info"><i class="far fa-bookmark"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Enregistrée(s)</span>
                <span class="info-box-number">{{prix(stat.saved)}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-success"><i class="fas fa-plus-circle"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Ajoutée(s)</span>
                <span class="info-box-number">{{prix(stat.added)}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-warning"><i class="far fa-flag"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Signalée(s)</span>
                <span class="info-box-number">{{prix(stat.reported)}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-danger"><i class="fas fa-trash"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Supprimée(s)</span>
                <span class="info-box-number">{{prix(stat.deleted)}}</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
        </div>
      </div>
        <div class="zeze d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="d-flex aa">
        <i class="fa fa-user"></i> <h5 class="sttt"> Utilisateurs</h5>
        </div>
      </div>
        <div class="zeze aazz">
          <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{prix(stat.comptes)}}</h3>

                <p>Compte(s)</p>
              </div>
              <div class="icon">
                <i class="fas fa-user-plus"></i>
              </div>
               
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{prix(stat.message)}}</h3>

                <p>Message(s) Mail(s)</p>
              </div>
              <div class="icon">
                <i class="far fa-envelope"></i>
              </div>
               
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{prix(stat.usReported)}}</h3>

                <p>Signalement(s)</p>
              </div>
              <div class="icon">
                <i class="far fa-flag"></i>
              </div>
               
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{prix(stat.visiteurs)}}</h3>

                <p>Visiteurs</p>
              </div>
              <div class="icon">
                <i class="fas fa-chart-pie"></i>
              </div>
               
            </div>
          </div>
          <!-- ./col -->
        </div>
        </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
 import UsStat from '@/components/admin/UsStat.vue'
 import AdStat from '@/components/admin/AdStat.vue'
 import Axios from 'axios'
export default {
  components:{UsStat,AdStat},
  name: 'HomeDash',
  data(){
    return{
      saved:0,
      added:0,
      reported:0,
      deletedd:0,
      nbCompte:0,
      nbMess:0,
      usReported:0,
      visiteurs:0,
      isLoading:true,
      stat:[]
    }
  },
  updated(){
    this.getStat()
  },
  beforeMount(){
    this.getStat()
  },
  methods:{
    async getStat(){
      this.$Progress.start();
      return new Promise((resolve, reject)=>{
          Axios({url: 'http://localhost:8000/api/getStat', method: 'GET' })
          .then(respo => {
            this.stat=respo.data
            this.isLoading=false
            this.$Progress.finish();
            resolve(respo)
          })
      })
    },
    prix(number){
       var str = number.toString();
      var len = str.length;
      if (len > 4) {
        if (len == 5) str = str.slice(0, 2) + " " + str.slice(2);
        if (len == 6) str = str.slice(0, 3) + " " + str.slice(3);
        if (len == 7)
          str = str.charAt(0) + " " + str.slice(1, 4) + " " + str.slice(4);
        if (len == 8){
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2, 5) + " " + str.slice(5);
        }
        if (len == 9){
          //if(count==1)
          str = str.slice(0, 3) + " " + str.slice(3, 6) + " " + str.slice(6);
        }
        if (len == 10){
          //if(count==1)
          str = str.slice(0, 1) + " " + str.slice(1, 4) + " " + str.slice(4,7)+ " " + str.slice(7);
        }
      }
      return str;
    
    },
  }
}
</script>
<style scoped>
.icon{
  position: relative;
  left: 5%;
}
.zeze{
  position: relative;
}
.aazz{
  width: 100% !important;
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