<template>
     <v-container>
       <v-row>
         <v-col cols="5">
           <v-card class="mx-auto" max-width="344" outlined>
            <v-card-text class="text--primary">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Title"
                      v-model="title"
                    ></v-text-field>
                    <v-file-input accept="image/*" label="File input" v-model="file"></v-file-input>
                    <v-btn color="primary" dark @click="sendNotification">Send</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
         </v-col>
         <v-col cols="7">
           <v-list>
             <v-list-item v-for="(item, i) in userList" :key="i">
              <v-list-item-content>
                <v-list-item-title>Name: {{item.name}}</v-list-item-title>
                <v-list-item-subtitle>Email: {{item.email}}</v-list-item-subtitle>
              </v-list-item-content>
             </v-list-item>
           </v-list>
         </v-col>
       </v-row>
     </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      file: [],
      userList: [],
    };
  },
  beforeMount() {
    this.$store.dispatch('getAllUser').then((res) => {
      console.log(res)
      this.userList = res.data;
    });
  },
  methods: {
    sendNotification() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('file', this.file);
      this.$store.dispatch('sendNotification', formData);
    },
  },
};
</script>
