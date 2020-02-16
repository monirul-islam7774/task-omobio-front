<template>
  <v-container grid-list-xs fluid>
      <v-layout row wrap>
          <v-flex md5 offset-md4 xs12>
             <AuthComponent/>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import AuthComponent from '../components/AdminAuth.vue';

export default {
  components: {
    AuthComponent,
  },
};
</script>

<style lang="sass"></style>
