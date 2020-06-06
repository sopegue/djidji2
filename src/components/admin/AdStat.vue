<template>
  <div class="">
      <div class="datebtn">
           <date-pick
            v-model="date"
            :nextMonthCaption="'Mois suivant'"
            :prevMonthCaption="'Mois précédent'"
            :setTimeCaption="'Régler l\'heure'"
            :weekdays="[
            'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'
            ]"
            :months="[
        'Janvier', 'Février', 'Mars', 'Avril',
        'Mai', 'Juin', 'Juillet', 'Août',
        'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ]"
            :displayFormat="'DD/MM/YYYY'"
            
            >
            <template v-slot:default="{toggle, inputValue}">
                <button @click="toggle">
                 {{ inputValue || 'Choisir une date' }}
                </button>
            </template>
            </date-pick>
      </div>
      <div class="search-wrapper">
        <input type="text" v-model="search" placeholder="Signalées, enregistrées ."/>
        <label>Rechercher une annonce :</label>
      </div>
      <div class="Allus">
      <h5>Toutes les annonces</h5>
      <hr>
      <div style="margin-bottom:0.5rem; color : gray;">
          <span>Date du : {{setDate}}</span>
      </div>
       <div v-if="isLoading" class="ussloa">
              <b-spinner class="text-secondary" label="Loading..."></b-spinner>
        </div>
      <div  v-else class="inff">
         
      <div v-if="empty">
        <h6>Aucune donnée disponible.</h6>
        <hr>
      </div>
      <table v-else class="table table-bordered">
  <thead>
    <tr class="sticky-top">
      <th scope="col">#</th>
      <th scope="col">Signalées</th>
      <th scope="col">enregistrées</th>
      <th scope="col">Ajoutées</th>
      <th scope="col">Supprimées</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(ad,index) in filteredList"
    :key="index">
      <th scope="row">{{++index}}</th>
      <td class="a">{{ad.titre}}</td>
      <td class="b">{{ad.description}}</td>
      <td class="c">{{ad.prix}}</td>
      <td class="d">{{ad.nbvues}}</td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
</template>
<style lang="scss" scoped>
.a{
    color: orange;
}
.b{
    color: rgb(57, 175, 57);
}
.c{
    color: rgb(3, 74, 133);
}
.d{
    color: rgb(241, 93, 93);
}
.e{
    color: red;
}
.actbtnn{
  width: fit-content;
  float: right;
  margin: 0 auto;
}
.search-wrapper {
    position: relative;
    top: 1.5rem;
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 10px;
      left: 12px;
      z-index: -1;
      visibility: hidden;
      transition: .15s all ease-in-out;
    }
    input {
      padding: 4px 12px;
      width: 30%;
      position: relative;
      top: 1rem;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
            visibility: visible;
          font-size: 16px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
         font-size: 16px; 
          color: rgb(114, 114, 114);
          font-weight: 400;
      }
    }
  }
</style>
<style scoped>

.inff{
    overflow: auto;
    height: 300px;
}
.Allus{
    position: relative;
    top: 3.5rem !important;
}
.sttt{
    position: relative;
    left: 5%;
}
.noff{
    position: relative;
    left: 26%;
    top: 0.7rem;
}

.spii{
    position: relative;
    right: 25%;
    top: -0.5rem;
}
.fa-comment,.fabell svg{
    font-size: 20px;
}
.ddrap div{
    cursor: pointer;
}
.toos{
    background-color: rgb(0, 72, 93);
    position: relative;
    top: 1.5rem;
}
.toos:hover{
    background-color: rgb(124, 212, 83);
}
.toos:hover .nav-link 
{
    color: white !important;
}
.nav-link:hover{
    color: rgb(255, 255, 255) !important;
}
.inks:hover{
    color: rgb(255, 255, 255) !important;
}
.myyy{
    overflow: auto;
    width: 20% !important;
    height: 100% !important;
}
.datebtn button{
    width: 128px;
    font-size: 15px;
}
.myyys{
    overflow: auto;
    width: 20% !important;
    height: 100% !important;
}
.row{
    height: 100%;
}

#sidebarMenu{
    overflow: unset !important;
    background-color: #004E66;
    height: 100% !important;
    padding-bottom: 2rem;
}
.nav-link svg{
    height: 16px !important;
    width: 16px !important;
}
.aa svg{
    height: 24px !important;
    width: 24px !important;
}
.aaa svg{
    height: 28px !important;
    width: 28px !important;
}
.icon svg {
    width: 60px !important;
    height: 60px !important;
}
 .dropdown-toggle::after{
    position: relative;
    top: 0.08rem;
    left: 1%;
  }

.too {
    background-color: rgb(0, 72, 93);
}

.ussloa{
    width: 64px;
    height: 64px;
    margin: 0 auto;
}
.onl{
  color: /*white*/ rgb(110, 110, 110) !important;
}

.dot {
  height: 8px;
  width: 8px;
  border: none;
  background-color: rgb(255, 0, 0);
  border-radius: 50%;
  display: inline-block;
}
.regb{ 
    width: 100% !important;
}
</style>
<script>
import DatePick from 'vue-date-pick';
 function Ads({ id, use_id, categorie, titre, description, marque, prix, pp, nbvues, added_at, updated_at}) 
  {
     this.id = id;
     this.use_id= use_id;
     this.categorie= categorie;
     this.titre=titre;
     this.description=description;
     this.marque=marque;
     this.prix=prix;
     this.pp=pp;
     this.nbvues=nbvues;
     this.added_at=added_at;
     this.updated_at=updated_at;
   }
   var datte;
// @ is an alias to /src
export default {
    components: {DatePick},
    data(){
        return{
            ads:[],
            date:'',
            isLoading:true,
            search:'',
            adCpy:[]
        }
    },
    computed:{
        setDate(){
            if(this.date === ''){
            var d= new Date();
            var y=d.getFullYear();
            var m=d.getMonth()+1;
            var day=d.getDate();
            }
            else{
             var y=this.date.slice(0,4);
             var m=this.date.slice(5,7);
             var day=this.date.slice(8,10);

            }
             return day+'/'+m+'/'+y;
        },
        empty(){
            if(this.ads.length===0)
                return true;
            return false;
        },
        filteredList() {
            return this.ads.filter(post => {
            return (post.titre.toLowerCase().includes(this.search.toLowerCase())|| post.categorie.toLowerCase().includes(this.search.toLowerCase()) || post.prix.toLowerCase().includes(this.search.toLowerCase()))
            })
        }
    },
     watch:{
    ads:{
      handler:function(){
        this.isLoading=false;
      }
    }
  },
  mounted(){
        this.$Progress.finish();
  },
  created(){
    this.getAdsAll();
    this.adCpy=this.ads;
  },
    methods:{
        async getAdsAll(){
            const { data } = await this.$http.get('http://localhost:8000/api/annonce');
            data.forEach(ad => this.ads.push(new Ads(ad)));
        },
    }
}
</script>
