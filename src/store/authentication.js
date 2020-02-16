const axios = require('axios');

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
const state = {
  userObject: {},
  token: '',
};
const getters = {};
const mutations = {};
const actions = {
  loginAction(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/user/login', payload).then((response) => {
        resolve(response.data);
      })
        .catch((e) => {
          reject(e.response.status);
        });
    });
  },
  signupAction(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/user/create', payload).then((response) => {
        resolve(response.data);
      })
        .catch((e) => {
          reject(e.response);
        });
    });
  },

  // loginAdmin(context, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios.post('/user/login/admin', payload).then((response) => {
  //       resolve(response.data);
  //     })
  //       .catch((e) => {
  //         reject(e.response.status);
  //       });
  //   });
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
