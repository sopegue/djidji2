<template >
    <div class="us-info">
        <div class="container">
            <div class="large-12 medium-12 small-12 cell">
                <div class="us-inf-img">
                    <img :style="{'position':'relative','top':'2.2rem' }" :src="image" :height="64" :width="64"/>
                </div>
                <div class="us-inf-inf d-flex"> 
                    <input type="file" id="file" ref="file" class="inputfile" v-on:change="handleFileUpload()"/>
                    <label for="file">Importer une photo</label>
                    <div v-if="saved" class="alert alert-success success-img" role="alert">
                      Photo mis à jour avec succès ✓
                    </div>
                    <div v-if="notimg" class="alert alert-danger success-img" role="alert">
                      {{msglert}}
                    </div>
                </div>
                <div class="d-inf-us d-flex flex-column">
                    <h5 class="">Mes informations</h5>
                    <hr class="hr-us-inf">
                    <label for="mail">Email</label>
                    <input type="text" id="mail" name="mail" placeholder="Email" /><br>
                    <label for="username">Nom</label>
                    <input type="text" id="username" name="username" placeholder="Nom" /><br>
                    <label for="surname">Prénom</label>
                    <input type="text" id="surname" name="surname" placeholder="Prénom" /><br>
                    <label for="ville">Ville</label>
                    <multiselect class="mul-reg-v" v-model="value1" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect><br>
                    <label for="reg-tel">Téléphone</label>
                    <input type="text" id="reg-tel" name="reg-tel" placeholder="Numéro de téléphone" /><br>
                    <button type="button" class="b-us_inf regb" v-on:click="saveusinf()">Enregistrer</button>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        mounted(){
            
        },
        data () {
            return {
                image:'/images/profile/2.JPG',
                file: '',
                saved:false,
                notimg:false,
                msglert:'',  
                value: 'Particulier',
                options: ['Particulier','Entreprise' ],
                value1: '',
                options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferkessédougou','Daloa',
                  'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                  'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                  'Odienné','Minignan','Mankono','Touba','Séguéla' ]
            }
        },
        methods: {
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
              let reader  = new FileReader();
              reader.addEventListener("load", function () {
                  this.image = reader.result;
            }.bind(this), false);
            if( this.file ){
                 if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                     if(this.file.size>5000000){
                         this.msglert='Veuillez importer une image de taille < 5 MB';
                         this.notimg=true;
                         this.saved=false;
                     }
                     else{
                        reader.readAsDataURL( this.file );
                        this.$Progress.start();
                        this.submitFile();
                        this.$Progress.finish();
                        this.saved=true;
                        this.notimg=false;
                     }
                    
                 }
                 else{
                     this.msglert='Attention ! Vous devez importer une image';
                     this.notimg=true;
                     this.saved=false;
                 }
            }
          },
          async submitFile(){
              let formData = new FormData();
              formData.append('file', this.file);
              const {data}=await this.$http.post('http://localhost:8000/api/user',
                formData,{ headers: {'Content-Type': 'multipart/form-data'}});
              if(data==null)
                console.log('success');
              
          }
        }
    }
</script>
<style scoped>
    .mul-reg-v{
        width: 50%;
        position: relative;
        left: auto;
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
