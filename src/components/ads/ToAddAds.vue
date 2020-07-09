<template>
  <div class="container border rounded addtop">
    <form  @submit.prevent="addAdd">
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
      <div  v-if="nOther" >
      <vs-select class="sslect" style="padding-top:3rem;" :color="'rgb(84, 202, 129)'"  placeholder="Choisir..." label="Sous-catégorie " v-model="value1">
        <vs-option 
        v-for="(item,index) in cate"
        :key="index"
        :label="item" :value="item">
          {{item}}
        </vs-option>
        
      </vs-select>
      <span v-if="scategInvalid" style="color:red;font-size:12px;" >Ce champ est requis &#10005;</span>
      </div>
      </div>
      
    </div>
      <div class="container inpfo" style="padding-top:1.5rem;">
          <label for="aatitre" class="notl">Titre de votre annonce <br> (Veuillez ne pas décrire votre annonce ici)</label><br>
          <input type="text" id="aatitre" name="atitre" placeholder="Un bon titre attire toujours l'attention ..." v-model="titre"/>
          <br><span style="color:red;font-size:12px;" v-if="titreInvalid">Donner un titre ! <br></span><br>
          <label for="aaprix" class="notl">Prix de vente à afficher </label><br>
          <input v-on:keypress="checkPrixPress" v-on:keyup="checkPrixUp"  type="text" id="aaprix" name="aaprix" placeholder="F CFA" v-model="prix"/>
          <br><span style="color:red;font-size:12px;" v-if="prixInvalid">Veuillez donner un prix ! <br></span><br>
          <div class="type_msg">
            <div class="input_msg_write">
              <label for="aadesc">Description détaillée de l'annonce</label>
              <textarea id="aadesc" class="write_msg" placeholder="Décrire votre annonce ..."
               name="aadesc" v-model="desc"></textarea>
               <span style="color:red;font-size:12px;" v-if="descInvalid">Donner une description de votre produit</span>
            </div>
          </div>
          
          
          
      </div>
      <div class="container inpfo text-center" style="position:relative; top:2rem;">
        <h6>Ajouter des images de votre produit (Assurez-vous que le contenu soit fait d'images dont la taille est inférieure à 5 MB ou bien il sera ignoré.)</h6>
      </div>
       
    <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
     
    <vue-upload-multiple-image class="imgdrop text-center"
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      @data-change="dataChange"
      :data-images="images"
      :maxImage="15"
      :dragText="'Glisser une ou plusieurs images ici'"
      :browseText="'Cliquer pour sélectionner une ou plusieurs image'"
      :dropText="'Relacher pour ajouter l\'image'"
      :popupText="'Images descriptives de votre annonce'"
      :markIsPrimaryText="'Choisir comme image principale'"
      :primaryText="'Image principale'"
      ></vue-upload-multiple-image>
    </div>
    <div class="container inpfo">

      <span style="color:red;font-size:12px;" v-if="picInvalid">Veuillez ajouter au moins 3 images !<br></span>
      <span style="color:red;font-size:12px;" v-if="invalid">Image invalide ou taille fichier > 5 MB !<br></span>
      <br>
      <label for="ville">Ville</label>
      <multiselect class="mul-reg-v" v-model="value2" :allow-empty="false" :options="options1" deselectLabel=""  selectedLabel="✓" selectLabel="Choisir" placeholder="Choisir une ville"><span slot="noResult">Oops! Aucun élément trouvé.</span></multiselect><br>
       <span style="color:red;font-size:12px;" v-if="villeInvalid" >Veuillez choisir une ville !<br><br></span>
       <label for="aatel" class="notl">Téléphone</label><br>
       <input v-on:keypress="checkTelPress" v-on:keyup="checkTelUp" type="text" id="aatel" name="atel" placeholder="Votre numéro de téléphone..." v-model="number" />
       <br><span style="color:red;font-size:12px;" v-if="telInvalid">Veuillez donner un numéro de téléphone valide ! <br></span><br>
      
        <label>Votre numéro est-t'il whatsapp ? <i class="fab fa-whatsapp"></i></label><br>
        <div class="whatsa d-flex justify-content-between">
          <div class="d-inline d-flex align-items-center">
          <input type="radio" class="" id="materialChecked" name="oui" value="1" v-model="checked">
          <label class="radio-label" for="materialChecked">Oui</label>
          </div>
          <div class="d-inline d-flex align-items-center">
          <input type="radio" class="" id="materialUnChecked" name="oui" value="0" v-model="checked" checked>
          <label class="radio-label" for="materialUnChecked">Non</label>
          </div>
        </div><br>
       <button type="submit" class="b-lr regb"><i class="fa fa-bullhorn" aria-hidden="true"></i> Ajouter votre annonce</button>
  <br>
    </div>
    </form>
  </div>
</template>
<script>
var mimage=''
function srcToFile(src, fileName, mimeType){
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
}
// @ is an alias to /src
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import Multiselect from 'vue-multiselect'
export default {
    data () {
    return {
      images: [],
      imageToDel:[],
      mymage:[],
      prixInvalid:false,
      invalid:false,
      myfile:new FormData(),
      telInvalid:false,
      titreInvalid:false,
      descInvalid:false,
      picInvalid:false,
      scategInvalid:false,
      villeInvalid:false,
      picUpload:false,
      checked:'0',
      number:'',
      desc:'',
      prix:'',
      titre:'',
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
      options1: ['Abidjan','Yamoussoukro','Bouaké', 'Katiola','Korhogo','Boundiali','Ferké','Daloa',
                'Bouaflé','Man','Duékoué','Guiglo','Sassandra','San-Pédro','Soubré','Abengourou',
                'Aboisso','Gagnoa','Divo','Daoukro','Bongouanou','Dimbokro','Bouna','Bondoukou',
                'Odienné','Minignan','Mankono','Touba','Séguéla' ],


      value:'1',
      value1:'',
      nOther:true,
    }
  },
  created(){
    if(!this.$store.state.currentUser.id)
            this.$router.push('/')
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
    checkPrixPress:function(evt){
      if (evt.which < 48 || evt.which > 57 || this.prix.replace(/\s/g, "").length>10)
    {
        evt.preventDefault();
    }
    },
    checkPrixUp:function(event){
      var str = this.prix;
      var count=(str.split(" ").length - 1)
      //var string=str.substr(0,str.indexOf(' '))
      str=str.replace(/\s/g, "")

      if(str.length>10){
        str=str.substring(0, (str.length-1))
      }
      var len=str.length
      if (len > 4) {
        if (len == 5){
          //if(count==0)
          str = str.slice(0, 2) + " " + str.slice(2);
        }
        if (len == 6){ 
          //if(count==1)
          str = str.slice(0, 3) + " " + str.slice(3);
        }
        if (len == 7){
          //if(count==1)
          str = str.charAt(0) + " " + str.slice(1, 4) + " " + str.slice(4);
        }
        if (len == 8){
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2, 5) + " " + str.slice(5);
        }
        if (len == 9){
          //if(count==1)
          str = str.slice(0, 3) + " " + str.slice(3, 6) + " " + str.slice(6);
        }
        if (len == 10){
          //if(count==1)
          str = str.slice(0, 1) + " " + str.slice(1, 4) + " " + str.slice(4,7)+ " " + str.slice(7);
        }
      }
      this.prix=str;
    },
    checkTelPress:function(evt){
    if (evt.which < 48 || evt.which > 57 || this.number.replace(/\s/g, "").length>8)
    {
        evt.preventDefault();
    }
    },
    checkTelUp(){
     var str = this.number;
      var count=(str.split(" ").length - 1)
      //var string=str.substr(0,str.indexOf(' '))
      str=str.replace(/\s/g, "")

      if(str.length>8){
        str=str.substring(0, (str.length-1))
      }
      var len=str.length
      if (len > 2) {
        if (len ==3 || len ==4){
          //if(count==0)
          str = str.slice(0, 2) + " " + str.slice(2);
        }
        if (len ==5 || len ==6){ 
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2,4)+ " "+ str.slice(4);
        }
        if (len == 7 || len ==8 ){
          //if(count==1)
          str = str.slice(0, 2) + " " + str.slice(2,4)+ " "+ str.slice(4,6) + " " + str.slice(6);
        }
      }
      this.number=str;
    },
    addAdd(){
      this.resetValid()
      var toCorrect=false
      var kk=0
      if(this.titre===''){
        toCorrect=true
        this.titreInvalid=true
      }
      if(this.prix==''){
        toCorrect=true
        this.prixInvalid=true
      }
        if(((this.number.replace(/\s/g, "").length!=0 && this.number.replace(/\s/g, "").length<8)||this.number.replace(/\s/g, "").length==0)){
        toCorrect=true
        this.telInvalid=true
      }
      if(!this.picUpload){
        toCorrect=true
        this.picInvalid=true
      }
      if(!(Array.isArray(this.mymage) && this.mymage.length)){
        toCorrect=true
        this.picInvalid=true
      }
      if(this.mymage.length!=0)
      {
        for (let index = 0; index < this.mymage.length; index++) {
          if(this.mymage[index]!=undefined)
          kk++
          
        }
      }
      if(kk<3){
        console.log('k',kk)
        toCorrect=true
        this.picInvalid=true
      }
      if(this.desc===''){
        toCorrect=true
        this.descInvalid=true
      }
       if(this.value2===''){
        toCorrect=true
        this.villeInvalid=true
      }
      if(this.nOther){
        if(this.value1==='')
        {
          toCorrect=true
        this.scategInvalid=true
        }
      }
      else{
        this.scategInvalid=false
      }
      if(!toCorrect){
        this.$Progress.start();
        var price=parseInt(this.prix.replace(/\s/g, ""))
        var categg=this.getCategorie()
        var ad={
          categ:categg,
          scateg:this.value1,
          titre:this.titre,
          prix:price,
          desc:this.desc,
          ville:this.value2,
          tel:this.number,
          isWhat:this.checked,
          user:this.$store.state.currentUser.id
        }
        for (let index = 0; index < this.mymage.length; index++) {
          if(this.mymage[index]!=undefined)
          this.myfile.append('file[]',this.mymage[index])   
        }
        this.myfile.append('categ',categg)
        this.myfile.append('scateg',this.value1)
        this.myfile.append('titre',this.titre)
        this.myfile.append('prix',price)
        this.myfile.append('desc',this.desc)
        this.myfile.append('ville',this.value2)
        this.myfile.append('tel',this.number)
        this.myfile.append('isWhat',this.checked)
        this.myfile.append('user',this.$store.state.currentUser.id)
        //console.log('ii',ad.images)
        //this.myfile.delete('file')
        this.addAd(this.myfile)
      }
    },
    getCategorie(){
      if(this.values==="1")
        return "Informatique"
      if(this.values==="2")
        return "Electronique"
      if(this.values==="3")
        return "Téléphone"
      if(this.values==="4")
        return "Mode"
      if(this.values==="5")
        return "Maison"
      if(this.values==="6")
        return "Jeux"
      if(this.values==="7")
        return "Véhicules"
      if(this.values==="8")
        return "Instruments"
      if(this.values==="9")
        return "Immobilier"
  
      return "Autres"
    },
    resetValid(){
      this.scategInvalid=false
      this.villeInvalid=false
      this.descInvalid=false
      this.picInvalid=false
      this.titreInvalid=false
      this.picInvalid=false
      this.telInvalid=false
      this.prixInvalid=false
    },
    addAd(ad){
        // The Promise used for router redirect in login
        this.$http.post('http://localhost:8000/api/annonce', ad,{ headers: {'Content-Type': 'multipart/form-data'}})
         .then(resp => { // store the token in localstorage
            console.log('ad added')
            this.$store.dispatch('updPlace',this.$store.state.adsPlace)
            console.log(resp)
            this.$router.push('/user/added');
            this.$notify({
              group: 'custom-ad'
            });
            this.$Progress.finish();
         })
       .catch(err => { // if the request fails, remove any possible user token if possible
         console.log(err)
         this.$Progress.finish();
       })
    },
    uploadImageSuccess(formData, index, fileList) {
      if(index==0)
      this.mymage=[]
      //console.log(this.images)
      if ( /\.(jpe?g|png|gif)$/i.test( formData.get('file').name ) ) {
       
            
            this.picUpload=true
            //this.invalid=false
             this.mymage[index]=formData.get('file')
             //this.myfile.append('file[]',formData.get('file'))
          
      
      }else{
        this.mymage[index]=undefined
      }
      console.log('im', this.mymage)
      // this.$http.post('http://localhost:8000/api/annonce/testfile', this.myfile ,{ headers: {'Content-Type': 'multipart/form-data'}} ).then(response => {
       //  console.log(response)
       //})
    },
    beforeRemove (index, done, fileList) {
      //console.log('index', index, fileList)
      var ii=[]
      console.log('intodel',index)
      if(fileList.length==1)
      this.picUpload=false
      ii=this.mymage.splice(index,1)
      if(fileList.length==1)
      this.mymage=[]
      var r = confirm("Supprimer l'image ?")
      if (r == true) {
        
        done()
        console.log('image restant', this.mymage)
      } else {
      }
    },
    editImage (formData, index, fileList) {
      //console.log(this.images)
      if ( /\.(jpe?g|png|gif)$/i.test( formData.get('file').name ) ) {
       
            
            this.picUpload=true
            //this.invalid=false
             this.mymage[index]=formData.get('file')
             //this.myfile.append('file[]',formData.get('file'))
          
      
      }else{
        this.mymage[index]=undefined
      }
      console.log('im', this.mymage)
     //alert('Modification de l\'image', formData, index, fileList)
    },
    dataChange (data) {
      alert(data)
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
    width: 100%;
    padding: 2 2 2 2;
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
    padding-bottom: 3rem;
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