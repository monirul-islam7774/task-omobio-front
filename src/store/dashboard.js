const axios = require('axios');

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

const actions = {
  getAllUser(context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/user/getall').then((response) => {
        resolve(response.data);
      })
        .catch((e) => {
          reject(e.response.status);
        });
    });
  },
  sendNotification(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/dashboard/notification', payload, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        resolve(response.data);
      })
        .catch((e) => {
          reject(e.response.status);
        });
    });
  },
};

export default {
  actions,
};
