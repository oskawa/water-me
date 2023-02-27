<template>
  <div v-if="$auth.loggedIn">
    <p>Logged in as: {{ userInformation.name }}</p>
    <p>Id : {{ userInformation.id }}</p>
    <img :src="userInformation.avatar_urls[24]" alt="" />

    <button @click="logout">Logout</button>
  </div>
</template>

<script>

import { User } from "~/types/user";
export default {
  data(){
return{
  user : null,
  userInformation : [],
}
  },
  created() {    
   if (!this.$auth.loggedIn) {
      this.$router.push("/");
    }else{
      this.user = new User(this.$auth)
      this.userInformation = this.user.getCurrentUser()
      console.log(this.userInformation)
    }
  },
  mounted() {
      //  console.log(this.user.getCurrentUser());
  },
  methods: {
    async logout() {
      try {
        await this.user.logout();
        // Redirect the user to the login page
        
      } catch (error) {
        // Handle logout error
      }
    },
  },
};
</script>
