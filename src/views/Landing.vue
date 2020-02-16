<template>
  <v-container grid-list-xs fluid>
      <v-layout row wrap>
          <v-flex md5 offset-md7 xs12>
             <AuthComponent/>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import AuthComponent from '../components/AuthComponent.vue';

export default {
  components: {
    AuthComponent,
  },
};
</script>

<style lang="sass"></style>
