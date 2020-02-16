<template>
  <v-container>
    <v-app-bar app clipped-left color="blue-grey" dark dense>
      <v-spacer />
      <v-icon @click="logout">mdi-exit-to-app</v-icon>
    </v-app-bar>

    <v-content>
      <component :is="currentComp" />
    </v-content>
  </v-container>
</template>
<script>
import UserDashboard from '../components/UserDashboard.vue';
import AdminDashboard from '../components/AdminDashboard.vue';

export default {
  data: () => ({
    drawer: null,
    currentComp: UserDashboard,
  }),
  components: {
    UserDashboard,
    AdminDashboard,
  },
  beforeMount() {
    const item = JSON.parse(window.localStorage.getItem('user'));
    const hasOwnProperty = Object.prototype.hasOwnProperty.call(item.data, 'role');
    if (hasOwnProperty) {
      if (item.data.role === 'admin') {
        this.currentComp = AdminDashboard;
      } else {
        this.currentComp = UserDashboard;
      }
    }
  },
  methods: {
    logout() {
      // send to login page
      this.$router.push('/');
    },
  },
};
</script>
