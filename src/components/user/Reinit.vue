<template>
<div>
<div class="container">
	<div class="row text-center">
		<div class="col-md-4 col-md-offset-4 rediv">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="text-center">
                  <h3><i class="fa fa-lock fa-4x"></i></h3>
                  <h2 class="text-center">Mot de passe oublié ?</h2>
                  <p>Vous pouvez le réinitialiser ici.</p>
                  <div class="panel-body">
    
                   
    
                      <div class="form-group">
                        <div class="input-group">
                          <input id="email" name="email" placeholder="Adresse email" class="form-control"  type="email">
                        </div>
                      </div>
                      <div class="form-group redivbtn">
                          <button class="btn btn-lg btn-primary btn-block">Réinitialiser le mot de passe</button>
                      </div>
                      
                      <input type="hidden" class="hide" name="token" id="token" value=""> 
                    
    
                  </div>
                </div>
              </div>
            </div>
          </div>
	</div>
</div>
</div>
</template>
<style scoped>
.redivbtn button:active,.redivbtn button:focus, input:active, input:focus{
  outline: none !important;
}
.redivbtn button,.redivbtn button{
  outline: none !important;
  background-color: #004e66;
}

input{
  border-left: none;
  border-right:none ;
  border-top: none;
}
    .form-gap {
    padding-top: 70px;
}
.row{
    position: relative;
    width: 100%;
    top: 3rem;
}
.rediv{
    
    margin: 0 auto;
}
.redivbtn{
    padding-top: 1rem;
}
</style>
<script>
// @ is an alias to /src
export default {
}
</script>
