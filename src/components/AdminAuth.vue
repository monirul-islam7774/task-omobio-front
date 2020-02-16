<template>
  <v-container class="mt-lg-10" grid-list-xs>
    <v-form ref="form"
    v-model="valid"
    lazy-validation>
      <v-row row wrap>
        <v-col cols="12" lg="8" xs="12" offset="0">
          <div>
            <!-- login and sign up -->
            <v-text-field
              required
              name="email"
              label="Email Address"
              outlined
              v-model="authObject.email"
              id="email"
              :rules="[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              ]"
              type="email"
            ></v-text-field>
            <v-text-field
              required
              name="password"
              label="Password"
              outlined
              v-model="authObject.password"
              id="password"
              :rules="[
                v => !!v || 'Password is required'
              ]"
              type="password"
            ></v-text-field>
          </div>
          <!-- token -->
        </v-col>
      </v-row>
      <v-row row wrap>
        <v-col cols="12" lg="8" xs="12" offset="0">
          <v-btn color="success" block height="48px" x-large
          @click="loginFunction">Log In</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      authObject: {
        email: '',
        password: '',
      },
      loginType: true,
    };
  },
  methods: {
    changeLoginType(type) {
      // change the login type of the page
      this.loginType = type;
    },
    signupFunction() {
      if (this.$refs.form.validate()) {
        const obj = this.authObject;
        this.$store.dispatch('signupAction', obj).then((res) => {
          this.loginType = true;
          this.signedUp = true;
          this.authObject = {
            name: '',
            email: '',
            password: '',
          };
          this.signupMessage = 'Please Login with your credentials';
          window.localStorage.setItem('user', res);
        }).catch((err) => {
          this.signupMessage = err.data.message;
          this.signedUp = true;
        });
      }
    },
    loginFunction() {
      if (this.$refs.form.validate()) {
        const auth = this.authObject;
        this.$store.dispatch('loginAction', auth).then((res) => {
          window.localStorage.setItem('user', JSON.stringify(res));
          this.$router.push('/dashboard');
        }).catch(((err) => {
          if (err.status === 401) {
            // asdasd
          }
        }));
      }
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
</style>
