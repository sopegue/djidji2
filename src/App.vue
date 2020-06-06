<template>
  <div v-cloak id="app">
    <notifications group="regis" />
    <notifications group="log" />
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
// @ is an alias to /src
import Axios from 'axios'

export default {
  name: 'App',
  created() {
    this.$store.dispatch('checkLogin')
  Axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        this.$store.dispatch('logout').then(() => this.$router.push('/connexion'))
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });

}
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/djidji';
  @import 'assets/scss/app';
</style>
