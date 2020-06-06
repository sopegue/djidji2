<template>
  <div class="">
      
      <div class="search-wrapper">
        <input type="text" v-model="search" placeholder="Nom d'utilisateur .."/>
        <label>Rechercher un utilisateur :</label>
      </div>
      <div class="Allus">
      <h5>Bloqués</h5>
      <hr>
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
      <th scope="col">Nom & Prénoms</th>
      <th scope="col">Email</th>
      <th scope="col">Compte</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(us,index) in filteredList"
    :key="index">
      <th scope="row">{{++index}}</th>
      <td>{{us.Nom}} {{us.Prenom}}</td>
      <td>{{us.email}}</td>
      <td>{{us.type}}</td>
      <td class="text-center"><div v-if="us.isblocked===0" class="d-flex justify-content-between"><button title="Bloquer l'utilisateur" class="btn btn-danger"><i class="fas fa-lock"></i></button><button @click="gotoUser()" class="btn"><i class="fas fa-eye"></i></button></div>
       <div v-else class="d-flex justify-content-between"><button class="btn btn-success sssc" title="Débloquer l'utilisateur"><i class="fas fa-lock-open"></i></button><button @click="gotoUser()" class="btn"><i class="fas fa-eye"></i></button></div></td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
</template>
<style lang="scss" scoped>
.btn-success svg{
  color: white !important;
}
.actbtnn{
  width: fit-content;
  float: right;
  margin: 0 auto;
}
.search-wrapper {
    position: relative;
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
    top: 2rem !important;
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
// @ is an alias to /src
export default {
    data(){
        return{
            users:[],
            isLoading:true,
            blocked:Boolean,
            search:'',
            userCpy:[]
        }
    },
    computed:{
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
  },
    methods:{
       gotoUser(){
       this.$router.push('/admin/usinf').catch(err => {});
        
      },
        async getUser(){
        this.$Progress.start();
        const { data } = await this.$http.get('http://localhost:8000/api/user');
         data.forEach(user => this.users.push(new User(user)));
         this.users=this.users.filter(post => {
            return post.isblocked.toString().includes('1')
            })
      },
    }
}
</script>
