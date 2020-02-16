<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="image"
    >
    </v-img>
    <v-card-text class="text--primary">
      <div>Title: {{title}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import Pusher from 'pusher-js';

export default {
  data() {
    return {
      image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      title: 'Blank',
    };
  },
  created() {
    this.subscribe();
  },
  methods: {
    subscribe() {
      const pusher = new Pusher('e473c6790a77055f3973', { cluster: 'ap1', forceTLS: true });
      pusher.subscribe('my-channel');
      pusher.bind('my-event', (data) => {
        this.image = data.file;
        this.title = data.title;
      });
    },
  },
};
</script>

<style></style>
