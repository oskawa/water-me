<template>
  <div class="plant-register">
    <form @submit.prevent="registerUser">
      <h1>S'inscrire</h1>
    
        <input placeholder="Username" type="text" v-model="username" />
      
    
        <input placeholder="Email" type="email" v-model="email" />
     
    
        <input placeholder="Mot de passe" type="password" v-model="password" />
     
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { User } from "~/types/user";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async registerUser() {
      const user = new User(this.$auth);
      const isRegistered = await user.register({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      if (isRegistered) {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
