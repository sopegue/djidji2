<template >
    <div class="us-not">
        <h5 class="">Mes notifications</h5>
        <hr class="hr-us-inf">
        <div v-if="isLoading" class="us-list-load">
            <b-spinner class="p" label="Loading..."></b-spinner>
        </div>
        <div v-else class="not-div overflow-auto">
            <div v-if="hasNoNotif" class="text-center">
                <p> Vous n'avez aucune notification pour le moment.</p>
            </div>
            <div v-else> 
            <Notification 
            v-for="notif in not"
            :key="notif.id"
            :notif="notif"
            >
            </Notification>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    .us-not{
        padding-bottom: 3rem;
        width: 80%;
        margin: 0 auto;
        position: relative;
        top: 3rem;
    }
    .not-div{
        height: 700px;
    }
</style>
<script>
    import Notification from '@/components/user/Notification.vue'
    import Axios from 'axios'
    export default {
        components:{
            Notification,
        },
        beforeMount(){
            this.getNotif()
        },
        data () {
            return { 
                not:[],
                hasNoNotif:true,
                isLoading:true
            }
        },
        methods: {
            getNotif(){
            let formData = new FormData();
            var user=localStorage.getItem('usetrixco')
            formData.append('user', user);
            return new Promise((resolve, reject)=>{
                Axios({url: 'http://localhost:8000/api/getNotif', data: formData, method: 'POST' })
                .then(respo => {
                  this.isLoading=false
                  this.not=respo.data
                  if(respo.data.length!=0){
                      this.hasNoNotif=false
                  }
                  else
                  {
                      this.hasNoNotif=true
                  }
                  resolve(respo)
                })
            })
            }
         
        }
    }
</script>