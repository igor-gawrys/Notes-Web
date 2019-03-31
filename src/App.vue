<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('me');
  }
}
</script>

<style>

</style>
