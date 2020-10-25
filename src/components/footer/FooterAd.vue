<template>
    <div id="footer">
        <div id="foot-top">
          <div class="foot-top-a" @click="scrollToTop()">
            <i class="fas fa-chevron-up"></i>
          </div>
        </div>
        <div id="foot-co">
            <div class="foot-co-aa d-flex flex-row justify-content-between">
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
        <div id="foot-lsts">
            <div class="cpy-f">
              <small>Copyright © 2020 <router-link to="/" class="d-f-a">Djidji.com</router-link>.By <router-link target="_blank" to="www.linkedin.com/in/sopoude" class="d-f-a">Yaya Sopegue Soro</router-link>. Tous droits réservés</small>
            </div>
        </div>
    </div>
</template>
<style scoped>
.foot-co-aa{
  margin: 0 auto;
  width: 12%;
}
#foot-lsts{
  position: relative;
  top: 3rem;
  border-top:0.1px solid rgb(221, 221, 221);
  padding-bottom: 2rem;
  text-align: center;
  background-color: /*#004E66*/ white;
}
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