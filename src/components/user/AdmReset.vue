<template>
<div>
<div class="container">
	<div class="row text-center">
		<div class="col-md-4 col-md-offset-4 rediv">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="text-center">
                  <p>Veuillez vérifier votre boite email et collez le code qui vous a été envoyé.</p>
                  <div class="panel-body">
    
                   
    
                      <div class="form-group">
                        <div class="input-group">
                          <input id="code" name="code" placeholder="Code" class="form-control"  type="text" v-model="code">
                        </div>
                        <span v-if="codeInvalid" style="color:red;font-size:12px;" >Caractère invalide ou champ vide.</span><br>
                        <button @click="resend" class="btn btn-link">Cliquez ici pour renvoyer le code.</button>
                      </div>
                      <div class="form-group redivbtn">
                          <button @click="confirm" class="btn btn-lg btn-primary btn-block">Confirmer</button>
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
            code:'',
            codeInvalid:false
        }
    },
    mounted(){
        console.log(this.$store.state.resetObject)
        if(this.$store.state.resetObject.existMail==false)
            this.$router.go(-1)
        
    },
    methods:{
        confirm(){
            this.codeInvalid=false
            if(this.code=='' || isNaN(parseInt(this.code,10))){
                this.codeInvalid=true
            }
            else{
                this.codeInvalid=false
            }
            if(!this.codeInvalid){
                this.$Progress.start()
                var myForm= new FormData()
                myForm.append('email',this.$store.state.resetObject.email)
                var code=parseInt(this.code,10)
                myForm.append('code',code)
                this.$store.dispatch('verify',myForm).then(()=>{
                    if(this.$store.state.mailConfirmed){
                        this.$Progress.finish()
                        this.$notify({
                            group: 'verifiedMail',
                        });
                        this.$router.push('/admin/verification')
                    }
                    else{
                        this.$Progress.finish()
                        this.$notify({
                            group: 'resetNotCode',
                        });
                    }
                 })
            }
            
        },
        resend(){
            this.$Progress.start()
            var myForm= new FormData()
            myForm.append('email',this.$store.state.resetObject.email)
            this.$store.dispatch('reset',myForm).then(()=>{
                this.$Progress.finish()
            this.$notify({
                group: 'coderesent',
            });
            })
        }
    }
}
</script>
