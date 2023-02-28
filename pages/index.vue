<template>
  <div>
    <div class="index-login" v-if="!this.$auth.user">
      <h1>Arrose-moi !</h1>
      <div class="index-login__form">
        <input v-model="username" type="text" placeholder="username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
        <div class="index-login__link">
          <NuxtLink to="/forgetpassword">Mot de passe oublié</NuxtLink>
          <NuxtLink to="/register">S'inscire</NuxtLink>
        </div>
      </div>
    </div>
    <div v-else>
      <list-plants />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { User } from "~/types/user";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const user = new User(this.$auth);
      try {
        await user.login(this.username, this.password);

        // this.$router.push("/dashboard");
      } catch (error) {
        // Handle login error
        console.log(error);
      }
    },
  },
};
</script>
