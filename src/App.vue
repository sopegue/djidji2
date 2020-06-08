<template>
  <div v-cloak id="app">

    <notifications group="custom-template" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
        <div class="nottf">
          <p>
            Corrigez les erreurs suivantes :
          </p>
          <ul class="d-flex flex-column">
            <li class="lin" v-if="this.$store.state.okConnection.okuser==='false' ">
              Vérifiez et corriger votre email !
            </li>
            <li class="lin" v-if=" this.$store.state.okConnection.okregmail==='false'">
              Vérifiez et corriger votre email !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.notok==='true'">
              Email ou Mot de passe incorrect !
            </li>
            <li class="lin" v-if=" this.$store.state.okConnection.okregpwd==='false'">
              Mot de passe invalide !
            </li>
            <li class="lin" v-if=" this.$store.state.okConnection.okregpwd2==='false'">
              Confirmation mot de passe invalide !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.okpwd==='false'">
              Mot de passe invalide !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.okpwd==='short'">
              Mot de passe trop court !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.okregpwd==='short'">
              Mot de passe trop court !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.okregpwd2==='short'">
             Confirmation mot de passe trop court !
            </li>
            <li class="lin" v-if="(this.$store.state.okConnection.okregpwd2==='true' && this.$store.state.okConnection.okregpwd==='true') && this.$store.state.okConnection.notokpwd==='false'">
              Mot de passe et confirmation incorrect !
            </li>
          </ul>
    </div>
  </template>
</notifications>

    <notifications group="regis" />
    <notifications group="log" />
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<style scoped>
.nottf{
  padding: 5px 5px 5px 5px;
  background-color: whitesmoke;
  border: gray 1px solid;
  border-radius: 10px;
}
.lin{
  list-style: circle;
}
</style>
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
