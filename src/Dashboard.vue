<template>
  <div v-cloak id="admin">
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'Dashboard',
}
</script>
