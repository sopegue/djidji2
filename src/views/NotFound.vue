<template>
  <div>
    <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Page non trouvée.</h2>
                <div class="error-details">
                    Désolé, une erreur est survenue, la page demandée est introuvable.
                </div>
                <div class="error-actions">
                   <router-link to="/" class="a-logo"><h2 class="logo-title">Djidji.com</h2></router-link>
                </div>
            </div>
        </div>
    </div>
</div>

  </div>
</template>
<style scoped>
.error-template {padding: 40px 15px;text-align: center;}
.error-actions {margin-top:15px;margin-bottom:15px;}
.error-actions .btn { margin-right:10px; }
</style>
<script>
// @ is an alias to /src
export default {
  name: 'NotFound',
}
</script>
