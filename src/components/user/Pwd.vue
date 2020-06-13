<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell d-flex">
                <form @submit.prevent="updatePwd" class="d-inf-us d-flex flex-column">
                    <h5 class="">Mot de passe</h5>
                    <hr class="hr-us-inf">
                    <label for="pwd">Mot de passe actuel</label>
                    <input type="password" id="pwd" name="pwd"  placeholder="Mot de passe" v-model="pwd"/>
                    <span style="color:red;font-size:12px;" v-if="pwdInvalid">Mot de passe invalide.</span>
                    <span style="color:red;font-size:12px;" v-if="pwdCourt">Mot de passe trop court.</span>
                    <br>
                    <label for="pwdnew">Nouveau mot de passe</label>
                    <input type="password" id="pwdnew" name="pwdnew"  placeholder="Mot de passe" v-model="newpwd"/>
                    <span style="color:red;font-size:12px;" v-if="newpwdInvalid">Nouveau mot de passe invalide.</span>
                    <span style="color:red;font-size:12px;" v-if="newpwdCourt">Nouveau mot de passe trop court.</span>
                    <br>
                    <label for="pwdconf">Confirmation de mot de passe</label>
                    <input type="password" id="pwdconf" name="pwdconf"  placeholder="Confirmer votre mot de passe" v-model="conf_newpwd"/>
                    <span style="color:red;font-size:12px;" v-if="con_pwdInvalid">Mot de passe invalide.</span>
                    <span style="color:red;font-size:12px;" v-if="con_pwdCourt">Mot de passe trop court.</span>
                    <br>
                    <button type="submit" class="b-us_inf regb">Modifier</button>
                </form>
                 
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted(){

        },
        data () {
            return { 
                pwd:'',
                newpwd:'',
                conf_newpwd:'',
                con_pwdCourt:false,
                con_pwdInvalid:false,
                newpwdInvalid:false,
                newpwdCourt:false,
                pwdCourt:false,
                pwdInvalid:false,
                pwd_unmatch:false,
                con_and_pwd_unmatch:false
            }
        },
        methods: {
            updatePwd(){
                if(this.checkField()){
                    var form= new FormData()
                    form.append('user',this.$store.state.currentUser.id)
                    form.append('pwd',this.pwd)
                    form.append('newpwd',this.newpwd)
                    this.$store.dispatch('pwdUpdate',form).then(()=>{
                        if(this.$store.state.pwdIncorrect){
                            this.$notify({
                                group: 'IncorrectPwd'
                            });
                        }else{
                            this.pwd=''
                            this.newpwd=''
                            this.conf_newpwd=''
                            this.$notify({
                                group: 'pwdModified'
                            });
                        }
                    })
                }
            },
         checkField(){
             if(this.pwd===''){
                 this.pwdInvalid=true
             }
             else
                this.pwdInvalid=false
            if(this.newpwd===''){
                 this.newpwdInvalid=true
             }
             else
                this.newpwdInvalid=false
            if(this.conf_newpwd===''){
                 this.con_pwdInvalid=true
             }
             else
                this.con_pwdInvalid=false

            

            if(this.pwd!=='' && this.pwd.length<8){
                 this.pwdCourt=true
             }
             else
                this.pwdCourt=false

            if(this.newpwd!=='' && this.newpwd.length<8){
                 this.newpwdCourt=true
             }
             else
                this.newpwdCourt=false
            if(this.conf_newpwd!=='' && this.conf_newpwd.length<8){
                 this.con_pwdCourt=true
             }
             else
                this.con_pwdCourt=false

            if(this.pwdInvalid ==false && this.pwdCourt==false && this.newpwdInvalid==false && this.newpwdCourt==false && this.con_pwdCourt==false  && this.con_pwdInvalid==false)
                return true
            return false
         }
        }
    }
</script>
<style scoped>
    .pwd-reset{
        height: 1.3em !important;
        position: relative;
        top: 10rem;
        left: 10%;
        color: rgb(7, 148, 190) !important;
        font-size: 1.3em;
    }
    .pwd-reset:hover{
        text-decoration: underline !important;
    }
    .d-inf-us{
        top: 2rem;
    }
    .mul-reg{
        width: 40%;
        position: relative;
    }
    .mul-reg-v{
        width: 50%;
        position: relative;
    }
    .mul-reg-v input{
        border: none;
    }
    .success-img{
        position: relative;
        left: 2%;
        top: -0.5rem;
    }
    .us-inf-inf button{
        height: 32px;
        position: relative;
        left: 2%;
    }
    .inputfile {
	    width: 0.1px;
	    height: 0.1px;
	    opacity: 0;
	    overflow: hidden;
	    position: absolute;
	    z-index: -1;
    }
    .inputfile:focus + label {
    	outline: 1px dotted #000;
    	outline: -webkit-focus-ring-color auto 5px;
    }
    .inputfile + label {
        height: 32px;
        font-size: 1.1em;
        color: white;
        background-color: #004E66;
        display: inline-block;
        padding-top: 0.24rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: rgb(1, 102, 133);
    }
    .inputfile + label {
    	cursor: pointer; /* "hand" cursor */
    }
    .us-inf-inf{
        position: relative;
        left: 8%;
    }
    .us-info{
        position: relative !important;
        top: 1rem !important;
    }
    .us-inf-img img{
        border-radius: 50%;
    }
</style>
