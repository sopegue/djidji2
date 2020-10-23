<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from 'axios'

export default {
  name: 'Admin',
  updated(){
    
    if(!localStorage.access_token){
      if(this.$router.currentRoute.path!=='/admin/me/reinit')
      this.$router.replace('/admin/me/connexion')
      }
     else if(this.$store.state.currentUser.type && this.$store.state.currentUser.type!=='administrateur')
        this.$store.dispatch('logout').then(() => this.$router.push('/admin/me/connexion'))
    this.$store.dispatch('checkLogin').catch(()=>{
      this.$router.push('/admin/me/connexion')
    })
  },
  created() {
    if(!localStorage.access_token){
      this.$router.replace('/admin/me/connexion').then(()=>{
      })
      
      }
     else if(this.$store.state.currentUser.type && this.$store.state.currentUser.type!=='administrateur')
        this.$store.dispatch('logout').then(() => this.$router.push('/admin/me/connexion'))
    this.$store.dispatch('checkLogin').catch(()=>{
      this.$router.push('/admin/me/connexion')
    })
  Axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        this.$store.dispatch('logout').then(() => this.$router.push('/admin/me/connexion'))
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });

}
}
</script>
