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
        <input type="text" v-model="search" placeholder="Signalés, comptes, visiteurs .."/>
        <label>Rechercher un utilisateur :</label>
      </div>
      <div class="Allus">
      <h5>Tous les utilisateurs</h5>
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
      <th scope="col">Signalés</th>
      <th scope="col">Utilisateurs</th>
      <th scope="col">Visiteurs</th>
      <th scope="col">Bloqués</th>
      <th scope="col">Supprimés</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(us,index) in filteredList"
    :key="index">
      <th scope="row">{{++index}}</th>
      <td class="a">{{us.Nom}} {{us.Prenom}}</td>
      <td class="b">{{us.email}}</td>
      <td class="c">{{us.type}}</td>
      <td class="d">{{us.type}}</td>
      <td class="e">yerah</td>
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
    top: 4rem !important;
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
.datebtn button{
    width: 128px;
   font-size: 15px;
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
import 'vue-date-pick/dist/vueDatePick.css';
function User({ id,Nom,Prenom,pseudo,email,type,isblocked,ville,tel,pp,Nom_entreprise,password,created_at,updated_at,matricule_entreprise,remembered,modified}) {
     this.id = id;
     this.pseaudo=pseudo
     this.email=email;
     this.type=type;
     this.isblocked=isblocked;
     this.ville=ville;
     this.tel=tel;
     this.pp=pp;
     this.Nom = Nom;
     this.Prenom= Prenom
     this.Nom_entreprise=Nom_entreprise;
     this.password=password;
     this.created_at=created_at;
     this.updated_at=updated_at;
     this.matricule_entreprise=matricule_entreprise;
     this.remembered=remembered;
     this.modified=modified;
   }
   var datte;
// @ is an alias to /src
export default {
    components: {DatePick},
    data(){
        return{
            users:[],
            date:'',
            isLoading:true,
            search:'',
            userCpy:[]
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
            if(this.users.length===0)
                return true;
            return false;
        },
        filteredList() {
            return this.users.filter(post => {
            return (post.Nom.toLowerCase().includes(this.search.toLowerCase())|| post.type.toLowerCase().includes(this.search.toLowerCase()) || post.email.toLowerCase().includes(this.search.toLowerCase()) ||
            post.Prenom.toLowerCase().includes(this.search.toLowerCase()) || (post.Nom.toLowerCase()+' '+post.Prenom.toLowerCase()).includes(this.search.toLowerCase()))
            })
        }
    },
     watch:{
    users:{
      handler:function(){
        this.isLoading=false;
      }
    }
  },
  mounted(){
        this.$Progress.finish();
  },
  created(){
    this.getUser();
    this.userCpy=this.users;
  },
    methods:{
        async getUser(){
        this.$Progress.start();
        const { data } = await this.$http.get('http://localhost:8000/api/user');
         data.forEach(user => this.users.push(new User(user)));
        this.users=this.users.filter(post => {
            return !post.isblocked.toString().includes('1')
            })
      },
    }
}
</script>
