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
                        <span v-if="unmatched" style="color:red;font-size:12px;" >Mot de passe et Confirmation ne correspondent pas.</span>
                        <div class="input-group">
                            <label for="password"></label><br>
                            <input id="password" name="password" placeholder="Nouveau mot de passe" class="form-control"  type="password" v-model="pwd">
                        </div>
                        <span v-if="pwdInvalid" style="color:red;font-size:12px;" >Mot de passe trop court ou champ vide.</span>
                        <div class="input-group">
                            <label for="cpassword"></label><br>
                            <input id="cpassword" name="cpassword" placeholder="Confirmation du mot de passe" class="form-control"  type="password" v-model="conf">
                        </div>
                        <span v-if="confInvalid" style="color:red;font-size:12px;" >Confirmation mot de passe trop court ou champ vide.</span>
                      </div>
                      <div class="form-group redivbtn">
                          <button @click="setpwd" class="btn btn-lg btn-primary btn-block">Enregistrer</button>
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
  data(){
    return{
      pwd:'',
      conf:'',
      pwdInvalid:false,
      confInvalid:false,
      unmatched:false,
    }
  },
  beforeMount(){
    this.$store.state.emailreseting=localStorage.getItem('mailreset')
    console.log('ok',this.$store.state.emailreseting)
  }
  ,
  methods:{
    setpwd(){
      this.pwdInvalid=false
      this.confInvalid=false
      this.unmatched=false
      if(this.pwd==='' || this.pwd.length<8)
        this.pwdInvalid=true
      else
        this.pwdInvalid=false

      if(this.conf==='' || this.conf.length<8)
        this.confInvalid=true
      else
        this.confInvalid=false
      
      if(this.pwd!=='' && this.conf!=='' && this.conf.length>=8 && this.pwd.length>=8 && (this.pwd!==this.conf))
        this.unmatched=true
      else
        this.unmatched=false

      if(!this.unmatched && !this.pwdInvalid && !this.confInvalid){
         this.$Progress.start()
         var myForm=new FormData()
         myForm.append('email',this.$store.state.emailreseting)
         myForm.append('password',this.pwd)
         this.$store.dispatch('setreset',myForm).then(()=>{
           this.$store.state.emailreseting=''
           localStorage.removeItem('mailreset')
            this.$Progress.finish()
            this.$notify({
                group: 'pwdreseted',
            })
            this.$router.push('/admin/connexion')
        })
      }
    }
  }
}
</script>
