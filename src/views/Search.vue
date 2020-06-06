<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  mounted(){
    this.notFound();
  },
  name: 'Search',
  methods:{
    notFound(){
      if(this.$router.currentRoute.path==="/annonce"){
            this.$router.push("/");
      }
    }
  }
}
</script>
