<template>
    <div id="footer">
        <div id="foot-top">
          <div class="foot-top-a" @click="scrollToTop()">
            <i class="fas fa-chevron-up"></i>
          </div>
        </div>
        <div id="foot-co">
            <div class="foot-co-a d-flex flex-row justify-content-between">
                <a target="_blank" href="https://www.facebook.com/Djidjicom-113697483734450">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCrbnAIpyI0OZX5ANZ5fCCQA">
                  <i class="fab fa-youtube"></i>
                </a>
                <a target="_blank" href="https://www.instagram.com/ledjidjicom/">
                  <i class="fab fa-instagram"></i>
                </a>
            </div>
        </div>
        <div id="foot-lst">
            <div class="d-foot-lst d-flex flex-row justify-content-between">
              <div class="djidji-foot">
                <h4>Djidji</h4>
                <div class="d-f">
                  <router-link to="#" class="d-f-a">A propos de Djidji.com</router-link>
                  <router-link to="#" class="d-f-a">Nous contacter</router-link>
                  <router-link to="#" class="d-f-a">Aide</router-link>
                </div>
              </div>
              <div class="services-foot">
                <h4>Services</h4>
                <div class="d-f">
                  <router-link to="#" class="d-f-a">Vendre sur Djidji.com</router-link>
                  <router-link to="#" class="d-f-a">Devenir Partenaire</router-link>
                  <router-link to="#" class="d-f-a">Publicité</router-link>
                </div>
              </div>
              <div class="politics-foot">
                <h4>Politiques</h4>
                <div class="d-f">
                  <router-link to="#" class="d-f-a">Conditions d'utilisations</router-link>
                  <router-link to="#" class="d-f-a">Politiques relative aux cookies</router-link>
                  <router-link to="#" class="d-f-a">Données privées</router-link>
                </div>
              </div>
            </div>
            <div class="cpy-f">
              <small>Copyright © 2020 <router-link to="/" class="d-f-a">Djidji.com</router-link>. By <a target="_blank" href="https://www.linkedin.com/in/sopoude" class="d-f-a">Yaya Sopegue Soro</a>. Tous droits réservés</small>
            </div>
        </div>
    </div>
</template>
<style scoped>
  .fa-chevron-up{
    color: white !important;
  }
</style>
<script>
  export default { 
     methods: { 
           scrollToTop() {
              window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
           }
    }
  }
</script>