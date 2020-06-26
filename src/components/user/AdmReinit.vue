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
                          <input id="email" name="email" placeholder="Adresse email" class="form-control"  type="email" v-model="mail">
                          
                        </div>
                      </div>
                      <span v-if="mailInvalid" style="color:red;font-size:12px;" >Veuillez entrer un email valide.</span>
                      <span v-if="mailVide" style="color:red;font-size:12px;" >Veuillez remplir ce champ pour continuer</span>
                      <div class="form-group redivbtn">
                          <button @click="reinit" class="btn btn-lg btn-primary btn-block">Réinitialiser le mot de passe</button>
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
  data(){
    return{
      mail:'',
      mailInvalid:false,
      mailVide:false
    }
  },
  methods:{
    checkField(){
      
      this.mailInvalid=false
      this.mailVide=false
      if (this.mail!=='' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail)){
        this.mailInvalid=false
      }
      else if(this.mail!=='' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mail))
        this.mailInvalid=true

      if (this.mail==''){
        this.mailVide=true
      }
      else
        this.mailVide=false

      return (this.mailInvalid==false && this.mailVide==false)

    },
    reinit(){
      if(this.checkField()){
        this.$Progress.start()
        this.$store.state.resetObject.email=this.mail
        var myForm= new FormData()
        myForm.append('email',this.mail)
        this.$store.dispatch('reset',myForm).then(()=>{
          if(this.$store.state.resetObject.existMail){
            this.$Progress.finish()
            this.$router.push('/admin/me/reset')
          }
          else{
            this.$Progress.finish()
            this.$notify({
                group: 'emailNoExist',
            });
          }
        })
        
        
      }
    }
  }
}
</script>
