<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell d-flex">
                <div class="d-inf-us d-flex flex-column">
                    <h5 class="">Mot de passe</h5>
                    <hr class="hr-us-inf">
                    <label for="pwd">Mot de passe actuel</label>
                    <input type="password" id="pwd" name="pwd"  placeholder="Mot de passe" /><br>
                    <label for="pwdnew">Nouveau mot de passe</label>
                    <input type="password" id="pwdnew" name="pwdnew"  placeholder="Mot de passe" /><br>
                    <label for="pwdconf">Confirmation de mot de passe</label>
                    <input type="password" id="pwdconf" name="pwdconf"  placeholder="Confirmer votre mot de passe" /><br>
                    <button type="button" class="b-us_inf regb" v-on:click="saveusinf()">Modifier</button>
                 </div>
                 <router-link class="pwd-reset" to="#">Mot de passe oublié ? Réinitialisez le ici</router-link>
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

            }
        },
        methods: {
         
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
