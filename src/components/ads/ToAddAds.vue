<template>
  <div class="container border rounded addtop">
    
    <h4  class="text-center" style="padding-top:2rem;">Ajouter une annonce</h4>
    <div  class="container inpfo">
    <div class="d-inline-block" style="padding-top:3rem;">
    <vs-select class="sslect"  :color="'#004e66'"  placeholder="Catégorie..." label="Catégorie " v-model="values">
        <vs-option label="Informatique" value="1">
          Informatique
        </vs-option>
        <vs-option label="Electronique" value="2">
          Electronique
        </vs-option>
        <vs-option label="Téléphone" value="3">
          Téléphone
        </vs-option>
        <vs-option label="Mode" value="4">
          Mode
        </vs-option>
        <vs-option label="Maison" value="5">
          Maison
        </vs-option>
        <vs-option label="Jeux" value="6">
          Jeux
        </vs-option>
        <vs-option label="Véhicules" value="7">
          Véhicules
        </vs-option>
        <vs-option label="Instruments" value="8">
          Instruments
        </vs-option>
        <vs-option label="Immobilier" value="9">
          Immobilier
        </vs-option>
        <vs-option label="Autres" value="0">
          Autres
        </vs-option>
      </vs-select>

      <vs-select class="sslect" v-if="nOther"  style="padding-top:3rem;" :color="'#004e66'"  placeholder="Choisir..." label="Sous-catégorie " v-model="value1">
        <vs-option 
        v-for="(item,index) in cate"
        :key="index"
        :label="item" :value="item">
          {{item}}
        </vs-option>
        
      </vs-select>
      </div>
      
    </div>
      <div class="container inpfo" style="padding-top:3rem;">
          <label for="aatitre" class="notl">Titre de votre annonce</label><br>
          <input type="text" id="aatitre" name="atitre" placeholder="Un bon titre attire toujours l'attention ..." /><br><br>
          <label for="aaprix" class="notl">Prix de vente à afficher </label><br>
          <input type="text" id="aaprix" name="aaprix" placeholder="F CFA" /><br><br>
          <div class="type_msg">
            <div class="input_msg_write">
              <label for="aadesc">Description détaillée de l'annonce</label>
              <textarea id="aadesc" class="write_msg" placeholder="Décrire votre annonce ..."
               name="aadesc"></textarea>
            </div>
          </div>
          
          
          
      </div>
      <div class="container inpfo text-center" style="position:relative; top:2rem;">
        <h6>Ajouter des images de votre produit</h6>
      </div>
       
    <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
     
    <vue-upload-multiple-image class="imgdrop text-center"
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      @data-change="dataChange"
      :data-images="images"
      :maxImage="8"
      :dragText="'Glisser une ou plusieurs images ici'"
      :browseText="'Cliquer pour sélectionner une ou plusieurs image'"
      :dropText="'Relacher pour ajouter l\'image'"
      :popupText="'Images descriptives de votre annonce'"
      :markIsPrimaryText="'Choisir comme image principale'"
      :primaryText="'Image principale'"
      ></vue-upload-multiple-image>
    </div>
    <div class="container inpfo">
      <br>
      <label for="ville">Ville</label>
      <multiselect class="mul-reg-v" v-model="value2" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect><br>
       <label for="aatel" class="notl">Téléphone</label><br>
       <input type="text" id="aatel" name="atel" placeholder="Votre numéro de téléphone..." /><br><br>
      
        <label>Votre numéro est-t'il whatsapp ? <i class="fab fa-whatsapp"></i></label><br>
        <div class="whatsa d-flex justify-content-between">
          <div class="d-inline d-flex align-items-center">
          <input type="radio" class="" id="materialChecked" name="oui" value="1">
          <label class="radio-label" for="materialChecked">Oui</label>
          </div>
          <div class="d-inline d-flex align-items-center">
          <input type="radio" class="" id="materialUnChecked" name="oui" value="0" checked>
          <label class="radio-label" for="materialUnChecked">Non</label>
          </div>
        </div>
        <br>
         <label for="aamail" class="notl">Email (Faculatif)</label><br>
       <input type="text" id="aamail" name="amail" placeholder="Adresse email..." /><br><br>
       <button type="button" class="b-lr regb">Ajouter</button>
  <br>
    </div>
    
  </div>
