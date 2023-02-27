<template>
  <div>
    <div v-if="!this.$auth.user">
    <input v-model="username" type="text" placeholder="username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    </div>
    <div v-else>
      <list-plants/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {User} from "~/types/user";

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
