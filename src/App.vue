<template>
  <div v-cloak id="app">

    <notifications group="custom-template" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
        <div class="alert alert-danger">
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
            
            <li class="lin" v-if="this.$store.state.okConnection.okpwd==='false'">
              Mot de passe invalide !
            </li>
            
            <li class="lin" v-if="this.$store.state.okConnection.okpwd==='short'">
              Mot de passe trop court !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.okregpwd==='short'">
              Mot de passe trop court !
            </li>
            <li class="lin" v-if=" this.$store.state.okConnection.okregpwd2==='false'">
              Confirmation mot de passe invalide !
            </li>
            <li class="lin" v-if="this.$store.state.okConnection.okregpwd2==='short'">
             Confirmation mot de passe trop court !
            </li>
            <li class="lin" v-if="(this.$store.state.okConnection.okregpwd2==='true' && this.$store.state.okConnection.okregpwd==='true') && this.$store.state.okConnection.notokpwd==='false'">
              Mot de passe et confirmation ne correspondent pas !
            </li>
          </ul>
    </div>
  </template>
</notifications>
<notifications group="custom-ad" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Votre annonce a été ajouté avec succès et est en ligne &#10003;
      </div>
  </template>
</notifications>

<notifications group="deladdel" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Votre annonce a été supprimée &#10003;
      </div>
  </template>
</notifications>

<notifications group="usblocked" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Utilisateur bloqué &#10003;
      </div>
  </template>
</notifications>

<notifications group="usunblocked" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Utilisateur débloqué &#10003;
      </div>
  </template>
</notifications>

<notifications group="coderesent" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Code renvoyé &#10003;
      </div>
  </template>
</notifications>

<notifications group="custom-admod" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Votre annonce a été modifiée &#10003;
      </div>
  </template>
</notifications>

<notifications group="ad-signaler" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Nous avons reçu votre signalement, merci de nous aider à améliorer nos services &#10003;
      </div>
  </template>
</notifications>

<notifications group="ad-sauver" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Annonce enregistrée &#10003;
      </div>
  </template>
</notifications>

<notifications group="success-reg" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Votre compte a été créé &#10003;
      </div>
  </template>
</notifications>

<notifications group="success-sendEmail" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Votre message a été envoyé &#10003;
      </div>
  </template>
</notifications>

<notifications group="pwdreseted" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
         Mot de passe réinitialisé avec succès &#10003;
      </div>
  </template>
</notifications>

<notifications group="added" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
         Ajoutée à la liste &#10003;
      </div>
  </template>
</notifications>

<notifications group="admin_contact" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
         Message envoyé, merci de nous contacter &#10003;
      </div>
  </template>
</notifications>

<notifications group="removed" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
         Annonce retirée de la liste &#10003;
      </div>
  </template>
</notifications>

<notifications group="verifiedMail" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
         Email verifié avec succès &#10003;
      </div>
  </template>
</notifications>

<notifications group="emailNoExist" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-danger text-center">
        Aucun compte n'existe sous cet email, vous pouvez créer un compte sous cet email si vous le souhaitez.
      </div>
  </template>
</notifications>

<notifications group="resetNotCode" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-danger text-center">
        Code incorrect.
      </div>
  </template>
</notifications>

<notifications group="existUser" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-danger text-center">
        Cet email a été déjà utilisé.
      </div>
  </template>
</notifications>

<notifications group="IncorrectPwd" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-danger text-center">
        Mot de passe incorrect.
      </div>
  </template>
</notifications>

<notifications group="User-unmodified" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-danger text-center">
        Cet email est déjà pris.
      </div>
  </template>
</notifications>
<notifications group="adminInco" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-danger text-center">
        Email ou mot de passe incorrect.
      </div>
  </template>
</notifications>

<notifications group="User-modified" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Informations modifiées. &#10003;
      </div>
  </template>
</notifications>
<notifications group="pwdModified" :max="1" :closeOnClick="true"
    position="top center">
      <template slot="body">
      <div class="alert alert-success text-center">
        Mot de passe modifié. &#10003;
      </div>
  </template>
</notifications>
    <notifications group="regis" />
    <notifications group="log" />
    <router-view :hasNotif="hasNotif"></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<style scoped>
.alert{
  margin: 0 auto;
  width: 100% !important;
    }
.nottf{
  padding: 2px 2px 2px 2px;
  background-color: rgb(243, 195, 195);
  border: rgb(192, 192, 192) 1px solid;
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
  data(){
    return{
      hasNotif:false
    }
  },
  updated(){
    
    if(this.$store.state.accessToken!=='')
    {
      console.log('app updated')
      let formData = new FormData();
      formData.append('user', this.$store.state.currentUser.id);
      this.$store.dispatch('checkNotif',formData).then(()=>{
        if(this.$store.state.hasNotif){
          this.hasNotif=true
        }
      })
    }
  },
  beforeMount(){
    if(this.$store.state.accessToken!=='')
    {
      let formData = new FormData();
      var user=localStorage.getItem('usetrixco')
      console.log('user notif',user)
      formData.append('user', user);
      this.$store.dispatch('checkNotif',formData).then(()=>{
        if(this.$store.state.hasNotif){
          this.hasNotif=true
        }
      })
      
    }
  },
  created() {
    //localStorage.clear();
    this.$store.dispatch('checkLogin')
    .catch(()=>{
      this.$router.push('/connexion')
    })
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