</template>
<script>
// @ is an alias to /src
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import Multiselect from 'vue-multiselect'
export default {
    data () {
    return {
      images: [],
      cate:['Pc Bureau','Pc Portable','Accessoires Pc','Autres'],
      cate1:['Pc Bureau','Pc Portable','Accessoires Pc','Autres'],
      cate2:['Electroménager','Accessoires électro.','Autres'],
      cate3:['Android','Tablette','Ios','Windows phone','Autres'],

      cate4:['Homme','Femme & enfant','Self-care','Accessoires H,F & E','Autres'],
      cate5:['Meuble','Decoration','Bricolage','Autres'],
      cate6:['Console','Jeux vidéos','Accessoires de jeux','Autres'],
      cate7:['Moto','Voitures','Bicyclette','Autres'],
      cate8:['Sport','Music','Autres'],
      cate9:['Location','Vente','Autres'],
      cate10:[''],
      value2: '',
      options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferkessédougou','Daloa',
                'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                'Odienné','Minignan','Mankono','Touba','Séguéla' ],


      value:'1',
      value1:'',
      nOther:true,
    }
  },
  computed:{
      values:{
          // getter
    get: function () {
      return this.value;
    },
    // setter
    set: function (newValue) {
        this.value=newValue;
      
        if(this.value=='0'){
            this.nOther=false;
            this.cate=this.cate10;
        }
        else{
         
            this.nOther=true;
        this.value1=''
        if(this.value==='1')
            this.cate=this.cate1;
        if(this.value==='2')
            this.cate=this.cate2;
        if(this.value==='3')
            this.cate=this.cate3;
        if(this.value==='4')
            this.cate=this.cate4;
        if(this.value==='5')
            this.cate=this.cate5;
        if(this.value==='6')
            this.cate=this.cate6;
        if(this.value==='7')
            this.cate=this.cate7;
        if(this.value==='8')
            this.cate=this.cate8;
        if(this.value==='9')
            this.cate=this.cate9;
            
   
    }   
        }
          
      }
  },
  components: {
    VueUploadMultipleImage,Multiselect
  },
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', { data: formData }).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm("Supprimer l'image ?")
      if (r == true) {
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
      console.log('Modification de l\'image', formData, index, fileList)
    },
    dataChange (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
$color1: #f4f4f4;
$color2: #3197EE;
input[type="radio"] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        content: '';
        background: $color1;
        border-radius: 100%;
        border: 1px solid darken($color1, 25%);
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        top: 0.1em;
        margin-right: 0.5em; 
        cursor: pointer;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: $color2;
          box-shadow: inset 0 0 0 4px $color1;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: $color2;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px $color1;
          border-color: darken($color1, 25%);
          background: darken($color1, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
</style>
<style scoped>
  .regb,.logb{
    width: 50%;
    margin-bottom: 1rem;
  }
</style>
<style>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.mul-reg-v{
        width: 50%;
        position: relative;
        left: 0;
    }
.mul-reg-v input{
        border: none;
}
h1, h2 {
  font-weight: normal;
}
.vs-select__label{
    position: absolute;
    bottom: 1.5rem;
    width: 100%;
    font-size: medium !important;
    
}

.fa-whatsapp{
  font-size: 20px;
  color: green;
}
.whatsa{
  width: 40%;
}
.form-check-label{
  padding-left:10% ;
}
#aatitre{
    width: 100%;
}
#aaprix{
    width: 40%;
}
#aamail{
    width: 100%;

}
#aatel{
    width: 60%;

}
a {
  color: #42b983;
}
.imgdrop .image-container{
    width: 400px !important;
    height: 200px !important;
}
.addtop{
    position: relative;
    top: 3rem;
    bottom: 2rem;
    padding-bottom: 2rem;
    width: 60%;
}
.inpfo{
    width: 50%;
}
.imgdrop .image-list-container{
    width: fit-content;
    margin: 0 auto;
    padding-top: 0.5rem;
}
.image-list-item{
    width: 48px!important;
    height: 48px !important;
}
</style>
<style scoped>
.write_msg::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgba(90, 90, 90, 0.79);
  opacity: 1; /* Firefox */
}

.write_msg::-ms-input-placeholder { /* Microsoft Edge */
  color: rgba(90, 90, 90, 0.79);
}
    .write_msg {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;

  color: #4c4c4c !important;
  font-size: 15px;
  max-height: 180px;
  min-height: 180px;
  resize: none;
   overflow:hidden;
  width: 100%;
}
</style>