<template>
  <div class="sticky-top" v-bind:class="{'navv'  : !showNavbar}">
    <TheHeader :scrolling="showNavbar" ></TheHeader>
  </div>
</template>
<script>
  function User({ id,Nom,Prenom,Nom_entreprise,password,created_at,updated_at,matricule_entreprise,remembered,modified}) {
     this.id = id;
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
  import TheHeader from '@/components/header/TheHeader.vue'

  export default {
    data() {
      return {
        showNavbar: Boolean,
      }
    },
    props:['scrolling'],
    watch:{
      scrolling: { 
        handler: function(n){
          this.showNavbar=n;
        },
        deep: true
      },
    },
    methods: {
    },
    components: {
        TheHeader

    }
  }
</script>