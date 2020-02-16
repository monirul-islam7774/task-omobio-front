<template>
  <v-container class="ma-lg-5" grid-list-xs>
    <v-form ref="form"
    v-model="valid"
    lazy-validation>
      <v-row row wrap>
        <v-col cols="12">
          <h2 class="text-center ma-2">App</h2>
          <p class="text-center">Please log in</p>
        </v-col>
      </v-row>
      <v-row row wrap>
        <v-col cols="12" lg="8" xs="12" offset-lg="2" offset="0">
          <div>
            <!-- login and sign up -->
            <v-text-field
              required
              name="fullname"
              label="Full Name"
              outlined
              v-model="authObject.name"
              id="name"
              :rules="[v => !!v || 'Name is required']"
              v-if="!loginType"
              type="text"
            ></v-text-field>
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
              :label="passwordLabel"
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
        <v-col cols="12" lg="8" xs="12" offset-lg="2" offset="0">
          <v-btn color="success" block height="48px" x-large v-if="loginType"
          @click="loginFunction">Log In</v-btn>
          <v-btn color="success" block height="48px" x-large v-else @click="signupFunction">Sign Up</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row row wrap>
      <v-col cols="12" lg="8" xs="12" offset-lg="2" offset="0" class="d-flex justify-center">
        <p class="text-center ma-0 subtitle-1 " @click="changeLoginType(false)"
          v-if="loginType">Sign Up</p>
        <p class="text-center ma-0 subtitle-1" @click="changeLoginType(true)" v-else>Login</p>
      </v-col>
      <v-col lg="8" xs="12"  offset-lg="2">
        <p v-if="signedUp" class="subtitle-1 text-center">{{signupMessage}}</p>
      </v-col>
     </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      passwordLabel: 'Password',
      authObject: {
        name: '',
        email: '',
        password: '',
        role: 'user',
      },
      signupMessage: '',
      signedUp: false,
      loginType: true,
    };
  },
  methods: {
    changeLoginType(type) {
      // change the login type of the page
      this.passwordLabel = 'Set Password';
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
            alert('Unauthorized');
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
