<template>
<div>
<div class="container">
	<div class="row text-center">
        
		<div class="col-md-5 col-md-offset-4 rediv">
              <h2 class="">Mise à jour du mot de passe</h2>
            <div class="tre col-md-10 panel panel-default">
              
              <div class="panel-body">
                
                <div class="text-center">
                  <div class="panel-body">
                      <div class="form-group">
                        <div class="input-group">
                            <label for="password"></label><br>
                            <input id="password" name="password" placeholder="Nouveau mot de passe" class="form-control"  type="password">
                        </div>
                        <div class="input-group">
                            <label for="cpassword"></label><br>
                            <input id="cpassword" name="cpassword" placeholder="Confirmation du mot de passe" class="form-control"  type="password">
                        </div>
                      </div>
                      <div class="form-group redivbtn">
                          <button class="btn btn-lg btn-primary btn-block">Enregistrer</button>
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
.rediv,.tre{
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
